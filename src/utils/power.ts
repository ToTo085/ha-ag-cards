import { formatNumber } from "custom-card-helpers";
import type { HomeAssistant } from "../types";

// Attenzione al case: "mW" (milli) e "MW" (mega) differiscono di 10^9.
const POWER_FACTORS: Record<string, number> = {
  mW: 0.001,
  W: 1,
  kW: 1000,
  MW: 1e6,
  GW: 1e9,
  TW: 1e12,
};

/**
 * Converte un valore dalla sua unità nativa a watt.
 *
 * Ritorna undefined se l'unità non è riconosciuta: meglio degradare la riga
 * della potenza che dedurre carica/scarica da un fattore di scala sbagliato.
 */
export function toWatts(value: number, unit?: string): number | undefined {
  const u = (unit ?? "W").trim();
  if (u in POWER_FACTORS) {
    return value * POWER_FACTORS[u];
  }
  // Tolleranza per i template sensor scritti a mano ("kw", "w").
  const lower = u.toLowerCase();
  if (lower === "w") {
    return value;
  }
  if (lower === "kw") {
    return value * 1000;
  }
  return undefined;
}

/**
 * Formatta una potenza in watt per il display, in valore assoluto:
 * l'eventuale direzione la comunica il contesto (testo o segno aggiunto
 * dal chiamante).
 *
 * >= 1000 W -> kW con 2 decimali ("2,20 kW"); sotto -> W interi ("750 W").
 * formatNumber rispetta il formato numerico scelto dall'utente in HA
 * (hass.locale.number_format), che è indipendente dalla lingua della UI.
 */
export function formatPower(watts: number, locale: HomeAssistant["locale"]): string {
  const abs = Math.abs(watts);
  if (abs >= 1000) {
    return `${formatNumber(abs / 1000, locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} kW`;
  }
  return `${formatNumber(abs, locale, { maximumFractionDigits: 0 })} W`;
}

/**
 * Come formatPower(), ma SEMPRE in kW con 2 decimali ("6,07 kW", "0,00 kW").
 *
 * Serve alle card che incolonnano più potenze: passando a W sotto il kilowatt
 * si otterrebbero righe con unità diverse e larghezze che saltano. Il prezzo è
 * che un carico da 30 W si legge "0,03 kW".
 *
 * Come formatPower() lavora in valore ASSOLUTO: il segno lo rimette il
 * chiamante. Senza, un -4 W renderizzerebbe "-0,00 kW".
 */
export function formatPowerKw(watts: number, locale: HomeAssistant["locale"]): string {
  return `${formatNumber(Math.abs(watts) / 1000, locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} kW`;
}
