import { CaptionDescription, CaptionParts } from "../../common/types";

/**
 * Gets an object representation of the text of a caption from
 * the string text.
 *
 * @param {string} string The string of a caption.
 * @return {CaptionParts} An object representation of the caption text.
 * @customfunction
 */
export default function getCaptionPartsFromString(
  string: string
): CaptionParts {
  // TODO: this assumes the separator has spaces in between,
  // like " - " or " / ". Maybe it's a good idea to incorporate the separator
  // into the text structure interface

  // TODO2: this also assumes the label has only one word. We should fix that
  // to account for a multiple word label
  const [label, number, separator, ...descriptionWords] = string.split(" ");
  const description = descriptionWords.join(" ");
  return { label, number: Number(number), description };
}

export function getDescription(text: string): CaptionDescription {
  return getCaptionPartsFromString(text).description;
}
