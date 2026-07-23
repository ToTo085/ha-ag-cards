import { html, css, nothing, type TemplateResult, type PropertyValues } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { fireEvent } from "custom-card-helpers";
import { AgBaseCard } from "../../base/ag-base-card";
import { registerCustomCard } from "../../utils/register-card";
import type { LovelaceCardEditor } from "../../types";
import {
  CARD_TYPE,
  CARD_NAME,
  EDITOR_TYPE,
  DEFAULT_CONFIG,
  type AgAlarmCardConfig,
} from "./config";
import {
  DISARM_MODE,
  MODE_BY_KEY,
  armModeKeys,
  activeModeKey,
  alarmVerdict,
  type ArmModeKey,
  type ModeDef,
  type ModeKey,
} from "./logic";
import "./ag-alarm-card-editor";

// Tipo di sottoscrizione websocket con cui alarmo trasmette i propri eventi.
const ALARMO_EVENT = "alarmo_updated";

// Messaggio diagnostico mostrato sotto la riga mosaico.
interface AlarmMessage {
  kind: "error" | "warning" | "info";
  text: string;
  // Se presente, il messaggio offre un bottone "Forza inserimento" per questa
  // modalità (riprova bypassando i sensori aperti).
  forceMode?: ArmModeKey;
}

// Forma (parziale) del payload che alarmo spinge sulla sottoscrizione. I nomi
// dei campi possono variare tra versioni: la card è difensiva e ricade sugli
// attributi dell'entità quando un campo manca.
interface AlarmoEventMessage {
  event?: string;
  entity_id?: string;
  area_id?: string;
  sensors?: string[];
  open_sensors?: Record<string, unknown>;
  command?: string;
}

/**
 * Card allarme per il sistema alarmo, in stile mosaico orizzontale: a sinistra
 * icona + nome + stato, a destra una barra segmentata di pulsanti (disarm +
 * modalità di inserimento abilitate), con la modalità corrente evidenziata.
 *
 * Foglia sul modello di ag-load-card: standalone è una riga con cornice; dentro
 * un contenitore flat (ag-panel-card / ag-vstack-card) la cornice sparisce.
 *
 * Tre funzioni opzionali (toggle nell'editor) riprese dalla alarmo-card:
 *  1. messaggi diagnostici su inserimento/blocco (+ bottone "Forza inserimento");
 *  2. indicatore pronto/non pronto sui pulsanti di inserimento;
 *  3. avviso quando armato con sensori esclusi (bypass).
 */
@customElement(CARD_TYPE)
export class AgAlarmCard extends AgBaseCard<AgAlarmCardConfig> {
  // Messaggio diagnostico transitorio (feature 1).
  @state() private _message?: AlarmMessage;
  // Modalità pronte all'inserimento (feature 2), da alarmo/ready_to_arm_modes.
  @state() private _readyModes?: string[];

