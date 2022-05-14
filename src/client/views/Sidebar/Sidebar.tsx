import React from "react";
// Hooks
import { useDocumentInfo } from "./useDocumentInfo";
// Components
import CaptionEditor from "./CaptionEditor";

export default function Sidebar() {
  const { caption } = useDocumentInfo();
  const selectedElementInfo = {
    exists: false,
    isCaptionalizable: false,
    element: {},
  };

  if (!selectedElementInfo.exists) {
    return <NoSelectedElement />;
  } else if (!selectedElementInfo.isCaptionalizable) {
    return <NotCaptionalizableElement />;
  } else {
    return <CaptionEditor caption={selectedElementInfo.element} />;
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

function NotCaptionalizableElement() {
  // TODO: add information about captionalizable elements
  // and current selected element
  return (
    <div
      style={{
        padding: "10px",
        overflowX: "hidden",
        textAlign: "center",
      }}
    >
      <h3>Not Captionalizable element</h3>
      <p>Select a captionalizable element in the document to insert caption</p>
    </div>
  );
}
