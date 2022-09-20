import { Caption } from "../../common/types";

export default function getCaptionParagraph(caption: Caption) {
  let parent = caption.getParent();
  while (parent) {
    if (parent.getType() === DocumentApp.ElementType.PARAGRAPH)
      return parent.asParagraph();
    else {
      parent = parent.getParent();
    }
  }

  return null;
}
