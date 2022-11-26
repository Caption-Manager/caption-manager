import applyCaptionStyles from "../styles/applyCaptionStyles";
import { Caption, CaptionText } from "../../common/types";

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

// See: https://github.com/google/re2/wiki/Syntax
const RE2_METACHARACTERS = ["*", "+", "?", "(", ")", "|"];

/**
 * Escape with backlash ("\") all Google RE2 metacharacters of string str.
 * For instance, the string:
 * "Figure 2 - Something (rare)"
 * becomes:
 * "Figure 2 - Something \(rare\)"
 * See more on: https://github.com/google/re2/wiki/Syntax
 *
 * @param {string} str A string to be escaped
 * @return {str} The escaped string.
 * @customfunction
 */
function escapeRE2Metacharacters(str: string): string {
  // TODO: is this even a good algorithm? Instead of
  // using some high-level function to replace all
  // metacharacters at once, we are looping and
  // replacing one by one. Is this too expensive?
  // Try to make this faster!
  const escapedStrChars: string[] = [];
  for (const char of str.split("")) {
    const foundedMetaChar = RE2_METACHARACTERS.find(
      METACHAR => char === METACHAR
    );
    const escapedChar = foundedMetaChar ? `\\${foundedMetaChar}` : char;
    escapedStrChars.push(escapedChar);
  }
  return escapedStrChars.join("");
}
