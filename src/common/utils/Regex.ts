// See: https://github.com/google/re2/wiki/Syntax
const RE2_METACHARACTERS = ["*", "+", "?", "(", ")", "|"];

/**
 * Escape with backlash ("\") all Google RE2 metacharacters of string str.
 * For instance, the string:
 * "Figure 2 - Something (rare)"
 * becomes:
 * "Figure 2 - Something \(rare\)"
 * See more on: https://github.com/google/re2/wiki/Syntax
 *
 * @param {string} str A string to be escaped
 * @return {str} The escaped string.
 * @customfunction
 */
export function escapeRE2Metacharacters(str: string): string {
  // TODO: is this even a good algorithm? Instead of
  // using some high-level function to replace all
  // metacharacters at once, we are looping and
  // replacing one by one. Is this too expensive?
  // Try to make this faster!
  const escapedStrChars: string[] = [];
  for (const char of str.split("")) {
    const foundedMetaChar = RE2_METACHARACTERS.find(
      METACHAR => char === METACHAR
    );
    const escapedChar = foundedMetaChar ? `\\${foundedMetaChar}` : char;
    escapedStrChars.push(escapedChar);
  }
  return escapedStrChars.join("");
}
