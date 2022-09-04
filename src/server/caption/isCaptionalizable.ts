const CAPTIONALIZABLE_ELEMENT_TYPES = [
  DocumentApp.ElementType.INLINE_IMAGE,
  DocumentApp.ElementType.TABLE_CELL,
  DocumentApp.ElementType.EQUATION,
] as const;

/**
 * Determines whether the element can contain a caption or not.
 *
 * @param {GoogleAppsScript.Document.Element} element An element.
 * @return {boolean} A boolean indicating whether the element can contain a caption or not.
 * @customfunction
 */
export default function isCaptionalizable(
  element: GoogleAppsScript.Document.Element
): boolean {
  return CAPTIONALIZABLE_ELEMENT_TYPES.some(type => type === element.getType());
}
