import { DEFAULT_VALUE_FONT } from "../../const";
import type { ActionConfig, LovelaceCardConfig } from "../../types";

// Nome del tipo card usato in YAML: `type: custom:ag-load-card`
export const CARD_TYPE = "ag-load-card";
export const CARD_NAME = "AG Load Card";
export const EDITOR_TYPE = `${CARD_TYPE}-editor`;

// Soglia W di default sotto la quale un carico acceso è considerato in standby
// (acceso ma non assorbe). Editabile dall'utente.
export const DEFAULT_STANDBY_THRESHOLD = 0.5;

// Config specifica della card. Estende LovelaceCardConfig (che porta `type`).
export interface AgLoadCardConfig extends LovelaceCardConfig {
  type: string;
  entity?: string; // entità principale commutabile (switch/light/input_boolean/fan/…)
  name?: string;
  icon?: string;
  power_entity?: string; // sensore di potenza in W; assente = riga potenza omessa
  standby_threshold?: number; // W sotto cui "on" è standby; default 0.5
  value_font?: string; // font di nome e potenza; default Jost
  // Azioni per gesto sulla riga. Assenti = default HA (tap apre il more-info).
  // Il toggle a destra agisce sempre sull'entità principale, a parte da queste.
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

// Valori di default applicati in setConfig().
export const DEFAULT_CONFIG: Partial<AgLoadCardConfig> = {
  name: "",
  standby_threshold: DEFAULT_STANDBY_THRESHOLD,
  value_font: DEFAULT_VALUE_FONT,
};
