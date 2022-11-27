import { Caption, CaptionText } from "../../common/types";
import applyCaptionStyles from "../styles/applyCaptionStyles";
import getNextBodyChildParagraph from "./getNextBodyChildParagraph";

/**
 * Inserts a @type {Caption} with specified @type {CaptionText} for the given element.
 *
 * @param {GoogleAppsScript.Document.Element} element An element to update or insert the caption on.
 * @param {CaptionText} text A text representation of the caption.
 * @return {void}
 * @customfunction
 */
export default function insertCaption(
  element: GoogleAppsScript.Document.Element,
  text: CaptionText
): Caption {
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
  return paragraph.getChild(0).asText();
}
