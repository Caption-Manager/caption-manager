import { capitalizeOnlyFirstLetter } from "./String";

export function type(type: string) {
  switch (type) {
    case "INLINE_IMAGE":
      return "Image";
    case "TABLE_CELL":
      return "Table";
    case "EQUATION":
      return "Equation";
    default: {
      if (typeof type === "string") {
        return type
          .split("_")
          .map(capitalizeOnlyFirstLetter)
          .join(" ");
      } else {
        return type;
      }
    }
  }
}
