import { StorageLabelKey } from "../types";

export const CAPTIONALIZABLE_ELEMENT_TYPES = [
  DocumentApp.ElementType.INLINE_IMAGE,
  DocumentApp.ElementType.TABLE_CELL,
  DocumentApp.ElementType.EQUATION,
] as const;

export const DEFAULT_LABELS: Labels = {
  INLINE_IMAGE: "Figure",
  TABLE: "Table",
  EQUATION: "Equation",
} as const;

// TODO: we should move these types to "types" folder
// but somehow without having circular dependencies
export type Labels = {
  [key in StorageLabelKey]: string;
};
