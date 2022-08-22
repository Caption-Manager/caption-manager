import getSelectedElement from "./getSelectedElement";
import isCaptionalizable from "./isCaptionalizable";
import getCaption from "./getCaption";
import getNextElement from "./getNextElement";
import applyCaptionStyles from "./applyCaptionStyles";
// Types
import updateCaption from "./updateCaption";
import { CaptionText } from "../../common/types";

export default function upsertCaption(text: CaptionText) {
  const selectedElement = getSelectedElement();
  if (!selectedElement || !isCaptionalizable(selectedElement)) {
    throw new Error(`You must have a captionalizable selected element to upsert a caption`)
  }

  const caption = getCaption(selectedElement);
  if (caption) {
    updateCaption(caption, text);
  } else {
    insertCaption(selectedElement, text);
  }
}

function insertCaption(element: GoogleAppsScript.Document.Element, text: CaptionText) {
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