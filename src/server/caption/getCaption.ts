import { Caption } from "../../common/types";
import { includes, removeLineBreaks } from "../../common/utils";
import getUserLabels from "../storage/getUserLabels";
import getCaptionPartsFromString from "./getCaptionPartsFromString";
import getNextSiblingParagraph from "./getNextSiblingParagraph";

/**
 * Gets the @type {Caption} for a given element.
 * If no @type {Caption} is found, returns null.
 *
 * @param {GoogleAppsScript.Document.Element} element An element that can contain a Caption.
 * @return {Caption|null} The Caption element or null if no caption is found.
 * @customfunction
*/
export default function getCaption(element: GoogleAppsScript.Document.Element): Caption | null {
    // TODO: add more stuff to check if the text is a caption or not
  if (element.isAtDocumentEnd()) return null;

  try {
    const captionFromText = getCaptionFromText(element);
    if (captionFromText) return captionFromText;

    const captionFromNextSiblingParagraph = getCaptionFromNextSiblingParagraph(element);
    if (captionFromNextSiblingParagraph) return captionFromNextSiblingParagraph;

    return null;
  } catch (error) {
    return null;
  }
}

function getCaptionFromText(element: GoogleAppsScript.Document.Element): Caption | null {
  // What we are trying to address here is the scenario where we have a caption which is not
  // in a following paragraph, but in the same paragraph, as a text following the element.
  // Visually, it looks like a normal Caption though, but it's just a Text with starting with
  // a line break (like "\n Figure 1 - Some description").

  // This can only happen with equations or images, as these elements can preceede a Text element
  if (!includes([DocumentApp.ElementType.EQUATION, DocumentApp.ElementType.INLINE_IMAGE], element.getType())) {
    return null;
  }

  // If the following element is not a Text element, it's also not a Caption
  const nextSibling = element.getNextSibling();
  if (!nextSibling || nextSibling.getType() !== DocumentApp.ElementType.TEXT) {
    return null
  }

  const maybeCaption = nextSibling.asText();
  const { label, number } = getCaptionPartsFromString(maybeCaption.getText());

  if (isNaN(number)) return null;

  const userLabels = getUserLabels();
  const userLabelValues = Object.keys(userLabels).map(key => userLabels[key]); // TODO: update this line to more recent Javascript

  // This is exactly the kind of scenario we are trying to address here:
  // We have a Caption with text "\n Figure 10 - Some text", where "\n"
  // is a line break. So visually it looks like it's a normal caption. 
  // We remove the line break and check if the label matches one of the
  // user's labels.
  const labelWithoutLineBreaks = removeLineBreaks(label);
  if (!userLabelValues.some(userLabel => userLabel === labelWithoutLineBreaks)) {
    return null;
  };
  
  // At this point we know have something like `{Valid User Label} {number}`
  // So probably this is indeed a Caption. But we could later add more
  // checks like comparing Text element styles or checking the separator or
  // description text. Also, it's likely that the obtained caption is in the
  // wrong position, so we maybe could updateCaption() here, but not sure
  // if this is desirable
  return maybeCaption as Caption;
}

function getCaptionFromNextSiblingParagraph(element: GoogleAppsScript.Document.Element): Caption | null {
  const nextElement = getNextSiblingParagraph(element);
  if (!nextElement || nextElement.getType() !== DocumentApp.ElementType.PARAGRAPH) return null;

  const paragraphFirstChild = nextElement.asParagraph().getChild(0);
  if (paragraphFirstChild.getType() !== DocumentApp.ElementType.TEXT) return null;
  return paragraphFirstChild.asText();
}