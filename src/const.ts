// Versione della collezione. Aggiornata ad ogni release.
export const AG_CARDS_VERSION = "0.6.0";

// Prefisso comune per tutti i custom element della collezione.
// Ogni card sarà registrata come `ag-<nome>-card`.
export const CARD_PREFIX = "ag";

/**
 * Font di default di valori, nomi ed etichette delle card (campo `value_font`).
 *
 * Il font va caricato a livello di documento, tipicamente dal tema HA: nello
 * Shadow DOM le `@font-face` dichiarate dalla card vengono ignorate, quindi la
 * collezione non può caricarlo da sé. Per questo il default porta con sé un
 * fallback esplicito a `sans-serif`: se Jost non è disponibile si ricade su un
 * sans di sistema e non sul serif eventualmente impostato dal tema.
 */
export const DEFAULT_VALUE_FONT = "Jost, sans-serif";
