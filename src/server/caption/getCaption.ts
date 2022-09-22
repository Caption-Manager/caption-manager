import getCaptionPartsFromString from "./getCaptionPartsFromString";
import getNextBodyChildParagraph from "./getNextBodyChildParagraph";
import { Caption } from "../../common/types";

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
    const captionFromText = getCaptionFromText(element);
    if (captionFromText) return captionFromText;

    const captionFromNextBodyChildParagraph = getCaptionFromNextBodyChildParagraph(
      element
    );
    if (captionFromNextBodyChildParagraph)
      return captionFromNextBodyChildParagraph;

    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Tries to get the @type {Caption} from the text immediately after the @type {GoogleAppsScript.Document.Element}.
 * If no @type {Caption} is found, returns null.
 *
 * @param {GoogleAppsScript.Document.Element} element An element.
 * @return {Caption|null} The Caption element or null if no caption is found.
 * @customfunction
 */
function getCaptionFromText(
  element: GoogleAppsScript.Document.Element
): Caption | null {
  // What we are trying to address here is the scenario where we have a caption which is not
  // in a following paragraph, but in the same paragraph of the element, as a text
  // following the element.
  // Visually, it looks like a normal Caption though, but it's just a Text with starting with
  // a line break (like "\n Figure 1 - Some description").

  // This can only happen with equations or images, as these elements can preceede a Text element
  if (
    ![
      DocumentApp.ElementType.EQUATION,
      DocumentApp.ElementType.INLINE_IMAGE,
    ].includes(element.getType())
  ) {
    return null;
  }

  // If the following element is not a Text element, it's also not a Caption
  const nextSibling = element.getNextSibling();
  if (!nextSibling || nextSibling.getType() !== DocumentApp.ElementType.TEXT) {
    return null;
  }

  const maybeCaption = nextSibling.asText();
  // It's likely that the obtained caption here is in the wrong position,
  // so we maybe could adjust the position here, but not sure if this is even desirable
  return getCaptionAfterVerifyParts(maybeCaption);
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
