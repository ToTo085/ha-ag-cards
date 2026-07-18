import { html, css, nothing, type TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { AgBaseCard } from "../../base/ag-base-card";
import { registerCustomCard } from "../../utils/register-card";
import type { LovelaceCardEditor } from "../../types";
import {
  CARD_TYPE,
  CARD_NAME,
  EDITOR_TYPE,
  DEFAULT_CONFIG,
  type AgEntityCardConfig,
} from "./config";
import "./ag-entity-card-editor";

/**
 * Card di esempio: visualizza una singola entità (icona, nome e stato).
 *
 * Serve sia come demo per verificare il funzionamento del bundle, sia come
 * riferimento pratico di una card completa (config + editor + gestione stati).
 */
@customElement(CARD_TYPE)
export class AgEntityCard extends AgBaseCard<AgEntityCardConfig> {
  // Editor visuale (popup di configurazione) associato alla card.
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement(EDITOR_TYPE) as LovelaceCardEditor;
  }

  // Config di esempio proposta quando l'utente aggiunge la card dalla UI.
  public static getStubConfig(): AgEntityCardConfig {
    return { type: `custom:${CARD_TYPE}`, entity: "sun.sun" };
  }

  public setConfig(config: AgEntityCardConfig): void {
    if (!config) {
      throw new Error("Configurazione non valida");
    }
    if (!config.entity) {
      throw new Error("Specifica un'entità da visualizzare (campo 'entity')");
    }
    this._config = { ...DEFAULT_CONFIG, ...config };
  }

  public getGridOptions(): Record<string, number | string> {
    return { rows: 1, columns: 6, min_rows: 1 };
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) {
      return nothing;
    }

    const entityId = this._config.entity;
    const stateObj = entityId ? this.hass.states[entityId] : undefined;
    const name =
      this._config.name || stateObj?.attributes.friendly_name || entityId || "";
    const interactive = this._hasAnyAction();
    // Impostata solo se configurata: senza la property il var() del CSS ricade
    // su `inherit`, cioè il font del tema HA.
    const valueFont = this._config.value_font?.trim();
    const vars = styleMap(valueFont ? { "--ag-value-font": valueFont } : {});

    // Entità configurata ma non presente in hass.states.
    if (!stateObj) {
      return html`
        <ha-card
          class=${interactive ? "interactive" : ""}
          style=${vars}
          @action=${this._handleAction}
          .actionHandler=${this._actionHandlerDirective()}
        >
          <div class="content">
            <ha-icon class="icon unavailable" .icon=${this._config.icon || "mdi:alert-circle-outline"}></ha-icon>
            <span class="name">${name}</span>
            <span class="state unavailable">non disponibile</span>
          </div>
        </ha-card>
      `;
    }

    const icon = this._config.icon || stateObj.attributes.icon;
    const unit = stateObj.attributes.unit_of_measurement;
    const isUnavailable =
      stateObj.state === "unavailable" || stateObj.state === "unknown";
    // Stato localizzato quando possibile, con fallback allo stato grezzo + unità.
    const localizedState = this.hass.localize(
      `component.${stateObj.entity_id.split(".")[0]}.entity_component._.state.${stateObj.state}`
    );
    const stateText =
      localizedState || `${stateObj.state}${unit ? ` ${unit}` : ""}`;

    return html`
      <ha-card
        class=${interactive ? "interactive" : ""}
        style=${vars}
        @action=${this._handleAction}
        .actionHandler=${this._actionHandlerDirective()}
      >
        <div class="content">
          <ha-state-icon
            class="icon"
            .hass=${this.hass}
            .stateObj=${stateObj}
            .icon=${icon}
          ></ha-state-icon>
          <span class="name">${name}</span>
          <span class="state ${isUnavailable ? "unavailable" : ""}">${stateText}</span>
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    ha-card.interactive {
      cursor: pointer;
    }
    /* Vedi ag-bar-card: il contenitore che ha uno spazio proprio azzera
       --ag-item-padding-x, così le righe si allineano al titolo. */
    .content {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px var(--ag-item-padding-x, 16px);
    }
    .icon {
      color: var(--state-icon-color, var(--primary-color));
      flex: 0 0 auto;
    }
    .name {
      font-family: var(--ag-value-font, inherit);
      font-weight: 600;
      color: var(--primary-text-color);
      flex: 1 1 auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .state {
      font-family: var(--ag-value-font, inherit);
      color: var(--primary-color);
      font-weight: 500;
      flex: 0 0 auto;
    }
    .unavailable {
      color: var(--secondary-text-color);
      font-weight: 400;
    }
  `;
}

registerCustomCard({
  type: CARD_TYPE,
  name: CARD_NAME,
  description: "Mostra icona, nome e stato di una singola entità.",
  documentationURL: "https://github.com/ToTo085/ha-ag-cards",
});

declare global {
  interface HTMLElementTagNameMap {
    "ag-entity-card": AgEntityCard;
  }
}
