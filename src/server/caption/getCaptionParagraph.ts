import { Caption } from "../../common/types";

/**
 * Gets the parent paragraph element that contains the @type {Caption}.
 * If no paragraph is found, returns null.
 *
 * @param {Caption} caption A caption.
 * @return {GoogleAppsScript.Document.Paragraph|null} The parent paragraph or null.
 * @customfunction
 */
export default function getCaptionParagraph(
  caption: Caption
): GoogleAppsScript.Document.Paragraph | null {
  let parent = caption.getParent();
  while (parent) {
    if (parent.getType() === DocumentApp.ElementType.PARAGRAPH)
      return parent.asParagraph();
    else {
      parent = parent.getParent();
    }
  }

  return null;
}
