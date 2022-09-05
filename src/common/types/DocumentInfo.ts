import { CaptionalizableSelectedElementType, CaptionParts } from "./Caption";

/**
 * Information about a caption of a captionalizable element
 * selected on document.
 */
export interface CaptionInfo extends CaptionParts {
  isBookmarked: boolean;
}

/**
 * Information about a captionalizable element selected
 * on document.
 */
export interface CaptionalizableElementInfo {
  isCaptionalizable: true;
  caption: CaptionInfo;
  type: CaptionalizableSelectedElementType;
}

/**
 * Information about a not captionalizable element selected
 * on document.
 */
export interface NotCaptionalizableElementInfo {
  isCaptionalizable: false;
  type: string;
}

/**
 * Data for a selected element on document.
 */
export type SelectedElementInfo =
  | CaptionalizableElementInfo
  | NotCaptionalizableElementInfo
  | null;

/**
 * Data of document used on client.
 */
export interface DocumentInfo {
  selectedElement: SelectedElementInfo | null;
}
