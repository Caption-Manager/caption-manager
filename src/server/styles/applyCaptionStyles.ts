import { Caption, HorizontalAlignment, Styles } from "../../common/types";
import { getDocumentCaptionStyles } from "../storage/Styles";

/**
 * Apply document caption styles to a given caption.
 *
 * @param {GoogleAppsScript.Document.Paragraph} paragraph The paragraph where the caption is contained.
 * @return {void}
 * @customfunction
 */
export default function applyCaptionStyles(
  paragraph: GoogleAppsScript.Document.Paragraph
): void {
  const styles = getDocumentCaptionStyles();
  applyParagraphStyles(paragraph, styles);
  applyTextStyles(paragraph.getChild(0).asText(), styles);
}

function applyParagraphStyles(
  paragraph: GoogleAppsScript.Document.Paragraph,
  styles: Styles
) {
  paragraph.setAlignment(
    mapCommonToDocumentHorizontalAlignment(styles.alignment)
  );
}

function applyTextStyles(text: Caption, styles: Styles): void {
  text.setFontSize(styles.fontSize);
  text.setFontFamily(styles.fontFamily);
  text.setBold(styles.bold);
  text.setItalic(styles.italic);
  text.setUnderline(styles.underline);
  text.setForegroundColor(styles.color);
}

function mapCommonToDocumentHorizontalAlignment(
  str: HorizontalAlignment
): GoogleAppsScript.Document.HorizontalAlignment {
  const { LEFT, CENTER, RIGHT, JUSTIFY } = DocumentApp.HorizontalAlignment;
  switch (str) {
    case "left":
      return LEFT;
    case "center":
      return CENTER;
    case "right":
      return RIGHT;
    case "justify":
      return JUSTIFY;
    default:
      return CENTER;
  }
}
