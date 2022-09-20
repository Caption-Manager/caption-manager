import { Caption, Styles } from "../../common/types";
import getCaptions from "../caption/getCaptions";
import { setDocumentCaptionStyles } from "../storage/Styles";
import applyCaptionStyles from "./applyCaptionStyles";

const CAPTION_TYPES = [
  DocumentApp.ElementType.INLINE_IMAGE,
  DocumentApp.ElementType.TABLE_CELL,
  DocumentApp.ElementType.EQUATION,
];

export default function updateAllCaptionsStyles(styles: Styles): void {
  setDocumentCaptionStyles(styles);
  for (const type of CAPTION_TYPES) {
    const captions = getCaptions(type);
    for (const caption of captions) {
      const captionParagraph = getParentParagraph(caption);
      applyCaptionStyles(captionParagraph);
    }
  }
}

function getParentParagraph(caption: Caption) {
  let parent = caption.getParent();
  while (parent.getType() !== DocumentApp.ElementType.PARAGRAPH) {
    parent = parent.getParent();
  }

  if (parent.getType() === DocumentApp.ElementType.PARAGRAPH)
    return parent.asParagraph();
  else {
    throw new Error(
      `Couldn't find paragraph for caption with text ${caption.getText()}`
    );
  }
}
