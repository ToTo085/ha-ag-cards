import { customElement } from "lit/decorators.js";
import { AgContainerCardEditor } from "../../editor/ag-container-card-editor";
import { EDITOR_TYPE, type AgHstackCardConfig } from "./config";

@customElement(EDITOR_TYPE)
export class AgHstackCardEditor extends AgContainerCardEditor<AgHstackCardConfig> {
  protected readonly _schema = [{ name: "flat", selector: { boolean: {} } }];

  protected _computeLabel = (schema: { name: string; title?: string }): string =>
    schema.name === "flat" ? "Card figlie senza cornice" : (schema.title ?? schema.name);

  protected _computeHelper = (schema: { name: string }): string | undefined =>
    schema.name === "flat"
      ? "Nasconde sfondo, bordo e ombra delle card contenute."
      : undefined;
}

declare global {
  interface HTMLElementTagNameMap {
    "ag-hstack-card-editor": AgHstackCardEditor;
  }
}
