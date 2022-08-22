import getCaption from "./getCaption";
import getCaptions from "./getCaptions";
import getSelectedElement from "./getSelectedElement";
import isCaptionalizable from "./isCaptionalizable";
import pathInDocument from "./pathInDocument";
// Types
import {  DocumentInfo, SelectedElementInfo } from "../../common/types";


export default function getDocumentInfo(): DocumentInfo {
  return {
    selectedElement: getSelectedElementInfo(),
  };
}

function getSelectedElementInfo(): SelectedElementInfo {
  const selectedElement = getSelectedElement();
  if (!selectedElement) return null;

  if (!isCaptionalizable(selectedElement)) {
    return {
      isCaptionalizable: false,
      type: selectedElement.getType().toString(),
    };
  }

  const caption = getCaption(selectedElement);
  return {
    isCaptionalizable: true,
    captionParts: caption
      ? getPartsFrom(caption)
      : createCaptionPartsFor(selectedElement),
  };
}

function getPartsFrom(caption: GoogleAppsScript.Document.Text) {
  const text = caption.getText();
  // TODO: this assumes the separator has spaces in between,
  // like " - " or " / ". It's a good idea to incorporate the separator
  // into the text structure interface
  const [label, number, separator, ...descriptionWords] = text.split(" ");
  return { label, number: Number(number), description: descriptionWords.join(" ") };
}

function createCaptionPartsFor(element: GoogleAppsScript.Document.Element) {
  return {
    label: getLabelFrom(element.getType()),
    number: getNumberFrom(element),
    description: "",
  };
}

function getLabelFrom(type: GoogleAppsScript.Document.ElementType): string {
  switch (type) {
    case DocumentApp.ElementType.INLINE_IMAGE:
      return "Figure";
    case DocumentApp.ElementType.TABLE:
    case DocumentApp.ElementType.TABLE_ROW:
    case DocumentApp.ElementType.TABLE_CELL:
      return "Table";
    case DocumentApp.ElementType.EQUATION:
      return "Equation";
    default:
      throw new Error("Unknown type to get label from");
  }
}

function getNumberFrom(element: GoogleAppsScript.Document.Element): number {
  const captions = getCaptions(element.getType());
  const elementPath = pathInDocument(element);
  for (let i = 0; i < captions.length; i = i + 1) {
    const number = i + 1;
    if (elementPath > pathInDocument(captions[i])) {
      return number + 1;
    }
  }
  // If the elementPath is smaller than all other element paths,
  // it must be the first element
  return 1;
}
