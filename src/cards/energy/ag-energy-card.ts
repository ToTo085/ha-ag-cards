import { html, css, nothing, type TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { fireEvent } from "custom-card-helpers";
import { AgBaseCard } from "../../base/ag-base-card";
import { registerCustomCard } from "../../utils/register-card";
import type { AgActionableConfig, HomeAssistant, LovelaceCardEditor } from "../../types";
import {
  CARD_TYPE,
  CARD_NAME,
  EDITOR_TYPE,
  DEFAULT_CONFIG,
  DEFAULTS,
  STATE_COLORS,
  SOURCE_COLORS,
  type AgEnergyCardConfig,
} from "./config";
import {
  computeEnergy,
  roundShares,
  SOURCE_ORDER,
  type EnergySnapshot,
  type EnergyState,
  type OptionalPower,
  type SocStatus,
  type SourceKey,
} from "./logic";
import { parseNumericState } from "../../utils/states";
import { toWatts, formatPower, formatPowerKw } from "../../utils/power";
import "./ag-energy-card-editor";

const STATE_LABEL: Record<EnergyState, string> = {
  export: "Esporto",
  self: "Autoconsumo",
  buy: "Acquisto",
  draw: "Prelievo",
};

const STATE_ICON: Record<EnergyState, string> = {
  export: "mdi:arrow-up",
  self: "mdi:recycle",
  buy: "mdi:arrow-down",
  draw: "mdi:arrow-down",
};

// Cosa sta facendo la rete, in parole. "buy" e "draw" sono entrambi prelievo.
const GRID_LABEL: Record<EnergyState, string> = {
  export: "immetto in rete",
  self: "in pari",
  buy: "prelievo dalla rete",
  draw: "prelievo dalla rete",
};

const SOURCE_LABEL: Record<SourceKey, string> = {
  pv: "FV",
  battery: "Batteria",
  grid: "Rete",
};

const SOURCE_ICON: Record<SourceKey, string> = {
  pv: "mdi:white-balance-sunny",
  battery: "mdi:battery-charging",
  grid: "mdi:transmission-tower",
};

// Testo leggibile dello stato batteria, per l'aria-label dell'indicatore.
const SOC_STATUS_LABEL: Record<SocStatus, string> = {
  low: "carica bassa",
  charging: "in carica",
  discharging: "in scarica",
  idle: "a riposo",
};

/** Perche' una lettura e' fallita, dal problema piu' esterno al piu' interno. */
type ReadError = "missing" | "state" | "unit";

// Tre messaggi distinti: la causa deve essere leggibile dalla card. "unita'
// non riconosciuta" e' il caso di chi punta la card su un sensore in kWh.
const ERROR_MESSAGE: Record<ReadError, string> = {
  missing: "Entità non disponibile",
  state: "Dati non disponibili",
  unit: "Unità non riconosciuta",
};

type Reading = { ok: true; watts: number } | { ok: false; error: ReadError };

/**
 * Verdetto sullo scambio con la rete di un impianto FV, in due layout:
 *
 *  - "verdict"  parola di stato e kW di rete in evidenza, riga "Casa
 *               alimentata da", tre mini-metriche FV / Casa / Batteria;
 *  - "coverage" barra impilata con le quote di consumo coperte da FV,
 *               batteria e rete, legenda e code condizionali.
 *
 * I due layout condividono macchina degli stati e calcolo della provenienza
 * (vedi `logic.ts`): cambia solo il render.
 *
 * A differenza della battery card, lo stato tinge SOLO verdetto, icona e
 * numero: sfondo e bordo della ha-card restano quelli del tema. "Prelievo" e'
 * lo stato normale di ogni notte e terrebbe la card in allarme fino all'alba.
 */
@customElement(CARD_TYPE)
export class AgEnergyCard extends AgBaseCard<AgEnergyCardConfig> {
  /** Ultimi stateObj osservati: vedi shouldUpdate(). */
  private _watched?: Array<unknown>;

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement(EDITOR_TYPE) as LovelaceCardEditor;
  }

  public static getStubConfig(hass?: HomeAssistant): AgEnergyCardConfig {
    const power = hass
      ? Object.keys(hass.states).filter(
          (id) => id.startsWith("sensor.") && hass.states[id].attributes.device_class === "power"
        )
      : [];
    // device_class "power" da sola non distingue la rete dal FV: senza una
    // euristica sull'entity_id la preview del picker mostrerebbe due sensori a
    // caso. Sbagliare qui e' innocuo, si corregge dall'editor.
    const pick = (words: string[]): string | undefined =>
      power.find((id) => words.some((word) => id.includes(word)));
    const grid = pick(["grid", "rete", "meter"]) ?? power[0];
    const pv = pick(["pv", "solar", "fotovolt", "photovolt"]) ?? power.find((id) => id !== grid);
    return {
      type: `custom:${CARD_TYPE}`,
      grid_entity: grid ?? "",
      pv_entity: pv ?? "",
    };
  }

  public setConfig(config: AgEnergyCardConfig): void {
    if (!config) {
      throw new Error("Configurazione non valida");
    }
    if (!config.grid_entity) {
      throw new Error("Specifica l'entità della potenza di rete (campo 'grid_entity')");
    }
    if (!config.pv_entity) {
      throw new Error("Specifica l'entità della potenza fotovoltaica (campo 'pv_entity')");
    }
    // ha-form emette `undefined` sui campi svuotati: uno spread diretto
    // sovrascriverebbe i default con undefined, quindi vanno scartati prima.
    const provided = Object.fromEntries(
      Object.entries(config).filter(([, value]) => value !== undefined)
    );
    this._config = { ...DEFAULT_CONFIG, ...provided } as AgEnergyCardConfig;
  }

  public getCardSize(): number {
    return 4;
  }

  // Il layout coverage vuole larghezza: barra impilata e legenda a tre voci si
  // comprimono male sotto le 12 colonne. Il verdetto sta su 6, ma con la riga
  // di flusso e le metriche vuole le stesse 4 righe.
  public getGridOptions(): Record<string, number | string> {
    return this._config?.layout === "coverage"
      ? { rows: 4, columns: 12, min_rows: 3, min_columns: 6 }
      : { rows: 4, columns: 6, min_rows: 3, min_columns: 6 };
  }

  // Le azioni agiscono sull'entità della rete: è il numero in evidenza in
  // entrambi i layout ed è l'unico ingresso della macchina degli stati, quindi
  // il more-info si apre su ciò di cui la card parla davvero.
  protected _actionConfig(): AgActionableConfig {
    const config = this._config;
    return {
      entity: config?.grid_entity,
      tap_action: config?.tap_action,
      hold_action: config?.hold_action,
      double_tap_action: config?.double_tap_action,
    };
  }

  /**
   * La base ridisegna a ogni cambio di `hass`, cioè a ogni cambio di stato
   * dell'istanza HA. Qui i sensori sono quattro e veloci, e la barra è animata
   * in transition: senza questo filtro si ridisegna in continuazione e
   * l'animazione dei segmenti risulta a scatti.
   *
   * HA sostituisce l'oggetto stato a ogni cambio, quindi il confronto per
   * riferimento basta ed è economico.
   */
  protected shouldUpdate(changedProps: Map<string, unknown>): boolean {
    if (!this._config) {
      return false;
    }
    // Aggiornato sempre, anche sul ramo del config: lasciarlo indietro
    // farebbe confrontare il prossimo hass con stati di una config diversa.
    const next = this._watchedStates();
    const previous = this._watched;
    this._watched = next;

    if (changedProps.has("_config")) {
      return true;
    }
    if (!changedProps.has("hass")) {
      return false;
    }
    return previous === undefined || next.some((stateObj, i) => stateObj !== previous[i]);
  }

  private _watchedStates(): Array<unknown> {
    const config = this._config;
    const states = this.hass?.states;
    return [
      config?.grid_entity,
      config?.pv_entity,
      config?.battery_entity,
      config?.house_entity,
      config?.soc_entity,
    ].map((id) => (id && states ? states[id] : undefined));
  }

  /** Lettura di un'entità di potenza, normalizzata in watt col segno corretto. */
  private _readPower(entityId: string | undefined, invert?: boolean): Reading {
    if (!entityId) {
      return { ok: false, error: "missing" };
    }
    const stateObj = this.hass?.states[entityId];
    if (!stateObj) {
      return { ok: false, error: "missing" };
    }
    const raw = parseNumericState(stateObj.state);
    if (raw === undefined) {
      return { ok: false, error: "state" };
    }
    const watts = toWatts(raw, stateObj.attributes.unit_of_measurement as string | undefined);
    if (watts === undefined) {
      return { ok: false, error: "unit" };
    }
    return { ok: true, watts: invert ? -watts : watts };
  }

  /** Come sopra, ma per le entità opzionali: l'assenza non è un errore. */
  private _readOptional(entityId: string | undefined, invert?: boolean): OptionalPower {
    if (!entityId) {
      return { configured: false, watts: undefined };
    }
    const reading = this._readPower(entityId, invert);
    return { configured: true, watts: reading.ok ? reading.watts : undefined };
  }

  /**
   * Stato di carica in percento. Non passa da toWatts: è una percentuale, non
   * una potenza, e un'unità diversa da "%" non è un motivo per scartarla.
   */
  private _readSoc(entityId: string | undefined): number | undefined {
    if (!entityId) {
      return undefined;
    }
    return parseNumericState(this.hass?.states[entityId]?.state);
  }

  /** Formatta una potenza secondo `power_unit`. `signed` rimette il segno. */
  private _power(watts: number | undefined, signed = false): string {
    if (watts === undefined || !this.hass) {
      return "–";
    }
    // Entrambi gli helper lavorano in valore assoluto per contratto.
    const text =
      this._config?.power_unit === "auto"
        ? formatPower(watts, this.hass.locale)
        : formatPowerKw(watts, this.hass.locale);
    return signed && watts < 0 ? `−${text}` : text;
  }

  // Colore configurato dall'utente, altrimenti quello del tema.
  private _stateColor(state: EnergyState): string {
    const config = this._config;
    const custom =
      state === "export"
        ? config?.color_export
        : state === "self"
          ? config?.color_self
          : state === "buy"
            ? config?.color_buy
            : config?.color_draw;
    return custom?.trim() || STATE_COLORS[state];
  }

  /**
   * Colore del riempimento della batteria. Riusa i colori già configurabili
   * invece di aggiungerne altri quattro: in carica prende quello del FV (è
   * tipicamente il surplus che la riempie), in scarica il proprio, e sotto la
   * soglia quello di "Prelievo", che è il colore di allarme della card.
   */
  private _socColor(status: SocStatus): string {
    if (status === "low") {
      return this._stateColor("draw");
    }
    if (status === "charging") {
      return this._sourceColor("pv");
    }
    if (status === "discharging") {
      return this._sourceColor("battery");
    }
    return "var(--secondary-text-color)";
  }

  private _sourceColor(key: SourceKey): string {
    const config = this._config;
    const custom =
      key === "pv"
        ? config?.color_pv
        : key === "battery"
          ? config?.color_battery
          : config?.color_grid;
    return custom?.trim() || SOURCE_COLORS[key];
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) {
      return nothing;
    }

    const config = this._config;
    const gridObj = config.grid_entity ? this.hass.states[config.grid_entity] : undefined;
    const name = config.name || gridObj?.attributes.friendly_name || "Energia";

    // Entità obbligatorie: qualunque problema ferma il render con un messaggio
    // che ne dice la causa. Le opzionali degradano invece per elemento.
    const grid = this._readPower(config.grid_entity, config.invert_grid);
    const pv = this._readPower(config.pv_entity);
    if (!grid.ok || !pv.ok) {
      // Il primo problema in ordine di lettura: prima la rete, poi il FV.
      // L'ultimo ramo è irraggiungibile (ci si arriva solo se una delle due ha
      // fallito), ma serve a far narrowing a TypeScript su entrambe.
      const error: ReadError = !grid.ok ? grid.error : !pv.ok ? pv.error : "missing";
      return this._shell(html`
        <div class="content">
          <div class="head">
            <span class="plant" title=${name}>${name}</span>
          </div>
          <div class="row muted">
            <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
            <span>${ERROR_MESSAGE[error]}</span>
          </div>
        </div>
      `);
    }

    const snapshot = computeEnergy(
      {
        grid: grid.watts,
        pv: pv.watts,
        battery: this._readOptional(config.battery_entity, config.invert_battery),
        house: this._readOptional(config.house_entity),
        soc: this._readSoc(config.soc_entity),
      },
      {
        eps: config.deadband ?? DEFAULTS.deadband,
        socLow: config.soc_low ?? DEFAULTS.soc_low,
      }
    );

    return this._shell(
      config.layout === "coverage"
        ? this._renderCoverage(name, snapshot)
        : this._renderVerdict(name, snapshot),
      snapshot.state
    );
  }

  /**
   * L'unica <ha-card> della card: tutti i rami di render passano da qui, così
   * il cablaggio delle azioni non può divergere tra layout e degradi.
   */
  private _shell(content: TemplateResult, state?: EnergyState): TemplateResult {
    const config = this._config;
    const titleFont = config?.title_font?.trim();
    const valueFont = config?.value_font?.trim();
    const vars = styleMap({
      "--ag-state-color": state ? this._stateColor(state) : "var(--secondary-text-color)",
      "--ag-color-pv": this._sourceColor("pv"),
      "--ag-color-battery": this._sourceColor("battery"),
      "--ag-color-grid": this._sourceColor("grid"),
      "--ag-title-size": `${config?.title_size ?? DEFAULTS.title_size}px`,
      "--ag-bar-height": `${config?.bar_height ?? DEFAULTS.bar_height}px`,
      // Impostate solo se configurate: svuotando il campo il var() del CSS
      // ricade su `inherit`, cioè il font del tema HA.
      ...(titleFont ? { "--ag-title-font": titleFont } : {}),
      ...(valueFont ? { "--ag-value-font": valueFont } : {}),
    });

    return html`
      <ha-card
        class=${this._hasAnyAction() ? "interactive" : ""}
        style=${vars}
        @action=${this._handleAction}
        .actionHandler=${this._actionHandlerDirective()}
      >
        ${content}
      </ha-card>
    `;
  }

  /**
   * Mini-batteria verticale che si riempie dal basso, con la percentuale
   * accanto. Omessa del tutto quando la carica non è leggibile: una batteria
   * disegnata vuota si confonderebbe con una batteria scarica.
   */
  private _renderSoc(snapshot: EnergySnapshot): TemplateResult | typeof nothing {
    const { soc, socStatus } = snapshot;
    if (soc === undefined || socStatus === undefined) {
      return nothing;
    }
    const rounded = Math.round(soc);
    return html`
      <span
        class="soc"
        role="meter"
        aria-label="Carica batteria"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${rounded}
        aria-valuetext="${rounded}%, ${SOC_STATUS_LABEL[socStatus]}"
      >
        <span
          class="soc-cell"
          style=${styleMap({
            "--ag-soc-fill": `${soc}%`,
            "--ag-soc-color": this._socColor(socStatus),
          })}
          aria-hidden="true"
        >
          <span class="soc-level"></span>
        </span>
        <span class="soc-text" aria-hidden="true">${rounded}%</span>
      </span>
    `;
  }

  /** Layout 1a: verdetto in evidenza, provenienza a parole, tre metriche. */
  private _renderVerdict(name: string, snapshot: EnergySnapshot): TemplateResult {
    const config = this._config;
    const sources = snapshot.provenance?.sources ?? [];
    const battery = snapshot.battery;
    // La batteria in carica prende il colore del FV (è tipicamente il surplus
    // che la sta riempiendo), in scarica il proprio: così la mini-metrica dice
    // a colpo d'occhio da che parte sta andando l'energia.
    const batteryClass =
      snapshot.charging !== undefined
        ? "charging"
        : battery !== undefined && battery > 0
          ? "discharging"
          : "";

    return html`
      <div class="content verdict">
        <div class="head">
          <span class="plant" title=${name}>${name}</span>
          <span class="head-right">
            ${config?.phase ? html`<span class="phase">${config.phase}</span>` : nothing}
            ${this._renderSoc(snapshot)}
          </span>
        </div>

        <div class="verdict-row">
          <ha-icon class="verdict-icon" .icon=${STATE_ICON[snapshot.state]}></ha-icon>
          <span class="verdict-word">${STATE_LABEL[snapshot.state]}</span>
          <span class="verdict-value">${this._power(snapshot.grid)}</span>
        </div>
        <div class="grid-label">${GRID_LABEL[snapshot.state]}</div>

        ${sources.length
          ? html`
              <div class="fed-by">
                <ha-icon .icon=${SOURCE_ICON[sources[0]]}></ha-icon>
                <span
                  >Casa alimentata da
                  <strong>${sources.map((key) => SOURCE_LABEL[key]).join(" + ")}</strong></span
                >
              </div>
            `
          : nothing}

        ${this._renderFlow(snapshot)}

        <div class="metrics">
          ${this._renderMetric("FV", SOURCE_ICON.pv, this._power(snapshot.pv), "", config?.pv_entity)}
          ${this._renderMetric(
            "CASA",
            "mdi:home-outline",
            this._power(snapshot.house),
            "",
            config?.house_entity
          )}
          ${this._renderMetric(
            "BATT",
            SOURCE_ICON.battery,
            this._power(battery, true),
            batteryClass,
            config?.battery_entity
          )}
        </div>
      </div>
    `;
  }

  /**
   * Riga Sorgente -> Casa -> Rete: due segmenti a puntini che scorrono nella
   * direzione reale dell'energia.
   *
   * aria-hidden: non aggiunge nulla a un lettore di schermo, che ha già il
   * verdetto, l'etichetta della rete e la riga "Casa alimentata da" in testo.
   */
  private _renderFlow(snapshot: EnergySnapshot): TemplateResult {
    const { flow } = snapshot;
    const gridClass =
      flow.grid === "off" ? "off" : flow.grid === "reverse" ? "on reverse" : "on";
    return html`
      <div class="flow" aria-hidden="true">
        <ha-icon
          class="flow-node ${flow.source ? "live" : ""}"
          .icon=${SOURCE_ICON[flow.source ?? "pv"]}
        ></ha-icon>
        <span class="flow-seg ${flow.toHouse ? "on" : "off"}"></span>
        <ha-icon class="flow-node live" icon="mdi:home-outline"></ha-icon>
        <span class="flow-seg ${gridClass}"></span>
        <ha-icon class="flow-node ${flow.grid === "off" ? "" : "live"}" .icon=${SOURCE_ICON.grid}></ha-icon>
      </div>
    `;
  }

  /**
   * Una mini-metrica. Con un'entità dietro diventa cliccabile e apre il
   * more-info di quella entità: `house_entity` e `battery_entity` sono
   * facoltative, quindi la riga resta statica quando non ci sono.
   */
  private _renderMetric(
    label: string,
    icon: string,
    value: string,
    valueClass: string,
    entityId: string | undefined
  ): TemplateResult {
    const body = html`
      <span class="metric-label">
        <ha-icon .icon=${icon}></ha-icon>
        <span>${label}</span>
      </span>
      <span class="metric-value ${valueClass}">${value}</span>
    `;

    if (!entityId) {
      return html`<div class="metric">${body}</div>`;
    }
    return html`
      <div
        class="metric interactive"
        role="button"
        tabindex="0"
        aria-label="Dettagli ${label}"
        @click=${(ev: Event) => this._openMoreInfo(ev, entityId)}
        @keydown=${(ev: KeyboardEvent) => this._metricKeydown(ev, entityId)}
        @mousedown=${this._stopGesture}
        @touchstart=${this._stopGesture}
        @touchend=${this._stopGesture}
      >
        ${body}
      </div>
    `;
  }

  /**
   * L'action handler della card ascolta click, touch e keydown sulla
   * <ha-card>: senza fermare qui la propagazione il tap su una metrica
   * aprirebbe il more-info della rete invece che quello della metrica.
   */
  private _openMoreInfo(ev: Event, entityId: string): void {
    ev.stopPropagation();
    fireEvent(this, "hass-more-info", { entityId });
  }

  private _metricKeydown(ev: KeyboardEvent, entityId: string): void {
    if (ev.key !== "Enter" && ev.key !== " ") {
      return;
    }
    // Senza preventDefault lo spazio scrollerebbe la dashboard.
    ev.preventDefault();
    this._openMoreInfo(ev, entityId);
  }

  /**
   * Ferma i gesti prima che raggiungano la <ha-card>, senza agire: il tap vero
   * lo gestisce @click. Su touch serve davvero — l'handler della card fa
   * preventDefault sul touchend e il click sintetico non arriverebbe mai.
   */
  private _stopGesture(ev: Event): void {
    ev.stopPropagation();
  }

  /** Layout 1b: barra di provenienza del carico, legenda e code condizionali. */
  private _renderCoverage(name: string, snapshot: EnergySnapshot): TemplateResult {
    const provenance = snapshot.provenance;
    // Le percentuali intere servono solo qui: a schermo la barra usa le quote
    // non arrotondate, ma un lettore di schermo non può leggere 3 decimali.
    const percent = provenance ? roundShares(provenance.share) : undefined;
    const barLabel = percent
      ? `Casa alimentata da ${SOURCE_ORDER.map(
          (key) => `${SOURCE_LABEL[key]} ${percent[key]}%`
        ).join(", ")}`
      : "Copertura del carico non disponibile";

    return html`
      <div class="content coverage">
        <div class="head">
          <span class="plant" title=${name}>${name}</span>
          <span class="head-right">
            ${this._renderSoc(snapshot)}
            <span class="verdict-tag">
              <span>${STATE_LABEL[snapshot.state]}</span>
              <ha-icon .icon=${STATE_ICON[snapshot.state]}></ha-icon>
            </span>
          </span>
        </div>

        <div class="headline">
          <span class="headline-value">${this._power(snapshot.grid)}</span>
          <span class="headline-label">${GRID_LABEL[snapshot.state]}</span>
          <span class="house">Casa <strong>${this._power(snapshot.house)}</strong></span>
        </div>

        <div class="track" role="img" aria-label=${barLabel}>
          ${provenance
            ? SOURCE_ORDER.map((key) => {
                const width = provenance.share[key] * 100;
                // Il resto fino al 100% resta scoperto e mostra lo sfondo del
                // track: è lo scarto di bilancio dei sensori, e va visto.
                return width <= 0
                  ? nothing
                  : html`<div
                      class="seg ${key}"
                      style=${styleMap({ width: `${width.toFixed(3)}%` })}
                    ></div>`;
              })
            : nothing}
        </div>

        <div class="legend">
          ${SOURCE_ORDER.map(
            (key) => html`
              <span class="legend-item">
                <span class="swatch ${key}"></span>
                <span class="legend-label">${SOURCE_LABEL[key]}</span>
                <strong>${this._power(provenance?.watts[key])}</strong>
              </span>
            `
          )}
        </div>

        ${snapshot.surplus !== undefined || snapshot.charging !== undefined
          ? html`
              <div class="extras">
                ${snapshot.surplus !== undefined
                  ? html`
                      <div class="row">
                        <ha-icon icon="mdi:arrow-up"></ha-icon>
                        <span>Surplus in rete <strong>${this._power(snapshot.surplus)}</strong></span>
                      </div>
                    `
                  : nothing}
                ${snapshot.charging !== undefined
                  ? html`
                      <div class="row">
                        <ha-icon icon="mdi:battery-charging"></ha-icon>
                        <span
                          >Batteria in carica <strong>${this._power(snapshot.charging)}</strong></span
                        >
                      </div>
                    `
                  : nothing}
              </div>
            `
          : nothing}
      </div>
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
       proprio (vedi ag-panel-card), così le righe si allineano al titolo. */
    .content {
      display: flex;
      flex-direction: column;
      padding: 12px var(--ag-item-padding-x, 16px);
      box-sizing: border-box;
      height: 100%;
    }
    /* Il layout coverage ha 0-2 righe finali condizionali: distribuendo lo
       spazio la card riempie il box riservato in entrambi i casi. */
    .content.coverage {
      justify-content: space-between;
      gap: 8px;
    }
    /* Qui lo spazio lo dà già il gap del contenitore: sommarli distanzierebbe
       troppo la testata dal numero. */
    .content.coverage .head {
      margin-bottom: 0;
    }

    /* -- Testata ------------------------------------------------------- */
    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 6px;
    }
    /* Un font custom va caricato a livello di documento (dal tema HA): qui si
       può solo usarlo. Senza --ag-title-font si eredita il font del tema. */
    .plant {
      font-family: var(--ag-title-font, inherit);
      font-size: 11px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
      min-width: 0; /* senza questo l'ellipsis nei figli flex non scatta */
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .phase {
      font-family: var(--ag-value-font, inherit);
      font-size: 11px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
      flex: 0 0 auto;
    }
    .head-right {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 0 0 auto;
    }

    /* -- Indicatore di carica batteria --------------------------------- */
    .soc {
      display: flex;
      align-items: center;
      gap: 4px;
      flex: 0 0 auto;
    }
    /* La cella è il contenitore del livello: il contorno resta neutro e solo
       il riempimento prende il colore dello stato, così la lettura è
       "quanta ne resta" e non "che colore ha la batteria". */
    .soc-cell {
      position: relative;
      width: 9px;
      height: 15px;
      box-sizing: border-box;
      border: 1.5px solid var(--secondary-text-color);
      border-radius: 2px;
      overflow: hidden;
    }
    /* Il polo positivo in cima, che rende il glifo leggibile come batteria. */
    .soc-cell::before {
      content: "";
      position: absolute;
      top: -4px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 2px;
      border-radius: 1px 1px 0 0;
      background-color: var(--secondary-text-color);
    }
    .soc-level {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: var(--ag-soc-fill, 0%);
      background-color: var(--ag-soc-color, var(--secondary-text-color));
      transition:
        height 0.4s ease-out,
        background-color 0.3s ease;
    }
    .soc-text {
      font-family: var(--ag-value-font, inherit);
      font-size: 12px;
      font-weight: 600;
      color: var(--primary-text-color);
      font-variant-numeric: tabular-nums;
    }

    .verdict-tag {
      display: flex;
      align-items: center;
      gap: 6px;
      flex: 0 0 auto;
      font-family: var(--ag-value-font, inherit);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--ag-state-color);
    }
    .verdict-tag ha-icon {
      --mdc-icon-size: 16px;
    }

    /* -- Verdetto (layout 1a) ------------------------------------------ */
    /* baseline: icona a parte, parola e valore hanno corpi diversi e devono
       appoggiare sulla stessa linea. */
    .verdict-row {
      display: flex;
      align-items: baseline;
      gap: 8px;
    }
    /* ha-icon non ha una baseline utile: va centrata a parte. */
    .verdict-icon {
      align-self: center;
      flex: 0 0 auto;
      color: var(--ag-state-color);
      --mdc-icon-size: calc(var(--ag-title-size, 15px) * 1.2);
    }
    .verdict-word {
      font-family: var(--ag-title-font, inherit);
      font-size: calc(var(--ag-title-size, 15px) * 1.55);
      font-weight: 500;
      line-height: 1.1;
      color: var(--ag-state-color);
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    /* margin-left: auto spinge il valore a destra; non si comprime mai (la
       parola di stato sì). tabular-nums evita che il numero cambi larghezza
       a ogni aggiornamento del sensore. */
    .verdict-value {
      margin-left: auto;
      flex: 0 0 auto;
      font-family: var(--ag-value-font, inherit);
      font-size: calc(var(--ag-title-size, 15px) * 1.55);
      font-weight: 600;
      line-height: 1.1;
      color: var(--primary-text-color);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    .grid-label {
      text-align: right;
      font-family: var(--ag-value-font, inherit);
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }

    .fed-by {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 12px;
      font-family: var(--ag-value-font, inherit);
      font-size: 13px;
      color: var(--primary-text-color);
      min-width: 0;
    }
    .fed-by ha-icon {
      flex: 0 0 auto;
      color: var(--ag-color-pv);
      --mdc-icon-size: 16px;
    }
    .fed-by span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* -- Indicatore di flusso (layout 1a) ------------------------------ */
    .flow {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 12px 0;
    }
    .flow-node {
      flex: 0 0 auto;
      color: var(--disabled-text-color, #bdbdbd);
      --mdc-icon-size: 16px;
      transition: color 0.3s ease;
    }
    .flow-node.live {
      color: var(--secondary-text-color);
    }
    /* I puntini sono un gradiente ripetuto, non elementi: il segmento si
       allunga quanto serve senza doverne calcolare il numero. Animare
       background-position sposta i puntini senza toccare il layout. */
    .flow-seg {
      flex: 1 1 auto;
      height: 3px;
      min-width: 0;
      background-image: radial-gradient(
        circle,
        currentColor 1.5px,
        transparent 1.6px
      );
      background-size: 9px 3px;
      background-repeat: repeat-x;
      background-position: 0 center;
      color: var(--divider-color, #e0e0e0);
      transition: color 0.3s ease;
    }
    .flow-seg.on {
      color: var(--ag-state-color);
      animation: ag-flow 0.9s linear infinite;
    }
    /* L'unico segmento che cambia verso è quello della rete, in prelievo. */
    .flow-seg.reverse {
      animation-direction: reverse;
    }
    @keyframes ag-flow {
      from {
        background-position: 0 center;
      }
      to {
        background-position: 9px center;
      }
    }

    /* -- Mini-metriche (layout 1a) ------------------------------------- */
    /* Tre colonne uguali: i valori restano incolonnati anche cambiando
       larghezza. Lo sfondo è ricavato dal testo del tema, così funziona su
       chiaro e scuro con una regola sola. */
    .metrics {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      margin-top: auto;
      border-radius: 8px;
      overflow: hidden;
      background-color: color-mix(in srgb, var(--primary-text-color) 5%, transparent);
    }
    .metric {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 8px 10px;
      min-width: 0;
    }
    .metric + .metric {
      border-left: 1px solid var(--divider-color, #e0e0e0);
    }
    /* Solo le metriche con un'entità dietro sono cliccabili: senza affordance
       le altre sembrerebbero rotte. */
    .metric.interactive {
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    .metric.interactive:hover {
      background-color: color-mix(in srgb, var(--primary-text-color) 7%, transparent);
    }
    .metric.interactive:focus-visible {
      outline: 2px solid var(--ag-state-color);
      outline-offset: -2px;
    }
    .metric-label {
      display: flex;
      align-items: center;
      gap: 4px;
      font-family: var(--ag-value-font, inherit);
      font-size: 10px;
      letter-spacing: 0.1em;
      color: var(--secondary-text-color);
      min-width: 0;
    }
    .metric-label ha-icon {
      flex: 0 0 auto;
      --mdc-icon-size: 13px;
    }
    .metric-label span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .metric-value {
      font-family: var(--ag-value-font, inherit);
      font-size: 15px;
      font-weight: 600;
      color: var(--primary-text-color);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    .metric-value.charging {
      color: var(--ag-color-pv);
    }
    .metric-value.discharging {
      color: var(--ag-color-battery);
    }

    /* -- Copertura (layout 1b) ----------------------------------------- */
    .headline {
      display: flex;
      align-items: baseline;
      gap: 8px;
      flex-wrap: wrap;
    }
    .headline-value {
      font-family: var(--ag-title-font, inherit);
      font-size: calc(var(--ag-title-size, 15px) * 1.75);
      font-weight: 500;
      line-height: 1.1;
      color: var(--ag-state-color);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    .headline-label {
      font-family: var(--ag-value-font, inherit);
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .house {
      margin-left: auto;
      flex: 0 0 auto;
      font-family: var(--ag-value-font, inherit);
      font-size: 13px;
      color: var(--secondary-text-color);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    .house strong {
      color: var(--primary-text-color);
      font-weight: 600;
    }

    /* Lo sfondo del track È la quota non coperta dalle fonti: nessun quarto
       segmento da disegnare. Il border-radius sta solo qui, così un segmento
       sub-pixel non renderizza schegge arrotondate. */
    .track {
      display: flex;
      height: var(--ag-bar-height, 10px);
      border-radius: calc(var(--ag-bar-height, 10px) / 2);
      background-color: var(--divider-color, #e0e0e0);
      overflow: hidden;
    }
    /* shrink attivo (0 1 auto, non 0 0 auto): un eventuale sforo da epsilon
       float viene assorbito in proporzione invece che clippato. */
    .seg {
      height: 100%;
      flex: 0 1 auto;
      min-width: 0;
      transition:
        width 0.4s ease-out,
        background-color 0.3s ease;
    }
    .seg.pv {
      background-color: var(--ag-color-pv);
    }
    .seg.battery {
      background-color: var(--ag-color-battery);
    }
    .seg.grid {
      background-color: var(--ag-color-grid);
    }

    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 6px 16px;
      font-family: var(--ag-value-font, inherit);
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
    }
    .legend-item strong {
      color: var(--primary-text-color);
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    .swatch {
      width: 9px;
      height: 9px;
      border-radius: 2px;
      flex: 0 0 auto;
    }
    .swatch.pv {
      background-color: var(--ag-color-pv);
    }
    .swatch.battery {
      background-color: var(--ag-color-battery);
    }
    .swatch.grid {
      background-color: var(--ag-color-grid);
    }

    .extras {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding-top: 8px;
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }

    /* -- Righe generiche e degradi ------------------------------------- */
    .row {
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: var(--ag-value-font, inherit);
      font-size: 13px;
      color: var(--primary-text-color);
      min-width: 0;
    }
    .row ha-icon {
      flex: 0 0 auto;
      color: var(--secondary-text-color);
      --mdc-icon-size: 16px;
    }
    .row span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .row strong {
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }
    .muted {
      color: var(--secondary-text-color);
    }

    /* I puntini restano fermi ma il colore continua a dire dove va l'energia. */
    @media (prefers-reduced-motion: reduce) {
      .seg,
      .soc-level {
        transition: none;
      }
      .flow-seg.on {
        animation: none;
      }
    }
  `;
}

registerCustomCard({
  type: CARD_TYPE,
  name: CARD_NAME,
  description: "Verdetto sullo scambio con la rete e copertura del carico, in due layout.",
  documentationURL: "https://github.com/ToTo085/ha-ag-cards",
});

declare global {
  interface HTMLElementTagNameMap {
    "ag-energy-card": AgEnergyCard;
  }
}
