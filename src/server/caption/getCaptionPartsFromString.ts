import { CaptionDescription, CaptionParts } from "../../common/types";

/**
 * Gets an object representation of the text of a caption from
 * the string text.
 *
 * @param {string} string The string representing the text of a caption.
 * @return {CaptionParts} An object representation of the caption text.
 * @customfunction
 */
export default function getCaptionPartsFromString(
  string: string
): CaptionParts {
  // TODO2: this also assumes the label has only one word. We should fix that
  // to account for a multiple word label
  const [label, number, ...descriptionWords] = string.split(" ");
  const description = descriptionWords.join(" ");
  return { label, number: Number(number), description };
}

export function getDescription(string: string): CaptionDescription {
  return getCaptionPartsFromString(string).description;
}
