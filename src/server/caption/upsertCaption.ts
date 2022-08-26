import getCaptionalizableSelectedElement from "./getCaptionalizableSelectedElement";
import getCaption from "./getCaption";
import updateCaption from "./updateCaption";
import getNextSiblingParagraph from "./getNextSiblingParagraph";
import applyCaptionStyles from "./applyCaptionStyles";
import {
  CaptionalizableSelectedElement,
  CaptionText,
} from "../../common/types";

/**
 * Update (if the @type {Caption} already exists) or insert a @type {Caption} with
 * the specified @type {CaptionText} for the currently selected element.
 * If no element or an invalid element is selected on document, throws an error.
 *
 * @param {CaptionText} text A string that has a label, number and description.
 * @return {void}
 * @customfunction
 */
export default function upsertCaption(text: CaptionText): void {
  const selectedElement = getCaptionalizableSelectedElement();
  const caption = getCaption(selectedElement);
  if (caption) {
    updateCaption(caption, text);
  } else {
    insertCaption(selectedElement, text);
  }
}

/**
 * Inserts a @type {Caption} with specified @type {CaptionText} for the currently selected
 * element.
 *
 * @param {CaptionalizableSelectedElement} element The selected element to insert the caption.
 * @param {CaptionText} text A string that has a label, number and description.
 * @return {void}
 * @customfunction
 */
function insertCaption(
  element: CaptionalizableSelectedElement,
  text: CaptionText
): void {
  const body = DocumentApp.getActiveDocument().getBody();
  const nextSiblingParagraph = getNextSiblingParagraph(element);

  let paragraph: GoogleAppsScript.Document.Paragraph;
  if (!nextSiblingParagraph) {
    // This means the element is at document end
    // element.isAtDocumentEnd() doesn't work though
    paragraph = body.appendParagraph(text);
  } else {
    const nextSiblingParagraphIndex = body.getChildIndex(nextSiblingParagraph);
    paragraph = body.insertParagraph(nextSiblingParagraphIndex, text);
  }

  applyCaptionStyles(paragraph);
}
