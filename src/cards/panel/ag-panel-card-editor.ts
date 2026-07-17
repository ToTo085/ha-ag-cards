import { customElement } from "lit/decorators.js";
import { AgContainerCardEditor } from "../../editor/ag-container-card-editor";
import { EDITOR_TYPE, type AgPanelCardConfig } from "./config";

/**
 * Editor del pannello: header configurabile da form (ha-form), card figlie
 * gestite dalla sezione annidata fornita dalla base (ag-cards-editor-list).
 */
@customElement(EDITOR_TYPE)
export class AgPanelCardEditor extends AgContainerCardEditor<AgPanelCardConfig> {
  // Le sezioni `expandable` e `grid` devono avere name "": con un nome
  // valorizzato i dati finirebbero annidati sotto quella chiave.
  protected readonly _schema = [
    { name: "title", selector: { text: {} } },
    {
      name: "",
      type: "grid",
      schema: [
        { name: "subtitle", selector: { text: {} } },
        {
          name: "subtitle_align",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "left", label: "Sinistra" },
                { value: "center", label: "Centro" },
                { value: "right", label: "Destra" },
              ],
            },
          },
        },
      ],
    },
    {
      name: "",
      type: "expandable",
      title: "Riepilogo",
      icon: "mdi:sigma",
      schema: [
        { name: "summary_label", selector: { text: {} } },
        { name: "summary_entities", selector: { entity: { multiple: true } } },
        {
          name: "",
          type: "grid",
          schema: [
            { name: "summary_unit", selector: { text: {} } },
            {
              name: "summary_decimals",
              selector: { number: { min: 0, max: 3, step: 1, mode: "box" } },
            },
          ],
        },
        { name: "summary_color", selector: { text: {} } },
      ],
    },
    {
      name: "",
      type: "expandable",
      title: "Aspetto",
      icon: "mdi:palette",
      schema: [
        {
          name: "",
          type: "grid",
          schema: [
            { name: "title_font", selector: { text: {} } },
            {
              name: "title_size",
              selector: {
                number: { min: 10, max: 32, step: 1, mode: "box", unit_of_measurement: "px" },
              },
            },
          ],
        },
        { name: "flat", selector: { boolean: {} } },
      ],
    },
  ];

  protected _computeLabel = (schema: { name: string; title?: string }): string => {
    const labels: Record<string, string> = {
      title: "Titolo",
      subtitle: "Sottotitolo",
      subtitle_align: "Allineamento sottotitolo",
      summary_label: "Didascalia",
      summary_entities: "Entità del valore",
      summary_unit: "Unità forzata",
      summary_decimals: "Decimali",
      summary_color: "Colore del valore",
      title_font: "Font del titolo",
      title_size: "Dimensione titolo",
      flat: "Card figlie senza cornice",
    };
    // Le sezioni expandable/grid hanno name "": ricadono sul loro `title`.
    return labels[schema.name] ?? schema.title ?? schema.name;
  };

  protected _computeHelper = (schema: { name: string }): string | undefined => {
    const helpers: Record<string, string> = {
      summary_label: "Testo libero nell'angolo destro dell'header (es. TRIFASE · BATTERIA).",
      summary_entities:
        "Una entità = il suo valore; più entità = la somma. Le potenze (W/kW) vengono convertite e formattate da sole.",
      summary_unit:
        "Vuota = automatica. Se impostata disattiva la conversione delle potenze e somma i valori così come sono.",
      summary_decimals: "Decimali della somma semplice (le potenze si formattano da sole).",
      summary_color: "Vuoto = accent. Accetta CSS: #ff9800, red, var(--mia-var).",
      title_font:
        "Vuoto = font del tema. Es: 'Cormorant Garamond', serif — il font va caricato dal tema HA, la card non può caricarlo da sé.",
      title_size: "Dimensione del titolo. I serif da display stanno meglio sui 17-18px.",
      flat: "Nasconde sfondo, bordo e ombra delle card contenute.",
    };
    return helpers[schema.name];
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "ag-panel-card-editor": AgPanelCardEditor;
  }
}
