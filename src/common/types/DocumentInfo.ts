import { CaptionParts } from "./CaptionParts";
import { LabelKey } from "./Label";

export interface CaptionalizableElementInfo {
  isCaptionalizable: true;
  captionParts: CaptionParts;
  type: LabelKey;
}

export interface NotCaptionalizableElementInfo {
  isCaptionalizable: false;
  type: string;
}

export type SelectedElementInfo = CaptionalizableElementInfo | NotCaptionalizableElementInfo | null;

export interface DocumentInfo {
  selectedElement: SelectedElementInfo | null;
};
