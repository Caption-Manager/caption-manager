import { insertList } from "./list/index.ts";

export function onInstall() {
  onOpen();
}

export function onOpen() {
  // We should use createAddonMenu instead, because this can lead
  // to unexpect ui as shown in https://developers.google.com/apps-script/add-ons/concepts/menus

  /*  "Caution: Unpublished add-ons can also create custom top-level menus, but these are automatically 
  moved under the Add-ons menu if the add-on is published and may not result in the user experience you intended. 
  If you intend to publish the add-on, always use Ui.createAddonMenu() to define the add-on menu."
  */

  // But we can't see the add-on menu on development mode

  const addOnMenu = DocumentApp.getUi().createMenu("Caption Manager");

  const insertListOfImagesSubMenu = DocumentApp.getUi()
    .createMenu("Insert list of images")
    .addItem("Default", insertImageDefaultList.name)
    .addItem("Bookmarked", insertImageBookmarkedList.name);

  const insertListOfTablesSubMenu = DocumentApp.getUi()
    .createMenu("Insert list of tables")
    .addItem("Default", insertTableDefaultList.name)
    .addItem("Bookmarked", insertTableBookmarkedList.name);

  const insertListOfEquationsSubMenu = DocumentApp.getUi()
    .createMenu("Insert list of equations")
    .addItem("Default", insertEquationDefaultList.name)
    .addItem("Bookmarked", insertEquationBookmarkedList.name);

  addOnMenu
    .addItem("Open sidebar", openSidebar.name)
    .addSeparator()
    .addSubMenu(insertListOfImagesSubMenu)
    .addSubMenu(insertListOfTablesSubMenu)
    .addSubMenu(insertListOfEquationsSubMenu)
    .addSeparator()
    .addItem("Edit styles", openCaptionStyleModal.name)
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

export function openCaptionStyleModal() {
  const html = HtmlService.createHtmlOutputFromFile("caption-style-modal");
  DocumentApp.getUi().showModalDialog(html, "Edit caption styles");
}
