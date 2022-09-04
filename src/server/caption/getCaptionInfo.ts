import getCaption from "./getCaption";
import getCaptions from "./getCaptions";
import { getDescription } from "./getCaptionPartsFromString";
import getDocumentLabels from "../storage/getDocumentLabels";
import { CaptionInfo } from "../../common/types";
import { Path } from "../path";
import getBookmark from "../bookmark/getBookmark";

/**
 * Gets a @type {CaptionInfo} representation of the caption of a given element.
 * If the element doesn't contain a caption, creates a caption with the user-specified label
 * correct number given its position in document and an empty description.
 *
 * @param {GoogleAppsScript.Document.Element} element An element.
 * @return {CaptionInfo} An object containing information of the catpion.
 * @customfunction
 */
export default function getCaptionInfo(
  element: GoogleAppsScript.Document.Element
): CaptionInfo {
  const caption = getCaption(element);
  return {
    label: getLabel(element.getType()),
    number: getNumber(element),
    description: caption ? getDescription(caption.getText()) : "",
    isBookmarked: Boolean(getBookmark(caption)),
  };
}

function getLabel(type: GoogleAppsScript.Document.ElementType): string {
  const documentLabels = getDocumentLabels();
  switch (type) {
    case DocumentApp.ElementType.INLINE_IMAGE:
      return documentLabels.INLINE_IMAGE;
    case DocumentApp.ElementType.TABLE_CELL:
      return documentLabels.TABLE;
    case DocumentApp.ElementType.EQUATION:
      return documentLabels.EQUATION;
    default:
      throw new Error(`Unknown type ${type} to get label from`);
  }
}

function getNumber(element: GoogleAppsScript.Document.Element): number {
  let number = 1;
  const captions = getCaptions(element.getType());
  for (const caption of captions) {
    if (Path(element).isBefore(caption as any)) return number;
    else number = number + 1;
  }

  // If the element is positioned before all other captions,
  // it must be the first caption
  return number;
}
