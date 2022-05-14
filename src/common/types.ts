interface ICaptionParts {
  label: string;
  number: number;
  description: string;
}

interface ICaption {
  setParts(parts: ICaptionParts): ICaptionParts;
}

interface SelectedElementInfo {
  isCaptionalizable: boolean;
  getElement(): GoogleAppsScript.Document.Element | ICaption;
}

interface DocumentInfo {
  selectedElementInfo: SelectedElementInfo | null;
}