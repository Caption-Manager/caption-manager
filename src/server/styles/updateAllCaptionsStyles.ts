import { Styles } from "../../common/types";
import { CAPTIONALIZABLE_ELEMENT_TYPES } from "../caption/constants";
import getCaptionParagraph from "../caption/getCaptionParagraph";
import getCaptions from "../caption/getCaptions";
import { setDocumentCaptionStyles } from "../storage/Styles";
import applyCaptionStyles from "./applyCaptionStyles";

export default function updateAllCaptionsStyles(styles: Styles): void {
  setDocumentCaptionStyles(styles);
  for (const type of CAPTIONALIZABLE_ELEMENT_TYPES) {
    const captions = getCaptions(type);
    for (const caption of captions) {
      const captionParagraph = getCaptionParagraph(caption);
      applyCaptionStyles(captionParagraph);
    }
  }
}
