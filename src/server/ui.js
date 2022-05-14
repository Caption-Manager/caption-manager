export function onOpen() {
  const menu = DocumentApp.getUi()
    .createMenu("Caption Manager")
    .addItem("Open Sidebar", "openSidebar");
  menu.addToUi();
}

export function openSidebar() {
  const html = HtmlService.createHtmlOutputFromFile("sidebar");
  DocumentApp.getUi().showSidebar(html);
}
