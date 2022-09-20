export type HorizontalAlignment = "left" | "center" | "right" | "justify";

interface ParagraphStyles {
  alignment: HorizontalAlignment;
}

interface TextSytles {
  fontSize: number;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  color: string;
}

export interface Styles extends ParagraphStyles, TextSytles {}
