import { includes } from "../../common/utils";

/**
 * Gets the next paragraph that can contain a caption. The direct next sibling 
 * (element.getNextSibling()) can be a Paragraph inside a Table Cell, for instance.
 * 
 * @param {GoogleAppsScript.Document.ElementType} element An element type.
 * @return {GoogleAppsScript.Document.ElementType} A paragraph element type. We don't return a 
 * @type {GoogleAppsScript.Document.Paragraph} to facilitate typing.
 * 
 * See:
 * https://developers.google.com/apps-script/guides/docs#structure_of_a_document
 * 
 * @customfunction
*/
export default function getNextSiblingParagraph(element: GoogleAppsScript.Document.Element): GoogleAppsScript.Document.Element | null {
  let nextSibling: GoogleAppsScript.Document.Element;
  const elementType = element.getType();

  if (includes([DocumentApp.ElementType.INLINE_IMAGE, DocumentApp.ElementType.EQUATION], elementType)) {
    nextSibling = element.getParent().getNextSibling();
  } else if (elementType === DocumentApp.ElementType.TABLE) {
    nextSibling = element.getNextSibling();
  } else if (elementType === DocumentApp.ElementType.TABLE_CELL) {
    nextSibling = element.getParent().getParent().getNextSibling();
  } else {
    throw new Error(`Unknown type ${element.getType().toString()} to get next element`);
  }

  if (!nextSibling || nextSibling.getType() !== DocumentApp.ElementType.PARAGRAPH) return null;
  return nextSibling;
}