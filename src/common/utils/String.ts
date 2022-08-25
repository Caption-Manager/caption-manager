export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitalizeOnlyFirstLetter(string: string) {
  string = String(string).toLowerCase();
  return capitalizeFirstLetter(string);
}