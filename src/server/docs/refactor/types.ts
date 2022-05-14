export type CaptionParent = GoogleAppsScript.Document.InlineImage |
                      GoogleAppsScript.Document.Table |
                      GoogleAppsScript.Document.Equation;
export type CaptionLabel = string;
export type CaptionNumber = number;
export type CaptionPrefix = `${CaptionLabel} ${CaptionNumber}`;
export type CaptionDelimiter = string;
export type CaptionSuffix = string;
export type CaptionText = `${CaptionPrefix}${CaptionDelimiter}${CaptionSuffix}`;
export type CaptionParts = {
  label: CaptionLabel;
  number: CaptionNumber;
  suffix: CaptionSuffix;
};

/** 
* An element representing a caption region. A Caption element can be contained within 
* an Equation, Table, or Inline Image, but cannot itself contain any other element. 
* A Caption can be thought of simply as a Text whose parent is a CaptionParent and 
* whose string text contains special properties.
**/
export interface ICaption {
  /**
  * Retrieves the element as Text.
  */
  getElement(): GoogleAppsScript.Document.Text;

  /**
  * Retrieves the element's parent element.
  */
  getParent(): CaptionParent;

  /**
  * Retrieves the contents of the element as a text string.
  */
  getText(): CaptionText;

  /**
  * Retrieves the parts that compose the element's text.
  */
  getParts(): CaptionParts;

  getType(): GoogleAppsScript.Document.ElementType

  /**
  * Applies the specified parts to the given caption parts.
  */
  setParts(parts: CaptionParts): CaptionParts;

  /**
  * Inserts or updates the specified text.
  */
  upsertText(parts: CaptionParts): Promise<ICaption>;
};

export interface DocumentInfo {
  caption: ICaption | null;
}
