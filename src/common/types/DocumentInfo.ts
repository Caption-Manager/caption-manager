import { CaptionParts } from "./Caption";
import { StorageLabelKey } from "./Storage";

export interface CaptionalizableElementInfo {
  isCaptionalizable: true;
  captionParts: CaptionParts;
  type: StorageLabelKey;
}

export interface NotCaptionalizableElementInfo {
  isCaptionalizable: false;
  type: string;
}

export type SelectedElementInfo =
  | CaptionalizableElementInfo
  | NotCaptionalizableElementInfo
  | null;

export interface DocumentInfo {
  selectedElement: SelectedElementInfo | null;
}
