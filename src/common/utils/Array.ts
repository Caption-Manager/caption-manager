export function includes(array: Array<any>, value: any) {
  for (const element of array) {
    if (element === value) return true;
  }
  return false;
}
