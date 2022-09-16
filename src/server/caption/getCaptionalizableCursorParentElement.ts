/**
 * Gets a captionalizable element parent of the cursor element, if any.
 * Else returns null.
 *
 * @param {GoogleAppsScript.Document.Element|null} cursorElement The element from user's cursor in the active document.
 * @return {GoogleAppsScript.Document.Element|null} The captionalizable element which is parent of the cursor element.
 * @customfunction
 */
export default function getCaptionalizableCursorParentElement(
  cursorElement: GoogleAppsScript.Document.Element
): GoogleAppsScript.Document.Element | null {
  let currentParent = cursorElement.getParent();
  while (currentParent) {
    if (
      [
        DocumentApp.ElementType.EQUATION,
        DocumentApp.ElementType.TABLE_CELL,
      ].includes(currentParent.getType())
    ) {
      return (currentParent as unknown) as GoogleAppsScript.Document.Element;
    }
    currentParent = currentParent.getParent();
  }
  return null;
}
