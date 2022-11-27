import applyCaptionStyles from "../styles/applyCaptionStyles";
import { Caption, CaptionText } from "../../common/types";
import { escapeRE2Metacharacters } from "../../common/utils/Regex";

/**
 * Updates a @type {Caption} with specified @type {CaptionText}.
 *
 * @param {Caption} caption The caption to update.
 * @param {CaptionText} text A text representation of a caption.
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
  // where the bookmark is positioned - start, end or whatever
  caption.replaceText(escapeRE2Metacharacters(caption.getText()), text);
}
