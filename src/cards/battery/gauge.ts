import { svg, nothing, type SVGTemplateResult } from "lit";

// Con stroke-width 8 il bordo esterno arriva a 46 su 100: i 4 di margine
// assorbono la sporgenza dello stroke-linecap tondo alle estremità dell'arco.
const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Anello del gauge: traccia completa + arco proporzionale al valore.
 * Il colore arriva dal CSS (--ag-gauge-color): qui c'è solo la geometria.
 *
 * `pct` undefined (valore ignoto) -> viene disegnata la sola traccia.
 */
export function ringGauge(pct: number | undefined): SVGTemplateResult {
  const value = pct === undefined ? 0 : Math.min(100, Math.max(0, pct));
  const offset = CIRCUMFERENCE * (1 - value / 100);
  return svg`
    <circle class="ring-track" cx="50" cy="50" r="${RADIUS}"></circle>
    ${
      // A 0% l'arco non va disegnato affatto: con un dash di lunghezza zero e
      // linecap tondo i browser divergono, e alcuni lasciano un puntino a ore 12.
      value > 0
        ? svg`<circle
            class="ring-value"
            cx="50"
            cy="50"
            r="${RADIUS}"
            stroke-dasharray="${CIRCUMFERENCE}"
            stroke-dashoffset="${offset}"
            transform="rotate(-90 50 50)"
          ></circle>`
        : nothing
    }
  `;
}
