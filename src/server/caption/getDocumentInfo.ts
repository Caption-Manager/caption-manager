import getSelectedElement from "./getSelectedElement";
import isCaptionalizable from "./isCaptionalizable";
import getCaptionParts from "./getCaptionParts";
import {  DocumentInfo, SelectedElementInfo } from "../../common/types";

export default function getDocumentInfo(): DocumentInfo {
  return {
    selectedElement: getSelectedElementInfo(),
  };
}

function getSelectedElementInfo(): SelectedElementInfo {
  const selectedElement = getSelectedElement();
  if (!selectedElement) return null;

  if (!isCaptionalizable(selectedElement)) {
    return {
      isCaptionalizable: false,
      type: selectedElement.getType().toString(),
    };
  }

  return {
    isCaptionalizable: true,
    captionParts: getCaptionParts(selectedElement)
  };
}
