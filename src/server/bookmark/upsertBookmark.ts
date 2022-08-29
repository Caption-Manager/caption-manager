import { Caption } from "../../common/types";
import getCaption from "../caption/getCaption";
import getCaptionalizableSelectedElement from "../caption/getCaptionalizableSelectedElement";
import getBookmark from "./getBookmark";

/**
 * Removes (if a bookmark exists) and then inserts a bookmark for the selected
 * element.
 * If no element or an invalid element is selected on document, or no Caption
 * is found for that element, throws an error.
 *
 * @return {void}
 * @customfunction
 */
export default function upsertBookmark(): void {
  const selectedElement = getCaptionalizableSelectedElement();
  const caption = getCaption(selectedElement);
  if (!caption) throw new Error("No caption found for selected element");

  const bookmark = getBookmark(caption);
  if (bookmark) {
    bookmark.remove();
  }

  insertBookmark(caption);
}

/**
 * Inserts a bookmark in the beggining of the caption.
 *
 * @param {Caption} caption A caption to insert the  bookmark.
 * @return {void}
 * @customfunction
 */
function insertBookmark(caption: Caption): void {
  const document = DocumentApp.getActiveDocument();
  const bookmarkPosition = document.newPosition(
    (caption as unknown) as GoogleAppsScript.Document.Element,
    1 // characters after beginning of text
  );
  document.addBookmark(bookmarkPosition);
}
