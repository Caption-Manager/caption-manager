import getCaptions from "./getCaptions";
import updateCaption from "./updateCaption";
import { getDescription } from "./getCaptionPartsFromString";

/**
 * Update all captions for the type of element provided.
 * This will update the text of each caption with the specified label and the correct number and description.
 *
 * @param {GoogleAppsScript.Document.ElementType} type A type of element that can contain captions.
 * @param {string} label A label to update on all captions for the provided type.
 * @return {void}
 * @customfunction
 */
export default function updateCaptions(
  type: GoogleAppsScript.Document.ElementType,
  label: string
): void {
  let number = 1;
  const captions = getCaptions(type);
  for (const caption of captions) {
    updateCaption(
      caption,
      `${label} ${number} ${getDescription(caption.getText())}`
    );
    number = number + 1;
  }
}
