/**
 * Logica pura della card: solo primitivi in ingresso, nessuna dipendenza da
 * `lit` o da `hass` (stesso criterio di bar/logic.ts e battery/logic.ts).
 *
 * CONVENZIONE DI SEGNO. Tutte le potenze arrivano qui in WATT e col segno gia'
 * corretto dalla card, che applica a monte le eventuali inversioni:
 *
 *   rete      + = prelievo dalla rete, - = immissione
 *   batteria  + = scarica (eroga),     - = carica (assorbe)
 *   FV        >= 0
 *
 * Bilancio atteso: `fv + batteria + rete = casa`. Coi sensori veri non torna
 * mai esattamente, e la provenienza e' costruita per reggerlo (vedi sotto).
 */

export type Severity = "normal" | "warning" | "alarm";

/**
 * I quattro verdetti sullo scambio con la rete.
 * "buy" e "draw" sono entrambi prelievo: li distingue la presenza di FV, cioe'
 * se il sole sta almeno contribuendo o se la casa dipende solo dalla rete.
 */
export type EnergyState = "export" | "self" | "buy" | "draw";

export type SourceKey = "pv" | "battery" | "grid";

/**
 * Ordine con cui le fonti coprono il carico: prima il FV, poi la batteria,
 * infine la rete. E' anche l'ordine dei segmenti della barra e delle voci di
 * legenda, cosi' i due si leggono insieme.
 */
export const SOURCE_ORDER = ["pv", "battery", "grid"] as const;

/**
 * Potenza di un'entita' opzionale.
 *
 * `configured` distingue "l'utente non ha indicato l'entita'" da "l'entita' c'e'
 * ma non e' leggibile": sono due casi con conseguenze diverse sul calcolo della
 * casa, e senza questa distinzione si confonderebbero in un unico `undefined`.
 */
export interface OptionalPower {
  configured: boolean;
  watts: number | undefined;
}

export interface EnergyInput {
  grid: number;
  pv: number;
  battery: OptionalPower;
  house: OptionalPower;
}

export interface EnergyOptions {
  /** Banda morta in W attorno allo zero della rete. */
  eps: number;
}

export interface Provenance {
  /** Watt di ciascuna fonte effettivamente assorbiti dalla casa. */
  watts: Record<SourceKey, number>;
  /**
   * Quote sul consumo di casa come frazioni 0-1, NON arrotondate: guidano
   * direttamente le larghezze CSS, dove i decimali non danno fastidio e la
   * somma <= 1 e' garantita per costruzione. Per un'etichetta in percento
   * passare da roundShares().
   */
  share: Record<SourceKey, number>;
  /** Quota di consumo che le fonti non spiegano (scarto di bilancio), 0-1. */
  unaccounted: number;
  /** Fonti con un contributo apprezzabile, nell'ordine di SOURCE_ORDER. */
  sources: SourceKey[];
}

export interface EnergySnapshot {
  state: EnergyState;
  severity: Severity;
  /** FV clampato a >= 0: e' questo il valore da mostrare, non quello grezzo. */
  pv: number;
  /** Rete col segno conservato: + prelievo, - immissione. */
  grid: number;
  /** undefined = entita' non configurata oppure non leggibile. */
  battery: number | undefined;
  /** Consumo di casa, clampato a >= 0. undefined = non ricavabile. */
  house: number | undefined;
  /** true se la casa viene dal bilancio invece che da un sensore dedicato. */
  houseDerived: boolean;
  /** undefined esattamente quando `house` e' undefined. */
  provenance: Provenance | undefined;
  /** Potenza immessa in rete, solo in stato "export". */
  surplus: number | undefined;
  /** Potenza assorbita dalla batteria, solo mentre carica. */
  charging: number | undefined;
}

const SEVERITY: Record<EnergyState, Severity> = {
  export: "normal",
  self: "normal",
  buy: "warning",
  draw: "alarm",
};

/**
 * Verdetto sullo scambio con la rete.
 *
 * L'ordine dei test conta: la banda morta va verificata prima del segno, e il
 * ramo del prelievo si divide sul FV (>= eps = il sole contribuisce).
 */
export function energyState(gridW: number, pvW: number, eps: number): EnergyState {
  if (gridW <= -eps) {
    return "export";
  }
  if (gridW < eps) {
    return "self";
  }
  return pvW >= eps ? "buy" : "draw";
}

export function stateSeverity(state: EnergyState): Severity {
  return SEVERITY[state];
}

/**
 * Consumo di casa ricavato dal bilancio, quando manca un sensore dedicato.
 *
 * Ritorna undefined se la batteria e' configurata ma illeggibile: sommare solo
 * `fv + rete` ometterebbe in silenzio il termine della batteria, sbagliando il
 * risultato della sua intera potenza. Meglio niente che un numero plausibile.
 */
export function deriveHouse(
  pvW: number,
  gridW: number,
  battery: OptionalPower
): number | undefined {
  if (battery.configured && battery.watts === undefined) {
    return undefined;
  }
  return pvW + (battery.watts ?? 0) + gridW;
}

