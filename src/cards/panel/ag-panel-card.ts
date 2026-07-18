import { html, css, nothing, type TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { formatNumber } from "custom-card-helpers";
import { AgContainerCard, containerStyles } from "../../base/ag-container-card";
import { registerCustomCard } from "../../utils/register-card";
import { DEFAULT_VALUE_FONT } from "../../const";
import { parseNumericState } from "../../utils/states";
import { formatPower } from "../../utils/power";
import type { LovelaceCardEditor } from "../../types";
import { CARD_TYPE, CARD_NAME, EDITOR_TYPE, DEFAULTS, type AgPanelCardConfig } from "./config";
import { sumSamples } from "./logic";
import "./ag-panel-card-editor";

/**
 * Pannello contenitore: header con titolo a sinistra (font personalizzabile
 * come la battery card), testo libero e/o valore a destra (stato di una
 * entità o somma di più), sottotitolo opzionale; sotto, una colonna di card
 * figlie di default renderizzate "flat" (senza cornice).
 */
@customElement(CARD_TYPE)
export class AgPanelCard extends AgContainerCard<AgPanelCardConfig> {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement(EDITOR_TYPE) as LovelaceCardEditor;
  }

  public static getStubConfig(): AgPanelCardConfig {
    return { type: `custom:${CARD_TYPE}`, title: "Pannello", cards: [] };
  }


  public getCardSize(): number | Promise<number> {
    // +1 per l'header rispetto alla somma dei figli calcolata dalla base.
    const children = super.getCardSize();
    return typeof children === "number" ? children + 1 : children.then((size) => size + 1);
  }

  // Valore di riepilogo a destra: stato di un'entità o somma di più; "–" se illeggibile.
  private _summaryValue(): string | undefined {
    const config = this._config;
    const hass = this.hass;
    if (!config?.summary_entities || !hass) {
      return undefined;
    }
    // In YAML è comodo poter scrivere una singola entità senza lista.
    const ids = Array.isArray(config.summary_entities)
      ? config.summary_entities
      : [config.summary_entities];
    if (ids.length === 0) {
      return undefined;
    }
    const samples = ids.map((id) => {
      const stateObj = hass.states[id];
      return {
        value: parseNumericState(stateObj?.state),
        unit: stateObj?.attributes.unit_of_measurement as string | undefined,
      };
    });
    const sum = sumSamples(samples, config.summary_unit);
    if (!sum) {
      return "–";
    }
    if (sum.kind === "power") {
      // formatPower lavora in valore assoluto: il segno va ripristinato.
      return `${sum.watts < 0 ? "-" : ""}${formatPower(sum.watts, hass.locale)}`;
    }
    const digits = config.summary_decimals ?? DEFAULTS.summary_decimals;
    const num = formatNumber(sum.total, hass.locale, { maximumFractionDigits: digits });
    return sum.unit ? `${num} ${sum.unit}` : num;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) {
      return nothing;
    }
    const config = this._config;
    const summaryValue = this._summaryValue();
    const hasSummary = Boolean(config.summary_label || summaryValue);
    const hasHeader = Boolean(config.title || config.subtitle || hasSummary);

    const titleFont = config.title_font?.trim();
    // I contenitori non hanno un DEFAULT_CONFIG: il default va applicato qui.
    const valueFont = (config.value_font ?? DEFAULT_VALUE_FONT).trim();
    const summaryColor = config.summary_color?.trim();
    const vars = styleMap({
      "--ag-title-size": `${config.title_size ?? DEFAULTS.title_size}px`,
      "--ag-subtitle-align": config.subtitle_align ?? "left",
      // Impostate solo se configurate: senza la property il var() del CSS
      // ricade sul default (font del tema per il titolo, accent per il valore).
      ...(titleFont ? { "--ag-title-font": titleFont } : {}),
      ...(valueFont ? { "--ag-value-font": valueFont } : {}),
      ...(summaryColor ? { "--ag-value-color": summaryColor } : {}),
    });

    return html`
      <ha-card style=${vars}>
        ${hasHeader
          ? html`
              <div class="header">
                <div class="header-row">
                  <div class="title" title=${config.title || ""}>${config.title || ""}</div>
                  ${hasSummary
                    ? html`
                        <div class="summary">
                          ${config.summary_label
                            ? html`<span class="summary-label">${config.summary_label}</span>`
                            : nothing}
                          ${summaryValue
                            ? html`<span class="summary-value">${summaryValue}</span>`
                            : nothing}
                        </div>
                      `
                    : nothing}
                </div>
                ${config.subtitle ? html`<div class="subtitle">${config.subtitle}</div>` : nothing}
              </div>
            `
          : nothing}
        ${this.renderChildren()}
      </ha-card>
    `;
  }

  static styles = [
    containerStyles,
    css`
      /* Lo spazio interno non sta sulla ha-card ma, separatamente, su header e
         contenitore dei figli: così un padding a 0 porta il contenuto a filo
         bordo senza schiacciare anche il titolo. */
      ha-card {
        height: 100%;
        box-sizing: border-box;
        padding: 0;
      }

      /* 12/16 come prima; i 10px in basso sostituiscono il vecchio margin. */
      .header {
        padding: 12px 16px 10px;
      }

      /* Default equivalente al vecchio padding della ha-card. Con il padding a
         0 in config i figli arrivano al bordo, header escluso. */
      .children {
        padding: var(--ag-children-padding, 0 16px 12px);
      }

      /* Le card AG figlie hanno un proprio spazio orizzontale: dentro il panel
         va azzerato, altrimenti si somma a questo e le righe risultano
         rientrate rispetto al titolo (il separator, che non ne ha, arriva
         invece a filo: era l'incoerenza da togliere). */
      .children > .child {
        --ag-item-padding-x: 0;
      }
      .header-row {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 12px;
      }
      /* Un font custom va caricato a livello di documento (dal tema HA): qui
         si può solo usarlo. Senza --ag-title-font si eredita il font del tema. */
      .title {
        font-family: var(--ag-title-font, inherit);
        font-size: var(--ag-title-size, 15px);
        font-weight: 500;
        color: var(--primary-text-color);
        flex: 1 1 auto;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .summary {
        display: flex;
        align-items: baseline;
        gap: 8px;
        flex: 0 0 auto;
      }
      .summary-label {
        font-family: var(--ag-value-font, inherit);
        font-size: 11px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--secondary-text-color);
      }
      .summary-value {
        font-family: var(--ag-value-font, inherit);
        font-size: 15px;
        font-weight: 600;
        color: var(--ag-value-color, var(--accent-color));
        font-variant-numeric: tabular-nums;
      }
      .subtitle {
        font-family: var(--ag-value-font, inherit);
        margin-top: 2px;
        font-size: 12px;
        color: var(--secondary-text-color);
        text-align: var(--ag-subtitle-align, left);
      }
    `,
  ];
}

registerCustomCard({
  type: CARD_TYPE,
  name: CARD_NAME,
  description:
    "Pannello con intestazione (titolo, sottotitolo, valore o somma a destra) e card figlie impilate.",
  preview: false, // lo stub ha solo il titolo: la preview non mostrerebbe nulla di utile
  documentationURL: "https://github.com/ToTo085/ha-ag-cards",
});

declare global {
  interface HTMLElementTagNameMap {
    "ag-panel-card": AgPanelCard;
  }
}
