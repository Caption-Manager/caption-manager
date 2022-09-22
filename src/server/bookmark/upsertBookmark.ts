import { Caption } from "../../common/types";
import getBookmark from "./getBookmark";

/**
 * Returns a bookmark (if it exists) or inserts a bookmark for the caption
 * provided as argument.
 * @param {Caption?} caption A caption to insert the bookmark on.
 * @return {GoogleAppsScript.Document.Bookmark} The updated or inserted bookmark.
 * @customfunction
 */
export default function upsertBookmark(
  caption: Caption
): GoogleAppsScript.Document.Bookmark {
  const bookmark = getBookmark(caption);
  if (bookmark) {
    // We are returning the bookmark here, but this is a bit dangerous.
    // Right now the bookmark MUST be positioned at the end of the caption
    // text, otherwise we are not able to update the caption text (with
    // updateCaption.ts) without removing a bookmark. Before we were
    // deleting a bookmark and then inserting a new one to guarantee that
    // the all captions have bookmarks in the format we want (with the bookmark
    // on the end).
    // But recreating bookmarks everytime makes links to this bookmark on
    // a list or any other part of the document stale/broken. So we are assuming
    // that the bookmark is in the right position here (maybe we could add checks
    // on "getBookmark.ts") in order to make sure that this bookmark is only deleted
    // manually (through the document) or by unchecking the "bookmark" option when
    // saving a caption.
    return bookmark;
  }

  return insertBookmark(caption);
}

/**
 * Inserts a bookmark in the end of the caption.
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
