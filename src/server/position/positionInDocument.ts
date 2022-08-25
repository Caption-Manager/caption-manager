/**
  * Creates a position in document for a given element.
  * @param {GoogleAppsScript.Document.Element} element An element.
  * @param {string} [position=''] Current position for given iteration.
  * @return {string} The final position of the element.
  * 
  * See: 
  * https://stackoverflow.com/questions/28100337/apps-script-element-equality
  * https://sites.google.com/a/mcpher.com/share/Home/excelquirks/docs/sortbookmarks
  * 
  * @customfunction
*/
export default function positionInDocument(element: any, position: string = ""): string {
  position = position || "" ;
  const parent = element.getParent();
  if (parent) {
    position = positionInDocument(parent, Utilities.formatString("%04d.%s", parent.getChildIndex(element) as any, position as any));
  }
  return position;
}