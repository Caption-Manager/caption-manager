import updateCaption from "./updateCaption";
import { CAPTION_TYPES } from "../../common/types";
import getCaptionParts from "./getCaptionParts";
import getCaption from "./getCaption";
import getElements from "./getElements";

export default function updateCaptionNumbers() {
  for (const type of CAPTION_TYPES) {
    const elements = getElements(type);
    let number = 1;
    for (const element of elements) {
      const caption = getCaption(element);
      if (!caption) continue;

      const { label, description } = getCaptionParts(element);
      updateCaption(caption, `${label} ${number} - ${description}`);
      number += 1;
    }
  }
}