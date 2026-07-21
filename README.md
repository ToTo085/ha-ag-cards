# AG Cards

Una collezione di card **minimali e personalizzabili** per [Home Assistant](https://www.home-assistant.io/), distribuita come bundle unico compatibile [HACS](https://hacs.xyz/).

Ogni card include un **popup di configurazione visuale** (editor `ha-form`), così da poter essere aggiunta e configurata interamente dalla UI di Lovelace, senza scrivere YAML.

## Card disponibili

| Card | Tipo | Descrizione |
|------|------|-------------|
| AG Entity Card | `custom:ag-entity-card` | Mostra icona, nome e stato di una singola entità. |
| AG Load Card | `custom:ag-load-card` | Comanda on/off un carico e, con un sensore di potenza, distingue se assorbe o è acceso a vuoto. |
| AG Battery Card | `custom:ag-battery-card` | Stato di una batteria domestica: carica, potenza, rete e backup. |
| AG Bar Card | `custom:ag-bar-card` | Barra orizzontale con nome, descrizione e valore; massimo proprio o condiviso col gruppo. |
| AG Energy Card | `custom:ag-energy-card` | Verdetto sullo scambio con la rete e copertura del carico, in due layout. |
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

Le card che mostrano un'entità (**Entity**, **Load**, **Battery**, **Bar** ed **Energy**) supportano le azioni
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
della carica (`battery_entity`), sulla Energy card su quella della rete
(`grid_entity`).

### Comando carichi

L'**AG Load Card** è una riga: icona, nome, interruttore a destra. Associando un
sensore di potenza (`power_entity`) compare sotto il nome la lettura in W, che
distingue *acceso e assorbe* da *solo acceso*:

```yaml
type: custom:ag-load-card
entity: switch.shelly_plug_frigobar
power_entity: sensor.shelly_plug_frigobar_power
name: Frigobar
icon: mdi:fridge-outline
standby_threshold: 0.5   # W sotto cui "acceso" è standby (default 0.5)
```

Il **tap sull'interruttore** aziona il carico (`homeassistant.toggle`) senza
aprire il more-info; il **tap sulla riga** apre il more-info (configurabile con
`tap_action` / `hold_action` / `double_tap_action`). Quando il carico assorbe
sopra la soglia, potenza e icona passano in **oro** e la riga prende una leggera
velatura oro; in standby (`0,0 W · standby`) o da spento (`0,0 W · spento`) i
toni restano neutri. Senza `power_entity` la card mostra solo nome e
interruttore, con l'icona in oro quando è acceso.

È pensata come **riga ripetibile**: standalone è una riga isolata con cornice,
mentre dentro un contenitore flat (**AG Panel Card** / **AG VStack Card**)
diventa una riga di lista, con bordi e intestazione forniti dal contenitore:

```yaml
type: custom:ag-panel-card
title: Carichi
summary_entities:                      # somma potenze nell'header
  - sensor.shelly_plug_frigobar_power
  - sensor.asciugatrice_power
summary_label: Totale
cards:
  - type: custom:ag-load-card
    entity: light.sala
    name: Sala
  - type: custom:ag-load-card
    entity: switch.asciugatrice
    power_entity: sensor.asciugatrice_power
    name: Asciugatrice
  - type: custom:ag-load-card
    entity: switch.shelly_plug_frigobar
    power_entity: sensor.shelly_plug_frigobar_power
    name: Frigobar
```

### Energia e autoconsumo

L'**AG Energy Card** legge le potenze dell'impianto e risponde alla domanda di
tutti i giorni: *sto immettendo o prelevando, e chi sta alimentando la casa?*

```yaml
type: custom:ag-energy-card
layout: verdict            # oppure: coverage
name: Il Casale
phase: TRIFASE
grid_entity: sensor.potenza_rete       # obbligatoria
pv_entity: sensor.potenza_fotovoltaico # obbligatoria
battery_entity: sensor.potenza_batteria
soc_entity: sensor.carica_batteria     # % 0-100, mostra la mini-batteria
house_entity: sensor.potenza_casa      # vuota = ricavata dal bilancio
```

**Due layout, stessi dati.** `verdict` mette in evidenza la parola di stato e i
kW di rete, con la riga "Casa alimentata da", l'indicatore di flusso e le
metriche FV / Casa / Batteria. `coverage` mostra una barra con le quote di
consumo coperte da FV, batteria e rete, più la legenda in kW.

**Carica batteria.** Con `soc_entity` compare in testata una mini-batteria che
si riempie dal basso, con la percentuale accanto. Il riempimento è oro mentre
carica, verde in scarica, neutro a riposo, e passa al colore di allarme sotto
`soc_low` (default 15 %) **anche mentre sta caricando**: quel che conta è
quanta autonomia resta. Senza `soc_entity` l'indicatore è omesso del tutto.

**Indicatore di flusso** (solo `verdict`). La riga `Sorgente → Casa → Rete`
mostra due segmenti a puntini che scorrono nella direzione reale dell'energia:
verso Casa quando le fonti la alimentano, verso la Rete quando si esporta, e
**dalla Rete verso Casa** quando si preleva. Dentro la zona morta il segmento
della rete è spento. Il primo nodo mostra chi sta davvero producendo: col FV
fermo di notte compare l'icona della batteria.

**Dettagli al tap.** Le tre metriche in fondo al layout `verdict` sono
cliccabili e aprono il more-info dell'entità corrispondente (FV, Casa,
Batteria); restano statiche quando l'entità non è configurata. Il tap sul resto
della card apre invece il more-info della rete.

