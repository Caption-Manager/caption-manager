import { CaptionParentType } from "../types";

export const CAPTIONALIZABLE_ELEMENT_TYPES: ReadonlyArray<GoogleAppsScript.Document.ElementType> = [
  DocumentApp.ElementType.INLINE_IMAGE,
  DocumentApp.ElementType.TABLE_CELL,
  DocumentApp.ElementType.EQUATION,
];

type DefaultLabels = {
  [key in CaptionParentType]: string;
}

export const DEFAULT_LABELS: DefaultLabels = {
  INLINE_IMAGE: "Figure",
  TABLE: "Table",
  EQUATION: "Equation"
} as const;

