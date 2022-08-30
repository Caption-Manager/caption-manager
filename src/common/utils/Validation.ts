type ValidationTypes = "element" | "list_type" | "label";

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

    default:
      return !value ? "Please provide a value" : null;
  }
}
