import applyCaptionStyles from "../styles/applyCaptionStyles";
import { Caption, CaptionText } from "../../common/types";
import { removeLineBreaks } from "../../common/utils";

/**
 * Updates a @type {Caption} with specified @type {CaptionText} for the currently selected
 * element.
 *
 * @param {Caption} caption The selected caption to update.
 * @param {CaptionText} text A string that has a label, number and description.
 * @return {void}
 * @customfunction
 */
export default function updateCaption(
  caption: Caption,
  text: CaptionText
): void {
  editTextWithoutRemovingBookmark(caption, text);
  applyCaptionStyles(caption.getParent().asParagraph());
}

function editTextWithoutRemovingBookmark(caption: Caption, text: CaptionText) {
  // This is a bit problematic, because "setText" removes an existing bookmark,
  // if any. The current way of replacing text RELIES on the assumption that the
  // bookmark is positioned on the END (last character) of the caption text

  // TODO: we should change this to be able to replace the text no matter
  // where the bookmark is positioned

  // Also, we need to remove line breaks, otherwise (don't know exatcly why)
  // the provided searchPattern doesn't work
  caption.replaceText(removeLineBreaks(caption.getText()), text);
}
