// See: 
// https://sites.google.com/a/mcpher.com/share/Home/excelquirks/docs/sortbookmarks

export default function pathInDocument(element: any, path?: string) {
  path = path || "" ;
  const parent = element.getParent();
  if (parent) {
    path = pathInDocument(parent, Utilities.formatString("%04d.%s", parent.getChildIndex(element) as any, path as any));
  }
  return path;
}