import { Caption } from "../../common/types";
import getBookmark from "./getBookmark";

/**
 * Removes a bookmark from a caption, if the bookmark exists.
 * @param {Caption?} caption A caption to remove the bookmark from.
 * @return {void}
 * @customfunction
 */
export default function removeBookmark(caption: Caption): void {
  const bookmark = getBookmark(caption);
  if (bookmark) {
    bookmark.remove();
  }
}
