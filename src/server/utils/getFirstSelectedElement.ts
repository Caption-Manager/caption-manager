/**
 * Gets the first user selected element on active document.
 *
 * @return {GoogleAppsScript.Document.Element} The first selected element.
 * @customfunction
 */
export default function getFirstSelectedElement(): GoogleAppsScript.Document.Element {
  const selection = DocumentApp.getActiveDocument().getSelection();
  if (!selection) return null;
  const selectedRangeElement = selection.getRangeElements()[0];
  if (!selectedRangeElement) return null;
  return selectedRangeElement.getElement();
}
