# AG Cards

Una collezione di card **minimali e personalizzabili** per [Home Assistant](https://www.home-assistant.io/), distribuita come bundle unico compatibile [HACS](https://hacs.xyz/).

Ogni card include un **popup di configurazione visuale** (editor `ha-form`), così da poter essere aggiunta e configurata interamente dalla UI di Lovelace, senza scrivere YAML.

## Card disponibili

| Card | Tipo | Descrizione |
|------|------|-------------|
| AG Entity Card | `custom:ag-entity-card` | Mostra icona, nome e stato di una singola entità. |
| AG Battery Card | `custom:ag-battery-card` | Stato di una batteria domestica: carica, potenza, rete e backup. |
| AG Panel Card | `custom:ag-panel-card` | Pannello con intestazione (titolo, sottotitolo, valore o somma a destra) e card figlie impilate. |
| AG VStack Card | `custom:ag-vstack-card` | Pila verticale di card figlie senza cornice ("flat"). |
| AG HStack Card | `custom:ag-hstack-card` | Fila orizzontale di card figlie a larghezza uguale, senza cornice. |
| AG Separator Card | `custom:ag-separator-card` | Sottile linea divisoria da usare tra card. |

## Installazione

### HACS (consigliata)

1. HACS → **Frontend** → menu ⋮ → **Custom repositories**
2. Aggiungi `https://github.com/ToTo085/ha-ag-cards` come categoria **Lovelace**
3. Cerca **AG Cards**, installa e ricarica.

### Manuale

1. Copia `dist/ag-cards.js` in `<config>/www/`
2. Aggiungi la risorsa in **Impostazioni → Dashboard → Risorse**:

   ```yaml
   url: /local/ag-cards.js
   type: module
   ```

## Uso

Aggiungi una card dalla UI (**Aggiungi card → cerca "AG"**) oppure via YAML:

```yaml
type: custom:ag-entity-card
entity: sensor.example
name: Esempio
```

## Sviluppo

Serve **Node.js** (LTS). Se usi [nvm](https://github.com/nvm-sh/nvm), il repo include un
`.nvmrc`: basta `nvm install` seguito da `nvm use` per allinearsi alla versione consigliata.

```bash
npm install      # installa le dipendenze
npm run watch    # build in watch mode su dist/ag-cards.js
npm run build    # build di produzione (minificata)
npm run typecheck
```

### Variabili d'ambiente (`.env`)

Copia il template e, se vuoi, imposta `HA_WWW`:

```bash
cp .env.example .env
```

Con `HA_WWW=<config>/www` valorizzato nel `.env`, `npm run dev` / `npm run build` scrivono
il bundle **direttamente** nella cartella `www` di Home Assistant (`<HA_WWW>/ag-cards.js`)
invece che in `dist/`, così vedi subito le modifiche in HA. Il `.env` è git-ignorato; una
variabile passata inline (`HA_WWW=... npm run dev`) ha comunque la precedenza.

Vedi [`CLAUDE.md`](./CLAUDE.md) per le convenzioni di sviluppo e
[`docs/NEW_CARD_PROMPT.md`](./docs/NEW_CARD_PROMPT.md) per il template con cui
richiedere l'aggiunta di una nuova card.

## Licenza

[MIT](./LICENSE) © Antonio Gioia
