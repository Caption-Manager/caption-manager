export const onOpen = () => {
  const menu = DocumentApp.getUi()
    .createMenu("Caption Manager")
    .addItem("Insert Caption", "openDialog");

  menu.addToUi();
};

export const openDialog = () => {
  const html = HtmlService.createHtmlOutputFromFile("caption-manager")
    .setWidth(600)
    .setHeight(600);
  DocumentApp.getUi().showModalDialog(html, "Insert Caption");
};
