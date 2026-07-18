import { customElement } from "lit/decorators.js";
import { AgContainerCardEditor } from "../../editor/ag-container-card-editor";
import { EDITOR_TYPE, type AgVstackCardConfig } from "./config";

@customElement(EDITOR_TYPE)
export class AgVstackCardEditor extends AgContainerCardEditor<AgVstackCardConfig> {
  protected readonly _schema = [
    { name: "flat", selector: { boolean: {} } },
    { name: "share_max", selector: { boolean: {} } },
    {
      name: "gap",
      selector: { number: { min: 0, max: 48, step: 1, mode: "box", unit_of_measurement: "px" } },
    },
  ];

  protected _computeLabel = (schema: { name: string; title?: string }): string =>
    ({
      flat: "Card figlie senza cornice",
      share_max: "Massimo condiviso tra le barre",
      gap: "Spazio tra le card",
    })[schema.name] ??
    schema.title ??
    schema.name;

  protected _computeHelper = (schema: { name: string }): string | undefined =>
    ({
      flat: "Nasconde sfondo, bordo e ombra delle card contenute.",
      share_max:
        "Le ag-bar-card contenute impostate su 'Massimo del gruppo' si scalano tutte sulla capacità dichiarata più alta del gruppo. Con contenitori annidati vince il più interno che ha l'opzione attiva.",
      gap: "Spazio tra le card contenute. Vuoto = 8px.",
    })[schema.name];
}

declare global {
  interface HTMLElementTagNameMap {
    "ag-vstack-card-editor": AgVstackCardEditor;
  }
}
