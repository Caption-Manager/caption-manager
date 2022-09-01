import { DEFAULT_LABELS, Labels } from "../../common/constants";

/**
 *  Gets the document stored labels. These labels persist through
 * sessions.
 * @return {string} The final position of the element.
 * @customfunction
 */
export default function getDocumentLabels(): Labels {
  try {
    const Properties = PropertiesService.getDocumentProperties();
    const documentProperties = Properties.getProperties();

    const documentLabels = {};
    for (const key in DEFAULT_LABELS) {
      documentLabels[key] = documentProperties[key] || DEFAULT_LABELS[key];
    }
    return documentLabels as Labels;
  } catch (error) {
    // TODO: currently we just return the default labels.
    // This means that user will lose his stored labels.
    // We could to at least two thing to address that:
    // 1) Improve the cache service, retrying and having other layers of cache
    // 2) Warn the user about what happened
    return DEFAULT_LABELS;
  }
}
