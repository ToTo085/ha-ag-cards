import type { AgContainerCardConfig } from "../../base/ag-container-card";

// Nome del tipo card usato in YAML: `type: custom:ag-hstack-card`
export const CARD_TYPE = "ag-hstack-card";
export const CARD_NAME = "AG HStack Card";
export const EDITOR_TYPE = `${CARD_TYPE}-editor`;

// Nessuna opzione oltre a quelle comuni dei contenitori (flat, cards).
export type AgHstackCardConfig = AgContainerCardConfig;
