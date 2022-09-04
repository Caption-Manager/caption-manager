import { Caption } from "../../common/types";
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
  caption: Caption
): GoogleAppsScript.Document.Bookmark {
  const bookmark = getBookmark(caption);
  if (bookmark) {
    // We could just return the bookmark here, but removing the bookmark
    // and inserting a new one guarantees that the inserted bookmark
    // will have the format we want. On the other hand, this makes
    // the link to this bookmark on an existing list stale/not functional.
    // Ideally, we would update the link to the bookmark and text of the
    // link on the existing list as well.
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
    // THIS IS VERY IMPORTANT: currently, if we don't insert the bookmark
    // in the end (last character) of the caption, we can't reliable
    // update the caption (see updateCaption.ts) without removing the bookmark
    // TODO: remove this comment when "updateCaption" is able to update a caption
    // without removing a bookmark
    caption.getText().length
  );
  const bookmark = document.addBookmark(bookmarkPosition);
  return bookmark;
}
