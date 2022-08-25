export const CAPTIONALIZABLE_ELEMENT_TYPES: ReadonlyArray<GoogleAppsScript.Document.ElementType> = [
  DocumentApp.ElementType.INLINE_IMAGE,
  DocumentApp.ElementType.TABLE_CELL,
  DocumentApp.ElementType.EQUATION,
];

export const DEFAULT_LABELS = {
  INLINE_IMAGE: "Figure",
  TABLE: "Table",
  EQUATION: "Equation"
} as const;

