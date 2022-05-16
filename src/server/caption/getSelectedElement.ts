export default function getSelectedElement() {
  const selection = DocumentApp.getActiveDocument().getSelection();
  if (!selection) return null;
  const selectedRangeElement = selection.getRangeElements()[0];
  if (!selectedRangeElement) return null;
  return selectedRangeElement.getElement();
}