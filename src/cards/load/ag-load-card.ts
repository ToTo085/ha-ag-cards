import { html, css, nothing, type TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { AgBaseCard } from "../../base/ag-base-card";
import { registerCustomCard } from "../../utils/register-card";
import { parseNumericState } from "../../utils/states";
import { toWatts } from "../../utils/power";
import type { LovelaceCardEditor } from "../../types";
import {
  CARD_TYPE,
  CARD_NAME,
  EDITOR_TYPE,
  DEFAULT_CONFIG,
  DEFAULT_STANDBY_THRESHOLD,
  type AgLoadCardConfig,
} from "./config";
import { loadVerdict, isGoldIcon, loadPowerText } from "./logic";
import "./ag-load-card-editor";

/**
 * Card "comando carico": una riga con icona, nome, interruttore a destra e, se
 * è associato un sensore di potenza, una riga con i watt che distingue *acceso e
 * assorbe* (accento oro) da *solo acceso* (standby).
 *
 * È una foglia sul modello di ag-entity-card: standalone è una riga isolata con
 * cornice; dentro un contenitore flat (ag-panel-card / ag-vstack-card) la
 * cornice sparisce e diventa una riga di lista. Non disegna alcun contenitore di
 * gruppo: bordi/raggi e intestazione sono delegati al contenitore.
 */
@customElement(CARD_TYPE)
export class AgLoadCard extends AgBaseCard<AgLoadCardConfig> {
  // Editor visuale (popup di configurazione) associato alla card.
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement(EDITOR_TYPE) as LovelaceCardEditor;
  }

  // Config di esempio proposta quando l'utente aggiunge la card dalla UI.
  public static getStubConfig(): AgLoadCardConfig {
    return { type: `custom:${CARD_TYPE}`, entity: "switch.decorative_lights" };
  }

  public setConfig(config: AgLoadCardConfig): void {
    if (!config) {
      throw new Error("Configurazione non valida");
    }
    if (!config.entity) {
      throw new Error("Specifica un'entità da comandare (campo 'entity')");
    }
    this._config = { ...DEFAULT_CONFIG, ...config };
  }

  public getGridOptions(): Record<string, number | string> {
    return { rows: 1, columns: 6, min_rows: 1 };
  }

  // Il toggle agisce sull'entità principale. stopPropagation così il tap
  // sull'interruttore non fa scattare anche l'azione della riga (more-info).
  private _toggle = (ev: Event): void => {
    ev.stopPropagation();
    const entityId = this._config?.entity;
    if (!this.hass || !entityId) {
      return;
    }
    this.hass.callService("homeassistant", "toggle", { entity_id: entityId });
  };

  // Isola i gesti sull'interruttore dall'action handler della <ha-card>: senza,
  // il mousedown/touchstart/click salirebbe fino alla riga.
  private _stop = (ev: Event): void => {
    ev.stopPropagation();
  };

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) {
      return nothing;
    }

    const config = this._config;
    const entityId = config.entity;
    const stateObj = entityId ? this.hass.states[entityId] : undefined;
    const name = config.name || stateObj?.attributes.friendly_name || entityId || "";
    const interactive = this._hasAnyAction();
    // Impostata solo se configurata: senza la property il var() del CSS ricade
    // su `inherit`, cioè il font del tema HA.
    const valueFont = config.value_font?.trim();
    const vars = styleMap(valueFont ? { "--ag-value-font": valueFont } : {});

    const unavailable =
      !stateObj || stateObj.state === "unavailable" || stateObj.state === "unknown";
    const isOn = stateObj?.state === "on";

    const hasPower = Boolean(config.power_entity);
    const powerObj = config.power_entity ? this.hass.states[config.power_entity] : undefined;
    // Potenza in W, undefined se il sensore è assente/non numerico o non disponibile.
    let watts: number | undefined;
    if (powerObj && powerObj.state !== "unavailable" && powerObj.state !== "unknown") {
      const value = parseNumericState(powerObj.state);
      watts =
        value === undefined
          ? undefined
          : toWatts(value, powerObj.attributes.unit_of_measurement as string | undefined);
    }

    const threshold = config.standby_threshold ?? DEFAULT_STANDBY_THRESHOLD;
    const verdict = loadVerdict({ unavailable, isOn, hasPower, watts, threshold });
    const goldIcon = isGoldIcon(verdict);
    const absorbing = verdict === "absorbing";

    const icon = stateObj
      ? html`
          <ha-state-icon
            class="icon ${goldIcon ? "gold" : ""} ${unavailable ? "unavailable" : ""}"
            .hass=${this.hass}
            .stateObj=${stateObj}
            .icon=${config.icon}
          ></ha-state-icon>
        `
      : html`
          <ha-icon
            class="icon unavailable"
            .icon=${config.icon || "mdi:power-plug-outline"}
          ></ha-icon>
        `;

    return html`
      <ha-card
        class=${interactive ? "interactive" : ""}
        style=${vars}
        @action=${this._handleAction}
        .actionHandler=${this._actionHandlerDirective()}
      >
        <div class="content ${absorbing ? "absorbing" : ""}">
          ${icon}
          <div class="info">
            <span class="name ${unavailable ? "unavailable" : ""}">${name}</span>
            ${hasPower
              ? html`
                  <span
                    class="power ${absorbing ? "absorbing" : ""} ${unavailable
                      ? "unavailable"
                      : ""}"
                    >${loadPowerText(watts, verdict, this.hass.locale)}</span
                  >
                `
              : nothing}
          </div>
          <div
            class="toggle"
            @click=${this._stop}
            @mousedown=${this._stop}
            @touchstart=${this._stop}
            @touchend=${this._stop}
          >
            <ha-switch
              .checked=${isOn}
              .disabled=${unavailable}
              @change=${this._toggle}
            ></ha-switch>
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    ha-card.interactive {
      cursor: pointer;
    }
    /* Come ag-entity-card: il contenitore che ha uno spazio proprio azzera
       --ag-item-padding-x, così le righe si allineano al titolo. Lo spazio
       verticale resta fisso (12px) anche in flat, come le altre foglie. */
    .content {
      position: relative;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px var(--ag-item-padding-x, 16px);
    }
    /* Stato "assorbe": velatura oro di fondo + filetto verticale a sinistra.
       Applicati su .content (non su ha-card) così restano visibili anche in
       modalità flat, dove la cornice della card è dissolta dal contenitore. */
    .content.absorbing {
      background: color-mix(in srgb, var(--accent-color, #ff9800) 8%, transparent);
    }
    .content.absorbing::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: var(--accent-color, #ff9800);
    }
    .icon {
      color: var(--state-icon-color, var(--primary-color));
      flex: 0 0 auto;
    }
    /* Acceso senza sensore, oppure acceso e assorbe: icona in oro. */
    .icon.gold {
      color: var(--accent-color, #ff9800);
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 2px;
      flex: 1 1 auto;
      min-width: 0;
    }
    .name {
      font-family: var(--ag-value-font, inherit);
      font-weight: 600;
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .power {
      font-family: var(--ag-value-font, inherit);
      font-size: 12px;
      color: var(--secondary-text-color);
      font-variant-numeric: tabular-nums;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    /* Numero potenza in oro solo quando assorbe. */
    .power.absorbing {
      color: var(--accent-color, #ff9800);
      font-weight: 600;
    }
    .unavailable {
      color: var(--secondary-text-color);
      font-weight: 400;
    }
    .toggle {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
    }
    /* Track dell'interruttore acceso in oro, coerente con l'accento della
       collezione. Il pomello resta al colore contrastante del tema (come nei
       mockup): non forziamo --switch-checked-button-color. */
    ha-switch {
      --switch-checked-color: var(--accent-color, #ff9800);
    }
  `;
}

registerCustomCard({
  type: CARD_TYPE,
  name: CARD_NAME,
  description:
    "Comanda on/off un carico e, con un sensore di potenza, distingue se assorbe o è acceso a vuoto.",
  documentationURL: "https://github.com/ToTo085/ha-ag-cards",
});

declare global {
  interface HTMLElementTagNameMap {
    "ag-load-card": AgLoadCard;
  }
}
