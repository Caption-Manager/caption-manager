import { Styles } from "../../common/types";
import getCaptionParagraph from "../caption/getCaptionParagraph";
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
      const captionParagraph = getCaptionParagraph(caption);
      applyCaptionStyles(captionParagraph);
    }
  }
}
