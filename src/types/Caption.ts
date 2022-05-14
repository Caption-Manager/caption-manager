export type CaptionLabel = "Figure" | "Table";

export interface Caption {
  label: CaptionLabel;
  number: number;
  suffix: string;
}

// We need to find a way to not restrict parents to paragraphs
// But maybe the parent it's always a paragraph

export interface SelectedElement {
  parent: GoogleAppsScript.Document.Paragraph;
  index: number; // Index of element inside parent

  // This is derived from Caption. Can we write this
  // in a better way?
  caption: {
    label: CaptionLabel | null;
    number: number;
    suffix: string | null;
  };
}

export interface CaptionElement {
  parent: GoogleAppsScript.Document.Paragraph;
  parentIndex: number;
  index: number; // Index of element inside parent
}

export interface DocumentInfo {
  selectedElement: SelectedElement;
  captions: CaptionElement[];
}
