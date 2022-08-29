import { onOpen, openSidebar } from "./ui";
import { getDocumentInfo, upsertCaption, updateCaptions } from "./caption";
import { setUserLabel } from "./storage";
import { upsertBookmark } from "./bookmark";

// Public functions must be exported as named exports
export {
  // Ui
  onOpen,
  openSidebar,
  // Caption
  getDocumentInfo,
  upsertCaption,
  updateCaptions,
  // Storage
  setUserLabel,
  // Bookmark
  upsertBookmark,
};
