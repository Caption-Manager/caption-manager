import { Caption } from "../../common/types";
import getCaption from "../caption/getCaption";
import getCaptionalizableSelectedElement from "../caption/getCaptionalizableSelectedElement";
import getBookmark from "./getBookmark";

/**
 * Removes (if a bookmark exists) and then inserts a bookmark for the caption
 * provided as argument.
 * If no caption is given, gets the caption from the selected. If no element
 * or an invalid element is selected on document, or no Caption is found for t
 * hat element, throws an error.
 * @param {Caption?} caption A caption to insert the bookmark on.
 * @return {GoogleAppsScript.Document.Bookmark} The updated or inserted bookmark.
 * @customfunction
 */
export default function upsertBookmark(
  caption?: Caption
): GoogleAppsScript.Document.Bookmark {
  if (!caption) {
    // We should change this when we refactor to pass the
    // element as an argument
    const selectedElement = getCaptionalizableSelectedElement();
    caption = getCaption(selectedElement);
    if (!caption) throw new Error("No caption found for selected element");
  }

  const bookmark = getBookmark(caption);
  if (bookmark) {
    bookmark.remove();
  }

  return insertBookmark(caption);
}

/**
 * Inserts a bookmark in the beggining of the caption.
 *
 * @param {Caption} caption A caption to insert the  bookmark.
 * @return {GoogleAppsScript.Document.Bookmark} The inserted bookmark.
 * @customfunction
 */
function insertBookmark(caption: Caption): GoogleAppsScript.Document.Bookmark {
  const document = DocumentApp.getActiveDocument();
  const bookmarkPosition = document.newPosition(
    (caption as unknown) as GoogleAppsScript.Document.Element,
    1 // characters after beginning of text
  );
  const bookmark = document.addBookmark(bookmarkPosition);
  return bookmark;
}
