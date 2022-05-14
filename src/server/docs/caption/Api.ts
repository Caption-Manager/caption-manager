import { getCaptionElements } from "./Caption";
import { getGasSelectedElement, getSelectedElement } from "./Element";
import { CAPTION_NUMBER_REGEX, CAPTION_REGEX } from "./Constants";
import {
  CaptionElement,
  DocumentInfo,
  SelectedElement,
} from "../../../types/Caption";

export function upsertCaption(element: SelectedElement, text: string) {
  if (element.caption) {
    element.parent.replaceText(CAPTION_REGEX, text);
  } else {
    const insertBelowIndex = element.index + 1;
    element.parent.insertText(insertBelowIndex, text);
  }
}

export function updateCaptions(type: GoogleAppsScript.Document.ElementType) {
  const captions = getCaptionElements(type);

  for (let i = 0; i < captions.length; i += 1) {
    const caption = captions[i];
    const text = caption.parent.getChild(caption.index).asText();
    text.replaceText(CAPTION_NUMBER_REGEX, `${i + 1}`);
  }
}

export function getDocumentInfo(): DocumentInfo {
  const gasSelectedElement = getGasSelectedElement();

  // TODO: memoize getCaptionElements. We'll be pooling for getDocumentInfo,
  let selectedElement: null | SelectedElement = null;
  // so it's important to avoid this computation every time
  // Reflection: maybe we'll only call getDocumentInfo if we
  // changed the selected element. In this case, memoization is not
  // that important.

  let captions: CaptionElement[] = [];
  if (gasSelectedElement) {
    captions = getCaptionElements(gasSelectedElement.getType());
    selectedElement = getSelectedElement(gasSelectedElement, captions);
  }

  return {
    selectedElement,
    captions,
  };
}
