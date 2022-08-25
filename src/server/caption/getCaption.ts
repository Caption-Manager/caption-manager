import { Caption } from "../../common/types";
import getNextElement from "./getNextElement";

export default function getCaption(element: GoogleAppsScript.Document.Element): Caption | null {
  if (element.isAtDocumentEnd()) return null;
  try {
    const nextElement = getNextElement(element);
    if (!(nextElement.getType() === DocumentApp.ElementType.PARAGRAPH)) return null;

    const paragraphFirstText = nextElement.asParagraph().getChild(0);
    if (!(paragraphFirstText.getType() === DocumentApp.ElementType.TEXT)) return null;
    // TODO: add more stuff to check if the text is a caption or not
    return paragraphFirstText.asText();
  } catch (error) {
    return null;
  }
}

