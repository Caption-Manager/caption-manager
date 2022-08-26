import { StorageLabelKey } from "../types";

export const CAPTIONALIZABLE_ELEMENT_TYPES: ReadonlyArray<GoogleAppsScript.Document.ElementType> = [
  DocumentApp.ElementType.INLINE_IMAGE,
  DocumentApp.ElementType.TABLE_CELL,
  DocumentApp.ElementType.EQUATION,
];

type Labels = {
  [key in StorageLabelKey]: string;
};

export const DEFAULT_LABELS: Labels = {
  INLINE_IMAGE: "Figure",
  TABLE: "Table",
  EQUATION: "Equation",
} as const;
