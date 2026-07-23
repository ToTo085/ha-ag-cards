/**
 * Logica pura della alarm card: nessuna dipendenza da lit o hass, così è
 * testabile e riusabile. Mappa gli stati/attributi del pannello alarmo nelle
 * modalità da disegnare, nella modalità attiva e nel "verdetto" che pilota i
 * colori.
 */

// Modalità di inserimento (i bit di supported_features standard di HA).
export type ArmModeKey = "home" | "away" | "night" | "vacation" | "custom";
export type ModeKey = "disarm" | ArmModeKey;

// "verdetto" che pilota i colori della riga.
export type AlarmVerdict =
  | "disarmed"
  | "arming"
  | "pending"
  | "armed"
  | "triggered"
  | "unavailable";

export interface ModeDef {
  key: ModeKey;
  /** Bit in supported_features. 0 per disarm (sempre presente). */
  bit: number;
  /** Stato dell'entità corrispondente a questa modalità. */
  state: string;
  /** Valore `mode` per il servizio alarmo.arm (assente per disarm). */
  serviceMode?: ArmModeKey;
  icon: string;
}

// Modalità di inserimento in ordine di visualizzazione (come lo screenshot HA:
// casa prima di fuori). I bit sono quelli di AlarmControlPanelEntityFeature.
export const ARM_MODES: readonly ModeDef[] = [
  { key: "home", bit: 1, state: "armed_home", serviceMode: "home", icon: "mdi:shield-home" },
  { key: "away", bit: 2, state: "armed_away", serviceMode: "away", icon: "mdi:shield-lock" },
  { key: "night", bit: 4, state: "armed_night", serviceMode: "night", icon: "mdi:shield-moon" },
  {
    key: "vacation",
    bit: 32,
    state: "armed_vacation",
    serviceMode: "vacation",
    icon: "mdi:shield-airplane",
  },
  {
    key: "custom",
    bit: 16,
    state: "armed_custom_bypass",
    serviceMode: "custom",
    icon: "mdi:shield-half-full",
  },
];

export const DISARM_MODE: ModeDef = {
  key: "disarm",
  bit: 0,
  state: "disarmed",
  icon: "mdi:shield-off",
};

// Tutte le definizioni indicizzate per chiave (disarm + modalità di inserimento).
export const MODE_BY_KEY: Record<ModeKey, ModeDef> = {
  disarm: DISARM_MODE,
  ...Object.fromEntries(ARM_MODES.map((m) => [m.key, m])),
} as Record<ModeKey, ModeDef>;

// Attributi minimi che ci servono dallo stato del pannello.
interface AlarmAttributes {
  supported_features?: number;
  arm_mode?: string;
}

/**
 * Modalità di inserimento da mostrare. Di default sono quelle abilitate nel
 * pannello (bit di supported_features); se l'utente ha fornito `configModes`
 * si rispetta ordine e scelta, ma restano solo le modalità valide e abilitate
 * per non lasciare pulsanti che fallirebbero. Se supported_features non è un
 * numero (pannello che non lo espone) si considerano tutte abilitate.
 */
export function armModeKeys(
  attributes: AlarmAttributes | undefined,
  configModes?: string[]
): ArmModeKey[] {
  const features = attributes?.supported_features;
  const gate = (bit: number): boolean =>
    typeof features === "number" ? (features & bit) !== 0 : true;
  // ARM_MODES contiene solo modalità di inserimento: il cast è sicuro.
  const supported = ARM_MODES.filter((m) => gate(m.bit)).map((m) => m.key as ArmModeKey);

  if (configModes && configModes.length) {
    const valid = new Set(ARM_MODES.map((m) => m.key as string));
    return configModes.filter(
      (k): k is ArmModeKey => valid.has(k) && supported.includes(k as ArmModeKey)
    );
  }
  return supported;
}

const STATE_TO_KEY: Record<string, ModeKey> = {
  disarmed: "disarm",
  armed_home: "home",
  armed_away: "away",
  armed_night: "night",
  armed_vacation: "vacation",
  armed_custom_bypass: "custom",
};

/**
 * Quale pulsante è "attivo" per lo stato corrente. In inserimento/uscita
 * (arming/pending/triggered) lo stato non è ancora quello finale: si usa
 * l'attributo `arm_mode` (forma grezza home/away/…) per evidenziare la
 * modalità verso cui si sta andando.
 */
export function activeModeKey(
  state: string | undefined,
  attributes: AlarmAttributes | undefined
): ModeKey | undefined {
  if (!state) {
    return undefined;
  }
  if (STATE_TO_KEY[state]) {
    return STATE_TO_KEY[state];
  }
  if (state === "arming" || state === "pending" || state === "triggered") {
    const mode = attributes?.arm_mode;
    if (mode && ARM_MODES.some((m) => m.key === mode)) {
      return mode as ArmModeKey;
    }
  }
  return undefined;
}

export function alarmVerdict(state: string | undefined): AlarmVerdict {
  if (!state || state === "unavailable" || state === "unknown") {
    return "unavailable";
  }
  if (state === "disarmed") {
    return "disarmed";
  }
  if (state === "arming") {
    return "arming";
  }
  if (state === "pending") {
    return "pending";
  }
  if (state === "triggered") {
    return "triggered";
  }
  if (state.startsWith("armed_")) {
    return "armed";
  }
  return "disarmed";
}
