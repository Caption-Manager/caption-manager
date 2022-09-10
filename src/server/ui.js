import { insertList } from "./list/index.ts";

export function onInstall() {
  onOpen();
}

export function onOpen() {
  const addOnMenu = DocumentApp.getUi().createMenu("Caption Manager");

  const imageSubMenu = DocumentApp.getUi()
    .createMenu("Image")
    .addItem("Default", insertImageDefaultList.name)
    .addItem("Bookmarked", insertImageBookmarkedList.name);

  const tableSubMenu = DocumentApp.getUi()
    .createMenu("Table")
    .addItem("Default", insertTableDefaultList.name)
    .addItem("Bookmarked", insertTableBookmarkedList.name);

  const equationSubMenu = DocumentApp.getUi()
    .createMenu("Equation")
    .addItem("Default", insertEquationDefaultList.name)
    .addItem("Bookmarked", insertEquationBookmarkedList.name);

  const insertListSubMenu = DocumentApp.getUi()
    .createMenu("Insert a list")
    .addSubMenu(imageSubMenu)
    .addSubMenu(tableSubMenu)
    .addSubMenu(equationSubMenu);

  addOnMenu
    .addItem("Open sidebar", openSidebar.name)
    .addSeparator()
    .addSubMenu(insertListSubMenu)
    .addToUi();
}

// type CaptionalizableSelectedElementType = "INLINE_IMAGE" | "TABLE_CELL" | "EQUATION";
// type ListType = "DEFAULT" | "BOOKMARKED";

export function insertImageDefaultList() {
  insertList("INLINE_IMAGE", "DEFAULT");
}

export function insertImageBookmarkedList() {
  insertList("INLINE_IMAGE", "BOOKMARKED");
}

export function insertTableDefaultList() {
  insertList("TABLE_CELL", "DEFAULT");
}
export function insertTableBookmarkedList() {
  insertList("TABLE_CELL", "BOOKMARKED");
}

export function insertEquationDefaultList() {
  insertList("EQUATION", "DEFAULT");
}

export function insertEquationBookmarkedList() {
  insertList("EQUATION", "BOOKMARKED");
}

export function openSidebar() {
  const html = HtmlService.createHtmlOutputFromFile("sidebar");
  DocumentApp.getUi().showSidebar(html);
}
