import { DEFAULT_VALUE_FONT } from "../../const";
import type { ActionConfig, LovelaceCardConfig } from "../../types";

// Nome del tipo card usato in YAML: `type: custom:ag-entity-card`
export const CARD_TYPE = "ag-entity-card";
export const CARD_NAME = "AG Entity Card";
export const EDITOR_TYPE = `${CARD_TYPE}-editor`;

// Config specifica della card. Estende LovelaceCardConfig (che porta `type`).
export interface AgEntityCardConfig extends LovelaceCardConfig {
  type: string;
  entity?: string;
  name?: string;
  icon?: string;
  value_font?: string; // font di nome e stato; default Jost
  // Azioni per gesto. Assenti = default HA (tap apre il more-info dell'entità).
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

// Valori di default applicati in setConfig().
export const DEFAULT_CONFIG: Partial<AgEntityCardConfig> = {
  name: "",
  value_font: DEFAULT_VALUE_FONT,
};
