import getCaptionalizableSelectedElement from "./getCaptionalizableSelectedElement";
import getCaptions from "./getCaptions";
import updateCaption from "./updateCaption";
import { getDescription } from "./getCaptionPartsFromString";

/**
 * Update all captions that have the same type as the selected element on document.
 * This will update the text of each caption with the specified label and the correct numbering and description.
 * If no element or an invalid element is selected on document, throws an error.
 *
 * @param {string} label The label specified to update captions.
 * @return {void}
 * @customfunction
 */
export default function updateCaptions(label: string): void {
  const selectedElement = getCaptionalizableSelectedElement();
  let number = 1;
  const captions = getCaptions(selectedElement.getType());
  for (const caption of captions) {
    updateCaption(
      caption,
      `${label} ${number++} - ${getDescription(caption.getText())}`
    );
  }
}
