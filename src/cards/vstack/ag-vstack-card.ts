import { nothing, type TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { AgContainerCard, containerStyles } from "../../base/ag-container-card";
import { registerCustomCard } from "../../utils/register-card";
import type { LovelaceCardEditor } from "../../types";
import { CARD_TYPE, CARD_NAME, EDITOR_TYPE, type AgVstackCardConfig } from "./config";
import "./ag-vstack-card-editor";

/**
 * Pila verticale di card, di default renderizzate "flat" (senza cornice).
 * Pensata per comporre il contenuto di altre card (es. ag-panel-card).
 *
 * Eccezione deliberata alla convenzione ha-card di CLAUDE.md: come le stack
 * native di HA il contenitore è invisibile — un <ha-card> qui metterebbe una
 * cornice doppia attorno ai figli e vanificherebbe il caso flat: false.
 */
@customElement(CARD_TYPE)
export class AgVstackCard extends AgContainerCard<AgVstackCardConfig> {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement(EDITOR_TYPE) as LovelaceCardEditor;
  }

  public static getStubConfig(): AgVstackCardConfig {
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
  description: "Pila verticale di card senza cornice, da comporre dentro altre card.",
  preview: false, // vuota all'aggiunta: una preview non mostrerebbe nulla
  documentationURL: "https://github.com/ToTo085/ha-ag-cards",
});

declare global {
  interface HTMLElementTagNameMap {
    "ag-vstack-card": AgVstackCard;
  }
}
