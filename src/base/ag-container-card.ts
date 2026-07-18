import { html, css, nothing, type TemplateResult } from "lit";
import { state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { createThing, computeCardSize } from "custom-card-helpers";
import { AgBaseCard } from "./ag-base-card";
import { getCardHelpers } from "../utils/card-helpers";
import type { AgGroupMaxEvent, AgGroupMaxHandle } from "./ag-group-max";
import type { LovelaceCard, LovelaceCardConfig } from "../types";

// Config comune ai contenitori (panel, vstack, hstack).
export interface AgContainerCardConfig extends LovelaceCardConfig {
  type: string;
  flat?: boolean; // default true: figli senza cornice card (sfondo/bordo/ombra)
  /**
   * default false: quando è attivo, il contenitore fa da "scope" per le card
   * che chiedono il massimo di gruppo (ag-bar-card in modalità gruppo). Con
   * contenitori annidati vince il più vicino: chi lo tiene spento lascia
   * risalire l'evento a un contenitore esterno.
   */
  share_max?: boolean;
  /**
   * Spazio interno in px. Assente = default della card (0 per le stack,
   * 12/16 per il panel): con 0 i figli arrivano a filo del bordo.
   */
  padding?: number;
  /** Spazio tra le card figlie in px. Assente = 8. */
  gap?: number;
  cards?: LovelaceCardConfig[]; // default []
}

/**
 * Voce del registro dei membri del gruppo. Non è stato reattivo: il
 * contenitore non renderizza il massimo, lo consegna via callback.
 */
interface AgGroupMember {
  scale: string;
  value: number | undefined;
  onMax: (max: number | undefined) => void;
  /** Ultimo massimo consegnato: guardia "push solo su cambio". */
  lastMax: number | undefined;
  /** true finché non è mai stato consegnato nulla (undefined è un valore lecito). */
  pristine: boolean;
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

  /**
   * Membri iscritti, per elemento sorgente. Deliberatamente NON è uno @state:
   * il rendering del contenitore non dipende dal massimo, quindi il broker non
   * causa nemmeno un re-render. Per lo stesso motivo shouldUpdate() qui non va
   * toccato — è una proprietà del design, non una dimenticanza.
   */
  private _group = new Map<HTMLElement, AgGroupMember>();

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
    this._config = { flat: true, share_max: false, cards: [], ...provided };
    // Ogni setConfig ricostruisce tutti i figli: i membri attuali sono già
    // condannati. Svuotare qui evita di trattenerli fino al prossimo broadcast
    // (che, con share_max appena disattivato, non arriverebbe mai).
    this._group.clear();
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

  /**
   * Un membro chiede di entrare nel gruppo. Si risponde in modo sincrono
   * valorizzando `detail.handle`, così una card appena creata riceve il
   * massimo corrente nello stesso stack frame in cui si annuncia — senza
   * dover attendere il prossimo tick di `hass`.
   */
  private _onGroupMax = (ev: AgGroupMaxEvent): void => {
    // Lo scope è del contenitore più vicino: i contenitori esterni non devono
    // contare due volte lo stesso membro.
    ev.stopPropagation();
    const detail = ev.detail;
    const source = detail.source;

    const member: AgGroupMember = {
      scale: detail.scale,
      value: detail.value,
      onMax: detail.onMax,
      lastMax: undefined,
      pristine: true,
    };
    // set() su una chiave già presente sovrascrive: una ri-iscrizione senza
    // release() (non dovrebbe accadere, ma è a costo zero) non duplica nulla.
    this._group.set(source, member);

    const handle: AgGroupMaxHandle = {
      update: (value, scale) => {
        // Se nel frattempo il membro è stato sostituito o rilasciato, questo
        // handle è morto: non deve poter risuscitare una voce cancellata.
        if (this._group.get(source) !== member) {
          return;
        }
        member.value = value;
        member.scale = scale;
        this._broadcastGroupMax();
      },
      release: () => {
        if (this._group.get(source) !== member) {
          return;
        }
        this._group.delete(source);
        this._broadcastGroupMax();
      },
    };
    detail.handle = handle;

    this._broadcastGroupMax();
  };

  /**
   * Ricalcola il massimo per ogni scala e lo consegna ai membri interessati.
   *
   * Terminazione: il valore che un membro pubblica dipende solo da (hass,
   * config), mai dal massimo ricevuto. Quindi `onMax` non può, nemmeno
   * indirettamente, produrre un nuovo `update()` con un valore diverso. In più
   * si consegna solo quando il massimo cambia davvero: nessun ping-pong.
   */
  private _broadcastGroupMax(): void {
    // Rete di sicurezza: membri staccati dal DOM senza release() (rebuild del
    // contenitore, sostituzione da ll-rebuild, card rimossa da un
    // conditional). Cancellare durante l'iterazione di una Map è lecito.
    for (const [element] of this._group) {
      if (!element.isConnected) {
        this._group.delete(element);
      }
    }

    // Massimo per scala. Solo i valori positivi concorrono: un massimo <= 0
    // non produce una barra sensata e il membro ricadrebbe comunque a 0%.
    const maxByScale = new Map<string, number>();
    for (const member of this._group.values()) {
      const value = member.value;
      if (value === undefined || !Number.isFinite(value) || value <= 0) {
        continue;
      }
      const current = maxByScale.get(member.scale);
      if (current === undefined || value > current) {
        maxByScale.set(member.scale, value);
      }
    }

    for (const member of this._group.values()) {
      const max = maxByScale.get(member.scale);
      if (!member.pristine && max === member.lastMax) {
        continue; // guardia: push solo su cambio
      }
      member.lastMax = max;
      member.pristine = false;
      member.onMax(max);
    }
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
    // Listener condizionale: con share_max spento non si ascolta affatto, così
    // l'evento risale a un eventuale contenitore esterno attivo. lit-html
    // rimuove il listener quando il valore è undefined, quindi la commutazione
    // è dichiarativa e non lascia residui.
    //
    // Sta sul .children e non sull'host di proposito: lo stopPropagation()
    // dell'handler ferma l'evento prima che esca dal contenitore.
    //
    // Il nome dell'evento è letterale perché lit-html non accetta binding sul
    // nome: va tenuto allineato a AG_GROUP_MAX_EVENT in ./ag-group-max.
    const shareMax = this._config?.share_max === true;
    const gap = this._config?.gap;
    const padding = this._config?.padding;
    // Impostate solo se configurate, così il var() del CSS tiene i default.
    // Il padding vale SOLO per il contenitore dei figli: l'header del panel ha
    // il proprio, così mettendo 0 il contenuto arriva a filo bordo ma il
    // titolo resta allineato dov'è.
    const vars = styleMap({
      ...(gap !== undefined ? { "--ag-stack-gap": `${gap}px` } : {}),
      ...(padding !== undefined ? { "--ag-children-padding": `${padding}px` } : {}),
    });
    return html`
      <div
        class="children ${this.direction}${flat ? " flat" : ""}"
        style=${vars}
        @ag-group-max=${shareMax ? this._onGroupMax : undefined}
      >
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
    /* Il panel non imposta questa property: il suo spazio sta sulla ha-card. */
    padding: var(--ag-children-padding, 0);
    box-sizing: border-box;
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
