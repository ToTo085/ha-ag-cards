# Template prompt — Aggiungere una nuova card

Compila questo template e passalo per richiedere l'implementazione di una nuova
card della collezione. Più i campi sono dettagliati, più il risultato sarà preciso.
Ometti pure le sezioni non pertinenti; i campi con ⭐ sono i più importanti.

---

## 1. Identità della card

- **Nome card** ⭐: <!-- es. "Badge di stato" -->
- **Tag / tipo** (opzionale, altrimenti derivato dal nome): `ag-______-card`
- **Descrizione in una riga** ⭐: <!-- cosa fa, per il picker di HA -->
- **Card esistenti a cui ispirarsi** (opzionale): <!-- es. simile a mushroom-entity, ma... -->

## 2. Funzionamento ⭐

Descrivi cosa deve fare la card e come si comporta.

- **Scopo**: <!-- cosa mostra / permette di fare -->
- **Entità supportate**: <!-- domini: light, sensor, switch, climate, media_player, qualsiasi... -->
- **Dati mostrati**: <!-- stato, attributi specifici, unità di misura, icona, nome... -->
- **Interazioni**: <!-- tap/hold, toggle, chiamata servizio, more-info, navigazione... -->
- **Stati particolari da gestire**: <!-- unavailable, off, valori soglia, errori... -->

## 3. Opzioni di configurazione ⭐

Elenca ogni opzione che l'utente deve poter impostare dal **popup di configurazione**.
Per ognuna indica: nome, tipo di selettore, se obbligatoria, valore di default.

| Opzione | Selettore | Obbligatoria | Default | Note |
|---------|-----------|--------------|---------|------|
| `entity` | entity | sì | — | entità principale |
| `name` | text | no | nome dell'entità | titolo mostrato |
| `icon` | icon | no | icona dell'entità | |
| <!-- aggiungi righe --> | | | | |

Selettori disponibili (ha-form): `entity`, `text`, `number`, `boolean`, `icon`,
`color_rgb`, `select`, `attribute`, `theme`, `target`, `action`, ...

## 4. Layout desiderato ⭐

Descrivi la disposizione visiva. Uno schizzo ASCII aiuta molto.

- **Struttura**: <!-- es. icona a sinistra, nome + stato a destra, su una riga -->
- **Dimensioni** (sections view): righe/colonne indicative <!-- es. 6 col × 2 righe -->
- **Schema visivo** (opzionale):

```
┌───────────────────────────────┐
│  [icona]   Nome                │
│            Stato / valore      │
└───────────────────────────────┘
```

## 5. Stile

- **Tema**: deve seguire chiaro/scuro tramite CSS var HA (default: sì).
- **Colori/accenti particolari**: <!-- es. colore basato sullo stato on/off -->
- **Animazioni / transizioni** (opzionale): <!-- es. fade sullo stato -->
- **Personalizzazioni utente sullo stile** (opzionale): <!-- colore configurabile? -->

## 6. Esempio di configurazione YAML atteso

```yaml
type: custom:ag-______-card
entity: sensor.example
name: Esempio
# altre opzioni...
```

## 7. Note aggiuntive

<!-- Edge case, riferimenti, mock, comportamenti specifici, priorità... -->

---

> Al termine, l'implementazione seguirà le regole in [`CLAUDE.md`](../CLAUDE.md):
> cartella dedicata sotto `src/cards/`, editor con `config-changed`, import in
> `src/ag-cards.ts`, `typecheck` verde e aggiornamento del README.
