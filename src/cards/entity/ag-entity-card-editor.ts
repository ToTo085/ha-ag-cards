import { LitElement, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardEditor } from "../../types";
import { EDITOR_TYPE, type AgEntityCardConfig } from "./config";

/**
 * Popup di configurazione visuale della card.
 *
 * Usa `ha-form` (fornito da Home Assistant) con uno schema dichiarativo:
 * HA genera automaticamente i controlli (selettori entità, testo, icone...).
 * Ad ogni modifica emette l'evento `config-changed` che Lovelace intercetta
 * per aggiornare la preview e salvare la configurazione.
 */
@customElement(EDITOR_TYPE)
export class AgEntityCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: AgEntityCardConfig;

  public setConfig(config: AgEntityCardConfig): void {
    this._config = config;
  }

  // Schema dei campi -> ha-form costruisce l'interfaccia da qui.
  // La sezione "Azioni" usa il selettore `ui_action` fornito da HA a runtime
  // (non tipizzato nel pacchetto, come gli altri ha-selector-*).
  private _schema = [
    { name: "entity", required: true, selector: { entity: {} } },
    { name: "name", selector: { text: {} } },
    { name: "icon", selector: { icon: {} } },
    { name: "value_font", selector: { text: {} } },
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
      entity: "Entità",
      name: "Nome",
      icon: "Icona",
      value_font: "Font",
      tap_action: "Azione al tap",
      hold_action: "Azione alla pressione prolungata",
      double_tap_action: "Azione al doppio tap",
    };
    // La sezione expandable ha name "": ricade sul suo `title`.
    return labels[schema.name] ?? schema.title ?? schema.name;
  };

  private _computeHelper = (schema: { name: string }): string | undefined =>
    schema.name === "value_font"
      ? "Font di nome e stato. Default 'Jost, sans-serif'; scrivi 'inherit' per usare il font del tema. Il font va caricato dal tema HA, la card non può caricarlo da sé."
      : undefined;

  private _valueChanged(ev: CustomEvent): void {
    const config = ev.detail.value as AgEntityCardConfig;
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
    "ag-entity-card-editor": AgEntityCardEditor;
  }
}
