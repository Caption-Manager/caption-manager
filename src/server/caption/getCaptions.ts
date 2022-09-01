import getCaption from "./getCaption";
import { Caption } from "../../common/types";
import getElements from "../utils/getElements";

/**
 * Gets all captions (@type {Caption[]}) for a given element type.
 *
 * @param {GoogleAppsScript.Document.ElementType} type An element type.
 * @return {Caption[]} An array of captions.
 * @customfunction
 */
export default function getCaptions(
  type: GoogleAppsScript.Document.ElementType
): Caption[] {
  return getCaptionalizableElements(type)
    .map(getCaption)
    .filter(Boolean);
}

/**
 * Gets an array of elements of the specified element type.
 * This is useful to make sure we are indeed getting captionalizable elements
 * and to get the right table count.
 *
 * @param {GoogleAppsScript.Document.ElementType} type An element type.
 * @return {GoogleAppsScript.Document.Element[]} An list of found elements.
 * @customfunction
 */
function getCaptionalizableElements(
  type: GoogleAppsScript.Document.ElementType
): GoogleAppsScript.Document.Element[] {
  switch (type) {
    case DocumentApp.ElementType.INLINE_IMAGE:
      return getElements(DocumentApp.ElementType.INLINE_IMAGE);
    case DocumentApp.ElementType.TABLE_CELL:
      // If the type is a TABLE_CELL, we are actually looking for the TABLE
      // captions. And to get the right number of TABLES instead of TABLE_CELLS,
      // we must get the TABLES.
      return getElements(DocumentApp.ElementType.TABLE);
    case DocumentApp.ElementType.EQUATION:
      return getElements(DocumentApp.ElementType.EQUATION);
    default:
      throw new Error(`Unknown type ${type.toString()} to get element from`);
  }
}
