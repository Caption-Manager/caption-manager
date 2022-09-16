import isCaptionalizable from "./isCaptionalizable";
import getCaptionInfo from "./getCaptionInfo";
import {
  DocumentInfo,
  SelectedElementInfo,
  CaptionalizableSelectedElementType,
  NotCaptionalizableElementInfo,
  CaptionalizableElementInfo,
} from "../../common/types";
import getFirstElementFromSelection from "../utils/getFirstElementFromSelection";
import getCursorElement from "../utils/getCursorElement";
import getCaptionalizableCursorParentElement from "./getCaptionalizableCursorParentElement";

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
