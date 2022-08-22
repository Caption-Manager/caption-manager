import React from "react";
// Hooks
import { useDocumentInfo } from "./useDocumentInfo";
// Components
import CaptionEditor from "./CaptionEditor";
// Types
import { NotCaptionalizableElementInfo } from "../../../common/types";

export default function Sidebar() {
  const { selectedElement } = useDocumentInfo();

  if (!selectedElement) {
    return <NoSelectedElement />;
  } else if (selectedElement.isCaptionalizable === false) {
    return <NotCaptionalizableElement selectedElement={selectedElement} />;
  } else {
    const { captionParts: docCaptionParts } = selectedElement;
    return (
      <CaptionEditor
        label={docCaptionParts.label}
        number={docCaptionParts.number}
        initialDescription={docCaptionParts.description}
      />
    );
  }
}

function NoSelectedElement() {
  return (
    <div
      style={{
        padding: "10px",
        overflowX: "hidden",
        textAlign: "center",
      }}
    >
      <h3>No selected element</h3>
      <p>Select a captionalizable element in the document to insert caption</p>
    </div>
  );
}

function NotCaptionalizableElement({
  selectedElement,
}: {
  selectedElement: NotCaptionalizableElementInfo;
}) {
  return (
    <div
      style={{
        padding: "10px",
        overflowX: "hidden",
        textAlign: "center",
      }}
    >
      <h3>Not Captionalizable element</h3>
      <p>
        {selectedElement.type} is not an element where you can insert a caption
      </p>

      <p>
        Select an image, table or equation element in the document to insert
        caption
      </p>
    </div>
  );
}
