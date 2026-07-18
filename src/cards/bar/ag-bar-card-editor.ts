import { LitElement, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardEditor } from "../../types";
import { EDITOR_TYPE, type AgBarCardConfig } from "./config";

/**
 * Popup di configurazione visuale della card.
 *
 * L'entità obbligatoria resta in cima; il resto è raccolto in sezioni
 * `expandable` per non presentare quindici campi tutti insieme.
 */
@customElement(EDITOR_TYPE)
export class AgBarCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: AgBarCardConfig;

  public setConfig(config: AgBarCardConfig): void {
    this._config = config;
  }

  // Schema dei campi -> ha-form costruisce l'interfaccia da qui.
  // Le sezioni `expandable` e `grid` devono avere name "": con un nome
  // valorizzato i dati finirebbero annidati sotto quella chiave.
  private _schema = [
    { name: "entity", required: true, selector: { entity: {} } },
    {
      name: "",
      type: "grid",
      schema: [
        { name: "name", selector: { text: {} } },
        { name: "description", selector: { text: {} } },
      ],
    },
    { name: "icon", selector: { icon: {} } },
    {
      name: "",
      type: "expandable",
      title: "Valore e massimo",
      icon: "mdi:ruler",
      schema: [
        {
          name: "",
          type: "grid",
          schema: [
            {
              name: "value_format",
              selector: {
                select: {
                  mode: "dropdown",
                  options: [
                    { value: "auto", label: "Automatico" },
                    { value: "power", label: "Potenza (W / kW)" },
                  ],
                },
              },
            },
            { name: "decimals", selector: { number: { min: 0, max: 3, step: 1, mode: "box" } } },
          ],
        },
        {
          name: "max_mode",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "own", label: "Massimo della card" },
                { value: "group", label: "Massimo del gruppo" },
              ],
            },
          },
        },
        { name: "max_entity", selector: { entity: {} } },
        {
          name: "",
          type: "grid",
          schema: [
            { name: "max_value", selector: { number: { min: 0, step: "any", mode: "box" } } },
            {
              name: "max_unit",
              selector: {
                select: {
                  mode: "dropdown",
                  custom_value: true,
                  options: [
                    { value: "", label: "Come l'entità" },
                    { value: "W", label: "W" },
                    { value: "kW", label: "kW" },
                    { value: "MW", label: "MW" },
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
      title: "Soglie",
      icon: "mdi:tune",
      schema: [
        {
          name: "level_direction",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "above", label: "Alto = allarme" },
                { value: "below", label: "Basso = allarme" },
              ],
            },
          },
        },
        {
          name: "",
          type: "grid",
          schema: [
            {
              name: "level_warning",
              selector: {
                number: { min: 0, max: 100, step: 1, mode: "box", unit_of_measurement: "%" },
              },
            },
            {
              name: "level_alarm",
              selector: {
                number: { min: 0, max: 100, step: 1, mode: "box", unit_of_measurement: "%" },
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
            { name: "value_font", selector: { text: {} } },
            {
              name: "title_size",
              selector: {
                number: { min: 10, max: 32, step: 1, mode: "box", unit_of_measurement: "px" },
              },
            },
          ],
        },
        {
          name: "bar_height",
          selector: { number: { min: 2, max: 24, step: 1, mode: "box", unit_of_measurement: "px" } },
        },
        { name: "color_normal", selector: { text: {} } },
        { name: "color_warning", selector: { text: {} } },
        { name: "color_alarm", selector: { text: {} } },
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
      entity: "Entità del valore",
      name: "Nome",
      description: "Descrizione",
      icon: "Icona",
      value_format: "Formato del valore",
      decimals: "Decimali",
      max_mode: "Origine del massimo",
      max_entity: "Entità del massimo",
      max_value: "Massimo",
      max_unit: "Unità del massimo",
      level_direction: "Direzione delle soglie",
      level_warning: "Soglia warning",
      level_alarm: "Soglia allarme",
      value_font: "Font",
      title_size: "Dimensione nome",
      bar_height: "Spessore barra",
      color_normal: "Colore normale",
      color_warning: "Colore warning",
      color_alarm: "Colore allarme",
      tap_action: "Azione al tap",
      hold_action: "Azione alla pressione prolungata",
      double_tap_action: "Azione al doppio tap",
    };
    // Le sezioni expandable/grid hanno name "": ricadono sul loro `title`.
    return labels[schema.name] ?? schema.title ?? schema.name;
  };

  private _computeHelper = (schema: { name: string }): string | undefined => {
    const colorHelp = "Vuoto = colore del tema. Accetta CSS: #ff9800, red, var(--mia-var).";
    const levelHelp =
      "In percentuale del massimo. Vuota = nessuna soglia. Le soglie cambiano solo il colore della barra, non lo sfondo della card.";
    const helpers: Record<string, string> = {
      description: "Testo breve accanto al nome, in maiuscoletto (es. 19 KWP).",
      icon: "Vuota = nessuna icona. Prende il colore della barra.",
      value_format:
        "Automatico usa valore e unità dell'entità. Potenza converte tutto in W e mostra W/kW: da usare su tutte le barre di un gruppo con unità diverse.",
      decimals: "Solo per il formato automatico: le potenze si formattano da sole.",
      max_mode:
        "Massimo del gruppo: tutte le barre dello stesso contenitore si scalano sulla capacità dichiarata più alta del gruppo. Va attivato anche 'Massimo condiviso' sul contenitore.",
      max_entity:
        "Entità che fornisce il massimo (es. la potenza di picco dell'impianto). Se impostata ha la precedenza sul campo Massimo.",
      max_value:
        "Massimo fisso. Vuoto e senza entità del massimo: la barra si scala sul proprio valore, quindi resta piena.",
      max_unit:
        "Unità in cui è espresso il Massimo, con il formato Potenza. 'Come l'entità' lo interpreta nell'unità del sensore: con un sensore in W, un impianto da 19 kWp va scritto 19 + kW, altrimenti vale 19 W e la barra resta sempre piena.",
      level_direction:
        "Alto = allarme per consumi e carichi; basso = allarme per livelli e riserve (come la batteria).",
      level_warning: levelHelp,
      level_alarm: levelHelp,
      value_font:
        "Font di nome, descrizione e valore. Default 'Jost, sans-serif'; scrivi 'inherit' per usare il font del tema. Il font va caricato dal tema HA, la card non può caricarlo da sé.",
      title_size: "Dimensione del nome. I serif da display stanno meglio sui 17-18px.",
      bar_height: "Spessore della barra di progresso.",
      color_normal: colorHelp,
      color_warning: colorHelp,
      color_alarm: colorHelp,
    };
    return helpers[schema.name];
  };

  private _valueChanged(ev: CustomEvent): void {
    const config = ev.detail.value as AgBarCardConfig;
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
    "ag-bar-card-editor": AgBarCardEditor;
  }
}
