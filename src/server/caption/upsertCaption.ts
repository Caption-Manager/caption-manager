import getSelectedElement from "../utils/getSelectedElement";
import isCaptionalizable from "./isCaptionalizable";
import getCaption from "./getCaption";
import getNextElement from "./getNextElement";
import applyCaptionStyles from "./applyCaptionStyles";
import updateCaption from "./updateCaption";
import { CaptionText } from "../../common/types";


/**
 * Update (if the @type {Caption} already exists) or insert (on next paragraph) 
 * a @type {Caption} with the specified @type {CaptionText} for the currently selected element.
 * If no element or an invalid element is selected on document, throws an error.
 *
 * @param {CaptionText} text A string that has a label, number and description.
 * @return {void}
 * @customfunction
*/
export default function upsertCaption(text: CaptionText): void {
  const selectedElement = getSelectedElement();
  if (!selectedElement || !isCaptionalizable(selectedElement)) {
    throw new Error(
      `You must have a captionalizable selected element (table, image or equation) to upsert a caption.
      ${selectedElement.getType().toString()} element is not a valid element.`
    );
  }

  const caption = getCaption(selectedElement);
  if (caption) {
    updateCaption(caption, text);
  } else {
    insertCaption(selectedElement, text);
  }
}

function insertCaption(
  element: GoogleAppsScript.Document.Element,
  text: CaptionText
) {
  const body = DocumentApp.getActiveDocument().getBody();
  const nextElement = getNextElement(element);

  let paragraph: GoogleAppsScript.Document.Paragraph;
  if (!nextElement) {
    // This means the element is at document end
    // element.isAtDocumentEnd() doesn't work though
    paragraph = body.appendParagraph(text);
  } else {
    const nextElementIndex = body.getChildIndex(nextElement);
    paragraph = body.insertParagraph(nextElementIndex, text);
  }

  applyCaptionStyles(paragraph);
}
