import type { AgContainerCardConfig } from "../../base/ag-container-card";

// Nome del tipo card usato in YAML: `type: custom:ag-vstack-card`
export const CARD_TYPE = "ag-vstack-card";
export const CARD_NAME = "AG VStack Card";
export const EDITOR_TYPE = `${CARD_TYPE}-editor`;

// Nessuna opzione oltre a quelle comuni dei contenitori (flat, cards).
export type AgVstackCardConfig = AgContainerCardConfig;
