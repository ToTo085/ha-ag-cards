# AG Cards

Una collezione di card **minimali e personalizzabili** per [Home Assistant](https://www.home-assistant.io/), distribuita come bundle unico compatibile [HACS](https://hacs.xyz/).

Ogni card include un **popup di configurazione visuale** (editor `ha-form`), così da poter essere aggiunta e configurata interamente dalla UI di Lovelace, senza scrivere YAML.

## Card disponibili

_Nessuna card ancora rilasciata. Le aggiungeremo una alla volta._

<!-- Elenco aggiornato ad ogni nuova card:
| Card | Tipo | Descrizione |
|------|------|-------------|
| AG Badge | `custom:ag-badge-card` | ... |
-->

## Installazione

### HACS (consigliata)

1. HACS → **Frontend** → menu ⋮ → **Custom repositories**
2. Aggiungi `https://github.com/agioia/ha-ag-cards` come categoria **Lovelace**
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
type: custom:ag-template-card
entity: sensor.example
name: Esempio
```

## Sviluppo

```bash
npm install      # installa le dipendenze
npm run watch    # build in watch mode su dist/ag-cards.js
npm run build    # build di produzione (minificata)
npm run typecheck
```

Vedi [`CLAUDE.md`](./CLAUDE.md) per le convenzioni di sviluppo e
[`docs/NEW_CARD_PROMPT.md`](./docs/NEW_CARD_PROMPT.md) per il template con cui
richiedere l'aggiunta di una nuova card.

## Licenza

[MIT](./LICENSE) © Antonio Gioia
