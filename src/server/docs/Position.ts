export function pathInDocument(element, path: any = "") {
  // Not sure how this works. See:
  // https://sites.google.com/a/mcpher.com/share/Home/excelquirks/docs/extractingimages
  path = path || "";
  const parent = element.getParent();
  if (parent) {
    path = pathInDocument(
      parent,
      Utilities.formatString("%04d.%s", parent.getChildIndex(element), path)
    );
  }
  return path;
}

export function extractIndexFromPath(path) {
  return Number(path.split(".")[1]);
}

export function getParentIndexes(elements = []) {
  return elements.map(element => extractIndexFromPath(pathInDocument(element)));
}
