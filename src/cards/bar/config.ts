import { DEFAULT_VALUE_FONT } from "../../const";
import type { ActionConfig, LovelaceCardConfig } from "../../types";

// Nome del tipo card usato in YAML: `type: custom:ag-bar-card`
export const CARD_TYPE = "ag-bar-card";
export const CARD_NAME = "AG Bar Card";
export const EDITOR_TYPE = `${CARD_TYPE}-editor`;

/**
 * "auto"  = valore generico: formatNumber + unit_of_measurement dell'entità.
 * "power" = potenza: tutto normalizzato in W e mostrato come W/kW. Serve anche
 *           a rendere confrontabili nello stesso gruppo entità con unità
 *           diverse (un inverter in W e uno in kW).
 */
export type AgBarValueFormat = "auto" | "power";

/**
 * "own"   = la barra si scala sul massimo dichiarato dalla card.
 * "group" = si scala sul massimo del gruppo (vedi base/ag-group-max.ts).
 */
export type AgBarMaxMode = "own" | "group";

/** "above" = alto è allarme (consumi); "below" = basso è allarme (batteria). */
export type AgBarLevelDirection = "above" | "below";

export interface AgBarCardConfig extends LovelaceCardConfig {
  type: string;
  entity?: string; // obbligatoria, validata in setConfig()
  name?: string;
  description?: string; // maiuscoletto accanto al nome (es. "19 KWP")
  icon?: string; // vuoto = nessuna icona
  value_format?: AgBarValueFormat; // default "auto"
  decimals?: number; // solo per "auto"; le potenze si formattano da sole
  max_mode?: AgBarMaxMode; // default "own"
  max_entity?: string; // entità che fornisce il massimo; ha la precedenza
  max_value?: number; // massimo fisso
  max_unit?: string; // unità di max_value; vuota = unità dell'entità del valore
  level_warning?: number; // % del massimo; assente = nessuna soglia
  level_alarm?: number; // % del massimo; assente = nessuna soglia
  level_direction?: AgBarLevelDirection; // default "above"
  value_font?: string; // font-family CSS di nome, descrizione e valore
  title_size?: number; // px, dimensione del nome
  bar_height?: number; // px
  color_normal?: string;
  color_warning?: string;
  color_alarm?: string;
  // Azioni per gesto. Assenti = default HA (tap apre il more-info dell'entità).
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

// Valori numerici di default, riusati anche come fallback in render().
export const DEFAULTS = {
  decimals: 1,
  title_size: 15,
  bar_height: 6,
} as const;

/**
 * Valori di default applicati in setConfig().
 *
 * `max_value` è volutamente ASSENTE: con un default (es. 100) il ripiego sul
 * valore corrente non scatterebbe mai, e una potenza di 6420 W risulterebbe
 * fuori scala su 100. `level_warning`/`level_alarm` sono assenti per lo stesso
 * motivo: senza soglie la barra è monocolore, ed è il default voluto.
 */
export const DEFAULT_CONFIG: Partial<AgBarCardConfig> = {
  name: "",
  description: "",
  icon: "",
  value_format: "auto",
  max_mode: "own",
  max_unit: "",
  level_direction: "above",
  value_font: DEFAULT_VALUE_FONT,
  decimals: DEFAULTS.decimals,
  title_size: DEFAULTS.title_size,
  bar_height: DEFAULTS.bar_height,
};

// Colori usati quando l'utente non ne configura di propri.
// Il secondo argomento di var() copre i temi che non definiscono la variabile.
export const FALLBACK_COLORS = {
  normal: "var(--primary-color, #03a9f4)",
  warning: "var(--warning-color, #ffa600)",
  alarm: "var(--error-color, #db4437)",
} as const;

// Colore per i valori non leggibili (entità unavailable, stato non numerico).
export const UNKNOWN_COLOR = "var(--disabled-text-color, #bdbdbd)";
