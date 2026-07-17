import { html, css, nothing, type TemplateResult } from "lit";
import { state } from "lit/decorators.js";
import { createThing, computeCardSize } from "custom-card-helpers";
import { AgBaseCard } from "./ag-base-card";
import { getCardHelpers } from "../utils/card-helpers";
import type { LovelaceCard, LovelaceCardConfig } from "../types";

// Config comune ai contenitori (panel, vstack, hstack).
export interface AgContainerCardConfig extends LovelaceCardConfig {
  type: string;
  flat?: boolean; // default true: figli senza cornice card (sfondo/bordo/ombra)
  cards?: LovelaceCardConfig[]; // default []
}

/**
 * Base condivisa dei contenitori di card: crea i figli con i card helpers di
 * HA (qualsiasi card Lovelace, non solo AG), propaga `hass`, gestisce il
 * rebuild e il rendering "flat".
 *
 * I figli vengono ricostruiti da zero ad ogni setConfig (stesso comportamento
 * delle stack native): la guardia a generazione evita che un build più lento
 * sovrascriva il risultato di uno più recente.
 */
export abstract class AgContainerCard<
  TConfig extends AgContainerCardConfig,
> extends AgBaseCard<TConfig> {
  @state() protected _cards?: LovelaceCard[];

  @state() protected _error?: string;

  // hstack la imposta a "row"; determina layout e calcolo dell'altezza.
  protected direction: "column" | "row" = "column";

  private _buildGen = 0;

  public setConfig(config: TConfig): void {
    if (!config) {
      throw new Error("Configurazione non valida");
    }
    if (config.cards !== undefined && !Array.isArray(config.cards)) {
      throw new Error("Il campo 'cards' deve essere una lista di card");
    }
    for (const card of config.cards ?? []) {
      if (typeof card !== "object" || card === null || typeof card.type !== "string") {
        throw new Error("Ogni elemento di 'cards' deve avere un campo 'type'");
      }
    }
    // ha-form emette `undefined` sui campi svuotati: uno spread diretto
    // sovrascriverebbe i default con undefined, quindi vanno scartati prima.
    const provided = Object.fromEntries(
      Object.entries(config).filter(([, value]) => value !== undefined)
    ) as TConfig;
    this._config = { flat: true, cards: [], ...provided };
    void this._rebuildAll();
  }

  // La base ammette solo `_config` e `hass`: qui vanno aggiunti gli @state
  // propri, altrimenti la card non si ridisegna quando i figli sono pronti.
  protected shouldUpdate(changedProps: Map<string, unknown>): boolean {
    return (
      super.shouldUpdate(changedProps) || changedProps.has("_cards") || changedProps.has("_error")
    );
  }

  protected updated(changedProps: Map<string, unknown>): void {
    super.updated(changedProps);
    if (changedProps.has("hass") && this.hass && this._cards) {
      for (const card of this._cards) {
        card.hass = this.hass;
      }
    }
  }

  public getCardSize(): number | Promise<number> {
    if (!this._cards || this._cards.length === 0) {
      return 1;
    }
    const sizes = Promise.all(this._cards.map((card) => computeCardSize(card)));
    return this.direction === "row"
      ? sizes.then((s) => Math.max(...s))
      : sizes.then((s) => s.reduce((a, b) => a + b, 0));
  }

  public getGridOptions(): Record<string, number | string> {
    return { columns: 12, rows: "auto" };
  }

  private async _rebuildAll(): Promise<void> {
    const gen = ++this._buildGen;
    const configs = this._config?.cards ?? [];
    try {
      const cards = await Promise.all(configs.map((config) => this._createCard(config)));
      if (gen === this._buildGen) {
        this._cards = cards;
        this._error = undefined;
      }
    } catch (err) {
      if (gen === this._buildGen) {
        this._cards = [];
        this._error = err instanceof Error ? err.message : String(err);
      }
    }
  }

  private async _createCard(config: LovelaceCardConfig): Promise<LovelaceCard> {
    let element: LovelaceCard;
    try {
      element = (await getCardHelpers()).createCardElement(config);
    } catch {
      // HA senza loadCardHelpers: createThing funziona solo con gli elementi
      // hui-* già definiti, ma è meglio di niente come degradazione.
      element = createThing(config) as LovelaceCard;
    }
    if (this.hass) {
      element.hass = this.hass;
    }
    // Le hui-error-card emettono ll-rebuild quando la card vera diventa
    // disponibile (es. custom card caricata dopo): si ricrea solo quel figlio.
    element.addEventListener(
      "ll-rebuild",
      (ev) => {
        ev.stopPropagation();
        void this._rebuildCard(element, config);
      },
      { once: true }
    );
    return element;
  }

  private async _rebuildCard(oldElement: LovelaceCard, config: LovelaceCardConfig): Promise<void> {
    const gen = this._buildGen;
    const newElement = await this._createCard(config);
    if (gen !== this._buildGen || !this._cards) {
      return; // nel frattempo è arrivato un setConfig: il rebuild è superato
    }
    // Mai toccare il DOM a mano (replaceChild): il DOM è di Lit, si aggiorna
    // lo stato in modo immutabile e si lascia ridisegnare.
    this._cards = this._cards.map((card) => (card === oldElement ? newElement : card));
  }

  /** Markup dei figli, riusato così com'è da vstack/hstack e dentro il panel. */
  protected renderChildren(): TemplateResult | typeof nothing {
    if (this._error) {
      return html`<div class="children-error">${this._error}</div>`;
    }
    if (!this._cards) {
      return nothing; // build asincrono ancora in corso
    }
    const flat = this._config?.flat ?? true;
    return html`
      <div class="children ${this.direction}${flat ? " flat" : ""}">
        ${this._cards.map((card) => html`<div class="child">${card}</div>`)}
      </div>
    `;
  }
}

/**
 * Stili condivisi dei contenitori: ogni sottoclasse li include nel proprio
 * `static styles = [containerStyles, css\`...\`]`.
 *
 * Il rendering "flat" azzera la cornice dei figli tramite le custom property
 * che ha-card già consuma (niente accesso agli interni). Limitazione nota:
 * le custom property ereditano in profondità, quindi un contenitore non-flat
 * annidato dentro uno flat vede comunque i propri figli trasparenti — stesso
 * comportamento dei temi "transparent card", non lo mitighiamo.
 */
export const containerStyles = css`
  .children {
    display: flex;
    gap: var(--ag-stack-gap, 8px);
  }
  .children.column {
    flex-direction: column;
  }
  .children.row {
    flex-direction: row;
  }
  /* Larghezze uguali; min-width sblocca l'ellipsis dentro i figli flex. */
  .children.row > .child {
    flex: 1 1 0;
    min-width: 0;
  }
  .children.flat > .child {
    --ha-card-background: transparent;
    --ha-card-border-width: 0;
    --ha-card-box-shadow: none;
    --ha-card-border-color: transparent;
  }
  .children-error {
    color: var(--error-color, #db4437);
    font-size: 13px;
  }
`;
