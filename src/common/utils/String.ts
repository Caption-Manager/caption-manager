export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitalizeOnlyFirstLetter(string: string): string {
  string = String(string).toLowerCase();
  return capitalizeFirstLetter(string);
}

export function removeLineBreaks(string: string): string {
  return string.replace(/(\r\n|\n|\r)/gm, "");
}

export function leftTrim(string: string) {
  return string.replace(/^\s+/g, "");
}

export function hasLetters(str: string) {
  return /[a-zA-Z]/.test(str);
}
