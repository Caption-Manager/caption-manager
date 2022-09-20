import isCaptionalizable from "./isCaptionalizable";
import {
  DocumentInfo,
  SelectedElementInfo,
  CaptionalizableSelectedElementType,
  NotCaptionalizableElementInfo,
  CaptionalizableElementInfo,
  CaptionInfo,
} from "../../common/types";
import getFirstElementFromSelection from "../utils/getFirstElementFromSelection";
import getCursorElement from "../utils/getCursorElement";
import getCaptionalizableCursorParentElement from "./getCaptionalizableCursorParentElement";
import getCaptions from "./getCaptions";
import { Path } from "../path";
import { getDocumentLabels } from "../storage/Labels";
import { getDescription } from "./getCaptionPartsFromString";
import getBookmark from "../bookmark/getBookmark";
import getCaption from "./getCaption";

export default function getDocumentInfo(): DocumentInfo {
  return {
    selectedElement: getSelectedElementInfo(),
  };
}

function getSelectedElementInfo(): SelectedElementInfo {
  const firstElementFromSelection = getFirstElementFromSelection();

  if (firstElementFromSelection) {
    if (isCaptionalizable(firstElementFromSelection))
      return getCaptionalizableElementInfo(firstElementFromSelection);
    else return getNotCaptionalizableElementInfo(firstElementFromSelection);
  }

  const cursorElement = getCursorElement();
  if (cursorElement) {
    const captionalizableCursorParentElement = getCaptionalizableCursorParentElement(
      cursorElement
    );
    if (captionalizableCursorParentElement)
      return getCaptionalizableElementInfo(captionalizableCursorParentElement);
    // We could return a not captionalizable element here, but I think
    // restricting a selected element to selections (document.getSelection) and cursor elements
    // child of a captionalizable element (cursor inside table cell, cursor inside
    // equation) leads to better UX.
    return null;
    // else return getNotCaptionalizableElementInfo(cursorElement);
  }

  // No first element from selection or cursor. Not even sure if this is possible.
  return null;
}

function getNotCaptionalizableElementInfo(
  element: GoogleAppsScript.Document.Element
): NotCaptionalizableElementInfo {
  return {
    isCaptionalizable: false,
    type: element.getType().toString(),
  };
}

function getCaptionalizableElementInfo(
  element: GoogleAppsScript.Document.Element
): CaptionalizableElementInfo {
  return {
    isCaptionalizable: true,
    type: element.getType().toString() as CaptionalizableSelectedElementType,
    caption: getCaptionInfo(element),
  };
}

/**
 * Gets a @type {CaptionInfo} representation of the caption of a given element.
 * If the element doesn't contain a caption, creates a caption with the user-specified label,
 * corresponding number given its position in document and an empty description.
 *
 * @param {GoogleAppsScript.Document.Element} element An element.
 * @return {CaptionInfo} An object containing information about the catpion.
 * @customfunction
 */
function getCaptionInfo(
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
