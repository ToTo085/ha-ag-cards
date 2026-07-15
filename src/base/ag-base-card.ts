import { LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardConfig } from "../types";

/**
 * Classe base condivisa da tutte le card della collezione AG Cards.
 * Centralizza la gestione di `hass`, `config` e le convenzioni comuni.
 *
 * Ogni card concreta deve:
 *  - estendere questa classe
 *  - implementare `setConfig()` (validazione + default)
 *  - implementare `render()`
 *  - opzionalmente sovrascrivere `getCardSize()`
 */
export abstract class AgBaseCard<TConfig extends LovelaceCardConfig = LovelaceCardConfig> extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() protected _config?: TConfig;

  public abstract setConfig(config: TConfig): void;

  // Altezza indicativa della card in "unità" (1 unità ≈ 50px) usata dal layout masonry.
  public getCardSize(): number {
    return 3;
  }

  // Dimensioni nella "sections view" (griglia a 12 colonne). Override consigliato per card.
  public getGridOptions(): Record<string, number | string> {
    return { rows: 3, columns: 6, min_rows: 2 };
  }

  // Ricalcola il render solo quando cambiano hass o config rilevanti.
  protected shouldUpdate(changedProps: Map<string, unknown>): boolean {
    if (!this._config) {
      return false;
    }
    return changedProps.has("_config") || changedProps.has("hass");
  }
}
