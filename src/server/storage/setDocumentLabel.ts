import { StorageLabelKey } from "../../common/types";

/**
 *  Stores a document label that will persist through sessions.
 * @param {string} key The storage label key.
 * @param {string} label The label to storage for given key.
 * @return {void}
 * @customfunction
 */
export default function setDocumentLabel(
  key: StorageLabelKey,
  label: string
): void {
  try {
    const Properties = PropertiesService.getDocumentProperties();
    Properties.setProperty(key, label);
  } catch (error) {
    // TODO: currently we let the client deal with this error
    // but maybe we could retry or/and have multiple layers
    // of storage
    throw error;
  }
}
