import getNextElement from "./getNextElement";

export default function getCaption(element: GoogleAppsScript.Document.Element) {
  if (element.isAtDocumentEnd()) return null;
  try {
    const nextElement = getNextElement(element);
    if (!(nextElement.getType() === DocumentApp.ElementType.PARAGRAPH)) return null;

    const firstParagraphElement = nextElement.asParagraph().getChild(0);
    if (!(firstParagraphElement.getType() === DocumentApp.ElementType.TEXT)) return null;
    // TODO: add more stuff to check if the text is a caption or not
    return firstParagraphElement.asText();
  } catch (error) {
    return null;
  }
}

