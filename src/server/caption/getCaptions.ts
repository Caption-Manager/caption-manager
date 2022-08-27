import getCaption from "./getCaption";
import { Caption } from "../../common/types";

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
  return getElements(type)
    .map(getCaption)
    .filter(Boolean);
}

/**
 * Gets an array of elements of the specified element type.
 *
 * @param {GoogleAppsScript.Document.ElementType} type An element type.
 * @return {GoogleAppsScript.Document.Element[]} An list of found elements.
 * @customfunction
 */
function getElements(
  type: GoogleAppsScript.Document.ElementType
): GoogleAppsScript.Document.Element[] {
  switch (type) {
    case DocumentApp.ElementType.INLINE_IMAGE:
      return getCustomElements(DocumentApp.ElementType.INLINE_IMAGE);
    case DocumentApp.ElementType.TABLE_CELL:
      // To get the right Table count, we must get Tables instead of Table Cell
      return getCustomElements(DocumentApp.ElementType.TABLE);
    case DocumentApp.ElementType.EQUATION:
      return getCustomElements(DocumentApp.ElementType.EQUATION);
    default:
      throw new Error(`Unknown type ${type.toString()} to get element from`);
  }
}

/**
 * Retrieves all elements contained in the section.
 *
 * @param {GoogleAppsScript.Document.ElementType} type An element type.
 * @return {GoogleAppsScript.Document.Element[]} A list of found elements.
 * @customfunction
 */
function getCustomElements(
  type: GoogleAppsScript.Document.ElementType
): GoogleAppsScript.Document.Element[] {
  const body = DocumentApp.getActiveDocument().getBody();

  const rangeElements: GoogleAppsScript.Document.RangeElement[] = [];
  let currentElement = body.findElement(type, null);

  while (currentElement) {
    rangeElements.push(currentElement);
    currentElement = body.findElement(type, currentElement);
  }

  const elements = rangeElements.map(rangeElement => rangeElement.getElement());
  return elements;
}
