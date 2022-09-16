import getCursorElement from "../utils/getCursorElement";
import getFirstElementFromSelection from "../utils/getFirstElementFromSelection";
import getCaptionalizableCursorParentElement from "./getCaptionalizableCursorParentElement";
import isCaptionalizable from "./isCaptionalizable";

/**
 * Gets the selected element (first element from selection or cursor element) as a
 * @type {GoogleAppsScript.Document.Element}.
 * If there's no selected element element or the selected element is not captionalizable, throws an error.
 *
 * @return {GoogleAppsScript.Document.Element} The Selected element as a captionalizable element.
 * @customfunction
 */
export default function getCaptionalizableSelectedElement(): GoogleAppsScript.Document.Element {
  const firstElementFromSelection = getFirstElementFromSelection();

  if (firstElementFromSelection) {
    if (isCaptionalizable(firstElementFromSelection))
      return firstElementFromSelection;
    else throw new NotCaptionalizableElementError(firstElementFromSelection);
  }

  const cursorElement = getCursorElement();
  if (cursorElement) {
    const captionalizableCursorParentElement = getCaptionalizableCursorParentElement(
      cursorElement
    );
    if (captionalizableCursorParentElement)
      return captionalizableCursorParentElement;
    else throw new NotCaptionalizableElementError(cursorElement);
  }

  // No selected element or cursor element
  // Not sure if this is even possible
  throw new NonExistingSelectedElementError();
}

const BASE_ERROR_MESSAGE =
  "You must have a captionalizable selected element (table, image or equation) to upsert a caption.";

class NotCaptionalizableElementError extends Error {
  constructor(element: GoogleAppsScript.Document.Element) {
    const elementType = element.getType().toString();
    super(
      `${BASE_ERROR_MESSAGE} \n ${elementType} element is not a valid element.`
    );
    this.name = this.constructor.name;
  }
}

class NonExistingSelectedElementError extends Error {
  constructor() {
    super(BASE_ERROR_MESSAGE);
    this.name = this.constructor.name;
  }
}
