import type { LovelaceCard, LovelaceCardConfig } from "../types";

/**
 * Sottoinsieme dei card helpers ufficiali di HA (`window.loadCardHelpers`)
 * usato dalla collezione. `createCardElement` è sincrona: ritorna subito
 * l'elemento (eventualmente una hui-error-card se la config è invalida) e
 * carica il modulo della card in lazy loading da sola.
 */
export interface CardHelpers {
  createCardElement(config: LovelaceCardConfig): LovelaceCard;
}

declare global {
  interface Window {
    loadCardHelpers?: () => Promise<CardHelpers>;
  }
}

let helpersPromise: Promise<CardHelpers> | undefined;

/**
 * Carica i card helpers una volta sola e riusa la stessa promise ovunque.
 * Rigetta se `window.loadCardHelpers` non esiste (HA molto vecchi): i
 * chiamanti devono gestire il fallimento, mai bloccare il costruttore.
 */
export function getCardHelpers(): Promise<CardHelpers> {
  helpersPromise ??= window.loadCardHelpers
    ? window.loadCardHelpers()
    : Promise.reject(new Error("window.loadCardHelpers non disponibile"));
  return helpersPromise;
}
