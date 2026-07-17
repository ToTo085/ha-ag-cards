import { nothing, type TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { AgContainerCard, containerStyles } from "../../base/ag-container-card";
import { registerCustomCard } from "../../utils/register-card";
import type { LovelaceCardEditor } from "../../types";
import { CARD_TYPE, CARD_NAME, EDITOR_TYPE, type AgHstackCardConfig } from "./config";
import "./ag-hstack-card-editor";

/**
 * Fila orizzontale di card a larghezze uguali, di default "flat".
 * Stessa eccezione ha-card documentata in ag-vstack-card.
 */
@customElement(CARD_TYPE)
export class AgHstackCard extends AgContainerCard<AgHstackCardConfig> {
  protected direction: "column" | "row" = "row";

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement(EDITOR_TYPE) as LovelaceCardEditor;
  }

  public static getStubConfig(): AgHstackCardConfig {
    return { type: `custom:${CARD_TYPE}`, cards: [] };
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) {
      return nothing;
    }
    return this.renderChildren();
  }

  static styles = [containerStyles];
}

registerCustomCard({
  type: CARD_TYPE,
  name: CARD_NAME,
  description: "Fila orizzontale di card a larghezza uguale, senza cornice.",
  preview: false, // vuota all'aggiunta: una preview non mostrerebbe nulla
  documentationURL: "https://github.com/ToTo085/ha-ag-cards",
});

declare global {
  interface HTMLElementTagNameMap {
    "ag-hstack-card": AgHstackCard;
  }
}
