import { CaptionElement, SelectedElement } from "../../../types/Caption";
import { getCaption } from "./Caption";

export function getSelectedElement(
  selectedElement: GoogleAppsScript.Document.Element,
  captions: CaptionElement[]
): SelectedElement {
  const parent = selectedElement.getParent().asParagraph();

  return {
    parent,
    index: parent.getChildIndex(selectedElement),
    caption: getCaption(parent, captions),
  };
}

export function getGasSelectedElement(): GoogleAppsScript.Document.Element {
  const selection = DocumentApp.getActiveDocument().getSelection();
  if (!selection) return null;
  return selection.getRangeElements()[0].getElement();
}

export function getElementsInBody(type) {
  const body = DocumentApp.getActiveDocument().getBody();
  switch (type) {
    case DocumentApp.ElementType.INLINE_IMAGE:
      return body.getImages();
    case DocumentApp.ElementType.TABLE:
      return body.getTables();
    default:
      throw new Error(`Unsupported type to get elements in body: ${type}`);
  }
}
