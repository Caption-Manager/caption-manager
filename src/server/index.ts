import { onOpen, openSidebar } from "./ui";
import { getDocumentInfo, upsertCaption, updateCaptions } from "./caption";
import { setDocumentLabel } from "./storage";
import { upsertBookmark } from "./bookmark";
import { insertList } from "./list";

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
  setDocumentLabel,
  // Bookmark
  upsertBookmark,
  // List
  insertList,
};
