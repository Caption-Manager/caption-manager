export function equalArrays(a: Array<any>, b: Array<any>) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export function equalStart(array: Array<any>, otherArray: Array<any>) {
  const minLength = Math.min(array.length, otherArray.length);
  const startOfArray = array.slice(0, minLength);
  const startOfOtherArray = otherArray.slice(0, minLength);
  return equalArrays(startOfArray, startOfOtherArray);
}
