export type CaptionLabel = string;
export type CaptionNumber = number;
export type CaptionDescription = string;

export type CaptionPrefix = `${CaptionLabel} ${CaptionNumber} - `;

export type CaptionText = `${CaptionLabel} ${CaptionNumber} - ${CaptionDescription}`;

export type CaptionElement = | GoogleAppsScript.Document.InlineImage 
                             | GoogleAppsScript.Document.Table
                             | GoogleAppsScript.Document.TableRow
                             | GoogleAppsScript.Document.TableCell
                             | GoogleAppsScript.Document.Equation;

export const CAPTION_TYPES: ReadonlyArray<GoogleAppsScript.Document.ElementType> = [
  DocumentApp.ElementType.INLINE_IMAGE,
  DocumentApp.ElementType.TABLE,
  DocumentApp.ElementType.TABLE_ROW,
  DocumentApp.ElementType.TABLE_CELL,
  DocumentApp.ElementType.EQUATION,
];

export interface CaptionParts {
  label: CaptionLabel;
  number: CaptionNumber;
  description: CaptionDescription;
};

export interface CaptionalizableElementInfo {
  isCaptionalizable: true;
  captionParts: CaptionParts;
}

export interface NotCaptionalizableElementInfo {
  isCaptionalizable: false;
  type: string;
}

export type SelectedElementInfo = CaptionalizableElementInfo | NotCaptionalizableElementInfo | null;

export interface DocumentInfo {
  selectedElement: CaptionalizableElementInfo | NotCaptionalizableElementInfo | null;
};