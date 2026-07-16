// Carica le variabili definite in `.env` (se presente) in process.env.
// Non sovrascrive le variabili passate inline: `HA_WWW=... npm run dev` vince comunque.
import "dotenv/config";
import path from "node:path";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";

const dev = process.env.ROLLUP_WATCH;

// In sviluppo si può scrivere il bundle direttamente nella cartella `www`
// dell'istanza HA impostando la variabile HA_WWW (percorso locale/montato).
// Es: HA_WWW=/percorso/config/www npm run dev
const haWww = process.env.HA_WWW;
const outFile = haWww ? path.join(haWww, "ag-cards.js") : "dist/ag-cards.js";

export default {
  input: "src/ag-cards.ts",
  output: {
    file: outFile,
    format: "es",
    inlineDynamicImports: true,
    sourcemap: dev ? true : false,
  },
  plugins: [
    resolve(),
    json(),
    typescript({ tsconfig: "./tsconfig.json" }),
    !dev &&
      terser({
        format: { comments: false },
      }),
  ],
};
