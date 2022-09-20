type ValidationTypes = "element" | "list_type" | "label" | "hex";

export function validate(type: ValidationTypes, value: string): string | null {
  switch (type) {
    case "element": {
      return !value ? "Please select an element" : null;
    }

    case "list_type": {
      return !value ? "Please provide a type" : null;
    }

    case "label": {
      if (!value) return "Your label can't be empty";

      const moreThanTwoWords = value.split(" ").length > 1;
      if (moreThanTwoWords) return "Currently a label can only have one word";
      return null;
    }

    case "hex": {
      const hexRegex = /^#([0-9a-f]{3}){1,2}$/i;
      return !hexRegex.test(value) ? "Please provide a valid hex color" : null;
    }

    default:
      return !value ? "Please provide a value" : null;
  }
}
