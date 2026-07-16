import type { LovelaceCardConfig } from "../../types";

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
}

// Valori di default applicati in setConfig().
export const DEFAULT_CONFIG: Partial<AgEntityCardConfig> = {
  name: "",
};
