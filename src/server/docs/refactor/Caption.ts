import { CaptionParent, CaptionParts, CaptionText, ICaption } from "./types";

export class Caption implements ICaption {
  private parts: CaptionParts;
  private element: GoogleAppsScript.Document.Text;

  constructor(private parent: CaptionParent) {
    this.parent = parent;
    const element = this.findOrCreateElement(parent); 
    this.element = element;
    this.parts = this.findOrCreateParts(element);
  }

  private findOrCreateElement(parent: CaptionParent): GoogleAppsScript.Document.Text {
    // TODO: implement
    // Find a text element, representing the caption text.
    // If the element doesn't exist, create one 
    return {} as GoogleAppsScript.Document.Text;
  }

  private findOrCreateParts(element: GoogleAppsScript.Document.Text) {
    // TODO: implement
    // Finds the parts of a caption text
    // If no parts are found, create default ones
    return { label: "", number: 1, suffix: "" };
  }

  getElement() {
    return this.element;
  }

  getParent() {
    return this.parent;
  }

  getType() {
    return this.parent.getType();
  }

  getParts() {
    return this.parts;
  }

  setParts(parts: CaptionParts) {
    this.parts = parts;
    this.updateDocument();
    return this.parts;
  }

  getText(): CaptionText {
    const { label, number, suffix } = this.parts;
    return `${label} ${number} - ${suffix}`;
  }

  async upsertText(parts: CaptionParts) {
    this.parts = parts;
    this.updateDocument();
    return this;
  }

  private updateDocument() {
    const REPLACE_ALL_REGEX = "";
    this.getElement().replaceText(REPLACE_ALL_REGEX, this.getText());
  }
}




