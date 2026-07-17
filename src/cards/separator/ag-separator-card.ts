import { html, css, nothing, type TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { AgBaseCard } from "../../base/ag-base-card";
import { registerCustomCard } from "../../utils/register-card";
import { CARD_TYPE, CARD_NAME, DEFAULTS, type AgSeparatorCardConfig } from "./config";

/**
 * Sottile linea divisoria da inserire tra card, dentro i contenitori AG o
 * nelle stack native. Essendo una card vera compare nel picker e si può
 * aggiungere dall'editor annidato come qualsiasi altra.
 *
 * Niente <ha-card> (stessa eccezione documentata in ag-vstack-card): la
 * linea deve restare un filo, non una card con cornice.
 *
 * Editor: config a un solo campo, quindi si usa `getConfigForm()` (la strada
 * "form integrato" di CLAUDE.md) invece di un elemento editor dedicato.
 */
@customElement(CARD_TYPE)
export class AgSeparatorCard extends AgBaseCard<AgSeparatorCardConfig> {
  public static getConfigForm(): object {
    return {
      schema: [
        {
          name: "margin",
          selector: {
            number: { min: 0, max: 48, step: 1, mode: "box", unit_of_measurement: "px" },
          },
        },
      ],
      computeLabel: (schema: { name: string }): string =>
        schema.name === "margin" ? "Margine verticale" : schema.name,
    };
  }

  public static getStubConfig(): AgSeparatorCardConfig {
    return { type: `custom:${CARD_TYPE}` };
  }

  public setConfig(config: AgSeparatorCardConfig): void {
    if (!config) {
      throw new Error("Configurazione non valida");
    }
    this._config = { ...config };
  }

  public getCardSize(): number {
    return 1;
  }

  public getGridOptions(): Record<string, number | string> {
    return { columns: "full", rows: "auto" };
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config) {
      return nothing;
    }
    const margin = this._config.margin ?? DEFAULTS.margin;
    return html`
      <div class="line" role="separator" style=${styleMap({ "--ag-sep-margin": `${margin}px` })}></div>
    `;
  }

  static styles = css`
    .line {
      border-top: 1px solid var(--divider-color, #e0e0e0);
      margin: var(--ag-sep-margin, 8px) 0;
    }
  `;
}

registerCustomCard({
  type: CARD_TYPE,
  name: CARD_NAME,
  description: "Sottile linea divisoria da usare tra card.",
  documentationURL: "https://github.com/ToTo085/ha-ag-cards",
});

declare global {
  interface HTMLElementTagNameMap {
    "ag-separator-card": AgSeparatorCard;
  }
}
