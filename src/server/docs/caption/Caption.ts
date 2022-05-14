import { Caption, CaptionElement } from "../../../types/Caption";
import { getElementsInBody } from "./Element";
import {
  extractIndexFromPath,
  getParentIndexes,
  pathInDocument,
} from "../Position";
import { CAPTION_REGEX } from "./Constants";

export function getCaptionElements(
  type: GoogleAppsScript.Document.ElementType
): CaptionElement[] {
  const body = DocumentApp.getActiveDocument().getBody();
  const parentIndexes = getParentIndexes(getElementsInBody(type));
  return parentIndexes.map(function getCaption(parentIndex) {
    const parent = body.getChild(parentIndex).asParagraph(); // Here we are constraining parent to be paragraph
    const captionElement = parent.findElement(type).getElement();
    return {
      parent,
      parentIndex,
      index: parent.getChildIndex(captionElement),
    };
  });
}

export function getCaption(
  parent: GoogleAppsScript.Document.Paragraph,
  captions: CaptionElement[]
): Caption | null {
  let label = null;
  let suffix = null;

  const captionTextElement = parent
    .findText(CAPTION_REGEX)
    .getElement()
    .asText();

  if (captionTextElement) {
    const text = captionTextElement.getText();
    label = text;
    suffix = text;
  }

  return {
    number: getCaptionNumber(parent, captions),
    label,
    suffix,
  };
}

function getCaptionNumber(
  parent: GoogleAppsScript.Document.Paragraph,
  captions: CaptionElement[]
): number {
  const parentIndex = extractIndexFromPath(pathInDocument(parent));

  let number: number;
  for (let i = 0; i < captions.length; i += 1) {
    const caption = captions[i];
    // 1) Find index of caption in body
    // 2) Compare index of caption with index of selected element parent
    const captionParentIndex = extractIndexFromPath(
      pathInDocument(caption.parent)
    );
    if (parentIndex < captionParentIndex) {
      continue;
    } else if (parentIndex > captionParentIndex) {
      number = i + 1;
    } else {
      // If parentIndex == captionParendIndex, they are on same paragraph
      // we have to look inside the paragraph structure to see if the selected
      // element is before or after this caption element
    }
  }
  return number;
}
