import { DEFAULT_DOCUMENT_LABELS } from "./constants";
import { DocumentLabels } from "./types";

/**
 *  Gets the document stored labels. These labels persist through
 * sessions.
 * @return {DocumentLabels} The document labels.
 * @customfunction
 */
export default function getDocumentLabels(): DocumentLabels {
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
