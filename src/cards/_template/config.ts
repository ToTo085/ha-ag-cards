import type { ActionConfig, LovelaceCardConfig } from "../../types";

// Nome del tipo card usato in YAML: `type: custom:ag-template-card`
export const CARD_TYPE = "ag-template-card";
export const CARD_NAME = "AG Template Card";
export const EDITOR_TYPE = `${CARD_TYPE}-editor`;

// Config specifica della card. Estende LovelaceCardConfig (che porta `type`).
export interface AgTemplateCardConfig extends LovelaceCardConfig {
  type: string;
  entity?: string;
  name?: string;
  icon?: string;
  // Azioni per gesto. Assenti = default HA (tap apre il more-info dell'entità).
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

// Valori di default applicati in setConfig().
export const DEFAULT_CONFIG: Partial<AgTemplateCardConfig> = {
  name: "",
};
