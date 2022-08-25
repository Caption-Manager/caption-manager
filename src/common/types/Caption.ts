export type Caption = GoogleAppsScript.Document.Text;

export type CaptionParent =  | GoogleAppsScript.Document.InlineImage 
                             | GoogleAppsScript.Document.Table
                             | GoogleAppsScript.Document.Equation;

export type CaptionParentType = "INLINE_IMAGE" | "TABLE" | "EQUATION";