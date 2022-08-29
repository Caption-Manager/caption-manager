import comparePathInDocument, {
  RelativeDocumentPath,
} from "./comparePathInDocument";
import pathInDocument from "./pathInDocument";

/**
 * Wrapper on top of path internal functions to make sure path comparisons
 * are made in the right way.
 *
 * @param {GoogleAppsScript.Document.Element} element An element.
 * @return {object} An object with functions to be publicly used
 * to compare or get paths.
 * @customfunction
 */
export default function Path(element: GoogleAppsScript.Document.Element) {
  const elementPath = pathInDocument(element);

  return {
    isBefore(otherElement: GoogleAppsScript.Document.Element) {
      return [
        RelativeDocumentPath.PRECEDING,
        RelativeDocumentPath.CONTAINS,
      ].includes(comparePathInDocument(element, otherElement));
    },

    isAfter(otherElement: GoogleAppsScript.Document.Element) {
      return [
        RelativeDocumentPath.FOLLOWING,
        RelativeDocumentPath.CONTAINED_BY,
      ].includes(comparePathInDocument(element, otherElement));
    },

    contains(otherElement: GoogleAppsScript.Document.Element) {
      return (
        comparePathInDocument(element, otherElement) ===
        RelativeDocumentPath.CONTAINS
      );
    },

    isContainedBy(otherElement: GoogleAppsScript.Document.Element) {
      return (
        comparePathInDocument(element, otherElement) ===
        RelativeDocumentPath.CONTAINED_BY
      );
    },

    isEqual(otherElement: GoogleAppsScript.Document.Element) {
      return (
        comparePathInDocument(element, otherElement) ===
        RelativeDocumentPath.SAME
      );
    },

    getPath() {
      return elementPath;
    },
  };
}
