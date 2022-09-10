import {
  onOpen,
  onInstall,
  insertImageDefaultList,
  insertImageBookmarkedList,
  insertTableDefaultList,
  insertTableBookmarkedList,
  insertEquationDefaultList,
  insertEquationBookmarkedList,
  openSidebar,
} from "./ui";
import { getDocumentInfo, onSaveCaption } from "./caption";
import { insertList } from "./list";

// Public functions must be exported as named exports
export {
  // Ui
  onOpen,
  onInstall,
  insertImageDefaultList,
  insertImageBookmarkedList,
  insertTableDefaultList,
  insertTableBookmarkedList,
  insertEquationDefaultList,
  insertEquationBookmarkedList,
  openSidebar,
  // Caption
  getDocumentInfo,
  onSaveCaption,
  // List
  insertList,
};
