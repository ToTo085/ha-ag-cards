import type { AgContainerCardConfig } from "../../base/ag-container-card";

// Nome del tipo card usato in YAML: `type: custom:ag-panel-card`
export const CARD_TYPE = "ag-panel-card";
export const CARD_NAME = "AG Panel Card";
export const EDITOR_TYPE = `${CARD_TYPE}-editor`;

// Config del pannello. Eredita `flat` e `cards` dai contenitori.
export interface AgPanelCardConfig extends AgContainerCardConfig {
  title?: string;
  subtitle?: string;
  subtitle_align?: "left" | "center" | "right"; // default left
  summary_label?: string; // didascalia libera nell'angolo destro dell'header
  summary_entities?: string[] | string; // 1..N entità: valore singolo o somma
  summary_unit?: string; // unità forzata -> disattiva il percorso "potenza"
  summary_decimals?: number; // decimali della somma semplice
  summary_color?: string; // colore CSS del valore; vuoto = var(--accent-color)
  title_font?: string; // font-family CSS; vuoto = font del tema HA
  title_size?: number; // px
}

// Valori numerici di default, usati come fallback in render().
export const DEFAULTS = {
  title_size: 15,
  summary_decimals: 1,
} as const;
