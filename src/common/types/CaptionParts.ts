export type CaptionLabel = string;
export type CaptionNumber = number;
export type CaptionDescription = string;

export type CaptionPrefix = `${CaptionLabel} ${CaptionNumber} - `;
export type CaptionText = `${CaptionLabel} ${CaptionNumber} - ${CaptionDescription}`;

export interface CaptionParts {
  label: CaptionLabel;
  number: CaptionNumber;
  description: CaptionDescription;
};
