/**
 * Gets the last user selected element from selection or the cursor element
 * on active document.
 *
 * @return {GoogleAppsScript.Document.Element} The last selected or cursor element.
 * @customfunction
 */
export default function getLastSelectedOrCursorElement(): GoogleAppsScript.Document.Element {
  const cursor = DocumentApp.getActiveDocument().getCursor();
  if (cursor) return cursor.getElement();

  const selection = DocumentApp.getActiveDocument().getSelection();
  if (selection) {
    const rangeElements = selection.getRangeElements();
    return rangeElements[rangeElements.length - 1].getElement();
  }

  // No cursor or selection.
  // Not sure if this is even possible, but anyway
  // we insert a paragraph at the end of the document
  const body = DocumentApp.getActiveDocument().getBody();
  return body.appendParagraph("") as any;
}
