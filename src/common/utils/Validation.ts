type ValidationTypes = "element" | "list_type";

export function validate(type: ValidationTypes, value: string): string | null {
  switch (type) {
    case "element": {
      return !value ? "Please select an element" : null;
    }

    case "list_type": {
      return !value ? "Please provide a type" : null;
    }

    default:
      return !value ? "Please provide a value" : null;
  }
}
