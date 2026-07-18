import { LitElement, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardEditor } from "../../types";
import { EDITOR_TYPE, type AgBatteryCardConfig } from "./config";

/**
 * Popup di configurazione visuale della card.
 *
 * I due campi obbligatori restano in cima; il resto è raccolto in sezioni
 * `expandable` per non presentare quindici campi tutti insieme.
 */
@customElement(EDITOR_TYPE)
export class AgBatteryCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: AgBatteryCardConfig;

  public setConfig(config: AgBatteryCardConfig): void {
    this._config = config;
  }

  // Schema dei campi -> ha-form costruisce l'interfaccia da qui.
  // Le sezioni `expandable` e `grid` devono avere name "": con un nome
  // valorizzato i dati finirebbero annidati sotto quella chiave.
  private _schema = [
    { name: "battery_entity", required: true, selector: { entity: {} } },
    { name: "power_entity", required: true, selector: { entity: {} } },
    { name: "name", selector: { text: {} } },
    {
      name: "",
      type: "expandable",
      title: "Rete e backup",
      icon: "mdi:transmission-tower",
      schema: [
        { name: "backup_entity", selector: { entity: {} } },
        { name: "backup_ok_states", selector: { text: {} } },
        { name: "grid_entity", selector: { entity: {} } },
        { name: "grid_ok_states", selector: { text: {} } },
      ],
    },
    {
      name: "",
      type: "expandable",
      title: "Soglie",
      icon: "mdi:tune",
      schema: [
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
        {
          name: "idle_power",
          selector: { number: { min: 0, step: 5, mode: "box", unit_of_measurement: "W" } },
        },
        { name: "invert_power", selector: { boolean: {} } },
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
            {
              name: "title_size",
              selector: { number: { min: 10, max: 32, step: 1, mode: "box", unit_of_measurement: "px" } },
            },
          ],
        },
        { name: "value_font", selector: { text: {} } },
        { name: "color_normal", selector: { text: {} } },
        { name: "color_charging", selector: { text: {} } },
        { name: "color_warning", selector: { text: {} } },
        { name: "color_alarm", selector: { text: {} } },
      ],
    },
    {
      name: "",
      type: "expandable",
      title: "Azioni",
      icon: "mdi:gesture-tap",
      // Selettore `ui_action` fornito da HA a runtime (non tipizzato nel
      // pacchetto). Le azioni agiscono sull'entità carica batteria.
      schema: [
        { name: "tap_action", selector: { ui_action: { default_action: "more-info" } } },
        { name: "hold_action", selector: { ui_action: {} } },
        { name: "double_tap_action", selector: { ui_action: {} } },
      ],
    },
  ];

  private _computeLabel = (schema: { name: string; title?: string }): string => {
    const labels: Record<string, string> = {
      battery_entity: "Entità carica (%)",
      power_entity: "Entità potenza",
      name: "Nome",
      backup_entity: "Entità gateway backup",
      backup_ok_states: "Stati backup considerati OK",
      grid_entity: "Entità rete",
      grid_ok_states: "Stati rete considerati OK",
      level_warning: "Soglia warning",
      level_alarm: "Soglia allarme",
      idle_power: "Soglia potenza in attesa",
      invert_power: "Inverti segno potenza",
      title_font: "Font del titolo",
      title_size: "Dimensione titolo",
      value_font: "Font di percentuale e righe",
      color_normal: "Colore normale",
      color_charging: "Colore in carica",
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
    const statesHelp = "Elenco separato da virgola. Vuoto = convenzione HA: 'on' = OK.";
    const helpers: Record<string, string> = {
      power_entity: "Positiva in carica, negativa in scarica (usa l'inversione se è al contrario).",
      backup_ok_states: statesHelp,
      grid_ok_states: statesHelp,
      idle_power: "Sotto questo valore assoluto la batteria è considerata 'in attesa'.",
      invert_power: "Da attivare se la potenza è negativa durante la carica.",
      title_font:
        "Vuoto = font del tema. Es: 'Cormorant Garamond', serif — il font va caricato dal tema HA, la card non può caricarlo da sé.",
      title_size: "Dimensione del titolo. I serif da display stanno meglio sui 17-18px.",
      value_font:
        "Font della percentuale e delle righe di stato. Default 'Jost, sans-serif'; scrivi 'inherit' per usare il font del tema.",
      color_normal: colorHelp,
      color_charging: colorHelp,
      color_warning: colorHelp,
      color_alarm: colorHelp,
    };
    return helpers[schema.name];
  };

  private _valueChanged(ev: CustomEvent): void {
    const config = ev.detail.value as AgBatteryCardConfig;
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
    "ag-battery-card-editor": AgBatteryCardEditor;
  }
}
