import React from "react";

export default function NoSelectedCaption() {
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
