import { CaptionalizableSelectedElementType } from "../../common/types";

/**
 * Converts a string representation of an element type to a
 * @type {GoogleAppsScript.Document.ElementType}.
 * This is needed because we don't have access to this enum on the client.
 *
 * @param {CaptionalizableSelectedElementType} type A string representation of an element type.
 * @return {GoogleAppsScript.Document.ElementType}
 * @customfunction
 */
export default function stringToElementType(
  type: CaptionalizableSelectedElementType
): GoogleAppsScript.Document.ElementType {
  switch (type) {
    case "INLINE_IMAGE":
      return DocumentApp.ElementType.INLINE_IMAGE;

    case "TABLE_CELL":
      return DocumentApp.ElementType.TABLE_CELL;

    case "EQUATION":
      return DocumentApp.ElementType.EQUATION;

    default:
      // This should be impossible
      throw new Error(
        `Unknown element type "${type}" to convert to DocumentApp.ElementType`
      );
  }
}
