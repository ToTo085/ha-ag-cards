# Sviluppo e test in locale con un'istanza HA esistente

Flusso consigliato: **Rollup in watch scrive il bundle direttamente nella cartella
`www` di HA**; a ogni salvataggio ricostruisce, tu ricarichi il browser.

## Prerequisiti

- Node 18+ e `npm install` eseguito nel repo.
- La cartella `config` della tua istanza HA raggiungibile come **percorso locale**:
  - HA sulla stessa macchina → percorso diretto (es. `~/homeassistant/config`).
  - HAOS / HA su altra macchina → monta la condivisione Samba
    (`\\homeassistant\config` su Windows, `smb://homeassistant/config` su macOS/Linux)
    oppure usa l'add-on **Samba share** / **SSH & Web Terminal**.

## 1. Punta la build alla cartella `www` di HA

Imposta `HA_WWW` con il percorso della cartella `www` dell'istanza (se non esiste, creala):

```bash
# macOS / Linux
export HA_WWW="/percorso/della/config/www"
npm run dev        # watch: ricostruisce ag-cards.js in $HA_WWW ad ogni modifica

# Windows PowerShell
$env:HA_WWW="\\homeassistant\config\www"
npm run dev
```

Senza `HA_WWW` la build resta in `dist/ag-cards.js` (comportamento di default).

Per una singola build minificata direttamente in `www`:

```bash
HA_WWW="/percorso/config/www" npm run deploy
```

## 2. Registra la risorsa in HA (una tantum)

Il file finisce in `config/www/ag-cards.js`, servito da HA su `/local/ag-cards.js`.

- **Da UI**: Impostazioni → Dashboard → menu ⋮ → **Risorse** → Aggiungi:
  - URL: `/local/ag-cards.js`
  - Tipo: **Modulo JavaScript**

  (La sezione Risorse richiede la **Modalità avanzata** attiva nel profilo utente.)

- **Oppure via YAML** (dashboard in modalità YAML):

  ```yaml
  resources:
    - url: /local/ag-cards.js
      type: module
  ```

## 3. Aggiungi la card e testa

In una dashboard: **Aggiungi card → cerca "AG"**, oppure via YAML:

```yaml
type: custom:ag-template-card
entity: sensor.example
name: Esempio
```

## 4. Ciclo di lavoro

1. `npm run dev` in un terminale (resta in ascolto).
2. Modifichi il codice in `src/` → Rollup ricostruisce `ag-cards.js` in `www`.
3. Ricarica la dashboard nel browser con **hard refresh** (`Ctrl/Cmd + Shift + R`).

### Cache: se non vedi le modifiche

HA e il browser cachano aggressivamente le risorse JS:

- Fai sempre un **hard refresh** (`Ctrl/Cmd + Shift + R`).
- In caso di cache ostinata, aggiungi/incrementa una query nella risorsa:
  `/local/ag-cards.js?v=2` (poi ricarica).
- Verifica nel banner di console del browser la versione stampata: `AG-CARDS vX.Y.Z`.
- Su mobile/app: chiudi e riapri la companion app o svuota la cache.

## Note

- Il file `.env` locale (se lo usi per `HA_WWW`) è già ignorato da git.
- Per un ambiente completamente isolato/usa-e-getta, in alternativa si può far girare
  HA in Docker montando `dist/` in `/config/www`; questa guida assume invece un'istanza
  HA già attiva.
