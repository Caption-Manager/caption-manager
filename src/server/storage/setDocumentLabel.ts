import { DocumentLabelStorageKey } from "./types";

/**
 *  Stores a document label that will persist through sessions.
 * @param {string} elementType The type of the element to save the label.
 * @param {string} label The label to storage for given key.
 * @return {void}
 * @customfunction
 */
export default function setDocumentLabel(
  elementType: GoogleAppsScript.Document.ElementType,
  label: string
): void {
  try {
    const Properties = PropertiesService.getDocumentProperties();
    Properties.setProperty(getKeyFromElementType(elementType), label);
  } catch (error) {
    // TODO: currently we let the client deal with this error
    // but maybe we could retry or/and have multiple layers
    // of storage
    throw error;
  }
}

function getKeyFromElementType(
  elementType: GoogleAppsScript.Document.ElementType
): DocumentLabelStorageKey {
  switch (elementType) {
    case DocumentApp.ElementType.INLINE_IMAGE:
      return "INLINE_IMAGE";
    case DocumentApp.ElementType.TABLE_CELL:
      return "TABLE";
    case DocumentApp.ElementType.EQUATION:
      return "EQUATION";
    default:
    // This should be impossible
  }
}
