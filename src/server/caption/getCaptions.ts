import getCaption from "./getCaption";
import { Caption, CaptionalizableSelectedElement } from "../../common/types";

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
 * @return {CaptionalizableSelectedElement[]} An list of found elements.
 * @customfunction
 */
function getElements(
  type: GoogleAppsScript.Document.ElementType
): CaptionalizableSelectedElement[] {
  switch (type) {
    case DocumentApp.ElementType.INLINE_IMAGE:
      return getCustomElements(DocumentApp.ElementType.INLINE_IMAGE);
    case DocumentApp.ElementType.TABLE_CELL:
      return getCustomElements(DocumentApp.ElementType.TABLE_CELL);
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
 * @return {CaptionalizableSelectedElement} A list of found elements.
 * @customfunction
 */
function getCustomElements(
  type: GoogleAppsScript.Document.ElementType
): CaptionalizableSelectedElement[] {
  const body = DocumentApp.getActiveDocument().getBody();

  const rangeElements: GoogleAppsScript.Document.RangeElement[] = [];
  let currentElement = body.findElement(type, null);

  while (currentElement) {
    rangeElements.push(currentElement);
    currentElement = body.findElement(type, currentElement);
  }

  const elements = rangeElements.map(rangeElement => rangeElement.getElement());
  return elements as any;
}
