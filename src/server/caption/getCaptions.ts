import getCaption from "./getCaption";

export default function getCaptions(type: GoogleAppsScript.Document.ElementType) {
  const elements = getElements(type);
  return elements.map(element => getCaption(element)).filter(Boolean);
}

function getElements(type: GoogleAppsScript.Document.ElementType) {
  const body = DocumentApp.getActiveDocument().getBody();
  switch (type) {
    case DocumentApp.ElementType.INLINE_IMAGE:
      return body.getImages();
    case DocumentApp.ElementType.TABLE_CELL:
      return body.getTables();
    case DocumentApp.ElementType.EQUATION:
    default:
      throw new Error("Unknown type to get captions");
  }
}