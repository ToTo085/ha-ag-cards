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
  private _schema = [
    { name: "entity", required: true, selector: { entity: {} } },
    { name: "name", selector: { text: {} } },
    { name: "icon", selector: { icon: {} } },
  ];

  private _computeLabel = (schema: { name: string }): string => {
    const labels: Record<string, string> = {
      entity: "Entità",
      name: "Nome",
      icon: "Icona",
    };
    return labels[schema.name] ?? schema.name;
  };

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
