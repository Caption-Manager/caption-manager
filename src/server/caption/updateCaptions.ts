import updateCaption from "./updateCaption";
import { getDescription } from "./getCaptionParts";
import getSelectedElement from "../utils/getSelectedElement";
import getCaptions from "./getCaptions";

export default function updateCaptions(label: string) {
  const selectedElement = getSelectedElement();
  
  let number = 1;
  const captions = getCaptions(selectedElement.getType());
  for (const caption of captions) {
    updateCaption(caption, `${label} ${number++} - ${getDescription(caption)}`);
  }
}

