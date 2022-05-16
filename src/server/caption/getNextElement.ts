export default function getNextElement(element: GoogleAppsScript.Document.Element) {
  switch (element.getType()) {
    case DocumentApp.ElementType.INLINE_IMAGE:
    case DocumentApp.ElementType.EQUATION:
      return element.getParent().getNextSibling();
    case DocumentApp.ElementType.TABLE:
      return element.getNextSibling();
    case DocumentApp.ElementType.TABLE_CELL:
      return element.getParent().getParent().getNextSibling();
    default:
      throw new Error("Unknown type to get next element");
  } 
}