import getCaptionPartsFromString from "./getCaptionPartsFromString";
import getNextBodyChildParagraph from "./getNextBodyChildParagraph";
import { Caption, CaptionText } from "../../common/types";
import {
  leftTrim,
  removeLineBreaks,
  pipe,
  hasLetters,
} from "../../common/utils";
import insertCaption from "./insertCaption";

/**
 * Gets the @type {Caption} for a given element.
 * If no @type {Caption} is found, returns null.
 *
 * @param {GoogleAppsScript.Document.Element} element An element.
 * @return {Caption|null} The Caption element or null if no caption is found.
 * @customfunction
 */
export default function getCaption(
  element: GoogleAppsScript.Document.Element
): Caption | null {
  if (element.isAtDocumentEnd()) return null;

  try {
    const nextSibling = element.getNextSibling()?.asText();
    if (nextSibling?.getType() !== DocumentApp.ElementType.TEXT) {
      return getCaptionFromNextBodyChildParagraph(element);
    }

    // We are *defining* here that an Equation's next sibling can't be a Caption
    // For Equations, there's a much bigger chance that the next sibling it's just an inlined text
    // and so there is a greater risk of confusing this text with a Caption
    // (e.g. in "{equation} approximately 10", "approximately 10" would be mistaken for Caption)
    if (element.getType() === DocumentApp.ElementType.EQUATION) {
      return null;
    }

    // We then address the case where the next sibling can be a caption.
    // Visually, it may look like a normal Caption, but it's just a Text element starting with a
    // line break or lots of empty spaces
    // (e.g. "\n Figure 1 - Some description" or "         Figure 1 - Some description")

    // We remove line breaks and empty spaces at the start
    const text = pipe(removeLineBreaks, leftTrim)(nextSibling.getText());
    if (!seemsToBeCaptionText(text)) return null;

    // The next sibling is probably indeed a Caption. So we replace this next sibling Caption
    // with a next body child Caption. We want the caption to be in the next paragraph, so that
    // we don't need to remove line breaks and empty spaces everytime we get the caption text
    nextSibling.removeFromParent();
    return insertCaption(element, text as CaptionText);
  } catch (error) {
    return null;
  }
}

/**
 * Tries to get the @type {Caption} from the next body child paragraph.
 * This is useful because the direct next paragraph can be, for example, a
 * Paragraph inside a Table Cell, which will definitely not contain a Caption.
 * If no @type {Caption} is found, returns null.
 *
 * @param {GoogleAppsScript.Document.Element} element An element.
 * @return {Caption|null} The Caption element or null if no caption is found.
 * @customfunction
 */
function getCaptionFromNextBodyChildParagraph(
  element: GoogleAppsScript.Document.Element
): Caption | null {
  const nextParagraph = getNextBodyChildParagraph(element);
  if (!nextParagraph) return null;

  const paragraphFirstChild = nextParagraph.asParagraph().getChild(0);
  if (paragraphFirstChild.getType() !== DocumentApp.ElementType.TEXT)
    return null;

  const maybeCaption = paragraphFirstChild.asText();
  if (!seemsToBeCaptionText(maybeCaption.getText())) return null;

  return maybeCaption as Caption;
}

/**
 * Validates if a text seems to have the structure of a @type {CaptionText}
 *
 * @param {string} text A text thay may conform to the @type {CaptionText} structure.
 * @return {boolean} A flag indicating whether the text has the structure of a @type {CaptionText} or not.
 * @customfunction
 */
function seemsToBeCaptionText(text: string): boolean {
  const { number } = getCaptionPartsFromString(text);
  if (isNaN(number)) return false;

  // At this point we know the caption text has the following structure:
  // `{string} {number}`.

  // 1) We don't check if the caption label matches a document label.
  // Because if the user changes the document label and for some reason (like
  // a non-enabled "autoUpdateCaptions" option) the other captions are not updated,
  // the user will have to manually, one by one, change the label of these other captions.

  // 2) The current verification process leads to a know caveat.
  // If the user has a captionizable element (image, table, equation) *without* a caption
  // AND whose next sibling text or next body child paragraph text has the structure `{string} {number}`,
  // this text will be wrongly recognised as a caption. This is not a big deal, because it's a corner
  // case scenario (generally we expected all captionalizable elements to have captions). But it's
  // important to document this for users also.
  return true;
}
