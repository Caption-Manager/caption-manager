import { CAPTIONALIZABLE_ELEMENT_TYPES } from "../../common/constants";

/**
 * Determines whether the element can contain a caption or not.
 *
 * @param {GoogleAppsScript.Document.Element} element An element.
 * @return {boolean} A boolean indicating whether the element can contain a caption or not.
 * @customfunction
*/
export default function isCaptionalizable(element: GoogleAppsScript.Document.Element): boolean {
  return CAPTIONALIZABLE_ELEMENT_TYPES.some(type => type === element.getType());
}