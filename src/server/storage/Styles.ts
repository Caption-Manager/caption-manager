import { FALLBACK_CAPTION_STYLES } from "../../common/constants";
import { Styles } from "../../common/types";
import getDefaultDocumentCaptionStyles from "../styles/getDefaultCaptionStyles";

const DOCUMENT_CAPTION_STYLES_KEY = "DOCUMENT_CAPTION_STYLES_KEY";

export function getDocumentCaptionStyles(): Styles {
  try {
    const Properties = PropertiesService.getDocumentProperties();
    const docCaptionStyles = Properties.getProperty(
      DOCUMENT_CAPTION_STYLES_KEY
    );
    // TODO: add some validation here to make sure the
    // object conforms to the Styles interface
    // This is very important because if we upgrade the add-on
    // to add a new property on styles and we don't verify anything here,
    // user will get stale/non-conforming data as styles and this
    // can cause bugs
    if (docCaptionStyles) return JSON.parse(docCaptionStyles);
    else return getDefaultDocumentCaptionStyles();
  } catch (error) {
    // TODO: maybe warn the user? Provide better cache?
    return FALLBACK_CAPTION_STYLES;
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
