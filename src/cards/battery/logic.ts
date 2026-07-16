/**
 * Logica pura della card: solo primitivi in ingresso, nessuna dipendenza da
 * `lit` o da `hass`. Tenuta separata dal componente per restare leggibile
 * (e testabile) indipendentemente dal rendering.
 */

export type Severity = "normal" | "warning" | "alarm";
export type Flow = "charging" | "discharging" | "idle";
export type BinaryStatus = "ok" | "off" | "unavailable";

export interface SystemStatus {
  severity: Severity;
  message: string;
  icon: string;
}

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

/** Soglie decrescenti: meno carica = peggio. */
export function levelSeverity(level: number, warning: number, alarm: number): Severity {
  if (level < alarm) {
    return "alarm";
  }
  if (level < warning) {
    return "warning";
  }
  return "normal";
}

/** `watts` va passato già normalizzato e con `invert_power` applicato. */
export function powerFlow(watts: number, idleWatts: number): Flow {
  if (watts > idleWatts) {
    return "charging";
  }
  if (watts < -idleWatts) {
    return "discharging";
  }
  return "idle";
}

/** Elenco separato da virgola -> lista normalizzata; vuoto -> convenzione HA. */
export function okStates(raw: string | undefined, fallback: string[] = ["on"]): string[] {
  const list = (raw ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return list.length ? list : fallback;
}

/** `state` undefined = entità configurata ma assente da hass.states. */
export function binaryStatus(state: string | undefined, ok: string[]): BinaryStatus {
  if (state === undefined || state === "" || state === "unavailable" || state === "unknown") {
    return "unavailable";
  }
  return ok.includes(state.toLowerCase()) ? "ok" : "off";
}

/**
 * Stato complessivo del sistema. Il backup ha la precedenza sulla rete:
 * senza backup funzionante, lo stato della rete è un dettaglio.
 *
 * Un argomento undefined significa "entità non configurata": il relativo
 * controllo si salta. Se lo sono entrambe, la riga di stato non compare.
 */
export function systemStatus(
  backup: BinaryStatus | undefined,
  grid: BinaryStatus | undefined
): SystemStatus | undefined {
  if (backup === undefined && grid === undefined) {
    return undefined;
  }
  if (backup === "unavailable") {
    return {
      severity: "alarm",
      message: "Sistema di backup non disponibile",
      icon: "mdi:alert-circle",
    };
  }
  if (backup === "off") {
    return { severity: "alarm", message: "Anomalia sistema di backup", icon: "mdi:alert-circle" };
  }
  if (grid === "unavailable") {
    return { severity: "alarm", message: "Stato rete non disponibile", icon: "mdi:alert-circle" };
  }
  if (grid === "off") {
    return {
      severity: "warning",
      message: "Rete assente · funzionamento a isola",
      icon: "mdi:transmission-tower-off",
    };
  }
  if (backup === "ok" && grid === "ok") {
    return {
      severity: "normal",
      message: "Rete presente · backup pronto",
      icon: "mdi:transmission-tower",
    };
  }
  if (grid === "ok") {
    return { severity: "normal", message: "Rete presente", icon: "mdi:transmission-tower" };
  }
  return { severity: "normal", message: "Backup pronto", icon: "mdi:shield-check" };
}
