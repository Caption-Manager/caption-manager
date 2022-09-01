import { CaptionParts, StorageLabelKey } from "../../common/types";
import upsertBookmark from "../bookmark/upsertBookmark";
import setDocumentLabel from "../storage/setDocumentLabel";
import getCaption from "./getCaption";
import getCaptionalizableSelectedElement from "./getCaptionalizableSelectedElement";
import updateCaptions from "./updateCaptions";
import upsertCaption from "./upsertCaption";

interface Options {
  autoUpdateCaptions: boolean;
  bookmark: boolean;
}

export default function onSaveCaption(
  { label, number, description }: CaptionParts,
  options: Options
) {
  const selectedElement = getCaptionalizableSelectedElement();

  setDocumentLabel(getStorageLabelKey(selectedElement), label);
  upsertCaption(selectedElement, `${label} ${number} ${description}`);

  if (options.autoUpdateCaptions) {
    updateCaptions(selectedElement.getType(), label);
  }

  if (options.bookmark) {
    upsertBookmark(getCaption(selectedElement));
  }
}

function getStorageLabelKey(
  element: GoogleAppsScript.Document.Element
): StorageLabelKey {
  switch (element.getType()) {
    case DocumentApp.ElementType.INLINE_IMAGE:
      return "INLINE_IMAGE";
    case DocumentApp.ElementType.TABLE_CELL:
      return "TABLE";
    case DocumentApp.ElementType.EQUATION:
      return "EQUATION";
    default:
    // This should be impossible
  }
}