  // Sottoscrizione websocket agli eventi alarmo (promise dell'unsubscribe).
  private _unsubMessage?: Promise<() => void>;
  // Firma di ciò a cui siamo sottoscritti, per non risottoscrivere a ogni hass.
  private _subscribedKey?: string;
  // Guardie del fetch dei ready modes: evitano di ripetere la chiamata a ogni
  // cambio di hass e di ritentare all'infinito se l'API fallisce.
  private _readyFetching = false;
  private _readyAttempted = false;
  // Ultima modalità di inserimento tentata, per il bottone "Forza inserimento".
  private _lastArmMode?: ArmModeKey;
  private _messageTimer?: number;

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement(EDITOR_TYPE) as LovelaceCardEditor;
  }

  public static getStubConfig(): AgAlarmCardConfig {
    return { type: `custom:${CARD_TYPE}`, entity: "alarm_control_panel.alarmo" };
  }

  public setConfig(config: AgAlarmCardConfig): void {
    if (!config) {
      throw new Error("Configurazione non valida");
    }
    if (!config.entity) {
      throw new Error("Specifica il pannello alarmo (campo 'entity')");
    }
    this._config = { ...DEFAULT_CONFIG, ...config };
  }

  public getGridOptions(): Record<string, number | string> {
    return { rows: 1, columns: 6, min_rows: 1 };
  }

  // Oltre a hass/config, ridisegna anche sui cambi degli stati locali (la base
  // filtra tutto il resto).
  protected shouldUpdate(changedProps: Map<string, unknown>): boolean {
    if (!this._config) {
      return false;
    }
    return (
      changedProps.has("_config") ||
      changedProps.has("hass") ||
      changedProps.has("_message") ||
      changedProps.has("_readyModes")
    );
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._updateSubscription();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._unsubscribe();
    this._clearMessageTimer();
    this._subscribedKey = undefined;
  }

  protected updated(changedProps: PropertyValues): void {
    if (changedProps.has("_config") || changedProps.has("hass")) {
      this._updateSubscription();
    }
  }

  // --- Sottoscrizione eventi + ready modes -------------------------------

  private _updateSubscription(): void {
    this._syncSubscription();
    // Fuori dalla guardia della sottoscrizione: se l'utente accende
    // l'indicatore mentre i messaggi erano già attivi la chiave non cambia,
    // ma i ready modes vanno comunque caricati.
    this._ensureReadyModes();
  }

  private _syncSubscription(): void {
    const config = this._config;
    const hass = this.hass;
    const wantsEvents = Boolean(config && (config.show_messages || config.show_ready_indicator));
    const entity = config?.entity;
    const key = wantsEvents && hass && entity ? entity : "";

    if (key === this._subscribedKey) {
      return;
    }
    this._subscribedKey = key;
    this._unsubscribe();
    // Nuovo bersaglio: i ready modes vanno rifatti da zero.
    this._readyModes = undefined;
    this._readyAttempted = false;
    this._clearMessage();

    if (!key || !hass) {
      return;
    }

    try {
      this._unsubMessage = hass.connection.subscribeMessage<AlarmoEventMessage>(
        (ev) => this._onAlarmoEvent(ev),
        { type: ALARMO_EVENT }
      );
      // Se l'API non esiste su questa versione, la promise viene rifiutata:
      // la feature degrada a no-op senza rompere il render.
      this._unsubMessage.catch(() => {
        this._unsubMessage = undefined;
      });
    } catch {
      this._unsubMessage = undefined;
    }
  }

  private _unsubscribe(): void {
    const pending = this._unsubMessage;
    this._unsubMessage = undefined;
    if (pending) {
      pending.then((unsub) => unsub()).catch(() => undefined);
    }
  }

  // Carica i ready modes solo se serve e una volta sola per bersaglio: senza le
  // guardie ripeterebbe la chiamata a ogni hass, e in caso di errore all'infinito.
  private _ensureReadyModes(): void {
    if (!this._config?.show_ready_indicator || this._readyAttempted || this._readyFetching) {
      return;
    }
    this._fetchReadyModes();
  }

  private _fetchReadyModes(): void {
    const hass = this.hass;
    const entity = this._config?.entity;
    if (!hass || !entity) {
      return;
    }
    this._readyFetching = true;
    hass
      .callWS<{ modes: string[] }>({ type: "alarmo/ready_to_arm_modes", entity_id: entity })
      .then((res) => {
        this._readyModes = Array.isArray(res?.modes) ? res.modes : [];
        this._readyFetching = false;
        this._readyAttempted = true;
      })
      .catch(() => {
        // Fallito: niente pallini (undefined) e stop ai ritentativi automatici.
        this._readyModes = undefined;
        this._readyFetching = false;
        this._readyAttempted = true;
      });
  }

  private _onAlarmoEvent = (ev: AlarmoEventMessage): void => {
    const event = ev?.event;
    if (!event) {
      return;
    }
    // Filtro leggero: se l'evento dichiara un'entità diversa dalla nostra, salta.
    if (ev.entity_id && ev.entity_id !== this._config?.entity) {
      return;
    }

    // I "ready modes" possono cambiare su parecchi eventi: rinfresca.
    if (
      this._config?.show_ready_indicator &&
      (event === "ready_to_arm_modes_changed" ||
        event === "arm" ||
        event === "disarm" ||
        event === "failed_to_arm")
    ) {
      this._fetchReadyModes();
    }

    if (!this._config?.show_messages) {
      return;
    }

    switch (event) {
      case "failed_to_arm":
        // Resta finché non si arma/disarma o si forza: è un blocco, non un flash.
        this._setMessage({
          kind: "error",
          text: this._blockedText(ev),
          forceMode: this._forceModeFor(),
        });
        break;
      case "invalid_code_provided":
        this._setMessage({ kind: "error", text: "Codice non valido" }, 5000);
        break;
      case "no_code_provided":
        this._setMessage({ kind: "error", text: "Codice richiesto" }, 5000);
        break;
      case "command_not_allowed":
        this._setMessage({ kind: "error", text: "Comando non consentito" }, 5000);
        break;
      case "trigger":
        this._setMessage({ kind: "error", text: this._triggeredText(ev) });
        break;
      case "arm":
      case "disarm":
        this._clearMessage();
        break;
    }
  };

  // Modalità per cui offrire "Forza inserimento": solo se la feature è attiva e
  // il pannello non richiede un codice (col dialog nativo non passiamo il PIN).
  private _forceModeFor(): ArmModeKey | undefined {
    if (!this._config?.force_arm) {
      return undefined;
    }
    if (this._codeRequired()) {
      return undefined;
    }
    return this._lastArmMode;
  }

  private _codeRequired(): boolean {
    const entity = this._config?.entity;
    const stateObj = entity ? this.hass?.states[entity] : undefined;
    return Boolean(stateObj?.attributes.code_format);
  }

  private _blockedText(ev: AlarmoEventMessage): string {
    const ids = this._openSensorIds(ev);
    return ids.length
      ? `Impossibile inserire: ${this._sensorNames(ids)}`
      : "Impossibile inserire: sensori aperti";
  }

  private _triggeredText(ev: AlarmoEventMessage): string {
    const ids = this._openSensorIds(ev);
    return ids.length ? `Allarme scattato: ${this._sensorNames(ids)}` : "Allarme scattato";
  }

  private _openSensorIds(ev: AlarmoEventMessage): string[] {
    if (ev.open_sensors && typeof ev.open_sensors === "object") {
      return Object.keys(ev.open_sensors);
    }
    if (Array.isArray(ev.sensors)) {
      return ev.sensors;
    }
    const entity = this._config?.entity;
    const attrOpen = entity ? this.hass?.states[entity]?.attributes.open_sensors : undefined;
    return attrOpen && typeof attrOpen === "object" ? Object.keys(attrOpen) : [];
  }

  private _sensorNames(ids: string[]): string {
    return ids
      .map((id) => this.hass?.states[id]?.attributes.friendly_name || id)
      .join(", ");
  }

  private _setMessage(message: AlarmMessage, timeoutMs?: number): void {
    this._clearMessageTimer();
    this._message = message;
    if (timeoutMs) {
      this._messageTimer = window.setTimeout(() => {
        this._message = undefined;
        this._messageTimer = undefined;
      }, timeoutMs);
    }
  }

  private _clearMessage(): void {
    this._clearMessageTimer();
    this._message = undefined;
  }

  private _clearMessageTimer(): void {
    if (this._messageTimer !== undefined) {
      clearTimeout(this._messageTimer);
      this._messageTimer = undefined;
    }
  }

  // --- Azioni sui pulsanti ------------------------------------------------

  // Attiva una modalità. Se il pannello richiede un codice, delega al dialog
  // nativo di HA (che ha il tastierino); altrimenti chiama i servizi alarmo.
  private _activate = (ev: Event, mode: ModeDef): void => {
    ev.stopPropagation();
    const hass = this.hass;
    const entity = this._config?.entity;
    if (!hass || !entity) {
      return;
    }
    if (this._codeRequired()) {
      fireEvent(this, "hass-more-info", { entityId: entity });
      return;
    }
    if (mode.key === "disarm") {
      hass.callService("alarmo", "disarm", { entity_id: entity });
      return;
    }
    this._lastArmMode = mode.serviceMode;
    hass.callService("alarmo", "arm", { entity_id: entity, mode: mode.serviceMode });
  };

  private _forceArm = (ev: Event, mode: ArmModeKey): void => {
    ev.stopPropagation();
    const hass = this.hass;
    const entity = this._config?.entity;
    if (!hass || !entity) {
      return;
    }
    hass.callService("alarmo", "arm", {
      entity_id: entity,
      mode: MODE_BY_KEY[mode].serviceMode,
      force: true,
    });
    this._clearMessage();
  };

  private _modeKeydown = (ev: KeyboardEvent, mode: ModeDef): void => {
    if (ev.key !== "Enter" && ev.key !== " ") {
      return;
    }
    // Senza preventDefault lo spazio scrollerebbe la dashboard.
    ev.preventDefault();
    this._activate(ev, mode);
  };

  private _stopGesture = (ev: Event): void => {
    ev.stopPropagation();
  };

  // --- Render -------------------------------------------------------------

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) {
      return nothing;
    }

    const config = this._config;
    const entityId = config.entity;
    const stateObj = entityId ? this.hass.states[entityId] : undefined;
    const name = config.name || stateObj?.attributes.friendly_name || entityId || "";
    const interactive = this._hasAnyAction();
    const valueFont = config.value_font?.trim();
    const vars = styleMap(valueFont ? { "--ag-value-font": valueFont } : {});

    // Entità configurata ma assente da hass.states.
    if (!stateObj) {
      return html`
        <ha-card
          class=${interactive ? "interactive" : ""}
          style=${vars}
          @action=${this._handleAction}
          .actionHandler=${this._actionHandlerDirective()}
        >
          <div class="content unavailable">
            <ha-icon
              class="icon"
              .icon=${config.icon || "mdi:shield-alert-outline"}
            ></ha-icon>
            <div class="info">
              <span class="name">${name}</span>
              <span class="state">non disponibile</span>
            </div>
          </div>
        </ha-card>
      `;
    }

    const state = stateObj.state;
    const verdict = alarmVerdict(state);
    const unavailable = verdict === "unavailable";
    const localized = this.hass.localize(
      `component.alarm_control_panel.entity_component._.state.${state}`
    );
    const stateText = localized || state;

    const active = activeModeKey(state, stateObj.attributes);
    const keys = armModeKeys(stateObj.attributes, config.modes);
    const buttons: ModeDef[] = [DISARM_MODE, ...keys.map((k) => MODE_BY_KEY[k])];

    return html`
      <ha-card
        class=${interactive ? "interactive" : ""}
        style=${vars}
        @action=${this._handleAction}
        .actionHandler=${this._actionHandlerDirective()}
      >
        <div class="content ${verdict}">
          <ha-state-icon
            class="icon"
            .hass=${this.hass}
            .stateObj=${stateObj}
            .icon=${config.icon}
          ></ha-state-icon>
          <div class="info">
            <span class="name ${unavailable ? "unavailable" : ""}">${name}</span>
            <span class="state">${stateText}</span>
          </div>
          <div
            class="modes"
            @click=${this._stopGesture}
            @mousedown=${this._stopGesture}
            @touchstart=${this._stopGesture}
            @touchend=${this._stopGesture}
          >
            ${buttons.map((mode) => this._renderModeButton(mode, active, unavailable))}
          </div>
        </div>
        ${this._renderNotice(stateObj)}
      </ha-card>
    `;
  }

  private _renderModeButton(
    mode: ModeDef,
    active: ModeKey | undefined,
    unavailable: boolean
  ): TemplateResult {
    const selected = mode.key === active;
    const label = this._modeLabel(mode);
    // Indicatore pronto/non pronto solo sui pulsanti di inserimento, e solo
    // quando la lista dei ready modes è stata caricata.
    const showReady =
      Boolean(this._config?.show_ready_indicator) && mode.key !== "disarm" && !!this._readyModes;
    const readyClass = showReady
      ? this._readyModes?.includes(mode.key)
        ? "ready"
        : "not-ready"
      : "";

    return html`
      <div
        class="mode ${selected ? "selected" : ""} ${readyClass} ${unavailable ? "disabled" : ""}"
        role="button"
        tabindex=${unavailable ? -1 : 0}
        aria-label=${label}
        aria-pressed=${selected ? "true" : "false"}
        title=${label}
        @click=${(ev: Event) => {
          if (!unavailable) this._activate(ev, mode);
        }}
        @keydown=${(ev: KeyboardEvent) => {
          if (!unavailable) this._modeKeydown(ev, mode);
        }}
      >
        <ha-icon .icon=${mode.icon}></ha-icon>
        ${readyClass ? html`<span class="ready-dot" aria-hidden="true"></span>` : nothing}
      </div>
    `;
  }

  private _modeLabel(mode: ModeDef): string {
    const localized = this.hass?.localize(
      `component.alarm_control_panel.entity_component._.state.${mode.state}`
    );
    return localized || mode.key;
  }

  private _renderNotice(stateObj: {
    state: string;
    attributes: Record<string, unknown>;
  }): TemplateResult | typeof nothing {
    // Priorità: messaggio diagnostico transitorio, poi avviso bypass persistente.
    const message = this._config?.show_messages ? this._message : undefined;
    if (message) {
      const forceMode = message.forceMode;
      return html`
        <div class="notice ${message.kind}">
          <ha-icon
            class="notice-icon"
            icon=${message.kind === "info" ? "mdi:information-outline" : "mdi:alert-outline"}
          ></ha-icon>
          <span class="notice-text">${message.text}</span>
          ${forceMode
            ? html`
                <button
                  class="force"
                  @click=${(ev: Event) => this._forceArm(ev, forceMode)}
                  @mousedown=${this._stopGesture}
                  @touchstart=${this._stopGesture}
                >
                  Forza inserimento
                </button>
              `
            : nothing}
        </div>
      `;
    }

    if (this._config?.show_bypass_warning) {
      const bypassed = stateObj.attributes.bypassed_sensors as string[] | undefined;
      if (stateObj.state.startsWith("armed_") && bypassed && bypassed.length) {
        const noun = bypassed.length === 1 ? "sensore escluso" : "sensori esclusi";
        return html`
          <div class="notice warning">
            <ha-icon class="notice-icon" icon="mdi:shield-alert-outline"></ha-icon>
            <span class="notice-text"
              >Inserito con ${bypassed.length} ${noun}: ${this._sensorNames(bypassed)}</span
            >
          </div>
        `;
      }
    }

    return nothing;
  }

  static styles = css`
    ha-card.interactive {
      cursor: pointer;
    }
    /* Serve per contenere la velatura di stato entro gli angoli arrotondati. */
    ha-card {
      overflow: hidden;
    }

    /* --ag-state-color guida il colore di icona, stato e pulsante attivo in
       base allo stato del pannello: neutro da disinserito, oro da inserito,
       giallo in transizione, rosso se scattato. */
    .content {
      position: relative;
      display: flex;
      align-items: center;
      gap: 12px;
      min-height: var(--ag-alarm-row-height, 48px);
      padding: 6px var(--ag-item-padding-x, 16px);
      box-sizing: border-box;
      --ag-state-color: var(--secondary-text-color);
    }
    .content.disarmed {
      --ag-state-color: var(--primary-text-color);
    }
    .content.armed {
      --ag-state-color: var(--accent-color, #ff9800);
    }
    .content.arming,
    .content.pending {
      --ag-state-color: var(--warning-color, #ffa600);
    }
    .content.triggered {
      --ag-state-color: var(--error-color, #db4437);
    }

    /* Velatura di stato DIPINTA (pseudo-elemento), come ag-load-card: non entra
       nel box, così l'altezza della riga non salta tra gli stati, e sopravvive
       al flat (dove il contenitore dissolve la cornice della card). */
    .content.armed::after,
    .content.arming::after,
    .content.pending::after,
    .content.triggered::after {
      content: "";
      position: absolute;
      inset: 3px 0;
      border-radius: 10px;
      background: color-mix(in srgb, var(--ag-state-color) 8%, transparent);
      z-index: 0;
    }
    .content.triggered::after {
      background: color-mix(in srgb, var(--ag-state-color) 14%, transparent);
    }
    .content > * {
      position: relative;
      z-index: 1;
    }

    .icon {
      color: var(--ag-state-color);
      --mdc-icon-size: 24px;
      flex: 0 0 auto;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1px;
      flex: 1 1 auto;
      min-width: 0;
    }
    /* line-height esplicite: senza, un tema con interlinea generosa sfonderebbe
       --ag-alarm-row-height. */
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
    .state {
      font-family: var(--ag-value-font, inherit);
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    /* Lo stato prende il colore solo quando "non è calma piatta". */
    .content.armed .state,
    .content.arming .state,
    .content.pending .state,
    .content.triggered .state {
      color: var(--ag-state-color);
      font-weight: 600;
    }
    .name.unavailable {
      color: var(--secondary-text-color);
      font-weight: 400;
    }

    /* -- Barra segmentata delle modalità -------------------------------- */
    .modes {
      flex: 0 0 auto;
      display: flex;
      align-items: stretch;
      border-radius: 10px;
      overflow: hidden;
      background-color: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
    }
    .mode {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 40px;
      padding: 6px 10px;
      box-sizing: border-box;
      cursor: pointer;
      color: var(--secondary-text-color);
      transition:
        background-color 0.2s ease,
        color 0.2s ease;
    }
    .mode + .mode {
      border-left: 1px solid var(--divider-color, #e0e0e0);
    }
    .mode ha-icon {
      --mdc-icon-size: 20px;
    }
    .mode:hover {
      background-color: color-mix(in srgb, var(--primary-text-color) 10%, transparent);
    }
    .mode:focus-visible {
      outline: 2px solid var(--accent-color, #ff9800);
      outline-offset: -2px;
    }
    /* Attivo: velatura + colore nel colore di stato corrente. Su disinserito è
       neutro (primary-text), da inserito è oro, ecc. */
    .mode.selected {
      background-color: color-mix(in srgb, var(--ag-state-color) 18%, transparent);
      color: var(--ag-state-color);
    }
    .mode.disabled {
      cursor: default;
      color: var(--disabled-text-color, #bdbdbd);
    }
    .mode.disabled:hover {
      background-color: transparent;
    }

    /* Pallino pronto/non pronto in alto a destra del pulsante. */
    .ready-dot {
      position: absolute;
      top: 4px;
      right: 4px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: var(--disabled-text-color, #bdbdbd);
    }
    .mode.ready .ready-dot {
      background-color: var(--success-color, #43a047);
    }
    .mode.not-ready .ready-dot {
      background-color: var(--error-color, #db4437);
    }

    /* -- Avviso / messaggio diagnostico --------------------------------- */
    .notice {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px var(--ag-item-padding-x, 16px);
      border-top: 1px solid var(--divider-color, #e0e0e0);
      font-family: var(--ag-value-font, inherit);
      font-size: 12px;
      line-height: 1.35;
    }
    .notice.error {
      color: var(--error-color, #db4437);
    }
    .notice.warning {
      color: var(--warning-color, #ffa600);
    }
    .notice.info {
      color: var(--secondary-text-color);
    }
    .notice-icon {
      flex: 0 0 auto;
      --mdc-icon-size: 18px;
    }
    .notice-text {
      flex: 1 1 auto;
      min-width: 0;
      color: var(--primary-text-color);
    }
    .force {
      flex: 0 0 auto;
      font-family: inherit;
      font-size: 12px;
      font-weight: 600;
      color: var(--accent-color, #ff9800);
      background: none;
      border: 1px solid var(--accent-color, #ff9800);
      border-radius: 8px;
      padding: 4px 10px;
      cursor: pointer;
    }
    .force:hover {
      background-color: color-mix(in srgb, var(--accent-color, #ff9800) 12%, transparent);
    }

    @media (prefers-reduced-motion: reduce) {
      .mode {
        transition: none;
      }
    }
  `;
}

registerCustomCard({
  type: CARD_TYPE,
  name: CARD_NAME,
  description:
    "Pannello allarme alarmo in stile mosaico: modalità di inserimento, messaggi, pronto/non pronto e avviso bypass.",
  documentationURL: "https://github.com/ToTo085/ha-ag-cards",
});

declare global {
  interface HTMLElementTagNameMap {
    "ag-alarm-card": AgAlarmCard;
  }
}
