import { CaptionalizableSelectedElementType } from "../../common/types";

export function type(type: CaptionalizableSelectedElementType) {
  switch (type) {
    case "INLINE_IMAGE":
      return "Image";
    case "TABLE_CELL":
      return "Table";
    case "EQUATION":
      return "Equation";
    default:
      return type;
  }
}
