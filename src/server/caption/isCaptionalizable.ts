import { CAPTION_TYPES } from "../../common/types";

export default function isCaptionalizable(element: GoogleAppsScript.Document.Element) {
  return CAPTION_TYPES.some(type => type === element.getType());
}