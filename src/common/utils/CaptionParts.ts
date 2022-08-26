import {
  CaptionParts as ICaptionParts,
  CaptionPrefix,
  CaptionText,
} from "../types";

export class CaptionParts implements ICaptionParts {
  label: string;
  number: number;
  description: string;

  constructor(label: string, number: number, description: string) {
    this.label = label;
    this.number = number;
    this.description = description;
  }

  getAsPrefix(): CaptionPrefix {
    return `${this.label} ${this.number} - `;
  }

  getAsText(): CaptionText {
    return `${this.getAsPrefix()}${this.description}`;
  }
}
