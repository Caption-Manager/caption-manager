type DocumentLabelStorageKey = "INLINE_IMAGE" | "TABLE" | "EQUATION";

type DocumentLabels = {
  [key in DocumentLabelStorageKey]: string;
};

const DEFAULT_DOCUMENT_LABELS: DocumentLabels = {
  INLINE_IMAGE: "Figure",
  TABLE: "Table",
  EQUATION: "Equation",
} as const;

/**
 *  Gets the document stored labels. These labels persist through
 * sessions.
 * @return {DocumentLabels} The document labels.
 * @customfunction
 */
export function getDocumentLabels(): DocumentLabels {
  try {
    const Properties = PropertiesService.getDocumentProperties();
    const documentProperties = Properties.getProperties();

    const documentLabels = {};
    for (const key in DEFAULT_DOCUMENT_LABELS) {
      documentLabels[key] =
        documentProperties[key] || DEFAULT_DOCUMENT_LABELS[key];
    }
    return documentLabels as DocumentLabels;
  } catch (error) {
    // TODO: currently we just return the default labels.
    // This means that user will lose his stored labels.
    // We could to at least two thing to address that:
    // 1) Improve the cache service, retrying and having other layers of cache
    // 2) Warn the user about what happened
    return DEFAULT_DOCUMENT_LABELS;
  }
}

/**
 *  Stores a document label that will persist through sessions.
 * @param {string} elementType The type of the element to save the label.
 * @param {string} label The label to storage for given key.
 * @return {void}
 * @customfunction
 */
export function setDocumentLabel(
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
