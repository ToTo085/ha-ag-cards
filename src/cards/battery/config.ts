import type { LovelaceCardConfig } from "../../types";

// Nome del tipo card usato in YAML: `type: custom:ag-battery-card`
export const CARD_TYPE = "ag-battery-card";
export const CARD_NAME = "AG Battery Card";
export const EDITOR_TYPE = `${CARD_TYPE}-editor`;

// Config specifica della card. Estende LovelaceCardConfig (che porta `type`).
export interface AgBatteryCardConfig extends LovelaceCardConfig {
  type: string;
  battery_entity?: string; // obbligatoria, validata in setConfig()
  power_entity?: string; // obbligatoria, validata in setConfig()
  backup_entity?: string;
  grid_entity?: string;
  name?: string;
  invert_power?: boolean;
  level_warning?: number; // %
  level_alarm?: number; // %
  idle_power?: number; // W, valore assoluto
  backup_ok_states?: string; // elenco separato da virgola; vuoto = "on"
  grid_ok_states?: string;
  title_font?: string; // font-family CSS; vuoto = font del tema HA
  title_size?: number; // px
  color_normal?: string;
  color_charging?: string;
  color_warning?: string;
  color_alarm?: string;
}

// Valori numerici di default, riusati anche come fallback in render().
export const DEFAULTS = {
  level_warning: 50,
  level_alarm: 20,
  idle_power: 50,
  title_size: 15,
} as const;

// Valori di default applicati in setConfig().
// title_font vuoto = il titolo eredita il font del tema HA. Per usare un font
// custom (es. Cormorant Garamond) il @font-face deve essere caricato a livello
// di documento — tipicamente dal tema HA: dichiararlo qui negli styles della
// card non funzionerebbe, perché nello Shadow DOM le @font-face sono ignorate.
export const DEFAULT_CONFIG: Partial<AgBatteryCardConfig> = {
  name: "",
  invert_power: false,
  title_font: "",
  ...DEFAULTS,
};

// Colori usati quando l'utente non ne configura di propri.
// Il secondo argomento di var() copre i temi che non definiscono la variabile.
export const FALLBACK_COLORS = {
  normal: "var(--accent-color, #ff9800)",
  charging: "var(--success-color, #43a047)",
  warning: "var(--warning-color, #ffa600)",
  alarm: "var(--error-color, #db4437)",
} as const;

// Colore per i valori non leggibili (entità unavailable, stato non numerico).
export const UNKNOWN_COLOR = "var(--disabled-text-color, #bdbdbd)";
