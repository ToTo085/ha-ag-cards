import { html, css, nothing, type TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { AgBaseCard } from "../../base/ag-base-card";
import { registerCustomCard } from "../../utils/register-card";
import type { LovelaceCardEditor } from "../../types";
import {
  CARD_TYPE,
  CARD_NAME,
  EDITOR_TYPE,
  DEFAULT_CONFIG,
  type AgTemplateCardConfig,
} from "./config";
import "./ag-template-card-editor";

@customElement(CARD_TYPE)
export class AgTemplateCard extends AgBaseCard<AgTemplateCardConfig> {
  // Editor visuale (popup di configurazione) associato alla card.
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement(EDITOR_TYPE) as LovelaceCardEditor;
  }

  // Config di esempio proposta quando l'utente aggiunge la card dalla UI.
  public static getStubConfig(): AgTemplateCardConfig {
    return { type: `custom:${CARD_TYPE}`, name: "Template" };
  }

  public setConfig(config: AgTemplateCardConfig): void {
    if (!config) {
      throw new Error("Configurazione non valida");
    }
    this._config = { ...DEFAULT_CONFIG, ...config };
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) {
      return nothing;
    }

    const stateObj = this._config.entity ? this.hass.states[this._config.entity] : undefined;
    const name = this._config.name || stateObj?.attributes.friendly_name || "";
    const interactive = this._hasAnyAction();

    return html`
      <ha-card
        class=${interactive ? "interactive" : ""}
        @action=${this._handleAction}
        .actionHandler=${this._actionHandlerDirective()}
      >
        <div class="content">
          <span class="name">${name}</span>
          ${stateObj ? html`<span class="state">${stateObj.state}</span>` : nothing}
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    ha-card.interactive {
      cursor: pointer;
    }
    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
    }
    .name {
      font-weight: 500;
    }
    .state {
      color: var(--primary-color);
    }
  `;
}

registerCustomCard({
  type: CARD_TYPE,
  name: CARD_NAME,
  description: "Card template di riferimento per la collezione AG Cards.",
  documentationURL: "https://github.com/ToTo085/ha-ag-cards",
});

declare global {
  interface HTMLElementTagNameMap {
    "ag-template-card": AgTemplateCard;
  }
}
