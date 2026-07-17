import type { LovelaceCardConfig } from "../../types";

// Nome del tipo card usato in YAML: `type: custom:ag-separator-card`
export const CARD_TYPE = "ag-separator-card";
export const CARD_NAME = "AG Separator Card";

// Config della card. Estende LovelaceCardConfig (che porta `type`).
export interface AgSeparatorCardConfig extends LovelaceCardConfig {
  type: string;
  margin?: number; // spazio verticale in px sopra e sotto la linea
}

export const DEFAULTS = {
  margin: 8,
} as const;
