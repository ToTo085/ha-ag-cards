import type { CustomCardEntry } from "../types";

/**
 * Registra un custom element (card o editor) solo se non è già definito,
 * evitando errori di "already defined" durante l'hot-reload di HA.
 */
export function defineCustomElement(tag: string, element: CustomElementConstructor): void {
  if (!customElements.get(tag)) {
    customElements.define(tag, element);
  }
}

/**
 * Aggiunge la card al registro `window.customCards` così che compaia
 * nel selettore visuale "Aggiungi card" di Lovelace.
 */
export function registerCustomCard(entry: CustomCardEntry): void {
  window.customCards = window.customCards || [];
  if (!window.customCards.find((c) => c.type === entry.type)) {
    window.customCards.push({ preview: true, ...entry });
  }
}
