export default function applyCaptionStyles(captionParagraph: GoogleAppsScript.Document.Paragraph) {
  const styleAttributes = {};
  styleAttributes[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] =
      DocumentApp.HorizontalAlignment.CENTER;
  styleAttributes[DocumentApp.Attribute.ITALIC] = true;

  captionParagraph.setAttributes(styleAttributes);
}

