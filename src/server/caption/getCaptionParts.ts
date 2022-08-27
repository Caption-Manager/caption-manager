import getCaption from "./getCaption";
import getCaptions from "./getCaptions";
import { getDescription } from "./getCaptionPartsFromString";
import getUserLabels from "../storage/getUserLabels";
import positionInDocument from "../position/positionInDocument";
import { CaptionParts } from "../../common/types";

/**
 * Gets a @type {CaptionParts} representation of the caption of a given element.
 * If the element doesn't contain a caption, creates a caption with the user-specified label
 * correct number given its position in document and an empty description.
 *
 * @param {GoogleAppsScript.Document.Element} element An element.
 * @return {CaptionParts} An object representation of the caption text.
 * @customfunction
 */
export default function getCaptionParts(
  element: GoogleAppsScript.Document.Element
): CaptionParts {
  const caption = getCaption(element);
  return {
    label: getLabel(element.getType()),
    number: getNumber(element),
    description: caption ? getDescription(caption.getText()) : "",
  };
}

function getLabel(type: GoogleAppsScript.Document.ElementType): string {
  const userLabels = getUserLabels();
  switch (type) {
    case DocumentApp.ElementType.INLINE_IMAGE:
      return userLabels.INLINE_IMAGE;
    case DocumentApp.ElementType.TABLE_CELL:
      return userLabels.TABLE;
    case DocumentApp.ElementType.EQUATION:
      return userLabels.EQUATION;
    default:
      throw new Error(`Unknown type ${type} to get label from`);
  }
}

function getNumber(element: GoogleAppsScript.Document.Element): number {
  let number = 1;

  const captions = getCaptions(element.getType());
  const elementPosition = positionInDocument(element);
  for (const caption of captions) {
    if (elementPosition < positionInDocument(caption)) return number;
    else number = number + 1;
  }

  // If the elementPosition is smaller than all other element positions,
  // it must be the first element
  return number;
}
