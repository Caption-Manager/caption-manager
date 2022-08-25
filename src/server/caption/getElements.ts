export default function getElements(type: GoogleAppsScript.Document.ElementType) {
  const body = DocumentApp.getActiveDocument().getBody();
  switch (type) {
    case DocumentApp.ElementType.INLINE_IMAGE:
      return body.getImages();
    case DocumentApp.ElementType.TABLE:
    case DocumentApp.ElementType.TABLE_CELL:
      return body.getTables();
    case DocumentApp.ElementType.EQUATION:
      return getEquations(body);
    default:
      throw new Error(`Unknown type ${type} to get element from`);
  }
}

function getEquations(body: GoogleAppsScript.Document.Body) {
  const rangeElements = [];
  let searchResult = null;
  while (searchResult = body.findElement(DocumentApp.ElementType.EQUATION, searchResult)) {
    rangeElements.push(searchResult)
  }

  const equations = rangeElements.map(function toEquationElement(rangeElement) {
    return rangeElement.getElement().asEquation();
  });
  return equations;
}