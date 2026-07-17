import { LitElement, html, css, nothing, type TemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardConfig, LovelaceConfig } from "../types";
import { loadHuiEditorElements } from "../utils/load-hui-editor";

const TAG = "ag-cards-editor-list";

// Interfaccia minimale dell'elemento interno HA che ci serve pilotare.
interface HuiCardElementEditor extends HTMLElement {
  toggleMode?: () => void;
}

/**
 * Sezione riusabile "card contenute" degli editor dei contenitori: replica
 * la UX dell'editor delle stack native. Chip numerati per scegliere il
 * figlio, `hui-card-element-editor` per modificarlo (con toggle GUI/YAML),
 * chip "+" con `hui-card-picker` per aggiungerne uno, sposta su/giù, elimina.
 *
 * Non muta mai l'array `cards` ricevuto: ad ogni modifica emette
 * `cards-changed` (detail.cards) con una copia aggiornata; è il padre a
 * ripassare la nuova lista.
 */
@customElement(TAG)
export class AgCardsEditorList extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @property({ attribute: false }) public lovelace?: LovelaceConfig;

  @property({ attribute: false }) public cards: LovelaceCardConfig[] = [];

  // Indice del figlio selezionato; === cards.length -> tab "+" (picker).
  @state() private _selected = 0;

  @state() private _guiMode = true;

  @state() private _guiModeAvailable = true;

  @state() private _status: "loading" | "ready" | "error" = "loading";

  @query("hui-card-element-editor") private _editorElement?: HuiCardElementEditor;

  protected firstUpdated(): void {
    void loadHuiEditorElements().then((ok) => {
      this._status = ok ? "ready" : "error";
    });
  }

  protected willUpdate(changedProps: Map<string, unknown>): void {
    // Il padre può ripassare una lista più corta (es. undo dal dialog).
    if (changedProps.has("cards") && this._selected > this.cards.length) {
      this._selected = this.cards.length;
    }
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass) {
      return nothing;
    }
    if (this._status === "loading") {
      return html`<div class="note">Caricamento editor…</div>`;
    }
    if (this._status === "error") {
      return html`<div class="warning">
        Editor visuale delle card annidate non disponibile: configura la lista
        <code>cards</code> dall'editor YAML della card.
      </div>`;
    }
    const isPicker = this._selected === this.cards.length;
    return html`
      <div class="chips" role="tablist" aria-label="Card contenute">
        ${this.cards.map(
          (_, i) => html`
            <button
              class="chip ${i === this._selected ? "active" : ""}"
              role="tab"
              aria-selected=${i === this._selected ? "true" : "false"}
              @click=${() => this._select(i)}
            >
              ${i + 1}
            </button>
          `
        )}
        <button
          class="chip add ${isPicker ? "active" : ""}"
          role="tab"
          aria-selected=${isPicker ? "true" : "false"}
          aria-label="Aggiungi card"
          @click=${() => this._select(this.cards.length)}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
        </button>
      </div>
      ${isPicker
        ? html`
            <hui-card-picker
              .hass=${this.hass}
              .lovelace=${this.lovelace}
              @config-changed=${this._cardPicked}
            ></hui-card-picker>
          `
        : html`
            <div class="toolbar">
              <button
                class="tool text"
                .disabled=${!this._guiModeAvailable}
                @click=${this._toggleMode}
              >
                ${this._guiMode ? "Editor YAML" : "Editor visuale"}
              </button>
              <span class="spacer"></span>
              <button
                class="tool icon"
                aria-label="Sposta su"
                .disabled=${this._selected === 0}
                @click=${() => this._move(this._selected, this._selected - 1)}
              >
                <ha-icon icon="mdi:arrow-up"></ha-icon>
              </button>
              <button
                class="tool icon"
                aria-label="Sposta giù"
                .disabled=${this._selected === this.cards.length - 1}
                @click=${() => this._move(this._selected, this._selected + 1)}
              >
                <ha-icon icon="mdi:arrow-down"></ha-icon>
              </button>
              <button
                class="tool icon delete"
                aria-label="Elimina card"
                @click=${() => this._delete(this._selected)}
              >
                <ha-icon icon="mdi:delete"></ha-icon>
              </button>
            </div>
            <hui-card-element-editor
              .hass=${this.hass}
              .lovelace=${this.lovelace}
              .value=${this.cards[this._selected]}
              @config-changed=${this._childConfigChanged}
              @GUImode-changed=${this._guiModeChanged}
            ></hui-card-element-editor>
          `}
    `;
  }

  private _select(index: number): void {
    this._selected = index;
    this._guiMode = true;
    this._guiModeAvailable = true;
  }

  private _toggleMode(): void {
    this._editorElement?.toggleMode?.();
  }

  private _cardPicked(ev: CustomEvent): void {
    // Il config-changed del picker non deve risalire come config del contenitore.
    ev.stopPropagation();
    const config = ev.detail?.config as LovelaceCardConfig | undefined;
    if (!config) {
      return;
    }
    const cards = [...this.cards, config];
    this._select(cards.length - 1);
    this._emit(cards);
  }

  private _childConfigChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    const config = ev.detail?.config as LovelaceCardConfig | undefined;
    if (!config) {
      return;
    }
    const cards = [...this.cards];
    cards[this._selected] = config;
    this._guiModeAvailable = ev.detail.guiModeAvailable !== false;
    this._emit(cards);
  }

  private _guiModeChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    this._guiMode = Boolean(ev.detail.guiMode);
    this._guiModeAvailable = ev.detail.guiModeAvailable !== false;
  }

  private _move(from: number, to: number): void {
    const cards = [...this.cards];
    const [moved] = cards.splice(from, 1);
    cards.splice(to, 0, moved);
    this._selected = to;
    this._emit(cards);
  }

  private _delete(index: number): void {
    const cards = this.cards.filter((_, i) => i !== index);
    // Se era l'ultimo, _selected finisce su cards.length: cioè sul picker.
    this._selected = Math.min(index, cards.length);
    this._emit(cards);
  }

  private _emit(cards: LovelaceCardConfig[]): void {
    this.dispatchEvent(new CustomEvent("cards-changed", { detail: { cards } }));
  }

  static styles = css`
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 12px;
    }
    .chip {
      min-width: 34px;
      height: 30px;
      padding: 0 10px;
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 15px;
      background: none;
      color: var(--primary-text-color);
      font: inherit;
      font-size: 13px;
      cursor: pointer;
    }
    .chip.active {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .chip ha-icon {
      --mdc-icon-size: 18px;
    }

    .toolbar {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-bottom: 8px;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .tool {
      border: none;
      background: none;
      padding: 6px;
      color: var(--secondary-text-color);
      font: inherit;
      font-size: 13px;
      cursor: pointer;
      border-radius: 4px;
    }
    .tool:hover:not(:disabled) {
      color: var(--primary-text-color);
    }
    .tool:disabled {
      opacity: 0.4;
      cursor: default;
    }
    .tool.text {
      color: var(--primary-color);
      font-weight: 500;
      padding: 6px 8px;
    }
    .tool.delete:hover:not(:disabled) {
      color: var(--error-color, #db4437);
    }
    .tool ha-icon {
      --mdc-icon-size: 20px;
      display: block;
    }

    .note,
    .warning {
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .warning {
      color: var(--warning-color, #ffa600);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ag-cards-editor-list": AgCardsEditorList;
  }
}
