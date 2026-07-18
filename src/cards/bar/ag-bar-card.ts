import { html, css, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { formatNumber } from "custom-card-helpers";
import { AgBaseCard } from "../../base/ag-base-card";
import {
  AG_GROUP_MAX_EVENT,
  type AgGroupMaxDetail,
  type AgGroupMaxHandle,
} from "../../base/ag-group-max";
import { registerCustomCard } from "../../utils/register-card";
import type { HomeAssistant, LovelaceCardEditor } from "../../types";
import {
  CARD_TYPE,
  CARD_NAME,
  EDITOR_TYPE,
  DEFAULT_CONFIG,
  DEFAULTS,
  FALLBACK_COLORS,
  UNKNOWN_COLOR,
  type AgBarCardConfig,
} from "./config";
import {
  levelSeverity,
  fillPercent,
  normalizeValue,
  declaredMax,
  ownMax,
  resolveMax,
  type Severity,
} from "./logic";
import { parseNumericState } from "../../utils/states";
import { formatPower } from "../../utils/power";
import "./ag-bar-card-editor";

/**
 * Barra orizzontale: riga con icona, nome, descrizione e valore; sotto, una
 * barra di progresso valore/massimo con soglie di colore.
 *
 * Il massimo può essere quello dichiarato dalla card (entità o numero fisso)
 * oppure quello condiviso dal gruppo, così più barre dentro lo stesso
 * contenitore AG diventano confrontabili a colpo d'occhio. Vedi
 * `base/ag-group-max.ts` per il protocollo e `base/ag-container-card.ts` per il
 * broker.
 *
 * A differenza della battery card, le soglie tingono SOLO la barra: sfondo e
 * bordo della ha-card restano quelli del tema.
 */
@customElement(CARD_TYPE)
export class AgBarCard extends AgBaseCard<AgBarCardConfig> {
  /** Massimo ricevuto dal contenitore. undefined = nessun gruppo attivo. */
  @state() private _groupMax?: number;

  /** Handle di iscrizione; undefined = nessun contenitore sta condividendo. */
  private _groupHandle?: AgGroupMaxHandle;

  /** Ultimi valore/scala pubblicati: guardia "pubblica solo su cambio". */
  private _publishedMax?: number;
  private _publishedScale?: string;

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement(EDITOR_TYPE) as LovelaceCardEditor;
  }

  // Pesca la prima entità di potenza, così la preview nel picker mostra dati veri.
  public static getStubConfig(hass?: HomeAssistant): AgBarCardConfig {
    const entity =
      (hass &&
        Object.keys(hass.states).find(
          (id) => id.startsWith("sensor.") && hass.states[id].attributes.device_class === "power"
        )) ||
      "";
    return { type: `custom:${CARD_TYPE}`, entity, value_format: "power" };
  }

  public setConfig(config: AgBarCardConfig): void {
    if (!config) {
      throw new Error("Configurazione non valida");
    }
    if (!config.entity) {
      throw new Error("Specifica l'entità del valore (campo 'entity')");
    }
    // ha-form emette `undefined` sui campi svuotati: uno spread diretto
    // sovrascriverebbe i default con undefined, quindi vanno scartati prima.
    const provided = Object.fromEntries(
      Object.entries(config).filter(([, value]) => value !== undefined)
    );
    this._config = { ...DEFAULT_CONFIG, ...provided } as AgBarCardConfig;
  }

  public getCardSize(): number {
    return 1;
  }

  // Una barra vuole larghezza: 12 colonne, una riga.
  public getGridOptions(): Record<string, number | string> {
    return { rows: 1, columns: 12, min_rows: 1, min_columns: 6 };
  }

  // La base ammette solo `_config` e `hass`: senza questa aggiunta la card non
  // si ridisegnerebbe quando cambia il massimo del gruppo, che arriva da un
  // fratello e non da hass.
  protected shouldUpdate(changedProps: Map<string, unknown>): boolean {
    return super.shouldUpdate(changedProps) || changedProps.has("_groupMax");
  }

  public connectedCallback(): void {
    super.connectedCallback();
    // L'iscrizione NON può passare da requestUpdate(): shouldUpdate() gira
    // prima di willUpdate() e con changedProps vuoto scarterebbe il ciclo,
    // quindi willUpdate() non verrebbe mai eseguito. Al riattacco (rebuild del
    // contenitore, cambio vista, conditional card) ci si re-iscrive qui.
    this._syncGroup();
  }

  public disconnectedCallback(): void {
    // Qui l'elemento è già staccato: un evento non risalirebbe più a nessuno.
    // L'uscita passa per la closure ottenuta all'iscrizione.
    this._leaveGroup();
    super.disconnectedCallback();
  }

  /**
   * Punto di sincronizzazione col gruppo. In willUpdate() e non in updated():
   * il contenitore risponde impostando `_groupMax` in modo sincrono, e in
   * willUpdate() Lit assorbe la mutazione nel ciclo in corso — nessun secondo
   * ciclo, nessun warning "scheduled an update after an update completed".
   */
  protected willUpdate(changedProps: Map<string, unknown>): void {
    super.willUpdate(changedProps);
    this._syncGroup();
  }

  /**
   * INVARIANTE DI TERMINAZIONE: quello che si pubblica è `ownMax`, funzione di
   * (hass, config) soltanto — non legge mai `_groupMax`. Perciò il ciclo
   *   pubblica -> il contenitore ricalcola -> onMax -> re-render -> pubblica
   * si chiude sempre al secondo passaggio, dove il valore risulta invariato.
   * Le guardie sono due e sovrapposte: qui non si pubblica se nulla è
   * cambiato, e nel contenitore non si consegna se il massimo non è cambiato.
   */
  private _syncGroup(): void {
    const config = this._config;
    if (!config || config.max_mode !== "group") {
      // Partecipazione simmetrica: chi non consuma il massimo del gruppo non
      // lo alimenta, così una barra a massimo proprio non sposta le altre.
      this._leaveGroup();
      return;
    }

    const { compare, scale } = this._readValue();
    const own = ownMax(this._declaredMax(), compare);

    if (this._groupHandle) {
      if (own !== this._publishedMax || scale !== this._publishedScale) {
        this._publishedMax = own;
        this._publishedScale = scale;
        this._groupHandle.update(own, scale);
      }
      return;
    }

    // Prima iscrizione (o ri-iscrizione dopo un distacco).
    this._publishedMax = own;
    this._publishedScale = scale;
    const detail: AgGroupMaxDetail = {
      source: this,
      value: own,
      scale,
      onMax: (max) => {
        this._groupMax = max;
      },
    };
    this.dispatchEvent(
      new CustomEvent(AG_GROUP_MAX_EVENT, { detail, bubbles: true, composed: true })
    );
    // Risposta sincrona: se resta undefined nessun contenitore condivide e la
    // card ricade sul proprio massimo.
    this._groupHandle = detail.handle;
    if (!this._groupHandle) {
      this._groupMax = undefined;
    }
  }

  private _leaveGroup(): void {
    this._groupHandle?.release();
    this._groupHandle = undefined;
    this._publishedMax = undefined;
    this._publishedScale = undefined;
    this._groupMax = undefined;
  }

  /** Stato dell'entità del valore, normalizzato per confronto e display. */
  private _readValue(): ReturnType<typeof normalizeValue> {
    const config = this._config;
    const stateObj = config?.entity ? this.hass?.states[config.entity] : undefined;
    return normalizeValue(
      parseNumericState(stateObj?.state),
      stateObj?.attributes.unit_of_measurement as string | undefined,
      config?.value_format ?? "auto"
    );
  }

  /** Massimo dichiarato: entità del massimo, altrimenti massimo fisso. */
  private _declaredMax(): number | undefined {
    const config = this._config;
    if (!config) {
      return undefined;
    }
    const valueObj = config.entity ? this.hass?.states[config.entity] : undefined;
    const maxObj = config.max_entity ? this.hass?.states[config.max_entity] : undefined;
    return declaredMax(
      parseNumericState(maxObj?.state),
      maxObj?.attributes.unit_of_measurement as string | undefined,
      config.max_value,
      config.max_unit,
      valueObj?.attributes.unit_of_measurement as string | undefined,
      config.value_format ?? "auto"
    );
  }

  // Colore configurato dall'utente, altrimenti quello del tema.
  private _color(kind: Severity): string {
    const config = this._config;
    const custom =
      kind === "warning"
        ? config?.color_warning
        : kind === "alarm"
          ? config?.color_alarm
          : config?.color_normal;
    return custom?.trim() || FALLBACK_COLORS[kind];
  }

  /** "power" -> W/kW; altrimenti numero + unità grezza dell'entità. */
  private _formatValue(raw: number | undefined, compare: number | undefined): string {
    const config = this._config;
    if (raw === undefined || !this.hass || !config) {
      return "–";
    }
    if (config.value_format === "power") {
      if (compare === undefined) {
        return "–"; // unità di potenza non riconosciuta
      }
      // formatPower lavora in valore assoluto: il segno lo rimette il chiamante.
      return `${compare < 0 ? "-" : ""}${formatPower(compare, this.hass.locale)}`;
    }
    const stateObj = config.entity ? this.hass.states[config.entity] : undefined;
    const digits = config.decimals ?? DEFAULTS.decimals;
    const num = formatNumber(raw, this.hass.locale, { maximumFractionDigits: digits });
    const unit = stateObj?.attributes.unit_of_measurement as string | undefined;
    return unit ? `${num} ${unit}` : num;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) {
      return nothing;
    }

    const config = this._config;
    const stateObj = config.entity ? this.hass.states[config.entity] : undefined;
    const name = config.name || stateObj?.attributes.friendly_name || config.entity || "";
    const interactive = this._hasAnyAction();

    const { raw, compare } = this._readValue();
    const known = compare !== undefined;

    const max = resolveMax(
      config.max_mode ?? "own",
      this._groupMax,
      ownMax(this._declaredMax(), compare)
    );
    const percent = fillPercent(compare, max);
    const severity: Severity = known
      ? levelSeverity(
          percent,
          config.level_warning,
          config.level_alarm,
          config.level_direction ?? "above"
        )
      : "normal";
    // La severità entra SOLO qui: nessuna classe sulla ha-card, nessuna
    // --ha-card-* toccata. Sfondo e bordo restano quelli del tema.
    const barColor = known ? this._color(severity) : UNKNOWN_COLOR;
    const valueText = this._formatValue(raw, compare);

    const valueFont = config.value_font?.trim();
    const vars = styleMap({
      "--ag-bar-fill": `${percent}%`,
      "--ag-bar-color": barColor,
      "--ag-bar-height": `${config.bar_height ?? DEFAULTS.bar_height}px`,
      "--ag-title-size": `${config.title_size ?? DEFAULTS.title_size}px`,
      // Impostata solo se configurata: svuotando il campo il var() del CSS
      // ricade su `inherit`, cioè il font del tema HA.
      ...(valueFont ? { "--ag-value-font": valueFont } : {}),
    });

    return html`
      <ha-card
        class=${interactive ? "interactive" : ""}
        style=${vars}
        @action=${this._handleAction}
        .actionHandler=${this._actionHandlerDirective()}
      >
        <div class="content">
          <div class="row">
            ${config.icon ? html`<ha-icon class="icon" .icon=${config.icon}></ha-icon>` : nothing}
            <span class="name" title=${name}>${name}</span>
            ${config.description
              ? html`<span class="description">${config.description}</span>`
              : nothing}
            <span class="value">${valueText}</span>
          </div>
          <div
            class="track"
            role="progressbar"
            aria-label=${name}
            aria-valuemin="0"
            aria-valuemax=${max !== undefined && max > 0 ? max : nothing}
            aria-valuenow=${known ? (compare as number) : nothing}
            aria-valuetext=${valueText}
          >
            <div class="fill"></div>
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    ha-card {
      height: 100%;
      box-sizing: border-box;
    }
    ha-card.interactive {
      cursor: pointer;
    }

    /* Lo spazio orizzontale lo azzera il contenitore che ne fornisce uno
       proprio (vedi ag-panel-card), così la riga si allinea al titolo. */
    .content {
      padding: 10px var(--ag-item-padding-x, 16px);
      box-sizing: border-box;
    }

    /* baseline: nome, descrizione e valore hanno corpi diversi (15/11/15px) e
       devono appoggiare sulla stessa linea. */
    .row {
      display: flex;
      align-items: baseline;
      gap: 8px;
      margin-bottom: 6px;
    }
    /* ha-icon non ha una baseline utile: va centrata a parte. */
    .icon {
      align-self: center;
      flex: 0 0 auto;
      color: var(--ag-bar-color);
      --mdc-icon-size: 18px;
    }
    /* Un font custom va caricato a livello di documento (dal tema HA): qui si
       può solo usarlo. Senza --ag-value-font si eredita il font del tema. */
    .name {
      font-family: var(--ag-value-font, inherit);
      font-size: var(--ag-title-size, 15px);
      font-weight: 600;
      color: var(--primary-text-color);
      flex: 0 1 auto;
      min-width: 0; /* senza questo l'ellipsis nei figli flex non scatta */
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    /* Stesso trattamento di .summary-label del panel. */
    .description {
      font-family: var(--ag-value-font, inherit);
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
      flex: 0 1 auto;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    /* margin-left: auto spinge il valore a destra sia con descrizione che
       senza; non si comprime mai (le due etichette a sinistra sì).
       tabular-nums evita che la barra "salti" quando cambia la larghezza del
       numero: con più barre incolonnate si nota. */
    .value {
      margin-left: auto;
      flex: 0 0 auto;
      font-family: var(--ag-value-font, inherit);
      font-size: 15px;
      font-weight: 600;
      color: var(--primary-text-color);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }

    .track {
      height: var(--ag-bar-height, 6px);
      border-radius: calc(var(--ag-bar-height, 6px) / 2);
      background-color: var(--divider-color, #e0e0e0);
      overflow: hidden;
    }
    .fill {
      height: 100%;
      width: var(--ag-bar-fill, 0%);
      border-radius: inherit;
      background-color: var(--ag-bar-color);
      transition:
        width 0.4s ease-out,
        background-color 0.3s ease;
    }

    @media (prefers-reduced-motion: reduce) {
      .fill {
        transition: none;
      }
    }
  `;
}

registerCustomCard({
  type: CARD_TYPE,
  name: CARD_NAME,
  description:
    "Barra orizzontale con nome, descrizione e valore; massimo proprio o condiviso col gruppo.",
  documentationURL: "https://github.com/ToTo085/ha-ag-cards",
});

declare global {
  interface HTMLElementTagNameMap {
    "ag-bar-card": AgBarCard;
  }
}
