
import { Caption } from "./Caption";
import { DocumentInfo } from "./types";
import { getCaptions, getSelectedElement, isCaptionalizable } from "./utils";

export function updateCaptions(type: GoogleAppsScript.Document.ElementType) {
  const captions = getCaptions(type);
  captions.forEach(function updateCaption(caption, index) {
    caption.setParts({
      ...caption.getParts(),
      number: index + 1,
    });
  });
}

export function getDocumentInfo(): DocumentInfo {
  const selectedElement = getSelectedElement();
  return {
    caption: isCaptionalizable(selectedElement)
      ? new Caption(selectedElement as any)
      : null,
  };
}
