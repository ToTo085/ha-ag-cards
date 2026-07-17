import { html, css, nothing, type TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { AgBaseCard } from "../../base/ag-base-card";
import { registerCustomCard } from "../../utils/register-card";
import type { HomeAssistant, LovelaceCardEditor } from "../../types";
import {
  CARD_TYPE,
  CARD_NAME,
  EDITOR_TYPE,
  DEFAULT_CONFIG,
  DEFAULTS,
  FALLBACK_COLORS,
  UNKNOWN_COLOR,
  type AgBatteryCardConfig,
} from "./config";
import {
  levelSeverity,
  powerFlow,
  okStates,
  binaryStatus,
  systemStatus,
  type Severity,
} from "./logic";
import { parseNumericState } from "../../utils/states";
import { toWatts, formatPower } from "../../utils/power";
import { ringGauge } from "./gauge";
import "./ag-battery-card-editor";

const FLOW_ICON = {
  charging: "mdi:flash",
  discharging: "mdi:flash-outline",
  idle: "mdi:pause-circle-outline",
} as const;

/**
 * Stato di una batteria domestica: gauge ad anello con la carica, riga del
 * flusso di potenza (carica/scarica/attesa) e riga di stato rete + backup.
 *
 * Il colore del gauge dipende dalla percentuale (soglie configurabili); la
 * tinta della card dipende dallo stato del sistema. Sono due assi distinti:
 * una batteria scarica ma con rete e backup a posto non tinge la card.
 *
 * NB: la base card ha uno shouldUpdate() che ammette solo `_config` e `hass`.
 * Aggiungendo qui uno @state() proprio, andrebbe sovrascritto.
 */
@customElement(CARD_TYPE)
export class AgBatteryCard extends AgBaseCard<AgBatteryCardConfig> {
  // Editor visuale (popup di configurazione) associato alla card.
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement(EDITOR_TYPE) as LovelaceCardEditor;
  }

  // Config di esempio proposta quando l'utente aggiunge la card dalla UI.
  // Pesca le prime entità con la device_class adatta, così la preview nel
  // picker mostra già dati veri.
  public static getStubConfig(hass?: HomeAssistant): AgBatteryCardConfig {
    const byClass = (dc: string): string =>
      (hass &&
        Object.keys(hass.states).find(
          (id) => id.startsWith("sensor.") && hass.states[id].attributes.device_class === dc
        )) ||
      "";
    return {
      type: `custom:${CARD_TYPE}`,
      battery_entity: byClass("battery"),
      power_entity: byClass("power"),
    };
  }

  public setConfig(config: AgBatteryCardConfig): void {
    if (!config) {
      throw new Error("Configurazione non valida");
    }
    if (!config.battery_entity) {
      throw new Error("Specifica l'entità della carica batteria (campo 'battery_entity')");
    }
    if (!config.power_entity) {
      throw new Error("Specifica l'entità della potenza batteria (campo 'power_entity')");
    }
    // ha-form emette `undefined` sui campi svuotati: uno spread diretto
    // sovrascriverebbe i default con undefined, quindi vanno scartati prima.
    const provided = Object.fromEntries(
      Object.entries(config).filter(([, value]) => value !== undefined)
    );
    this._config = { ...DEFAULT_CONFIG, ...provided } as AgBatteryCardConfig;
  }

  public getCardSize(): number {
    return 2;
  }

  public getGridOptions(): Record<string, number | string> {
    return { rows: 2, columns: 6, min_rows: 2, min_columns: 3 };
  }

  // Colore configurato dall'utente, altrimenti quello del tema.
  private _color(kind: Severity | "charging"): string {
    const config = this._config;
    const custom =
      kind === "charging"
        ? config?.color_charging
        : kind === "warning"
          ? config?.color_warning
          : kind === "alarm"
            ? config?.color_alarm
            : config?.color_normal;
    return custom?.trim() || FALLBACK_COLORS[kind];
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) {
      return nothing;
    }

    const config = this._config;
    const batteryObj = config.battery_entity ? this.hass.states[config.battery_entity] : undefined;
    const powerObj = config.power_entity ? this.hass.states[config.power_entity] : undefined;
    const name =
      config.name || batteryObj?.attributes.friendly_name || config.battery_entity || "Batteria";

    // Entità obbligatorie configurate ma non presenti in hass.states.
    if (!batteryObj || !powerObj) {
      return html`
        <ha-card>
          <div class="content">
            <div class="info">
              <div class="title">${name}</div>
              <div class="row muted">
                <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
                <span>Entità non disponibile</span>
              </div>
            </div>
          </div>
        </ha-card>
      `;
    }

    // -- Carica --
    const level = parseNumericState(batteryObj.state);
    const levelKnown = level !== undefined;
    const levelClamped = levelKnown ? Math.min(100, Math.max(0, level)) : 0;

    const warning = config.level_warning ?? DEFAULTS.level_warning;
    const alarm = config.level_alarm ?? DEFAULTS.level_alarm;
    const gaugeSeverity: Severity = levelKnown
      ? levelSeverity(levelClamped, warning, alarm)
      : "normal";
    const gaugeColor = levelKnown ? this._color(gaugeSeverity) : UNKNOWN_COLOR;

    // -- Potenza --
    const rawPower = parseNumericState(powerObj.state);
    const normalized =
      rawPower === undefined
        ? undefined
        : toWatts(rawPower, powerObj.attributes.unit_of_measurement);
    const watts =
      normalized === undefined ? undefined : config.invert_power ? -normalized : normalized;

    const idle = Math.abs(config.idle_power ?? DEFAULTS.idle_power);
    const flow = watts === undefined ? undefined : powerFlow(watts, idle);

    // In scarica la potenza esce dalla batteria: prende il colore della carica
    // residua, così il "quanto ne resta" resta leggibile anche sulla riga.
    const flowColor =
      flow === "charging"
        ? this._color("charging")
        : flow === "discharging"
          ? gaugeColor
          : flow === "idle"
            ? this._color("normal")
            : UNKNOWN_COLOR;

    const flowIcon = flow ? FLOW_ICON[flow] : "mdi:help-circle-outline";
    const flowText =
      watts === undefined || flow === undefined
        ? "Potenza non disponibile"
        : flow === "idle"
          ? "In attesa"
          : `${flow === "charging" ? "In carica" : "In scarica"} · ${formatPower(watts, this.hass.locale)}`;

    // -- Sistema --
    const backup = config.backup_entity
      ? binaryStatus(this.hass.states[config.backup_entity]?.state, okStates(config.backup_ok_states))
      : undefined;
    const grid = config.grid_entity
      ? binaryStatus(this.hass.states[config.grid_entity]?.state, okStates(config.grid_ok_states))
      : undefined;
    const system = systemStatus(backup, grid);
    const cardSeverity: Severity = system?.severity ?? "normal";

    const titleFont = config.title_font?.trim();
    const vars = styleMap({
      "--ag-gauge-color": gaugeColor,
      "--ag-flow-color": flowColor,
      "--ag-tint": this._color(cardSeverity),
      "--ag-title-size": `${config.title_size ?? DEFAULTS.title_size}px`,
      // Impostata solo se configurata: senza la property il var() del CSS
      // ricade su `inherit`, cioè il font del tema HA.
      ...(titleFont ? { "--ag-title-font": titleFont } : {}),
    });

    return html`
      <ha-card class=${cardSeverity} style=${vars}>
        <div class="content">
          <div
            class="gauge"
            role="meter"
            aria-label="Carica batteria"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow=${levelKnown ? Math.round(levelClamped) : nothing}
            aria-valuetext=${levelKnown ? `${Math.round(levelClamped)}%` : "non disponibile"}
          >
            <svg viewBox="0 0 100 100" aria-hidden="true">
              ${ringGauge(levelKnown ? levelClamped : undefined)}
            </svg>
            <div class="gauge-label" aria-hidden="true">
              <span class="gauge-value"
                >${levelKnown
                  ? html`${Math.round(levelClamped)}<span class="pct">%</span>`
                  : "–"}</span
              >
            </div>
          </div>

          <div class="info">
            <div class="title" title=${name}>${name}</div>
            <div class="row flow">
              <ha-icon .icon=${flowIcon}></ha-icon>
              <span>${flowText}</span>
            </div>
            ${system
              ? html`
                  <div class="row system">
                    <ha-icon .icon=${system.icon}></ha-icon>
                    <span>${system.message}</span>
                  </div>
                `
              : nothing}
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    ha-card {
      height: 100%;
      box-sizing: border-box;
    }

    /* La tinta passa dalle custom property che ha-card già consuma, invece di
       sovrascriverne background e bordo: non dipende dai suoi interni.
       Il mix è calcolato su --card-background-color (una variabile diversa da
       quella che stiamo assegnando: referenziare --ha-card-background qui
       creerebbe un ciclo e la regola verrebbe scartata in silenzio).
       Mescolando contro lo sfondo effettivo del tema si ottiene bordeaux su
       tema scuro e rosa tenue su tema chiaro con una regola sola. */
    ha-card.warning,
    ha-card.alarm {
      --ha-card-background: color-mix(in srgb, var(--ag-tint) 12%, var(--card-background-color, #fff));
      --ha-card-border-color: color-mix(in srgb, var(--ag-tint) 45%, var(--card-background-color, #fff));
      /* Molti temi azzerano il bordo: in warning/allarme va riacceso. */
      --ha-card-border-width: 1px;
    }
    ha-card.warning .system,
    ha-card.alarm .system {
      color: var(--ag-tint);
      font-weight: 500;
    }
    ha-card.warning .title,
    ha-card.alarm .title {
      color: color-mix(in srgb, var(--ag-tint) 55%, var(--primary-text-color));
    }

    .content {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px 16px;
      box-sizing: border-box;
      height: 100%;
    }

    .gauge {
      position: relative;
      width: 76px;
      height: 76px;
      flex: 0 0 auto;
    }
    .gauge svg {
      display: block;
      width: 100%;
      height: 100%;
      overflow: visible;
    }
    .ring-track,
    .ring-value {
      fill: none;
      stroke-width: 8;
    }
    .ring-track {
      stroke: var(--divider-color, #e0e0e0);
      opacity: 0.4;
    }
    .ring-value {
      stroke: var(--ag-gauge-color);
      stroke-linecap: round;
      transition:
        stroke-dashoffset 0.4s ease-out,
        stroke 0.3s ease;
    }
    .gauge-label {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
    }
    /* Numero e "%" stanno in un unico flex item: dentro sono contenuto inline,
       quindi le baseline si allineano da sole e align-items: center può
       centrare il blocco nell'anello. Come due item separati, invece,
       verrebbero centrati singolarmente e le baseline non combacerebbero. */
    .gauge-value {
      font-size: 20px;
      font-weight: 600;
      color: var(--primary-text-color);
      white-space: nowrap;
    }
    .gauge-value .pct {
      font-size: 11px;
      font-weight: 500;
      color: var(--secondary-text-color);
      margin-left: 1px;
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 2px;
      min-width: 0; /* senza questo l'ellipsis nei figli flex non scatta */
      flex: 1 1 auto;
    }
    /* Un font custom va caricato a livello di documento (dal tema HA): qui si
       può solo usarlo. Senza --ag-title-font si eredita il font del tema. */
    .title {
      font-family: var(--ag-title-font, inherit);
      font-weight: 500;
      font-size: var(--ag-title-size, 15px);
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .row {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      min-width: 0;
    }
    .row span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .row ha-icon {
      --mdc-icon-size: 16px;
      flex: 0 0 auto;
    }
    .flow {
      color: var(--ag-flow-color);
      font-weight: 500;
    }
    .system {
      color: var(--secondary-text-color);
    }
    .muted {
      color: var(--secondary-text-color);
    }

    @media (prefers-reduced-motion: reduce) {
      .ring-value {
        transition: none;
      }
    }
  `;
}

registerCustomCard({
  type: CARD_TYPE,
  name: CARD_NAME,
  description: "Stato di una batteria domestica: carica, potenza, rete e backup.",
  documentationURL: "https://github.com/ToTo085/ha-ag-cards",
});

declare global {
  interface HTMLElementTagNameMap {
    "ag-battery-card": AgBatteryCard;
  }
}
