/**
 * Converte lo stato di un'entità in numero, undefined se non è numerico.
 *
 * Non usare isNumericState() di custom-card-helpers al suo posto: quello
 * guarda gli attributi (unit_of_measurement / state_class) e non il valore,
 * quindi un sensore in "%" fermo su "unavailable" gli risulta numerico.
 */
export function parseNumericState(state: string | undefined): number | undefined {
  if (state === undefined || state === "") {
    return undefined;
  }
  const n = Number(state);
  return Number.isFinite(n) ? n : undefined;
}
