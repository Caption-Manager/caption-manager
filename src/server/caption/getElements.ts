export default function getElements(type: GoogleAppsScript.Document.ElementType) {
  const body = DocumentApp.getActiveDocument().getBody();
  switch (type) {
    case DocumentApp.ElementType.INLINE_IMAGE:
      return body.getImages();
    case DocumentApp.ElementType.TABLE:
    case DocumentApp.ElementType.TABLE_CELL:
      return body.getTables();
    case DocumentApp.ElementType.EQUATION:
      return getCustomElements(body, DocumentApp.ElementType.EQUATION);
    default:
      throw new Error(`Unknown type ${type} to get element from`);
  }
}

function getCustomElements(body: GoogleAppsScript.Document.Body, type: GoogleAppsScript.Document.ElementType) {
  const rangeElements = [];
  let searchResult = null;
  while (searchResult = body.findElement(type, searchResult)) {
    rangeElements.push(searchResult)
  }

  const elements = rangeElements.map(function toEquationElement(rangeElement) {
    return rangeElement.getElement().asEquation();
  });
  return elements;
}