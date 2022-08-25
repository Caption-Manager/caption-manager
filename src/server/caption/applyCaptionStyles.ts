
/**
 * Apply styles to a given caption.
 *
 * @param {GoogleAppsScript.Document.Element} captionParagraph The paragraph where the caption is contained.
 * @return {void} 
 * @customfunction
*/
export default function applyCaptionStyles(captionParagraph: GoogleAppsScript.Document.Paragraph): void {
  const styleAttributes = {};
  styleAttributes[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] =
      DocumentApp.HorizontalAlignment.CENTER;
  styleAttributes[DocumentApp.Attribute.ITALIC] = true;

  captionParagraph.setAttributes(styleAttributes);
}