import getCaption from "./getCaption";
import getElements from "./getElements";

export default function getCaptions(type: GoogleAppsScript.Document.ElementType) {
  const elements = getElements(type);
  return elements.map(element => getCaption(element)).filter(Boolean);
}

