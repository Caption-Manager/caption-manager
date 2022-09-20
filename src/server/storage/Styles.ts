import { Styles } from "../../common/types";

const DOCUMENT_CAPTION_STYLES_KEY = "DOCUMENT_CAPTION_STYLES_KEY";

const DEFAULT_DOCUMENT_CAPTION_STYLES: Styles = {
  fontSize: 11,
  bold: false,
  italic: false,
  underline: false,
  color: "#000000",
  alignment: "center",
};

export function getDocumentCaptionStyles(): Styles {
  try {
    const Properties = PropertiesService.getDocumentProperties();
    const docCaptionStyles = Properties.getProperty(
      DOCUMENT_CAPTION_STYLES_KEY
    );
    // TODO: add some validation here to make sure the
    // object conforms to the Styles interface
    if (docCaptionStyles) return JSON.parse(docCaptionStyles);
    else return DEFAULT_DOCUMENT_CAPTION_STYLES;
  } catch (error) {
    // TODO: maybe warn the user? Provide better cache?
    return DEFAULT_DOCUMENT_CAPTION_STYLES;
  }
}

export function setDocumentCaptionStyles(styles: Styles): void {
  try {
    const Properties = PropertiesService.getDocumentProperties();
    Properties.setProperty(DOCUMENT_CAPTION_STYLES_KEY, JSON.stringify(styles));
  } catch (error) {
    // TODO: currently we let the client deal with this error
    // but maybe we could retry or/and have multiple layers
    // of storage
    throw error;
  }
}
