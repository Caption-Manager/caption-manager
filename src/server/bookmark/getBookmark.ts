import { Caption } from "../../common/types";
import { Path } from "../path";

/**
 * Gets a bookmark for a given caption.
 * If no bookmark is found, returns null.
 *
 * @param {Caption} caption A caption element.
 * @return {GoogleAppsScript.Document.Bookmark | null} The bookmark or null if no bookmark is found.
 * @customfunction
 */
export default function getBookmark(
  caption: Caption
): GoogleAppsScript.Document.Bookmark | null {
  try {
    const bookmarks = DocumentApp.getActiveDocument().getBookmarks();
    for (const bookmark of bookmarks) {
      if (isBookmarkInsideCaption(bookmark, caption)) return bookmark;
    }
    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Determines if a given caption has a bookmark.
 *
 * @param {Caption} caption A caption element.
 * @return {boolean} A boolean indicating wheter the caption has a bookmark.
 * @customfunction
 */
function isBookmarkInsideCaption(
  bookmark: GoogleAppsScript.Document.Bookmark,
  caption: Caption
): boolean {
  const bookmarkElement = bookmark.getPosition().getElement();
  const pathedBookmarkElement = Path(bookmarkElement);
  if (
    pathedBookmarkElement.contains(caption as any) ||
    pathedBookmarkElement.isEqual(caption as any)
  ) {
    // Maybe we could add other checks here, like see if the caption is
    // the first child of the bookmark element
    return true;
  }

  return false;
}