**I quattro stati**, decisi dalla potenza di rete e dalla presenza di FV:

| Rete | FV | Verdetto | Significato |
|------|----|----------|-------------|
| in immissione | — | **Esporto** | immetti il surplus in rete |
| in pari (zona morta) | — | **Autoconsumo** | FV e batteria coprono la casa |
| in prelievo | attivo | **Acquisto** | compri, ma il sole aiuta |
| in prelievo | ≈ 0 | **Prelievo** | dipendi dalla rete, niente sole |

Lo stato colora verdetto, icona e numero; **sfondo e bordo restano sempre quelli
del tema**, così la card non resta accesa tutta la notte.

> **Le convenzioni di segno sono la svista più facile.** La card si aspetta
> `grid_entity` **positiva in prelievo** e negativa in immissione, e
> `battery_entity` **positiva in scarica** e negativa in carica. Se il tuo
> inverter fa il contrario, attiva `invert_grid` / `invert_battery`: è l'unico
> errore che non produce un `–` ma un verdetto ribaltato e per nulla sospetto.

`deadband` (default 100 W) è l'ampiezza della zona in cui la rete è considerata
in pari: alzala se il verdetto sfarfalla attorno allo zero. `power_unit`
(default `kw`) tiene tutti i valori in kW con due decimali, così restano
incolonnati; con `auto` si passa a W sotto il kilowatt.

Senza `house_entity` il consumo di casa si ricava dal bilancio
`FV + Batteria + Rete`. Nella barra di copertura, la parte di consumo che le
fonti non spiegano resta **vuota** invece di essere ridistribuita: se vedi un
buco stabile, sono i sensori che non si accordano.

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

### Icone

L'**AG Bar Card** mostra di default l'**icona dell'entità**, quella che Home
Assistant già le associa: non serve scriverla. `icon` la sovrascrive quando ne
vuoi una diversa, `show_icon: false` la toglie del tutto. L'icona prende il
colore della barra, quindi segue le soglie.

```yaml
type: custom:ag-bar-card
entity: sensor.pompa_calore_potenza
# icon: mdi:heat-pump   # per sovrascriverla
# show_icon: false      # per non mostrarne nessuna
```

### Font

Tutte le card espongono `value_font`, che vale per valori, nomi ed etichette.
Il default è `Jost, sans-serif`; scrivi `inherit` per usare il font del tema.
Panel, Battery, Energy e Bar hanno in più `title_font` (comodo per un serif da
display sui titoli e un sans sui numeri):

- su **Panel**, **Battery** ed **Energy** vale per il solo titolo — sulla Energy
  anche per il verdetto — e di default resta quello del tema;
- sulla **Bar** vale per **nome e descrizione**, mentre `value_font` resta al
  solo valore: è così che il numero può avere un font diverso dalla descrizione.
  Qui il default di `title_font` è `Jost, sans-serif` come `value_font`, non il
  font del tema, perché su questa card nome e descrizione erano già in Jost.

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
  Battery, Energy) azzerano il proprio spazio orizzontale e si allineano al
  titolo, come fa da sempre l'AG Separator Card. Senza questo si sommerebbero
  due spaziature e le righe risulterebbero rientrate rispetto al titolo.
- **`flat: false`** — il figlio mantiene la propria cornice ed è di nuovo
  autonomo: riprende i suoi 16px, esattamente come se stesse fuori da un
  contenitore.

Vale per Panel, VStack e HStack allo stesso modo.

**Sull'asse verticale**, in `flat` la sola **AG Bar Card** azzera anche il
proprio spazio sopra e sotto: senza cornice quello spazio non separa più niente,
e a regolare il ritmo tra le barre resta il solo `gap` del contenitore. Un
elenco di barre risulta così molto più compatto; per allargarlo si alza `gap`,
che è l'unico punto da toccare. Le altre card foglia tengono il loro spazio
verticale.

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
