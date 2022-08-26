import { CaptionalizableSelectedElement } from "../../common/types";
import getFirstSelectedElement from "../utils/getFirstSelectedElement";
import isCaptionalizable from "./isCaptionalizable";

export default function getCaptionalizableSelectedElement() {
  const selectedElement = getFirstSelectedElement();
  if (!selectedElement || !isCaptionalizable(selectedElement)) {
    const baseErrorMessage =
      "You must have a captionalizable selected element (table, image or equation) to upsert a caption.";
    throw new Error(
      !selectedElement
        ? baseErrorMessage
        : `${baseErrorMessage} ${selectedElement
            .getType()
            .toString()} element is not a valid element.`
    );
  }
  return (selectedElement as unknown) as CaptionalizableSelectedElement;
}
