# AG Cards

Una collezione di card **minimali e personalizzabili** per [Home Assistant](https://www.home-assistant.io/), distribuita come bundle unico compatibile [HACS](https://hacs.xyz/).

Ogni card include un **popup di configurazione visuale** (editor `ha-form`), così da poter essere aggiunta e configurata interamente dalla UI di Lovelace, senza scrivere YAML.

## Card disponibili

| Card | Tipo | Descrizione |
|------|------|-------------|
| AG Entity Card | `custom:ag-entity-card` | Mostra icona, nome e stato di una singola entità. |
| AG Battery Card | `custom:ag-battery-card` | Stato di una batteria domestica: carica, potenza, rete e backup. |
| AG Bar Card | `custom:ag-bar-card` | Barra orizzontale con nome, descrizione e valore; massimo proprio o condiviso col gruppo. |
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

### Azioni (tap / pressione prolungata / doppio tap)

Le card che mostrano un'entità (**Entity**, **Battery** e **Bar**) supportano le azioni
standard di Home Assistant. **Di default, il tap apre il pannello nativo di
dettaglio** (`more-info`) dell'entità; pressione prolungata e doppio tap restano
inattivi finché non li configuri. Tutto è impostabile dall'editor (sezione
*Azioni*) o via YAML:

```yaml
type: custom:ag-entity-card
entity: light.salotto
tap_action:
  action: toggle
hold_action:
  action: more-info
double_tap_action:
  action: navigate
  navigation_path: /lovelace/luci
```

Sono supportate le azioni HA: `more-info` (default), `toggle`, `call-service`,
`navigate`, `url`, `none`. Sulla Battery card le azioni agiscono sull'entità
della carica (`battery_entity`).

### Massimo condiviso tra più barre

Di default ogni **AG Bar Card** si scala sul proprio massimo: quello dell'entità
indicata in `max_entity`, altrimenti il numero fisso `max_value`, altrimenti il
proprio valore corrente (barra piena).

Mettendo più barre in un contenitore AG con `share_max: true` e impostandole su
`max_mode: group`, tutte si scalano sulla **capacità dichiarata più alta del
gruppo**, così le lunghezze diventano confrontabili:

```yaml
type: custom:ag-vstack-card
share_max: true
cards:
  - type: custom:ag-bar-card
    entity: sensor.fotovoltaico_potenza
    name: FV
    description: 6 kWp
    icon: mdi:solar-power-variant
    value_format: power
    max_mode: group
    max_value: 6
    max_unit: kW        # senza questo, 6 vale 6 W se il sensore e' in W
  - type: custom:ag-bar-card
    entity: sensor.pompa_calore_potenza
    name: PdC
    description: Unico carico
    icon: mdi:heat-pump
    value_format: power
    max_mode: group
```

> **`max_unit` è la svista più facile.** Il `max_value` è un numero senza unità:
> se non specifichi `max_unit`, viene interpretato nell'unità del sensore. Con un
> sensore in W, un impianto da 19 kWp scritto come `max_value: 19` vale 19 W e la
> barra risulta sempre piena.

Con FV a 2,07 kW e PdC a 0,20 kW il massimo di gruppo è 6 kW: la barra FV si
riempie al 34% e quella PdC al 3%.

**Cosa contribuisce al massimo di gruppo.** Ogni barra ci mette la propria
capacità dichiarata (`max_entity` o `max_value`); una barra che non ne dichiara
nessuna — come la PdC dell'esempio — ci mette il **proprio valore corrente**.
Di conseguenza:

- una barra che dichiara una capacità e la supera **satura al 100%** senza
  allargare la scala delle altre (FV a 9 kW su 6 kWp: FV piena, PdC ferma al 3%);
- una barra **senza** capacità dichiarata che supera tutte le altre alza invece
  il massimo del gruppo (PdC a 9 kW: PdC piena e FV si riscala al 23%). Se non
  è quello che vuoi, dichiara un `max_value` anche su quella barra.

Note:
- `value_format: power` normalizza tutto in watt, quindi nello stesso gruppo
  possono convivere entità in W e in kW. Con `value_format: auto` si confrontano
  solo le barre che hanno la **stessa unità**.
- `max_value` è nell'unità dell'entità del valore (`6` con un valore in kW = 6 kW).
- Con contenitori annidati lo scope è del **più interno** che ha `share_max: true`:
  un vstack che lo tiene spento lascia risalire le sue barre al panel esterno.
- Fuori da un contenitore che condivide, `max_mode: group` si comporta come
  `own`: la card non si rompe mai.

### Font

Tutte le card espongono `value_font`, che vale per valori, nomi ed etichette.
Il default è `Jost, sans-serif`; scrivi `inherit` per usare il font del tema.
Panel e Battery hanno in più `title_font` per il solo titolo, che di default
resta quello del tema (comodo per un serif da display sui titoli e un sans sui
numeri).

**Il font va caricato dal tema HA**: dentro lo Shadow DOM le `@font-face`
dichiarate da una card vengono ignorate, quindi la collezione non può caricarlo
da sé. Se Jost non è disponibile si ricade sul sans di sistema.

```yaml
# esempio: titoli serif dal tema, numeri in Jost
type: custom:ag-panel-card
title: Produzione FV
title_font: "'Cormorant Garamond', serif"
value_font: "Jost, sans-serif"
```

### Spaziatura

`gap` (spazio tra le card figlie, px) è disponibile su Panel, VStack e HStack;
omesso vale 8px.

```yaml
type: custom:ag-panel-card
title: Produzione FV
gap: 4
cards: [...]
```

**Allineamento delle card figlie**, legato a `flat` (*Card figlie senza cornice*):

- **`flat: true`** (default) — il figlio non ha cornice, quindi fa visivamente
  parte del contenitore ed è questo a dargli lo spazio: le card AG (Bar, Entity,
  Battery) azzerano il proprio spazio orizzontale e si allineano al titolo,
  come fa da sempre l'AG Separator Card. Senza questo si sommerebbero due
  spaziature e le righe risulterebbero rientrate rispetto al titolo.
- **`flat: false`** — il figlio mantiene la propria cornice ed è di nuovo
  autonomo: riprende i suoi 16px, esattamente come se stesse fuori da un
  contenitore.

Vale per Panel, VStack e HStack allo stesso modo.

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
