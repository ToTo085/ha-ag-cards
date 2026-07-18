/**
 * Logica pura della card: solo primitivi in ingresso, nessuna dipendenza da
 * `lit` o da `hass` (stesso criterio di battery/logic.ts e panel/logic.ts).
 */

import { toWatts } from "../../utils/power";
import type { AgBarLevelDirection, AgBarMaxMode, AgBarValueFormat } from "./config";

export type Severity = "normal" | "warning" | "alarm";

/**
 * Severità in funzione della percentuale sul massimo.
 *
 * "above": la soglia è un tetto — si entra in warning/allarme SALENDO
 *          (consumi, carico). Confronto >=, così "warning: 80" scatta
 *          esattamente all'80%.
 * "below": la soglia è un pavimento — si entra in warning/allarme SCENDENDO
 *          (carica residua). Confronto <, coerente con battery/logic.ts.
 *
 * Soglia undefined = quel livello non è configurato e viene saltato: con
 * entrambe assenti la barra resta monocolore.
 */
export function levelSeverity(
  percent: number,
  warning: number | undefined,
  alarm: number | undefined,
  direction: AgBarLevelDirection
): Severity {
  if (direction === "below") {
    if (alarm !== undefined && percent < alarm) {
      return "alarm";
    }
    if (warning !== undefined && percent < warning) {
      return "warning";
    }
    return "normal";
  }
  if (alarm !== undefined && percent >= alarm) {
    return "alarm";
  }
  if (warning !== undefined && percent >= warning) {
    return "warning";
  }
  return "normal";
}

/**
 * Percentuale 0-100 di `value` su `max`, con clamp.
 *
 * Ritorna 0 (barra vuota) per qualunque input inutilizzabile — massimo
 * assente, nullo o negativo incluso: nessuna divisione per zero, nessun NaN
 * nel CSS. Il clamp verso l'alto è voluto: un valore che sfora la capacità
 * dichiarata satura al 100% senza allargare la scala del gruppo.
 */
export function fillPercent(value: number | undefined, max: number | undefined): number {
  if (
    value === undefined ||
    max === undefined ||
    !Number.isFinite(value) ||
    !Number.isFinite(max) ||
    max <= 0
  ) {
    return 0;
  }
  return Math.min(100, Math.max(0, (value / max) * 100));
}

export interface NormalizedValue {
  /** Valore grezzo dell'entità, per il display in modalità "auto". */
  raw: number | undefined;
  /**
   * Valore da confrontare e da usare per la larghezza della barra. È questo, e
   * non `raw`, che si confronta col massimo: devono stare nella stessa scala.
   */
  compare: number | undefined;
  /**
   * Chiave di comparabilità del gruppo. Solo membri con la stessa scala
   * concorrono allo stesso massimo.
   */
  scale: string;
}

/**
 * Normalizza lo stato per confronto e display.
 *
 * "power": tutto in watt, così W e kW diventano confrontabili dentro lo stesso
 *   gruppo; la scala è la costante "W". Un'unità non riconosciuta lascia
 *   `compare` undefined — meglio una barra vuota che un fattore di scala
 *   inventato (stessa scelta di toWatts).
 *
 * "auto": nessuna conversione, e la scala è l'unità stessa. Così due sensori in
 *   kW si confrontano fra loro, mentre un sensore in °C finito per sbaglio nello
 *   stesso contenitore forma un gruppo separato invece di schiacciare le
 *   potenze. Il prezzo è che "auto" in kW e "power" (scala "W") NON si
 *   mescolano: è il motivo per cui un gruppo di potenze va messo tutto su
 *   "power".
 */
export function normalizeValue(
  raw: number | undefined,
  unit: string | undefined,
  format: AgBarValueFormat
): NormalizedValue {
  if (format === "power") {
    return {
      raw,
      compare: raw === undefined ? undefined : toWatts(raw, unit),
      scale: "W",
    };
  }
  return { raw, compare: raw, scale: (unit ?? "").trim() };
}

/**
 * Massimo dichiarato dalla card, già normalizzato nella scala del valore.
 * Precedenza: entità del massimo -> massimo fisso -> nessuno.
 *
 * ATTENZIONE alla modalità "power": `maxValue` è un numero nudo, senza unità.
 * Viene interpretato in `maxValueUnit` se configurata, altrimenti nell'unità
 * dell'entità del valore. È una distinzione che morde: con un sensore in W,
 * `max_value: 19` per un impianto da 19 kWp vale 19 W e la barra risulta
 * sempre piena — va indicata l'unità "kW".
 *
 * `maxState` ha invece un'unità propria (`maxUnit`) e si converte con quella.
 *
 * In modalità "auto" non si converte nulla: si assume che tutto sia già
 * nella stessa unità del valore (l'editor lo dice negli helper).
 */
export function declaredMax(
  maxState: number | undefined,
  maxUnit: string | undefined,
  maxValue: number | undefined,
  maxValueUnit: string | undefined,
  valueUnit: string | undefined,
  format: AgBarValueFormat
): number | undefined {
  if (maxState !== undefined) {
    return format === "power" ? toWatts(maxState, maxUnit) : maxState;
  }
  if (maxValue !== undefined) {
    if (format !== "power") {
      return maxValue;
    }
    const unit = maxValueUnit?.trim() || valueUnit;
    return toWatts(maxValue, unit);
  }
  return undefined;
}

/**
 * Massimo "proprio" della card: quello dichiarato, oppure il valore corrente.
 *
 * È questo che il membro pubblica nel registro del gruppo, ed è anche il
 * massimo usato in modalità "own". Il ripiego sul proprio valore non è
 * arbitrario: senza capacità dichiarata la scala onesta è il valore stesso
 * (barra piena), ed è anche il comportamento giusto fuori da ogni contenitore
 * e nella preview del picker.
 */
export function ownMax(
  declared: number | undefined,
  value: number | undefined
): number | undefined {
  return declared ?? value;
}

/**
 * Massimo effettivo da usare per la barra.
 *
 * Poiché ogni membro pubblica il proprio `ownMax`, vale sempre
 * `groupMax >= ownMax`: in modalità gruppo la barra non può mai risultare
 * oltre il 100% per colpa della scala.
 */
export function resolveMax(
  mode: AgBarMaxMode,
  groupMax: number | undefined,
  own: number | undefined
): number | undefined {
  return mode === "group" ? (groupMax ?? own) : own;
}
