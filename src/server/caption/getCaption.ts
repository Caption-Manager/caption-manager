import getCaptionPartsFromString from "./getCaptionPartsFromString";
import getNextBodyChildParagraph from "./getNextBodyChildParagraph";
import { Caption } from "../../common/types";
import { hasLetters } from "../../common/utils";

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
    const surroundingText = getSurroundingText(element);
    if (surroundingText && hasLetters(surroundingText.getText())) {
      // If there's text surrounding the element, maybe it's a caption
      // in the wrong place
      return getCaptionFromSurroundingText(element, surroundingText);
    } else {
      // If there's no valid surrounding text, the caption, if there is one, must be on
      // the next body child paragraph
      return getCaptionFromNextBodyChildParagraph(element);
    }
  } catch (error) {
    return null;
  }
}

/**
 * Tries to get a text element surrounding (immediately after) the element @type {GoogleAppsScript.Document.Element}.
 * If no @type {GoogleAppsScript.Document.Text} is found, returns null.
 *
 * @param {GoogleAppsScript.Document.Element} element An element.
 * @return {Caption|null} A text element or null if no text is found.
 * @customfunction
 */
function getSurroundingText(
  element: GoogleAppsScript.Document.Element
): GoogleAppsScript.Document.Text | null {
  const nextSibling = element.getNextSibling();
  if (!nextSibling || nextSibling.getType() !== DocumentApp.ElementType.TEXT) {
    return null;
  }
  return nextSibling.asText();
}

/**
 * Tries to get the @type {Caption} from the element's surrounding text.
 * This is useful because the caption can be not in the next paragraph,
 * but in the same paragraph of the element as a Text element.
 * Visually, it can look like a normal Caption, but in this case it's just a
 * Text starting with a line break (like "\n Figure 1 - Some description")
 * If no @type {Caption} is found, returns null.
 *
 * @param {GoogleAppsScript.Document.Element} element An element.
 * @param {GoogleAppsScript.Document.Text} text The surrounding text.
 * @return {Caption|null} The Caption element or null if no caption is found.
 * @customfunction
 */
function getCaptionFromSurroundingText(
  element: GoogleAppsScript.Document.Element,
  text: GoogleAppsScript.Document.Text
): Caption | null {
  // We are trying to address here the scenario where we have a caption in the
  // same paragraph of the element, as a Text element. Visually, it can look like a normal
  // Caption, but in this case it's just a Text starting with a line break
  // (like "\n Figure 1 - Some description")

  // We are defining here that Equations can't have captions as surrounding text
  // This caused a lot of bugs in the past
  if (element.getType() === DocumentApp.ElementType.EQUATION) {
    return null;
  } else {
    // TODO: The caption is in the wrong position here. Maybe warn the user or try to
    // move the caption to the next body child paragraph
    return getCaptionAfterVerifyParts(text);
  }
}

/**
 * Tries to get the @type {Caption} from the next body child paragraph.
 * This is useful because the direct next sibling (element.getNextSibling()) can be a
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
  return getCaptionAfterVerifyParts(maybeCaption);
}

/**
 * Gets the @type {Caption} after verifying that its parts indeed look like a caption
 * If it doesn't looke like a @type {Caption}, returns null.
 *
 * @param {GoogleAppsScript.Document.Element} maybeCaption An element that may be a Caption.
 * @return {Caption|null} The Caption element or null if it doesn't look like a caption.
 * @customfunction
 */
function getCaptionAfterVerifyParts(
  maybeCaption: GoogleAppsScript.Document.Text
): Caption | null {
  const { number } = getCaptionPartsFromString(maybeCaption.getText());
  if (isNaN(number)) return null;

  // At this point we know the caption text has the following structure:
  // `{string} {number}`.

  // 1) We don't check if the caption label matches a document label.
  // Because if the user changes the document label and for some reason (like
  // a non-enabled "autoUpdateCaptions" option) the other captions are not updated,
  // the user will have to manually, one by one, change the label of these other captions.

  // 2) The current verifcation process leads to a know caveat.
  // If the user has a captionizable element (image, table, equation) *without* a caption
  // AND whose immediate next text or text of next paragraph has the structure `{string} {number}`,
  // this text will be wrongly recognised as a caption. This is not a big deal, because it's a corner
  // case scenario (generally we expected all captionalizable elements to have captions). But it's
  // important to document this for users.
  return maybeCaption as Caption;
}
