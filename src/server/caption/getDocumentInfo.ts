import getSelectedElement from "../utils/getSelectedElement";
import isCaptionalizable from "./isCaptionalizable";
import getCaptionParts from "./getCaptionParts";
import {  DocumentInfo, LabelKey, SelectedElementInfo } from "../../common/types";
import { DEFAULT_LABELS } from "../../common/constants";
import { includes } from "../../common/utils";

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
    type: getAsValidLabelKey(selectedElement.getType().toString()),
    captionParts: getCaptionParts(selectedElement)
  };
}

function getAsValidLabelKey(type: string): LabelKey {
  if (includes(Object.keys(DEFAULT_LABELS), type)) return type as LabelKey;
  if (includes(["TABLE_CELL", "TABLE_ROW"], type)) return "TABLE";
}

