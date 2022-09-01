/**
 * Retrieves all elements contained in the section.
 *
 * @param {GoogleAppsScript.Document.ElementType} type An element type.
 * @return {GoogleAppsScript.Document.Element[]} A list of found elements.
 * @customfunction
 */
export default function getElements(
  type: GoogleAppsScript.Document.ElementType
): GoogleAppsScript.Document.Element[] {
  const body = DocumentApp.getActiveDocument().getBody();

  const rangeElements: GoogleAppsScript.Document.RangeElement[] = [];
  let elementToStartSearchFrom = body.findElement(type, null);

  while (elementToStartSearchFrom) {
    rangeElements.push(elementToStartSearchFrom);
    elementToStartSearchFrom = body.findElement(type, elementToStartSearchFrom);
  }

  const elements = rangeElements.map(rangeElement => rangeElement.getElement());
  return elements;
}
