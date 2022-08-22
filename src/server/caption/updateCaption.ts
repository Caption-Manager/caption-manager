import applyCaptionStyles from "./applyCaptionStyles";
import { CaptionText } from "../../common/types";

export default function updateCaption(caption: GoogleAppsScript.Document.Text, text: CaptionText) {
  caption.setText(text);
  applyCaptionStyles(caption.getParent().asParagraph());
}