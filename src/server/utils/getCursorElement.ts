/**
 * Gets the cursor element on active document.
 *
 * @return {GoogleAppsScript.Document.Element|null} The cursor element.
 * @customfunction
 */
export default function getCursorElement(): GoogleAppsScript.Document.Element | null {
  const cursor = DocumentApp.getActiveDocument().getCursor();
  if (!cursor) return null;
  const cursorElement = cursor.getElement();
  if (!cursorElement) return null;
  return cursorElement;
}
