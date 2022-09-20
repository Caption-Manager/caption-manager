export type HorizontalAlignment = "left" | "center" | "right" | "justify";

interface ParagraphStyles {
  alignment: HorizontalAlignment;
}

interface TextSytles {
  fontSize: number;
  fontFamily: string; // TODO: type this to allow only valid fonts
  bold: boolean;
  italic: boolean;
  underline: boolean;
  color: string;
}

export interface Styles extends ParagraphStyles, TextSytles {}
