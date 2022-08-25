import getFirstSelectedElement from "../utils/getFirstSelectedElement";
import isCaptionalizable from "./isCaptionalizable";
import getCaption from "./getCaption";
import getNextSiblingParagraph from "./getNextSiblingParagraph";
import applyCaptionStyles from "./applyCaptionStyles";
import updateCaption from "./updateCaption";
import { CaptionText } from "../../common/types";


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
  const selectedElement = getFirstSelectedElement();
  if (!selectedElement || !isCaptionalizable(selectedElement)) {
    const baseErrorMessage = "You must have a captionalizable selected element (table, image or equation) to upsert a caption.";
    throw new Error(!selectedElement ? 
      baseErrorMessage : 
      `${baseErrorMessage} ${selectedElement.getType().toString()} element is not a valid element.`
    );
  }

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
 * @param {GoogleAppsScript.Document.Element} element The selected element to insert the caption.
 * @param {CaptionText} text A string that has a label, number and description.
 * @return {void}
 * @customfunction
*/
function insertCaption(
  element: GoogleAppsScript.Document.Element,
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

