import { getCardHelpers } from "./card-helpers";

const TIMEOUT_MS = 5000;

let loadPromise: Promise<boolean> | undefined;

/**
 * Forza HA a definire gli elementi interni dell'editor annidato:
 * `hui-card-element-editor` (editor di una singola card, con toggle GUI/YAML)
 * e `hui-card-picker` (selettore "aggiungi card").
 *
 * Sono API interne non documentate ma stabili da anni, le stesse su cui
 * poggiano gli editor delle stack native. Trucco noto nella community:
 * creare una stack nativa e chiederne il config element importa il modulo
 * che definisce entrambi gli elementi.
 *
 * Ritorna false (mai un'eccezione) se qualcosa va storto: il chiamante
 * degrada a un messaggio "usa YAML" senza rompere il dialog.
 */
export function loadHuiEditorElements(): Promise<boolean> {
  loadPromise ??= load().catch(() => false);
  return loadPromise;
}

async function load(): Promise<boolean> {
  if (huiElementsDefined()) {
    return true;
  }
  const helpers = await getCardHelpers();
  // Innesca il lazy-load di hui-vertical-stack-card (l'elemento creato è usa-e-getta).
  helpers.createCardElement({ type: "vertical-stack", cards: [] });
  await withTimeout(customElements.whenDefined("hui-vertical-stack-card"));
  const stackClass = customElements.get("hui-vertical-stack-card") as unknown as
    | { getConfigElement?: () => Promise<unknown> }
    | undefined;
  await stackClass?.getConfigElement?.();
  await withTimeout(
    Promise.all([
      customElements.whenDefined("hui-card-element-editor"),
      customElements.whenDefined("hui-card-picker"),
    ])
  );
  return true;
}

function huiElementsDefined(): boolean {
  return Boolean(
    customElements.get("hui-card-element-editor") && customElements.get("hui-card-picker")
  );
}

// whenDefined non si rifiuta mai da solo: senza timeout un elemento mai
// definito lascerebbe l'editor su "caricamento" per sempre.
function withTimeout(promise: Promise<unknown>): Promise<unknown> {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      window.setTimeout(() => reject(new Error("Timeout caricamento editor HA")), TIMEOUT_MS)
    ),
  ]);
}
