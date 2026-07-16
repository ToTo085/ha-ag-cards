# CLAUDE.md — Regole di sviluppo AG Cards

Istruzioni per lavorare in questo repository. Sono allineate alla
[documentazione ufficiale Home Assistant](https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card).

## Cos'è il progetto

**AG Cards** è una collezione di custom card Lovelace per Home Assistant,
minimali e personalizzabili, distribuita come **bundle unico** (`dist/ag-cards.js`)
compatibile HACS. Ogni card ha un **editor visuale** (popup di configurazione).

## Stack e struttura

- **TypeScript + Lit 3** (LitElement), build con **Rollup** → un solo file ES module.
- **custom-card-helpers** per i tipi `HomeAssistant`, `LovelaceCardConfig`, `LovelaceCardEditor`.

```
src/
  ag-cards.ts              # entry point: importa ogni card (registrazione bundle)
  const.ts                 # versione + costanti condivise
  types.ts                 # tipi HA re-export + interfacce comuni
  base/ag-base-card.ts     # classe base condivisa (hass, config, sizing)
  utils/register-card.ts   # helper: defineCustomElement, registerCustomCard
  cards/
    _template/             # scaffold di riferimento (card + editor + config)
    <nome>/                # una cartella per card
      ag-<nome>-card.ts        # componente card
      ag-<nome>-card-editor.ts # popup di configurazione
      config.ts                # tipo config, default, costanti (CARD_TYPE, ...)
docs/NEW_CARD_PROMPT.md    # template per richiedere una nuova card
dist/ag-cards.js           # bundle generato
```

## Distribuzione

La collezione è distribuita come **bundle unico** (`dist/ag-cards.js`): un solo file
che registra tutte le card. È il formato nativo di HACS (un repo → un file → una
risorsa) e la scelta preferita per questo progetto, coeso e minimale:

- installazione e aggiornamento singoli, ottima UX per chi installa;
- codice condiviso (base card, utils, stile) senza duplicazioni;
- versionamento semplice dell'intera collezione.

**Non** spezzare la collezione in più repo/più risorse: moltiplica la manutenzione
e peggiora l'esperienza d'installazione, senza reali vantaggi finché le card
restano coerenti tra loro.

**Evoluzione futura (solo se serve).** Se il bundle diventasse grande o con
dipendenze pesanti, il passo successivo **non** è dividerlo in più repo, ma
introdurre il **lazy loading** nello stesso bundle: l'entry registra le card e
importa il codice pesante di ciascuna via `import()` dinamico (chunk separati).
Richiede di rimuovere `inlineDynamicImports: true` da `rollup.config.js` e gestire
i chunk. Da valutare solo quando l'esigenza è concreta.

## Convenzioni obbligatorie

### Naming

- Tag custom element: `ag-<nome>-card` (es. `ag-badge-card`); editor: `ag-<nome>-card-editor`.
- In YAML l'utente usa `type: custom:ag-<nome>-card`.
- Una cartella per card sotto `src/cards/`; nuova card sempre partendo da `_template/`.

### Aggiungere una card al bundle

Ogni nuova card va importata in `src/ag-cards.ts`, altrimenti non finisce nel bundle:

```ts
import "./cards/badge/ag-badge-card";
```

### API della card (contratto HA)

Ogni card deve implementare:

- **`setConfig(config)`** — valida la config e applica i default. Se la config è
  invalida, **lanciare un'eccezione**: HA mostrerà una error card. Non fare side-effect qui.
- **`render()`** — usare `lit` `html`; racchiudere sempre il contenuto in `<ha-card>`
  per ereditare stile, tema e bordi standard di HA.
- **`set hass` / property `hass`** — HA aggiorna questa property ad ogni cambio di stato.
  Non fare polling: reagire al cambio di `hass`.
- **`getCardSize()`** — altezza indicativa per la *masonry view* (1 = ~50px). Default 3.
- **`getGridOptions()`** — dimensioni per la *sections view* (griglia 12 colonne).
  Usare `columns` multipli di 3 (3/6/9/12). Fornito default dalla base card.

### Editor / popup di configurazione (obbligatorio)

Ogni card deve essere configurabile dalla UI. Due strade:

1. **Editor custom** (default in questo progetto, vedi `_template`):
   - `static getConfigElement()` → ritorna l'elemento editor.
   - `static getStubConfig()` → config di esempio proposta all'aggiunta (senza `type` o con `custom:`).
   - L'editor implementa `setConfig(config)`, riceve `hass`, e ad ogni modifica emette
     l'evento **`config-changed`** (`bubbles: true, composed: true`, `detail.config`).
   - Preferire **`ha-form`** con schema dichiarativo + `selector` (entity, text, icon,
     boolean, number…) invece di input HTML manuali: HA genera controlli coerenti col tema.

2. **Form integrato** (`static getConfigForm()`) — alternativa più rapida per config semplici:
   ritorna `{ schema, computeLabel?, computeHelper?, assertConfig? }`.

### Registrazione nel selettore card

Registrare la card in `window.customCards` (usare `registerCustomCard()` da `utils/register-card.ts`)
con `type`, `name`, `description`, `documentationURL`. `preview: true` per la preview nel picker.

### Selettori dati

Leggere gli stati da `this.hass.states[entityId]`. Per azioni usare
`this.hass.callService(domain, service, data)`. Non chiamare API REST dirette.

## Stile e UX

- **Minimalismo**: poche opzioni, default sensati, coerenza visiva con HA.
- Usare le **CSS custom properties** del tema HA (`--primary-color`,
  `--primary-text-color`, `--card-background-color`, `--secondary-text-color`, ecc.).
  Non hardcodare colori: la card deve seguire tema chiaro/scuro.
- Styles in `static styles = css\`...\`` (scoped grazie allo Shadow DOM di Lit).
- Accessibilità: label, contrasto, target tap adeguati.
- Gestire stati `unavailable` / entità mancante senza rompere il render (`nothing`).

## Build e verifica

```bash
npm install
npm run watch      # sviluppo (sourcemap, non minificato)
npm run build      # release (minificato)
npm run typecheck  # tsc --noEmit, deve passare senza errori
npm run lint
```

`tsconfig` è in modalità **strict**: niente `any` impliciti, gestire i tipi `undefined`.
Prima di considerare completa una card: `typecheck` verde + prova reale in una dashboard HA
(aggiunta dal picker, editor funzionante, tema chiaro/scuro).

## Workflow per una nuova card

1. L'utente compila il template in `docs/NEW_CARD_PROMPT.md`.
2. Copiare `src/cards/_template/` in `src/cards/<nome>/` e rinominare i file/tag/tipi.
3. Implementare config, card ed editor secondo le convenzioni sopra.
4. Importare la card in `src/ag-cards.ts`.
5. Aggiornare la tabella "Card disponibili" nel `README.md`.
6. `npm run typecheck && npm run build`, poi test in HA.

## Riferimenti

- Custom card: https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card
- Frontend data / hass: https://developers.home-assistant.io/docs/frontend/data
- Selettori (ha-form): https://www.home-assistant.io/docs/blueprint/selectors/
- Lit: https://lit.dev/
