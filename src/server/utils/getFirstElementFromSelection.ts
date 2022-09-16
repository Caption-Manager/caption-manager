/**
 * Gets the first element from user's selection on active document.
 *
 * @return {GoogleAppsScript.Document.Element|null} The first selected element, if any.
 * @customfunction
 */
export default function getFirstElementFromSelection(): GoogleAppsScript.Document.Element | null {
  const selection = DocumentApp.getActiveDocument().getSelection();
  if (!selection) return null;
  const selectedRangeElement = selection.getRangeElements()[0];
  if (!selectedRangeElement) return null;
  return selectedRangeElement.getElement();
}
