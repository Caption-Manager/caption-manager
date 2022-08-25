import updateCaption from "./updateCaption";
import { getDescription } from "./getCaptionPartsFromString";
import getFirstSelectedElement from "../utils/getFirstSelectedElement";
import getCaptions from "./getCaptions";
import isCaptionalizable from "./isCaptionalizable";

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
  const selectedElement = getFirstSelectedElement();
  if (!selectedElement || !isCaptionalizable(selectedElement)) {
    const baseErrorMessage = "You must have a captionalizable selected element (table, image or equation) to upsert a caption.";
    throw new Error(!selectedElement ? 
      baseErrorMessage : 
      `${baseErrorMessage} ${selectedElement.getType().toString()} element is not a valid element.`
    );
  }
  
  let number = 1;
  const captions = getCaptions(selectedElement.getType());
  for (const caption of captions) {
    updateCaption(caption, `${label} ${number++} - ${getDescription(caption.getText())}`);
  }
}

