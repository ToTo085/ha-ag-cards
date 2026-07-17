/**
 * Logica pura del valore nell'header: solo primitivi in ingresso, nessuna
 * dipendenza da `lit` o da `hass` (stesso criterio di battery/logic.ts).
 */

import { toWatts } from "../../utils/power";

export interface EntitySample {
  value: number | undefined;
  unit: string | undefined;
}

export type SumResult =
  | { kind: "power"; watts: number }
  | { kind: "plain"; total: number; unit?: string };

/**
 * Somma i campioni scartando quelli non numerici; undefined se nessuno lo è.
 *
 * Percorso "potenza": solo se non c'è un'unità forzata e ogni campione valido
 * ha un'unità di potenza riconosciuta — si normalizza tutto in watt (W e kW
 * si sommano correttamente) e il chiamante formatta con formatPower().
 * Un'unità mancante NON vale come watt: un sensore senza unità non deve
 * diventare "42 W" per caso.
 *
 * Altrimenti somma semplice, con l'unità forzata o quella del primo campione
 * valido; con unità miste non-potenza la coerenza è responsabilità della config.
 */
export function sumSamples(samples: EntitySample[], forcedUnit?: string): SumResult | undefined {
  const valid = samples.filter(
    (sample): sample is EntitySample & { value: number } => sample.value !== undefined
  );
  if (valid.length === 0) {
    return undefined;
  }

  if (!forcedUnit?.trim()) {
    const watts = valid.map((sample) =>
      sample.unit === undefined ? undefined : toWatts(sample.value, sample.unit)
    );
    if (watts.every((w): w is number => w !== undefined)) {
      return { kind: "power", watts: watts.reduce((a, b) => a + b, 0) };
    }
  }

  const total = valid.reduce((acc, sample) => acc + sample.value, 0);
  return { kind: "plain", total, unit: forcedUnit?.trim() || valid[0].unit };
}
