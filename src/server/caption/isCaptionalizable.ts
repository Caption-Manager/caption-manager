import { CAPTIONALIZABLE_ELEMENT_TYPES } from "../../common/constants";

export default function isCaptionalizable(element: GoogleAppsScript.Document.Element) {
  return CAPTIONALIZABLE_ELEMENT_TYPES.some(type => type === element.getType());
}