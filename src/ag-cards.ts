import { AG_CARDS_VERSION } from "./const";

/**
 * Entry point della collezione AG Cards.
 *
 * Ogni nuova card va importata qui per essere inclusa nel bundle unico
 * `dist/ag-cards.js`. L'import esegue la registrazione del custom element
 * e l'aggiunta al selettore card di Lovelace (vedi src/utils/register-card.ts).
 *
 * Esempio (quando aggiungeremo la prima card):
 *   import "./cards/badge/ag-badge-card";
 */

// -- Registrazione card --------------------------------------------------
import "./cards/entity/ag-entity-card";
import "./cards/load/ag-load-card";
import "./cards/alarm/ag-alarm-card";
import "./cards/battery/ag-battery-card";
import "./cards/bar/ag-bar-card";
import "./cards/energy/ag-energy-card";
import "./cards/panel/ag-panel-card";
import "./cards/vstack/ag-vstack-card";
import "./cards/hstack/ag-hstack-card";
import "./cards/separator/ag-separator-card";

// -- Banner di avvio -----------------------------------------------------
/* eslint-disable no-console */
console.info(
  `%c AG-CARDS %c v${AG_CARDS_VERSION} `,
  "color: white; background: #03a9f4; font-weight: 700;",
  "color: #03a9f4; background: white; font-weight: 700;"
);
/* eslint-enable no-console */

export { AG_CARDS_VERSION };
