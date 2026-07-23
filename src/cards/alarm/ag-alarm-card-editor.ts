import { LitElement, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardEditor } from "../../types";
import { EDITOR_TYPE, type AgAlarmCardConfig } from "./config";

/**
 * Popup di configurazione visuale della alarm card.
 *
 * Usa `ha-form` con schema dichiarativo: HA genera i controlli (entità, testo,
 * icone, boolean, select). Ad ogni modifica emette `config-changed`.
 */
@customElement(EDITOR_TYPE)
export class AgAlarmCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: AgAlarmCardConfig;

  public setConfig(config: AgAlarmCardConfig): void {
    this._config = config;
  }

  // Schema dei campi -> ha-form costruisce l'interfaccia da qui.
  private _schema = [
    { name: "entity", required: true, selector: { entity: { domain: "alarm_control_panel" } } },
    { name: "name", selector: { text: {} } },
    { name: "icon", selector: { icon: {} } },
    { name: "value_font", selector: { text: {} } },
    {
      name: "",
      type: "expandable",
      title: "Modalità (avanzate)",
      icon: "mdi:shield-check",
      schema: [
        {
          name: "modes",
          selector: {
            select: {
              multiple: true,
              mode: "list",
              options: [
                { value: "home", label: "Casa" },
                { value: "away", label: "Fuori" },
                { value: "night", label: "Notte" },
                { value: "vacation", label: "Vacanza" },
                { value: "custom", label: "Personalizzata" },
              ],
            },
          },
        },
      ],
    },
    {
      name: "",
      type: "expandable",
      title: "Funzioni alarmo",
      icon: "mdi:tune",
      schema: [
        { name: "show_messages", selector: { boolean: {} } },
        { name: "force_arm", selector: { boolean: {} } },
        { name: "show_ready_indicator", selector: { boolean: {} } },
        { name: "show_bypass_warning", selector: { boolean: {} } },
      ],
    },
    {
      name: "",
      type: "expandable",
      title: "Azioni",
      icon: "mdi:gesture-tap",
      schema: [
        { name: "tap_action", selector: { ui_action: { default_action: "more-info" } } },
        { name: "hold_action", selector: { ui_action: {} } },
        { name: "double_tap_action", selector: { ui_action: {} } },
      ],
    },
  ];

  private _computeLabel = (schema: { name: string; title?: string }): string => {
    const labels: Record<string, string> = {
      entity: "Pannello alarmo",
      name: "Nome",
      icon: "Icona",
      value_font: "Font",
      modes: "Modalità mostrate",
      show_messages: "Messaggi diagnostici",
      force_arm: "Bottone «Forza inserimento»",
      show_ready_indicator: "Indicatore pronto/non pronto",
      show_bypass_warning: "Avviso sensori esclusi",
      tap_action: "Azione al tap",
      hold_action: "Azione alla pressione prolungata",
      double_tap_action: "Azione al doppio tap",
    };
    // Le sezioni expandable hanno name "": ricadono sul loro `title`.
    return labels[schema.name] ?? schema.title ?? schema.name;
  };

  private _computeHelper = (schema: { name: string }): string | undefined => {
    switch (schema.name) {
      case "modes":
        return "Quali modalità di inserimento mostrare, nell'ordine scelto. Vuoto = tutte quelle abilitate nel pannello.";
      case "show_messages":
        return "Mostra un messaggio quando l'allarme viene inserito o non può essere inserito (es. sensori aperti).";
      case "force_arm":
        return "Nel messaggio di inserimento bloccato aggiunge un bottone per forzare l'inserimento bypassando i sensori aperti. Solo con i messaggi attivi e senza codice richiesto.";
      case "show_ready_indicator":
        return "Un pallino sui pulsanti di inserimento indica se quella modalità è pronta (verde) o meno (rosso).";
      case "show_bypass_warning":
        return "Mostra un avviso quando l'allarme è inserito con dei sensori esclusi (bypass).";
      default:
        return undefined;
    }
  };

  private _valueChanged(ev: CustomEvent): void {
    const config = ev.detail.value as AgAlarmCardConfig;
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
    "ag-alarm-card-editor": AgAlarmCardEditor;
  }
}
