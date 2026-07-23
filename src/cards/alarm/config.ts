import { DEFAULT_VALUE_FONT } from "../../const";
import type { ActionConfig, LovelaceCardConfig } from "../../types";

// Nome del tipo card usato in YAML: `type: custom:ag-alarm-card`
export const CARD_TYPE = "ag-alarm-card";
export const CARD_NAME = "AG Alarm Card";
export const EDITOR_TYPE = `${CARD_TYPE}-editor`;

// Config specifica della card. Estende LovelaceCardConfig (che porta `type`).
export interface AgAlarmCardConfig extends LovelaceCardConfig {
  type: string;
  entity?: string; // pannello alarmo: alarm_control_panel.*
  name?: string;
  icon?: string;
  value_font?: string; // font di nome e stato; default Jost
  // Modalità di inserimento da mostrare, nell'ordine dato. Vuoto/assente =
  // auto dalle modalità abilitate nel pannello (supported_features).
  // Valori ammessi: home | away | night | vacation | custom.
  modes?: string[];
  // (1) Messaggi diagnostici su inserimento/blocco. Default false.
  show_messages?: boolean;
  // Bottone "Forza inserimento" nel messaggio di blocco (bypassa i sensori
  // aperti). Attivo solo con show_messages. Default true.
  force_arm?: boolean;
  // (2) Indicatore pronto/non pronto sui pulsanti di inserimento. Default false.
  show_ready_indicator?: boolean;
  // (3) Avviso quando armato con sensori esclusi (bypass). Default false.
  show_bypass_warning?: boolean;
  // Azioni per gesto sulla riga (icona/nome/stato). Assenti = default HA
  // (tap apre il more-info). I pulsanti modalità agiscono a parte.
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

// Valori di default applicati in setConfig().
export const DEFAULT_CONFIG: Partial<AgAlarmCardConfig> = {
  name: "",
  value_font: DEFAULT_VALUE_FONT,
  force_arm: true,
  show_messages: false,
  show_ready_indicator: false,
  show_bypass_warning: false,
};
