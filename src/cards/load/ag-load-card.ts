import { html, css, nothing, type TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { AgBaseCard } from "../../base/ag-base-card";
import { registerCustomCard } from "../../utils/register-card";
import { parseNumericState } from "../../utils/states";
import { toWatts } from "../../utils/power";
import type { LovelaceCardEditor } from "../../types";
import {
  CARD_TYPE,
  CARD_NAME,
  EDITOR_TYPE,
  DEFAULT_CONFIG,
  DEFAULT_STANDBY_THRESHOLD,
  type AgLoadCardConfig,
} from "./config";
import { loadVerdict, isGoldIcon, loadPowerText } from "./logic";
import "./ag-load-card-editor";

/**
 * Card "comando carico": una riga con icona, nome, interruttore a destra e, se
 * è associato un sensore di potenza, una riga con i watt che distingue *acceso e
 * assorbe* (accento oro) da *solo acceso* (standby).
 *
 * È una foglia sul modello di ag-entity-card: standalone è una riga isolata con
 * cornice; dentro un contenitore flat (ag-panel-card / ag-vstack-card) la
 * cornice sparisce e diventa una riga di lista. Non disegna alcun contenitore di
 * gruppo: bordi/raggi e intestazione sono delegati al contenitore.
 */
@customElement(CARD_TYPE)
export class AgLoadCard extends AgBaseCard<AgLoadCardConfig> {
  // Editor visuale (popup di configurazione) associato alla card.
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement(EDITOR_TYPE) as LovelaceCardEditor;
  }

  // Config di esempio proposta quando l'utente aggiunge la card dalla UI.
  public static getStubConfig(): AgLoadCardConfig {
    return { type: `custom:${CARD_TYPE}`, entity: "switch.decorative_lights" };
  }

  public setConfig(config: AgLoadCardConfig): void {
    if (!config) {
      throw new Error("Configurazione non valida");
    }
    if (!config.entity) {
      throw new Error("Specifica un'entità da comandare (campo 'entity')");
    }
    this._config = { ...DEFAULT_CONFIG, ...config };
  }

  public getGridOptions(): Record<string, number | string> {
    return { rows: 1, columns: 6, min_rows: 1 };
  }

  // Il toggle agisce sull'entità principale. stopPropagation così il tap
  // sull'interruttore non fa scattare anche l'azione della riga (more-info).
  private _toggle = (ev: Event): void => {
    ev.stopPropagation();
    const entityId = this._config?.entity;
    if (!this.hass || !entityId) {
      return;
    }
    this.hass.callService("homeassistant", "toggle", { entity_id: entityId });
  };

  // Isola i gesti sull'interruttore dall'action handler della <ha-card>: senza,
  // il mousedown/touchstart/click salirebbe fino alla riga.
  private _stop = (ev: Event): void => {
    ev.stopPropagation();
  };

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) {
      return nothing;
    }

    const config = this._config;
    const entityId = config.entity;
    const stateObj = entityId ? this.hass.states[entityId] : undefined;
    const name = config.name || stateObj?.attributes.friendly_name || entityId || "";
    const interactive = this._hasAnyAction();
    // Impostata solo se configurata: senza la property il var() del CSS ricade
    // su `inherit`, cioè il font del tema HA.
    const valueFont = config.value_font?.trim();
    const vars = styleMap(valueFont ? { "--ag-value-font": valueFont } : {});

    const unavailable =
      !stateObj || stateObj.state === "unavailable" || stateObj.state === "unknown";
    const isOn = stateObj?.state === "on";

    const hasPower = Boolean(config.power_entity);
    const powerObj = config.power_entity ? this.hass.states[config.power_entity] : undefined;
    // Potenza in W, undefined se il sensore è assente/non numerico o non disponibile.
    let watts: number | undefined;
    if (powerObj && powerObj.state !== "unavailable" && powerObj.state !== "unknown") {
      const value = parseNumericState(powerObj.state);
      watts =
        value === undefined
          ? undefined
          : toWatts(value, powerObj.attributes.unit_of_measurement as string | undefined);
    }

    const threshold = config.standby_threshold ?? DEFAULT_STANDBY_THRESHOLD;
    const verdict = loadVerdict({ unavailable, isOn, hasPower, watts, threshold });
    const goldIcon = isGoldIcon(verdict);
    const absorbing = verdict === "absorbing";

    const icon = stateObj
      ? html`
          <ha-state-icon
            class="icon ${goldIcon ? "gold" : ""} ${unavailable ? "unavailable" : ""}"
            .hass=${this.hass}
            .stateObj=${stateObj}
            .icon=${config.icon}
          ></ha-state-icon>
        `
      : html`
          <ha-icon
            class="icon unavailable"
            .icon=${config.icon || "mdi:power-plug-outline"}
          ></ha-icon>
        `;

    return html`
      <ha-card
        class=${interactive ? "interactive" : ""}
        style=${vars}
        @action=${this._handleAction}
        .actionHandler=${this._actionHandlerDirective()}
      >
        <div class="content ${absorbing ? "absorbing" : ""}">
          ${icon}
          <div class="info">
            <span class="name ${unavailable ? "unavailable" : ""}">${name}</span>
            ${hasPower
              ? html`
                  <span
                    class="power ${absorbing ? "absorbing" : ""} ${unavailable
                      ? "unavailable"
                      : ""}"
                    >${loadPowerText(watts, verdict, this.hass.locale)}</span
                  >
                `
              : nothing}
          </div>
          <div
            class="toggle"
            @click=${this._stop}
            @mousedown=${this._stop}
            @touchstart=${this._stop}
            @touchend=${this._stop}
          >
            <ha-switch
              .checked=${isOn}
              .disabled=${unavailable}
              @change=${this._toggle}
            ></ha-switch>
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    ha-card.interactive {
      cursor: pointer;
    }
    /* Rete di sicurezza per i temi con raggio più generoso del chip: senza,
       la velatura sborderebbe squadrata dagli angoli arrotondati. */
    ha-card {
      overflow: hidden;
    }
    /* Come ag-entity-card: il contenitore che ha uno spazio proprio azzera
       --ag-item-padding-x, così le righe si allineano al titolo.
       L'altezza è FISSA e non dedotta dal testo: così una riga con la potenza e
       una senza sono alte uguali e le liste restano regolari. */
    .content {
      position: relative;
      display: flex;
      align-items: center;
      gap: 12px;
      min-height: var(--ag-load-row-height, 48px);
      padding: 6px var(--ag-item-padding-x, 16px);
      box-sizing: border-box;
    }
    /* Stato "assorbe": velatura oro + filetto verticale a sinistra, entrambi
       DIPINTI (pseudo-elementi) e non parte del box. Un chip con margini propri
       cambierebbe l'altezza della riga tra spento e assorbe, facendola saltare.
       Stanno su .content e non su ha-card così sopravvivono al flat, dove il
       contenitore dissolve la cornice della card. */
    .content.absorbing::after {
      content: "";
      position: absolute;
      inset: 3px 0; /* rientro verticale -> 6px di stacco tra righe adiacenti */
      border-radius: 10px;
      background: color-mix(in srgb, var(--accent-color, #ff9800) 8%, transparent);
      z-index: 0;
    }
    /* Filetto a pill: non arrivando ai bordi non combacia con quello della riga
       successiva e non sborda sugli angoli della card. */
    .content.absorbing::before {
      content: "";
      position: absolute;
      left: 0;
      top: 9px;
      bottom: 9px;
      width: 3px;
      border-radius: 3px;
      background: var(--accent-color, #ff9800);
      z-index: 1;
    }
    /* Gli pseudo-elementi sono posizionati: senza questo coprirebbero il
       contenuto statico invece di stargli dietro. */
    .content > * {
      position: relative;
      z-index: 1;
    }
    /* Neutro = attenuato (spento/standby), come nei mockup: --primary-color
       renderebbe l'icona di un carico spento brillante quanto una accesa. */
    .icon {
      color: var(--secondary-text-color);
      --mdc-icon-size: 24px;
      flex: 0 0 auto;
    }
    /* Acceso senza sensore, oppure acceso e assorbe: icona in oro. */
    .icon.gold {
      color: var(--accent-color, #ff9800);
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1px;
      flex: 1 1 auto;
      min-width: 0;
    }
    /* Le line-height esplicite non sono cosmetiche: senza, un tema con
       interlinea generosa sfonderebbe --ag-load-row-height e l'altezza della
       riga tornerebbe a dipendere dalla presenza della potenza.
       Conto: 18 + 1 + 15 = 34px di testo, +12px di padding = 46px < 48px. */
    .name {
      font-family: var(--ag-value-font, inherit);
      font-size: 15px;
      line-height: 1.2;
      font-weight: 600;
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .power {
      font-family: var(--ag-value-font, inherit);
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
      font-variant-numeric: tabular-nums;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    /* Numero potenza in oro solo quando assorbe. */
    .power.absorbing {
      color: var(--accent-color, #ff9800);
      font-weight: 600;
    }
    .unavailable {
      color: var(--secondary-text-color);
      font-weight: 400;
    }
    .toggle {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
    }
    /* Interruttore acceso in oro.
       ATTENZIONE, dipende dalla versione di HA: ha-switch è stato migrato da
       MWC a webawesome e con esso TUTTA la famiglia di variabili. Nelle versioni
       recenti le --switch-checked-* non esistono più e il track ricade sul
       proprio default var(--ha-color-fill-primary-normal-resting), cioè il blu
       del brand: è il motivo per cui impostarle non sortiva alcun effetto, né
       qui né dal tema. Si impostano quindi entrambe le famiglie, perché la card
       è distribuita e non può sapere su quale versione gira.
       Il pomello resta al suo default (--ha-color-on-primary-normal): è pensato
       per contrastare su un track pieno, come nei mockup. */
    ha-switch {
      /* HA recenti (webawesome) */
      --ha-switch-checked-background-color: var(--accent-color, #ff9800);
      --ha-switch-checked-background-color-hover: var(--accent-color, #ff9800);
      --ha-switch-checked-border-color: var(--accent-color, #ff9800);
      /* HA precedenti (MWC) */
      --switch-checked-color: var(--accent-color, #ff9800);
      --switch-checked-button-color: var(--accent-color, #ff9800);
      --switch-checked-track-color: var(--accent-color, #ff9800);
    }
  `;
}

registerCustomCard({
  type: CARD_TYPE,
  name: CARD_NAME,
  description:
    "Comanda on/off un carico e, con un sensore di potenza, distingue se assorbe o è acceso a vuoto.",
  documentationURL: "https://github.com/ToTo085/ha-ag-cards",
});

declare global {
  interface HTMLElementTagNameMap {
    "ag-load-card": AgLoadCard;
  }
}
