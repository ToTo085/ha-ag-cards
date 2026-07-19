import { DEFAULT_VALUE_FONT } from "../../const";
import type { ActionConfig, LovelaceCardConfig } from "../../types";

// Nome del tipo card usato in YAML: `type: custom:ag-energy-card`
export const CARD_TYPE = "ag-energy-card";
export const CARD_NAME = "AG Energy Card";
export const EDITOR_TYPE = `${CARD_TYPE}-editor`;

/**
 * "verdict"  = verdetto + striscia: parola di stato e kW di rete in evidenza,
 *              riga "Casa alimentata da", tre mini-metriche FV/Casa/Batteria.
 * "coverage" = copertura del carico: barra impilata con le quote di consumo
 *              coperte da FV, batteria e rete, più legenda.
 */
export type AgEnergyLayout = "verdict" | "coverage";

/**
 * "kw"   = sempre kW con 2 decimali ("0,03 kW"). Le potenze incolonnate
 *          restano confrontabili a colpo d'occhio.
 * "auto" = W sotto il kilowatt, kW sopra ("30 W", "6,07 kW").
 */
export type AgEnergyPowerUnit = "kw" | "auto";

export interface AgEnergyCardConfig extends LovelaceCardConfig {
  type: string;
  grid_entity?: string; // obbligatoria, validata in setConfig()
  pv_entity?: string; // obbligatoria, validata in setConfig()
  battery_entity?: string; // opzionale
  house_entity?: string; // opzionale; vuota = ricavata dal bilancio
  soc_entity?: string; // opzionale: stato di carica batteria in % (0-100)
  soc_low?: number; // % sotto cui la carica e' critica
  // Le convenzioni di segno degli inverter sono divise: vedi la nota sotto.
  invert_grid?: boolean;
  invert_battery?: boolean;
  layout?: AgEnergyLayout; // default "verdict"
  name?: string; // nome impianto
  phase?: string; // tag libero accanto al nome (es. "TRIFASE"); solo layout verdict
  deadband?: number; // W: sotto questa potenza la rete e' "in pari"
  power_unit?: AgEnergyPowerUnit; // default "kw"
  title_font?: string; // font-family CSS del nome impianto
  value_font?: string; // font-family CSS di valori ed etichette
  title_size?: number; // px, dimensione del verdetto
  bar_height?: number; // px, spessore della barra di copertura
  // Colori di STATO: uno per ciascuno dei quattro verdetti.
  color_export?: string;
  color_self?: string;
  color_buy?: string;
  color_draw?: string;
  // Colori di FONTE: segmenti della barra di copertura e pallini della legenda.
  color_pv?: string;
  color_battery?: string;
  color_grid?: string;
  // Azioni per gesto. Assenti = default HA (tap apre il more-info dell'entita').
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

// Valori numerici di default, riusati anche come fallback in render().
export const DEFAULTS = {
  // 100 W = la banda morta di 0,1 kW della specifica. E' anche il valore da
  // alzare se il verdetto sfarfalla attorno allo zero.
  deadband: 100,
  // Sotto questa carica l'indicatore passa al colore di allarme, comunque
  // stia andando la batteria: e' l'unica soglia che scavalca carica/scarica.
  soc_low: 15,
  title_size: 15,
  bar_height: 10,
} as const;

export const DEFAULT_CONFIG: Partial<AgEnergyCardConfig> = {
  name: "",
  phase: "",
  layout: "verdict",
  power_unit: "kw",
  invert_grid: false,
  invert_battery: false,
  title_font: "",
  value_font: DEFAULT_VALUE_FONT,
  ...DEFAULTS,
};

/**
 * Colori dei quattro stati.
 *
 * Sono quattro e non tre come le severita': "esporto" e "autoconsumo" sono
 * entrambi esiti positivi, ma vanno distinti a colpo d'occhio (immettere in
 * rete non e' la stessa cosa che consumare tutto in casa).
 *
 * Il secondo argomento di var() copre i temi che non definiscono la variabile.
 */
export const STATE_COLORS = {
  export: "var(--success-color, #43a047)",
  self: "var(--accent-color, #ff9800)",
  buy: "var(--warning-color, #ffa600)",
  draw: "var(--error-color, #db4437)",
} as const;

// Colori delle tre fonti che alimentano la casa.
export const SOURCE_COLORS = {
  pv: "var(--accent-color, #ff9800)",
  battery: "var(--success-color, #43a047)",
  grid: "var(--error-color, #db4437)",
} as const;

// Colore per i valori non leggibili (entita' unavailable, stato non numerico).
export const UNKNOWN_COLOR = "var(--disabled-text-color, #bdbdbd)";
