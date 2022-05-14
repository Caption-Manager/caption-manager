import { Caption } from "./Caption";
import { CAPTION_ELEMENT_TYPES } from "./constants";

export function getCaptions(type: GoogleAppsScript.Document.ElementType): Caption[] {
  // TODO: implement
  return [];
}

export function getSelectedElement(): GoogleAppsScript.Document.Element {
  const selection = DocumentApp.getActiveDocument().getSelection();
  if (!selection) return null;
  return selection.getRangeElements()[0].getElement();
}

export function isCaptionalizable(element: GoogleAppsScript.Document.Element) {
  return CAPTION_ELEMENT_TYPES.some(type => element.getType() === type);
}