/**
 * Ripartizione del consumo di casa tra le fonti, nell'ordine FV -> batteria ->
 * rete: ogni fonte copre quel che resta scoperto dalle precedenti.
 *
 * Ogni termine e' limitato al residuo corrente, quindi la somma non supera mai
 * il consumo di casa nemmeno con sensori che non si accordano. Lo scarto nel
 * verso opposto (fonti che non arrivano a spiegare il consumo) finisce in
 * `unaccounted` e va mostrato come vuoto: rinormalizzare a 100% trasformerebbe
 * un problema di sensori in un grafico plausibile ma falso.
 */
export function provenance(
  houseW: number,
  pvW: number,
  batteryW: number | undefined,
  gridW: number,
  sourceEps: number
): Provenance {
  const house = Math.max(0, houseW);
  const fromPv = Math.min(Math.max(0, pvW), house);
  // Solo la batteria in scarica alimenta la casa: in carica e' un carico.
  const fromBattery = Math.min(Math.max(batteryW ?? 0, 0), house - fromPv);
  // Solo la rete in prelievo: in immissione sta ricevendo, non fornendo.
  const fromGrid = Math.min(Math.max(gridW, 0), house - fromPv - fromBattery);

  const watts: Record<SourceKey, number> = {
    pv: fromPv,
    battery: fromBattery,
    grid: fromGrid,
  };

  // Con casa a zero non c'e' niente da ripartire: quote a zero, nessuna fonte.
  const share: Record<SourceKey, number> =
    house > 0
      ? { pv: fromPv / house, battery: fromBattery / house, grid: fromGrid / house }
      : { pv: 0, battery: 0, grid: 0 };

  const covered = share.pv + share.battery + share.grid;

  return {
    watts,
    share,
    unaccounted: Math.max(0, 1 - covered),
    sources: SOURCE_ORDER.filter((key) => watts[key] > sourceEps),
  };
}

/**
 * Quote in percento intere che sommano esattamente al totale coperto, col
 * metodo dei resti maggiori.
 *
 * Serve solo dove i decimali sono illeggibili (l'aria-label della barra). Tre
 * Math.round() indipendenti non vanno bene: 16,7 / 16,7 / 66,6 darebbe
 * 17 + 17 + 67 = 101.
 */
export function roundShares(share: Record<SourceKey, number>): Record<SourceKey, number> {
  const exact = SOURCE_ORDER.map((key) => {
    const value = Math.max(0, share[key]) * 100;
    return { key, value, floor: Math.floor(value) };
  });

  const budget = Math.min(
    100,
    Math.round(exact.reduce((sum, item) => sum + item.value, 0))
  );

  const result: Record<SourceKey, number> = { pv: 0, battery: 0, grid: 0 };
  let assigned = 0;
  for (const item of exact) {
    result[item.key] = item.floor;
    assigned += item.floor;
  }

  // I punti residui vanno a chi ha il resto frazionario piu' grande.
  const byRemainder = [...exact].sort((a, b) => b.value - b.floor - (a.value - a.floor));
  for (const item of byRemainder) {
    if (assigned >= budget) {
      break;
    }
    result[item.key] += 1;
    assigned += 1;
  }

  return result;
}

/**
 * Snapshot completo a partire dalle letture gia' normalizzate.
 *
 * E' una funzione TOTALE: ritorna sempre uno snapshot, anche degradato. Le
 * entita' obbligatorie illeggibili le intercetta la card prima di arrivare qui
 * (come fa ag-battery-card), cosi' questo modulo resta senza union nullable
 * sui valori che il render usa di sicuro.
 */
export function computeEnergy(input: EnergyInput, options: EnergyOptions): EnergySnapshot {
  // Con eps = 0 la banda dell'autoconsumo sarebbe vuota e una rete a zero
  // finirebbe in "export", perche' `-0 <= 0` e' vero e quel test gira per primo.
  const eps = Math.max(1, Math.abs(options.eps));
  // Soglia per elencare una fonte in "Casa alimentata da": derivata dalla banda
  // morta invece di essere un campo a parte, cosi' resta coerente se l'utente
  // la alza (col default 100 W da' i 50 W della specifica).
  const sourceEps = eps / 2;

  // Certi inverter riportano un FV leggermente negativo di notte: senza clamp
  // min(pv, casa) produrrebbe un segmento negativo nella barra. Lo snapshot
  // espone il valore clampato, cosi' display e calcoli concordano.
  const pv = Math.max(0, input.pv);
  const grid = input.grid;
  const battery = input.battery.configured ? input.battery.watts : undefined;

  const state = energyState(grid, pv, eps);

  // Sensore dedicato configurato ma illeggibile: nessun ripiego sul bilancio.
  // Il numero salterebbe tra due grandezze diverse ogni volta che il sensore
  // va e viene, senza che dalla card si capisca perche'.
  const rawHouse = input.house.configured
    ? input.house.watts
    : deriveHouse(pv, grid, input.battery);
  const house = rawHouse === undefined ? undefined : Math.max(0, rawHouse);

  return {
    state,
    severity: stateSeverity(state),
    pv,
    grid,
    battery,
    house,
    houseDerived: !input.house.configured && house !== undefined,
    provenance:
      house === undefined ? undefined : provenance(house, pv, battery, grid, sourceEps),
    surplus: grid <= -eps ? Math.abs(grid) : undefined,
    charging: battery !== undefined && battery <= -eps ? Math.abs(battery) : undefined,
  };
}
