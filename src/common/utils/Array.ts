export function equalArrays(array: Array<any>, otherArray: Array<any>) {
  if (array === otherArray) return true;
  if (array == null || otherArray == null) return false;
  if (array.length !== otherArray.length) return false;

  for (let i = 0; i < array.length; i = i + 1) {
    if (array[i] !== otherArray[i]) return false;
  }

  return true;
}

export function equalStart(array: Array<any>, otherArray: Array<any>) {
  const minLength = Math.min(array.length, otherArray.length);
  const startOfArray = array.slice(0, minLength);
  const startOfOtherArray = otherArray.slice(0, minLength);
  return equalArrays(startOfArray, startOfOtherArray);
}
