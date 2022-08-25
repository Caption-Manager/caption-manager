import getCaption from "./getCaption";
import getCaptions from "./getCaptions";
import pathInDocument from "../utils/pathInDocument";
import getUserLabels from "../storage/getUserLabels";

export default function getCaptionParts(element: GoogleAppsScript.Document.Element) {
  const caption = getCaption(element);
  return {
    label: getLabel(element.getType()),
    number: getNumber(element),
    description: caption ? getDescription(caption) : "",
  }
}

function getLabel(type: GoogleAppsScript.Document.ElementType): string {
  const userLabels = getUserLabels();
  switch (type) {
    case DocumentApp.ElementType.INLINE_IMAGE:
      return userLabels.INLINE_IMAGE;
    case DocumentApp.ElementType.TABLE:
    case DocumentApp.ElementType.TABLE_CELL:
      return userLabels.TABLE;
    case DocumentApp.ElementType.EQUATION:
      return userLabels.EQUATION;
    default:
      throw new Error(`Unknown type ${type} to get label from`);
  }
}

function getNumber(element: GoogleAppsScript.Document.Element): number {
  let number = 1;
  
  const captions = getCaptions(element.getType());
  const elementPath = pathInDocument(element);
  for (const caption of captions) {
    if (elementPath < pathInDocument(caption)) return number;
    else number = number + 1;
  }

  // If the elementPath is smaller than all other element paths,
  // it must be the first element
  return number;
}

export function getDescription(caption: GoogleAppsScript.Document.Text) {
  const text = caption.getText();
  // TODO: this assumes the separator has spaces in between,
  // like " - " or " / ". It's a good idea to incorporate the separator
  // into the text structure interface
  const [label, number, separator, ...descriptionWords] = text.split(" ");
  return descriptionWords.join(" ");
}