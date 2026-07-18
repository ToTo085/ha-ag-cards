import { noChange } from "lit";
import type { AttributePart } from "lit";
import { Directive, directive } from "lit/directive.js";
import type { DirectiveParameters } from "lit/directive.js";
import { fireEvent } from "custom-card-helpers";
import type { ActionHandlerOptions } from "custom-card-helpers";
import { defineCustomElement } from "./register-card";

/**
 * Port minimale della directive `actionHandler` del frontend Home Assistant
 * (src/panels/lovelace/common/directives/action-handler-directive.ts).
 *
 * `custom-card-helpers` fornisce `handleAction`/`hasAction` e i tipi, ma NON la
 * directive che distingue i gesti: la ricreiamo qui. Rispetto all'originale è
 * senza ripple `mwc-ripple` (una dipendenza in più solo per l'animazione): le
 * card segnalano l'interattività con `cursor: pointer`.
 *
 * Uso in una card:
 *   <ha-card
 *     @action=${this._handleAction}
 *     .actionHandler=${actionHandler({ hasHold, hasDoubleClick })}
 *   >
 * L'elemento globale <action-handler> aggancia i listener pointer/touch e, al
 * termine del gesto, emette un evento `action` con detail `{ action }`
 * ("tap" | "hold" | "double_tap").
 */

interface ActionHandlerElement extends HTMLElement {
  actionHandler?: {
    options: ActionHandlerOptions;
    start?: (ev: Event) => void;
    end?: (ev: Event) => void;
    handleKeyDown?: (ev: KeyboardEvent) => void;
  };
}

const sameOptions = (a?: ActionHandlerOptions, b?: ActionHandlerOptions): boolean =>
  !!a && !!b && a.hasHold === b.hasHold && a.hasDoubleClick === b.hasDoubleClick;

// Finestra entro cui un secondo tap conta come doppio tap.
const DOUBLE_CLICK_TIME = 250;

class ActionHandler extends HTMLElement {
  public holdTime = 500;

  protected timer?: number;

  protected held = false;

  private cancelled = false;

  private dblClickTimeout?: number;

  private dblClickTarget?: EventTarget | null;

  public connectedCallback(): void {
    // Un movimento/scroll durante la pressione annulla il gesto in corso.
    ["touchcancel", "mouseout", "mouseup", "touchmove", "wheel", "scroll"].forEach((ev) => {
      document.addEventListener(
        ev,
        () => {
          this.cancelled = true;
          if (this.timer) {
            clearTimeout(this.timer);
            this.timer = undefined;
          }
        },
        { passive: true }
      );
    });
  }

  public bind(element: ActionHandlerElement, options: ActionHandlerOptions = {}): void {
    if (element.actionHandler && sameOptions(options, element.actionHandler.options)) {
      return;
    }

    if (element.actionHandler) {
      element.removeEventListener("touchstart", element.actionHandler.start!);
      element.removeEventListener("touchend", element.actionHandler.end!);
      element.removeEventListener("touchcancel", element.actionHandler.end!);
      element.removeEventListener("mousedown", element.actionHandler.start!);
      element.removeEventListener("click", element.actionHandler.end!);
      element.removeEventListener("keydown", element.actionHandler.handleKeyDown!);
    } else {
      // Il tasto destro non deve far partire azioni.
      element.addEventListener("contextmenu", (ev: Event) => {
        const e = ev || window.event;
        if (e.preventDefault) {
          e.preventDefault();
        }
        if (e.stopPropagation) {
          e.stopPropagation();
        }
        e.cancelBubble = true;
        e.returnValue = false;
        return false;
      });
    }

    element.actionHandler = { options };

    element.actionHandler.start = (): void => {
      this.cancelled = false;
      if (options.hasHold) {
        this.held = false;
        this.timer = window.setTimeout(() => {
          this.held = true;
        }, this.holdTime);
      }
    };

    element.actionHandler.end = (ev: Event): void => {
      // Un gesto annullato (scroll/movimento) non produce azioni.
      if (["touchend", "touchcancel"].includes(ev.type) && this.cancelled) {
        return;
      }
      const target = ev.target as HTMLElement;
      // Evita che l'evento touch generi anche il click "fantasma".
      if (ev.cancelable) {
        ev.preventDefault();
      }
      if (options.hasHold) {
        clearTimeout(this.timer);
        this.timer = undefined;
      }
      if (options.hasHold && this.held) {
        fireEvent(target, "action", { action: "hold" });
      } else if (options.hasDoubleClick) {
        // Un click nativo con detail < 2 (o il primo tap touch, che non è un
        // "click" e non ha un timeout pendente, o un tap su un target diverso)
        // apre la finestra: se non ne arriva un secondo entro DOUBLE_CLICK_TIME
        // è un tap singolo; altrimenti è un doppio tap. Con la sola detezione su
        // `detail` il touch (detail === 0) sparerebbe subito il doppio tap.
        if (
          (ev.type === "click" && (ev as MouseEvent).detail < 2) ||
          !this.dblClickTimeout ||
          this.dblClickTarget !== target
        ) {
          this.dblClickTarget = target;
          this.dblClickTimeout = window.setTimeout(() => {
            this.dblClickTimeout = undefined;
            fireEvent(target, "action", { action: "tap" });
          }, DOUBLE_CLICK_TIME);
        } else {
          clearTimeout(this.dblClickTimeout);
          this.dblClickTimeout = undefined;
          fireEvent(target, "action", { action: "double_tap" });
        }
      } else {
        fireEvent(target, "action", { action: "tap" });
      }
    };

    element.actionHandler.handleKeyDown = (ev: KeyboardEvent): void => {
      if (!["Enter", " "].includes(ev.key)) {
        return;
      }
      (ev.currentTarget as ActionHandlerElement).actionHandler!.end!(ev);
    };

    element.addEventListener("touchstart", element.actionHandler.start, { passive: true });
    element.addEventListener("touchend", element.actionHandler.end);
    element.addEventListener("touchcancel", element.actionHandler.end);
    element.addEventListener("mousedown", element.actionHandler.start, { passive: true });
    element.addEventListener("click", element.actionHandler.end);
    element.addEventListener("keydown", element.actionHandler.handleKeyDown);
  }
}

defineCustomElement("action-handler", ActionHandler);

const getActionHandler = (): ActionHandler => {
  const body = document.body;
  const existing = body.querySelector("action-handler");
  if (existing) {
    return existing as ActionHandler;
  }
  const actionhandler = document.createElement("action-handler") as ActionHandler;
  body.appendChild(actionhandler);
  return actionhandler;
};

export const actionHandlerBind = (
  element: ActionHandlerElement,
  options?: ActionHandlerOptions
): void => {
  const actionhandler = getActionHandler();
  actionhandler.bind(element, options);
};

export const actionHandler = directive(
  class extends Directive {
    public update(part: AttributePart, [options]: DirectiveParameters<this>): typeof noChange {
      actionHandlerBind(part.element as ActionHandlerElement, options);
      return noChange;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public render(_options?: ActionHandlerOptions): void {}
  }
);
