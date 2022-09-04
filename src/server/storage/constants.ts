import { DocumentLabels } from "./types";

export const DEFAULT_DOCUMENT_LABELS: DocumentLabels = {
  INLINE_IMAGE: "Figure",
  TABLE: "Table",
  EQUATION: "Equation",
} as const;
