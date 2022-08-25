import getFirstSelectedElement from "../utils/getFirstSelectedElement";
import isCaptionalizable from "./isCaptionalizable";
import getCaptionParts from "./getCaptionParts";
import {  DocumentInfo, StorageLabelKey, SelectedElementInfo } from "../../common/types";
import { DEFAULT_LABELS } from "../../common/constants";
import { includes } from "../../common/utils";

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
    type: getAsValidStorageLabelKey(selectedElement.getType().toString()),
    captionParts: getCaptionParts(selectedElement)
  };
}

function getAsValidStorageLabelKey(type: string): StorageLabelKey {
  if (includes(Object.keys(DEFAULT_LABELS), type)) return type as StorageLabelKey;
  if (includes(["TABLE_CELL", "TABLE_ROW"], type)) return "TABLE";
}

