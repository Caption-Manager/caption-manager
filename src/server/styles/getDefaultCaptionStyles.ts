import { HorizontalAlignment, Styles } from "../../common/types";
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
    return {
      alignment: mapDocumentHorizontalAlignmentToCommon(
        firstCaptionParagraphAttributes[HORIZONTAL_ALIGNMENT]
      ),
      fontSize: firstCaption.getFontSize(),
      bold: firstCaption.isBold(),
      italic: firstCaption.isItalic(),
      underline: firstCaption.isUnderline(),
      color: firstCaption.getForegroundColor(),
    };
  }

  return null;
}

const CAPTION_TYPES = [
  DocumentApp.ElementType.INLINE_IMAGE,
  DocumentApp.ElementType.TABLE_CELL,
  DocumentApp.ElementType.EQUATION,
];

function getFirstCaption() {
  for (const type of CAPTION_TYPES) {
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
