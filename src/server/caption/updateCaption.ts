import applyCaptionStyles from "./applyCaptionStyles";
import { Caption, CaptionText } from "../../common/types";

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
  // This is a bit problematic, as the text can contain a bookmark
  // and using "setText" removes the bookmark. The partial solution
  // is reinserting the bookmark after updating the caption
  caption.setText(text);
  applyCaptionStyles(caption.getParent().asParagraph());
}
