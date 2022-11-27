import { CaptionParts, CaptionText } from "../../common/types";
import removeBookmark from "../bookmark/removeBookmark";
import upsertBookmark from "../bookmark/upsertBookmark";
import { setDocumentLabel } from "../storage/Labels";
import getCaption from "./getCaption";
import getCaptionalizableSelectedElement from "./getCaptionalizableSelectedElement";
import insertCaption from "./insertCaption";
import updateCaption from "./updateCaption";
import updateCaptions from "./updateCaptions";

interface Options {
  autoUpdateCaptions: boolean;
  bookmark: boolean;
}

export default function onSaveCaption(
  { label, number, description }: CaptionParts,
  options: Options
) {
  const selectedElement = getCaptionalizableSelectedElement();

  setDocumentLabel(selectedElement.getType(), label);
  upsertCaption(selectedElement, `${label} ${number} ${description}`);

  if (options.autoUpdateCaptions) {
    updateCaptions(selectedElement.getType(), label);
  }

  if (options.bookmark) {
    upsertBookmark(getCaption(selectedElement));
  } else {
    removeBookmark(getCaption(selectedElement));
  }
}

/**
 * Update (if the @type {Caption} already exists) or insert a @type {Caption} with
 * the specified @type {CaptionText} for the given element.
 *
 * @param {GoogleAppsScript.Document.Element} element An element to update or insert the caption on.
 * @param {CaptionText} text A text representation of the caption.
 * @return {void}
 * @customfunction
 */
function upsertCaption(
  element: GoogleAppsScript.Document.Element,
  text: CaptionText
): void {
  const caption = getCaption(element);
  if (caption) {
    updateCaption(caption, text);
  } else {
    insertCaption(element, text);
  }
}
