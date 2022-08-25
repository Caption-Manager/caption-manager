export type CaptionLabel = string;
export type CaptionNumber = number;
export type CaptionDescription = string;

/**
  * A CaptionPrefix is a string representation of a Caption without its
  * description.
*/
export type CaptionPrefix = `${CaptionLabel} ${CaptionNumber} - `;

/**
  * A CaptionText is the string representation of a Caption.
*/
export type CaptionText = `${CaptionLabel} ${CaptionNumber} - ${CaptionDescription}`;

/**
  * An object representation of the @type {CaptionText}.
*/
export interface CaptionParts {
  label: CaptionLabel;
  number: CaptionNumber;
  description: CaptionDescription;
};

/**
  * A Caption is a Text Element whose string representation (that can be
  * obtained using getText()) matches the @type {CaptionText}.
*/
export type Caption = GoogleAppsScript.Document.Text;

/**
  * Element that can be selected on active document and can contain a Caption.
*/
export type CaptionalizableSelectedElement = GoogleAppsScript.Document.InlineImage 
| GoogleAppsScript.Document.TableCell 
| GoogleAppsScript.Document.Equation;
