import type {
  ActionConfig,
  ActionHandlerEvent,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
  LovelaceCardEditor,
  LovelaceConfig,
} from "custom-card-helpers";

// Re-export dei tipi HA usati più di frequente, per import puliti nelle card.
export type {
  ActionConfig,
  ActionHandlerEvent,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
  LovelaceCardEditor,
  LovelaceConfig,
};

// Sottoinsieme di config che gli helper azione di HA (`handleAction`) leggono:
// l'entità su cui agire e le tre azioni per gesto. Le card che mostrano
// un'entità estendono la propria config con questi campi.
export interface AgActionableConfig {
  entity?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

// Interfaccia base che ogni card della collezione deve implementare.
export interface AgLovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: LovelaceCardConfig): void;
  getCardSize?(): number | Promise<number>;
}

// Voce del registro `window.customCards` mostrata nel selettore card di Lovelace.
export interface CustomCardEntry {
  type: string;
  name: string;
  description: string;
  preview?: boolean;
  documentationURL?: string;
}

declare global {
  interface Window {
    customCards?: CustomCardEntry[];
  }
}
