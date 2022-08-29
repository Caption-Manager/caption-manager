/**
 * Creates a path in document for a given element.
 * @param {GoogleAppsScript.Document.Element} element An element.
 * @param {string|number[]} [path] Current path for given iteration.
 * @return {number[]} The final path of the element.
 *
 * IMPORTANT:
 * I don't really understand well how this works, this is confusing code. Sorry.
 *
 * This was inspired by
 * https://sites.google.com/a/mcpher.com/share/Home/excelquirks/docs/sortbookmarks
 * https://developers.google.com/apps-script/guides/docs#structure_of_a_document
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
 *
 * The main purpose of this function is to create a simple and reliable way
 * to compare the position in document for different elements.
 *
 * The output is an array of numbers for a given element, where:
 *
 * 1) The first number determines the master element, a Body (if 0),
 * HeaderSection, FooterSection or FooternoteSection.
 * Since there's no sense in comparing these kind of elements, we consider
 * them "disconnected" when compared.
 *
 * 2) The second number determines the element index in relation to the master element.
 * So if we have a path output of [0, 2], this means that the element is
 * child of the body and is the third (2 is an index) direct child of the body.
 *
 * 3) The third number determines the element index in relation to the master direct child.
 * So if we have a path output of [0, 4, 3], this means that the element is the
 * fourth (3) child OF the fifth (4) body direct child.
 *
 * 4) And so on..., depending on how nested the element is.
 *
 * EXAMPLES:
 *
 * 1)
 * -> [0, 0]
 * BODY
 *  PARAGRAPH
 *
 * 2)
 * -> [0, 1, 0]
 * BODY
 *  FIRST DIRECT CHILD
 *  PARAGRAPH
 *    INLINE IMAGE
 *
 * 3)
 * -> [0, 6, 2, 1, 0, 0]
 * BODY
 *  ...SIX ELEMENTS
 *  TABLE
 *    [...TWO TABLE ROWS]
 *    TABLE ROW
 *      TABLE CELL
 *      TABLE CELL
 *        PARAGRAPH
 *          TEXT
 *
 *
 * @customfunction
 */

const LEVEL_SEPARATOR = ".";

export default function pathInDocument(
  element: any,
  path?: string | number[]
): number[] {
  path = path || "";
  const parent = element?.getParent();
  if (parent) {
    path = pathInDocument(
      parent,
      Utilities.formatString(
        `%01d${LEVEL_SEPARATOR}%s`, // This means a string of 1 digit, with the level separator in the end (0.)
        parent?.getChildIndex(element) as any,
        path as any
      )
    );
    return path;
  }

  if (typeof path !== "string")
    throw new Error(`Invalid element to get path in document`);

  const pathAsNumberedArray = path
    .split(LEVEL_SEPARATOR)
    .filter(Boolean) // For some reason there's an empty space [..., ""] in the end, and this way we remove it
    .map(Number);
  return pathAsNumberedArray;
}
