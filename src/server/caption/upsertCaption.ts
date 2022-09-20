import getCaption from "./getCaption";
import updateCaption from "./updateCaption";
import getNextBodyChildParagraph from "./getNextBodyChildParagraph";
import applyCaptionStyles from "../styles/applyCaptionStyles";
import { CaptionText } from "../../common/types";

/**
 * Update (if the @type {Caption} already exists) or insert a @type {Caption} with
 * the specified @type {CaptionText} for the given element.
 *
 * @param {GoogleAppsScript.Document.Element} element An element to update or insert the caption on.
 * @param {CaptionText} text A text representation of the caption.
 * @return {void}
 * @customfunction
 */
export default function upsertCaption(
  element: GoogleAppsScript.Document.Element,
  text: CaptionText
): void {
  const caption = getCaption(element);
  if (caption) {
    updateCaption(caption, text);
  } else {
    insertCaption(element, text);
  }
}

/**
 * Inserts a @type {Caption} with specified @type {CaptionText} for the given element.
 *
 * @param {GoogleAppsScript.Document.Element} element An element to update or insert the caption on.
 * @param {CaptionText} text A text representation of the caption.
 * @return {void}
 * @customfunction
 */
function insertCaption(
  element: GoogleAppsScript.Document.Element,
  text: CaptionText
): void {
  const body = DocumentApp.getActiveDocument().getBody();
  const nextBodyChildParagraph = getNextBodyChildParagraph(element);

  let paragraph: GoogleAppsScript.Document.Paragraph;
  if (!nextBodyChildParagraph) {
    // This means the element is at document end
    // element.isAtDocumentEnd() doesn't work though
    paragraph = body.appendParagraph(text);
  } else {
    const nextBodyChildParagraphIndex = body.getChildIndex(
      nextBodyChildParagraph
    );
    paragraph = body.insertParagraph(nextBodyChildParagraphIndex, text);
  }

  applyCaptionStyles(paragraph);
}
