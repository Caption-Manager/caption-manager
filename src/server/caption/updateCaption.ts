import applyCaptionStyles from "./applyCaptionStyles";
import { Caption, CaptionText } from "../../common/types";

export default function updateCaption(caption: Caption, text: CaptionText) {
  caption.setText(text);
  applyCaptionStyles(caption.getParent().asParagraph());
}