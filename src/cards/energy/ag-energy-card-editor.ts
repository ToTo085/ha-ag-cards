import { LitElement, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardEditor } from "../../types";
import { EDITOR_TYPE, type AgEnergyCardConfig } from "./config";

/**
 * Popup di configurazione visuale della card.
 *
 * Layout, nome e tag di fase restano in cima; entità, lettura, aspetto e azioni
 * stanno in sezioni `expandable` per non presentare venti campi tutti insieme.
 */
@customElement(EDITOR_TYPE)
export class AgEnergyCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: AgEnergyCardConfig;

  public setConfig(config: AgEnergyCardConfig): void {
    this._config = config;
  }

  // Schema dei campi -> ha-form costruisce l'interfaccia da qui.
  // Le sezioni `expandable` e `grid` devono avere name "": con un nome
  // valorizzato i dati finirebbero annidati sotto quella chiave.
  private _schema = [
    {
      name: "layout",
      selector: {
        select: {
          mode: "dropdown",
          options: [
            { value: "verdict", label: "Verdetto + striscia" },
            { value: "coverage", label: "Copertura del carico" },
          ],
        },
      },
    },
    {
      name: "",
      type: "grid",
      schema: [
        { name: "name", selector: { text: {} } },
        { name: "phase", selector: { text: {} } },
      ],
    },
    {
      name: "",
      type: "expandable",
      title: "Entità",
      icon: "mdi:transmission-tower",
      // Nessun filtro per device_class: gli impianti FV girano spesso su
      // template sensor scritti a mano, che il device_class non ce l'hanno, e
      // il filtro li renderebbe invisibili senza spiegazione.
      schema: [
        { name: "grid_entity", required: true, selector: { entity: {} } },
        { name: "pv_entity", required: true, selector: { entity: {} } },
        { name: "battery_entity", selector: { entity: {} } },
        { name: "house_entity", selector: { entity: {} } },
        {
          name: "",
          type: "grid",
          schema: [
            { name: "invert_grid", selector: { boolean: {} } },
            { name: "invert_battery", selector: { boolean: {} } },
          ],
        },
      ],
    },
    {
      name: "",
      type: "expandable",
      title: "Lettura",
      icon: "mdi:tune",
      schema: [
        {
          name: "",
          type: "grid",
          schema: [
            {
              name: "deadband",
              selector: {
                number: { min: 0, max: 2000, step: 10, mode: "box", unit_of_measurement: "W" },
              },
            },
            {
              name: "power_unit",
              selector: {
                select: {
                  mode: "dropdown",
                  options: [
                    { value: "kw", label: "Sempre kW" },
                    { value: "auto", label: "Automatico (W / kW)" },
                  ],
                },
              },
            },
          ],
        },
      ],
    },
    {
      name: "",
      type: "expandable",
      title: "Aspetto",
      icon: "mdi:palette",
      schema: [
        {
          name: "",
          type: "grid",
          schema: [
            { name: "title_font", selector: { text: {} } },
            { name: "value_font", selector: { text: {} } },
          ],
        },
        {
          name: "",
          type: "grid",
          schema: [
            {
              name: "title_size",
              selector: {
                number: { min: 10, max: 32, step: 1, mode: "box", unit_of_measurement: "px" },
              },
            },
            {
              name: "bar_height",
              selector: {
                number: { min: 2, max: 32, step: 1, mode: "box", unit_of_measurement: "px" },
              },
            },
          ],
        },
        { name: "color_export", selector: { text: {} } },
        { name: "color_self", selector: { text: {} } },
        { name: "color_buy", selector: { text: {} } },
        { name: "color_draw", selector: { text: {} } },
        { name: "color_pv", selector: { text: {} } },
        { name: "color_battery", selector: { text: {} } },
        { name: "color_grid", selector: { text: {} } },
      ],
    },
    {
      name: "",
      type: "expandable",
      title: "Azioni",
      icon: "mdi:gesture-tap",
      // Selettore `ui_action` fornito da HA a runtime (non tipizzato nel pacchetto).
      schema: [
        { name: "tap_action", selector: { ui_action: { default_action: "more-info" } } },
        { name: "hold_action", selector: { ui_action: {} } },
        { name: "double_tap_action", selector: { ui_action: {} } },
      ],
    },
  ];

  private _computeLabel = (schema: { name: string; title?: string }): string => {
    const labels: Record<string, string> = {
      layout: "Layout",
      name: "Nome impianto",
      phase: "Tag di fase",
      grid_entity: "Potenza rete",
      pv_entity: "Potenza fotovoltaico",
      battery_entity: "Potenza batteria",
      house_entity: "Potenza casa",
      invert_grid: "Inverti segno rete",
      invert_battery: "Inverti segno batteria",
      deadband: "Zona morta",
      power_unit: "Unità delle potenze",
      title_font: "Font del titolo",
      value_font: "Font dei valori",
      title_size: "Dimensione verdetto",
      bar_height: "Spessore barra",
      color_export: "Colore Esporto",
      color_self: "Colore Autoconsumo",
      color_buy: "Colore Acquisto",
      color_draw: "Colore Prelievo",
      color_pv: "Colore FV",
      color_battery: "Colore batteria",
      color_grid: "Colore rete",
      tap_action: "Azione al tap",
      hold_action: "Azione alla pressione prolungata",
      double_tap_action: "Azione al doppio tap",
    };
    // Le sezioni expandable/grid hanno name "": ricadono sul loro `title`.
    return labels[schema.name] ?? schema.title ?? schema.name;
  };

  private _computeHelper = (schema: { name: string }): string | undefined => {
    const colorHelp = "Vuoto = colore del tema. Accetta CSS: #ff9800, red, var(--mia-var).";
    const helpers: Record<string, string> = {
      layout:
        "Verdetto: parola di stato e kW di rete in evidenza, con le metriche FV / Casa / Batteria. Copertura: barra con le quote di consumo coperte da FV, batteria e rete.",
      phase: "Testo libero accanto al nome, in maiuscoletto (es. TRIFASE). Solo nel layout Verdetto.",
      grid_entity:
        "Potenza scambiata con la rete. La card si aspetta positivo = prelievo, negativo = immissione.",
      pv_entity: "Potenza prodotta dal fotovoltaico. I valori negativi vengono letti come zero.",
      battery_entity:
        "Facoltativa. La card si aspetta positivo = scarica (la batteria eroga), negativo = carica.",
      house_entity:
        "Facoltativa: vuota = ricavata come FV + Batteria + Rete. Serve un sensore diretto solo se il bilancio non torna.",
      invert_grid:
        "Attiva se il tuo inverter usa la convenzione opposta (positivo = immissione). Un segno sbagliato non dà errore: mostra un verdetto ribaltato.",
      invert_battery: "Attiva se il tuo inverter riporta positivo = carica.",
      deadband:
        "Sotto questa potenza la rete è considerata in pari (Autoconsumo). Alzala se il verdetto sfarfalla attorno allo zero. Vale anche, dimezzata, come soglia per elencare una fonte in 'Casa alimentata da'.",
      power_unit:
        "Sempre kW mantiene i valori incolonnati e confrontabili (un carico da 30 W si legge 0,03 kW). Automatico passa a W sotto il kilowatt.",
      title_font:
        "Font del nome impianto e del verdetto. Vuoto = font del tema. Il font va caricato dal tema HA, la card non può caricarlo da sé.",
      value_font: "Font di valori ed etichette. Default 'Jost, sans-serif'; 'inherit' usa il tema.",
      title_size: "Scala il verdetto e il numero di rete. I serif da display stanno meglio sui 17-18px.",
      bar_height: "Spessore della barra di copertura. Solo nel layout Copertura.",
      color_export: colorHelp,
      color_self: colorHelp,
      color_buy: colorHelp,
      color_draw: colorHelp,
      color_pv: colorHelp,
      color_battery: colorHelp,
      color_grid: colorHelp,
    };
    return helpers[schema.name];
  };

  private _valueChanged(ev: CustomEvent): void {
    const config = ev.detail.value as AgEnergyCardConfig;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) {
      return nothing;
    }
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ag-energy-card-editor": AgEnergyCardEditor;
  }
}
