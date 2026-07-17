import { LitElement, html, css, nothing, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { getLovelace } from "custom-card-helpers";
import type {
  HomeAssistant,
  LovelaceCardConfig,
  LovelaceCardEditor,
  LovelaceConfig,
} from "../types";
import type { AgContainerCardConfig } from "../base/ag-container-card";
import "./ag-cards-editor-list";

/**
 * Base astratta degli editor dei contenitori: un `ha-form` con lo schema
 * dichiarato dalla sottoclasse, seguito dalla sezione "Card contenute"
 * (`<ag-cards-editor-list>`) per l'editing annidato dei figli.
 */
export abstract class AgContainerCardEditor<TConfig extends AgContainerCardConfig>
  extends LitElement
  implements LovelaceCardEditor
{
  @property({ attribute: false }) public hass?: HomeAssistant;

  // hui-element-editor assegna `lovelace` a un editor custom solo se la
  // property esiste già sull'elemento: va dichiarata anche se opzionale.
  @property({ attribute: false }) public lovelace?: LovelaceConfig;

  @state() protected _config?: TConfig;

  protected abstract readonly _schema: readonly object[];

  protected abstract _computeLabel: (schema: { name: string; title?: string }) => string;

  protected _computeHelper?: (schema: { name: string }) => string | undefined;

  public setConfig(config: TConfig): void {
    this._config = config;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    if (this.lovelace === undefined) {
      // Fallback quando HA non passa la config della dashboard: getLovelace()
      // naviga il DOM del pannello e può legittimamente non trovare nulla
      // (il picker funziona comunque, perde solo i suggerimenti contestuali).
      try {
        this.lovelace = (getLovelace() as { config?: LovelaceConfig } | null)?.config;
      } catch {
        this.lovelace = undefined;
      }
    }
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) {
      return nothing;
    }
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${{ ...this._config, flat: this._config.flat ?? true }}
        .schema=${this._schema}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <div class="cards-heading">Card contenute</div>
      <ag-cards-editor-list
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .cards=${this._config.cards ?? []}
        @cards-changed=${this._cardsChanged}
      ></ag-cards-editor-list>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this._config) {
      return;
    }
    const value = ev.detail.value as Partial<TConfig>;
    // ha-form riemette l'intero data object (cards incluso), ma i figli si
    // ribadiscono comunque per non dipendere da quel dettaglio interno.
    this._emit({ ...this._config, ...value, cards: this._config.cards ?? [] } as TConfig);
  }

  private _cardsChanged(ev: CustomEvent<{ cards: LovelaceCardConfig[] }>): void {
    ev.stopPropagation();
    if (!this._config) {
      return;
    }
    this._emit({ ...this._config, cards: ev.detail.cards } as TConfig);
  }

  private _emit(config: TConfig): void {
    // Stato locale aggiornato subito, senza aspettare il setConfig di ritorno
    // dal dialog: due modifiche ravvicinate non devono perdersi a vicenda.
    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true })
    );
  }

  static styles = css`
    .cards-heading {
      margin: 16px 0 8px;
      font-weight: 500;
      color: var(--primary-text-color);
    }
  `;
}
