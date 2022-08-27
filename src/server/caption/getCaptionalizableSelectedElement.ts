import getFirstSelectedElement from "../utils/getFirstSelectedElement";
import isCaptionalizable from "./isCaptionalizable";

const BASE_ERROR_MESSAGE =
  "You must have a captionalizable selected element (table, image or equation) to upsert a caption.";

/**
 * Gets the first selected element as a @type {GoogleAppsScript.Document.Element}.
 * If no selected element or the element is not captionalizable, throwns an error.
 *
 * @return {GoogleAppsScript.Document.Element} The selected element as a captionalizable element.
 * @customfunction
 */
export default function getCaptionalizableSelectedElement(): GoogleAppsScript.Document.Element {
  const selectedElement = getFirstSelectedElement();

  if (!selectedElement) throw new Error(BASE_ERROR_MESSAGE);
  if (!isCaptionalizable(selectedElement)) {
    const elementType = selectedElement.getType().toString();
    throw new Error(
      `${BASE_ERROR_MESSAGE} \n ${elementType} element is not a valid element.`
    );
  }

  return selectedElement;
}
