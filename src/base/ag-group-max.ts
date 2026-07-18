/**
 * Protocollo di condivisione del massimo tra card sorelle dentro un
 * contenitore AG. Volutamente generico: il contenitore fa da broker e non sa
 * nulla di cosa sia una "barra", così qualsiasi card AG può partecipare.
 *
 * Handshake, tutto sincrono dentro dispatchEvent():
 *   1. il membro dispatcha `ag-group-max` (bubbles + composed) con il proprio
 *      massimo candidato, la propria scala e una callback `onMax`;
 *   2. il primo contenitore con `share_max: true` che lo intercetta fa
 *      stopPropagation(), registra il membro e valorizza `detail.handle`;
 *   3. il membro legge `detail.handle` subito dopo il dispatch: se è
 *      undefined nessuno condivide e la card degrada da sola.
 *
 * NB: si passa `source` nel detail e non si usa `ev.target`. Con
 * `composed: true` il target viene retargettato al confine dello Shadow DOM:
 * un membro annidato dentro un altro contenitore risulterebbe essere il
 * contenitore intermedio. `detail`, invece, non viene mai riscritto.
 */

export const AG_GROUP_MAX_EVENT = "ag-group-max";

/** Riferimento restituito dal contenitore che ha accettato l'iscrizione. */
export interface AgGroupMaxHandle {
  /** Aggiorna il contributo del membro. Il contenitore ricalcola e ridistribuisce. */
  update(value: number | undefined, scale: string): void;
  /**
   * Esce dal gruppo. Va chiamata da `disconnectedCallback`: lì un evento non
   * risalirebbe più (l'elemento è già staccato), quindi l'uscita deve passare
   * per questa closure.
   */
  release(): void;
}

export interface AgGroupMaxDetail {
  /** Elemento che si iscrive: chiave di registro e appiglio per il pruning. */
  source: HTMLElement;
  /**
   * Contributo del membro al massimo del gruppo: il suo massimo dichiarato,
   * oppure il valore corrente se non ne dichiara. undefined = non concorre.
   */
  value: number | undefined;
  /**
   * Chiave di comparabilità. Solo i membri con la stessa scala concorrono allo
   * stesso massimo: evita che una temperatura in °C schiacci una potenza in W.
   */
  scale: string;
  /**
   * Invocata dal contenitore ad ogni cambio del massimo della propria scala.
   * Contratto: NON deve richiamare in modo sincrono update()/release(),
   * altrimenti il broker rientra su se stesso.
   */
  onMax: (max: number | undefined) => void;
  /** Valorizzata dal contenitore che accetta. Resta undefined se nessuno ascolta. */
  handle?: AgGroupMaxHandle;
}

export type AgGroupMaxEvent = CustomEvent<AgGroupMaxDetail>;

declare global {
  interface HTMLElementEventMap {
    "ag-group-max": AgGroupMaxEvent;
  }
}
