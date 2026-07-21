/**
 * Logica pura della card: solo primitivi in ingresso, nessuna dipendenza da
 * `lit` o da `hass` (stesso criterio di bar/logic.ts e battery/logic.ts).
 */

import { formatNumber } from "custom-card-helpers";
import { formatPower } from "../../utils/power";
import type { HomeAssistant } from "../../types";

/**
 * Verdetto sul carico, usato sia per il testo della potenza sia per gli accenti:
 *
 * - `unavailable`: entità mancante o stato unavailable/unknown → riga attenuata.
 * - `off`: carico spento (con o senza sensore).
 * - `on`: acceso senza sensore di potenza → solo nome + interruttore, icona oro.
 * - `standby`: acceso con sensore, potenza <= soglia (o potenza ignota): acceso
 *   a vuoto, neutro.
 * - `absorbing`: acceso con sensore, potenza > soglia → accento oro (icona,
 *   numero, velatura di sfondo).
 */
export type LoadVerdict = "unavailable" | "off" | "on" | "standby" | "absorbing";

export function loadVerdict(params: {
  unavailable: boolean;
  isOn: boolean;
  hasPower: boolean;
  watts: number | undefined;
  threshold: number;
}): LoadVerdict {
  const { unavailable, isOn, hasPower, watts, threshold } = params;
  if (unavailable) {
    return "unavailable";
  }
  if (!isOn) {
    return "off";
  }
  if (!hasPower) {
    return "on";
  }
  if (watts !== undefined && watts > threshold) {
    return "absorbing";
  }
  return "standby";
}

/** Icona in oro: acceso senza sensore, oppure acceso e assorbe. */
export function isGoldIcon(verdict: LoadVerdict): boolean {
  return verdict === "on" || verdict === "absorbing";
}

/**
 * Testo della riga potenza (chiamato solo quando è configurato `power_entity`).
 *
 * - potenza ignota (sensore assente/non numerico o entità unavailable) → "—".
 * - `absorbing` → potenza piena in W/kW senza suffisso ("61 W", "1,24 kW").
 * - `standby`/`off` → potenza a 1 decimale + suffisso ("0,0 W · standby",
 *   "0,0 W · spento"): il decimale rende leggibile un valore prossimo a zero.
 *
 * formatNumber/formatPower rispettano il formato numerico scelto in HA
 * (hass.locale.number_format), quindi in italiano il separatore è la virgola.
 */
export function loadPowerText(
  watts: number | undefined,
  verdict: LoadVerdict,
  locale: HomeAssistant["locale"]
): string {
  if (watts === undefined) {
    return "—";
  }
  if (verdict === "absorbing") {
    return formatPower(watts, locale);
  }
  const num = formatNumber(watts, locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const suffix = verdict === "off" ? " · spento" : verdict === "standby" ? " · standby" : "";
  return `${num} W${suffix}`;
}
