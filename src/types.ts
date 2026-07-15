import type { HomeAssistant, LovelaceCardConfig, LovelaceCardEditor } from "custom-card-helpers";

// Re-export dei tipi HA usati più di frequente, per import puliti nelle card.
export type { HomeAssistant, LovelaceCardConfig, LovelaceCardEditor };

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
