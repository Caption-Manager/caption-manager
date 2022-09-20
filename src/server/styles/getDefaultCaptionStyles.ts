import { HorizontalAlignment, Styles } from "../../common/types";
import { CAPTIONALIZABLE_ELEMENT_TYPES } from "../caption/constants";
import getCaptionParagraph from "../caption/getCaptionParagraph";
import getCaptions from "../caption/getCaptions";

export default function getDefaultDocumentCaptionStyles() {
  const stylesFromFirstCaption = getStylesFromFirstCaption();
  if (stylesFromFirstCaption) return stylesFromFirstCaption;
  return getStylesFromNormalParagraphHeading();
}

const {
  HORIZONTAL_ALIGNMENT,
  FONT_SIZE,
  FONT_FAMILY,
  BOLD,
  ITALIC,
  UNDERLINE,
  FOREGROUND_COLOR,
} = DocumentApp.Attribute;

function getStylesFromFirstCaption(): Styles | null {
  const firstCaption = getFirstCaption();
  if (firstCaption) {
    const firstCaptionParagraphAttributes = getCaptionParagraph(
      firstCaption
    ).getAttributes();
    // We must give default values because some of the style attributes
    // return null unless set explicitly in code.
    // See: https://stackoverflow.com/questions/49573171/google-app-script-getting-null-values-from-getattributes
    return {
      alignment:
        mapDocumentHorizontalAlignmentToCommon(
          firstCaptionParagraphAttributes[HORIZONTAL_ALIGNMENT]
        ) || "center",
      fontSize: firstCaption.getFontSize() || 11,
      fontFamily: firstCaption.getFontFamily() || "Arial",
      bold: firstCaption.isBold() || false,
      italic: firstCaption.isItalic() || false,
      underline: firstCaption.isUnderline() || false,
      color: firstCaption.getForegroundColor() || "#000000",
    };
  }

  return null;
}

function getFirstCaption() {
  for (const type of CAPTIONALIZABLE_ELEMENT_TYPES) {
    const captions = getCaptions(type);
    if (captions[0]) return captions[0];
  }

  return null;
}

function getStylesFromNormalParagraphHeading(): Styles {
  const body = DocumentApp.getActiveDocument().getBody();
  const attributes = body.getHeadingAttributes(
    DocumentApp.ParagraphHeading.NORMAL
  );
  return {
    alignment: mapDocumentHorizontalAlignmentToCommon(
      attributes[HORIZONTAL_ALIGNMENT]
    ),
    fontFamily: attributes[FONT_FAMILY],
    fontSize: attributes[FONT_SIZE],
    bold: attributes[BOLD],
    italic: attributes[ITALIC],
    underline: attributes[UNDERLINE],
    color: attributes[FOREGROUND_COLOR],
  };
}

function mapDocumentHorizontalAlignmentToCommon(
  horizontalAlignment: GoogleAppsScript.Document.HorizontalAlignment
): HorizontalAlignment {
  const { LEFT, CENTER, RIGHT, JUSTIFY } = DocumentApp.HorizontalAlignment;
  switch (horizontalAlignment) {
    case LEFT:
      return "left";
    case RIGHT:
      return "right";
    case CENTER:
      return "center";
    case JUSTIFY:
      return "justify";
    default:
      return "center";
  }
}
