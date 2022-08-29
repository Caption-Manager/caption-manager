import { equalArrays, equalStart } from "../../common/utils";
import pathInDocument from "./pathInDocument";

export enum RelativeDocumentPath {
  DISCONNECTED,
  PRECEDING,
  FOLLOWING,
  CONTAINS,
  CONTAINED_BY,
  SAME,
}

/**
 * Compare the relative path in document of one element with respect to another.
 * This was inspired by
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
 *
 *
 *
 * @param {GoogleAppsScript.Document.Element} element An element.
 * @param {GoogleAppsScript.Document.Element} otherElement Another element to compare with the first.
 *
 * @return {RelativeDocumentPath} An enum representing the element position relative to otherElement.
 * @customfunction
 */
export default function comparePathInDocument(
  element: any,
  otherElement: any
): RelativeDocumentPath {
  const elementPath = pathInDocument(element);
  const otherElementPath = pathInDocument(otherElement);

  if (elementPath[0] !== otherElementPath[0])
    return RelativeDocumentPath.DISCONNECTED;

  if (equalArrays(elementPath, otherElementPath))
    return RelativeDocumentPath.SAME;

  if (
    elementPath.length !== otherElementPath.length &&
    equalStart(elementPath, otherElementPath)
  ) {
    if (elementPath.length < otherElementPath.length) {
      return RelativeDocumentPath.CONTAINS;
    } else {
      return RelativeDocumentPath.CONTAINED_BY;
    }
  }

  for (let i = 0; i < elementPath.length; i = i + 1) {
    if (elementPath[i] === otherElementPath[i]) continue;

    if (elementPath[i] < otherElementPath[i])
      return RelativeDocumentPath.PRECEDING;
    else return RelativeDocumentPath.FOLLOWING;
  }

  // We don't need to return anything outside the for loop because we know
  // the paths are not equal
}
