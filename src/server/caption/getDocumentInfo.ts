import getFirstSelectedElement from "../utils/getFirstSelectedElement";
import isCaptionalizable from "./isCaptionalizable";
import getCaptionParts from "./getCaptionParts";
import {
  DocumentInfo,
  SelectedElementInfo,
  CaptionalizableSelectedElementType,
} from "../../common/types";

export default function getDocumentInfo(): DocumentInfo {
  return {
    selectedElement: getSelectedElementInfo(),
  };
}

function getSelectedElementInfo(): SelectedElementInfo {
  const selectedElement = getFirstSelectedElement();
  if (!selectedElement) return null;

  if (!isCaptionalizable(selectedElement)) {
    return {
      isCaptionalizable: false,
      type: selectedElement.getType().toString(),
    };
  }

  return {
    isCaptionalizable: true,
    type: selectedElement
      .getType()
      .toString() as CaptionalizableSelectedElementType,
    captionParts: getCaptionParts(selectedElement),
  };
}
