import { LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { handleAction, hasAction } from "custom-card-helpers";
import type { ActionHandlerEvent, AgActionableConfig, HomeAssistant, LovelaceCardConfig } from "../types";
import { actionHandler } from "../utils/action-handler-directive";

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
  // La firma ammette Promise perché i contenitori la calcolano dai figli (che
  // possono a loro volta rispondere in modo asincrono); HA accetta entrambe.
  public getCardSize(): number | Promise<number> {
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

  // --- Gestione delle action (tap/hold/double_tap) -----------------------
  // Riuso condiviso: le card che mostrano un'entità bindano sul loro <ha-card>
  //   @action=${this._handleAction}
  //   .actionHandler=${this._actionHandlerDirective()}
  // e aggiungono i campi azione alla propria config. Default: tap = more-info
  // (pannello nativo di dettaglio), gestito da `handleAction` quando
  // `tap_action` è assente. I contenitori ereditano ma non bindano nulla.

  // Config lette dagli helper: entità + le tre azioni. Di default coincidono
  // con `_config` (le card con `entity` in config funzionano senza override);
  // le card con nomi diversi (es. battery) la sovrascrivono.
  protected _actionConfig(): AgActionableConfig {
    return (this._config ?? {}) as AgActionableConfig;
  }

  // Directive per il <ha-card>: attiva hold/double solo se configurati.
  protected _actionHandlerDirective(): ReturnType<typeof actionHandler> {
    const config = this._actionConfig();
    return actionHandler({
      hasHold: hasAction(config.hold_action),
      hasDoubleClick: hasAction(config.double_tap_action),
    });
  }

  // C'è un'azione attiva sul tap? Serve alle card per l'affordance (cursor).
  // `tap_action` assente = default more-info, quindi la card è interattiva.
  protected _hasAnyAction(): boolean {
    const config = this._actionConfig();
    const tap = config.tap_action ?? { action: "more-info" };
    return hasAction(tap) || hasAction(config.hold_action) || hasAction(config.double_tap_action);
  }

  protected _handleAction = (ev: ActionHandlerEvent): void => {
    if (!this.hass || !this._config || !ev.detail?.action) {
      return;
    }
    handleAction(this, this.hass, this._actionConfig(), ev.detail.action);
  };
}
