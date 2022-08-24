import React from "react";
// Hooks
import { useDocumentInfo } from "./useDocumentInfo";
// Components
import CaptionEditor from "./CaptionEditor";
import { Bold, Header, NormalText, Paragraph } from "../../components";
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
        initialLabel={docCaptionParts.label}
        number={docCaptionParts.number}
        initialDescription={docCaptionParts.description}
      />
    );
  }
}

const padded: any = {
  padding: "10px",
  overflowX: "hidden",
};

function NoSelectedElement() {
  return (
    <div style={padded}>
      <Header>No selected element</Header>
      <NormalText>
        Select an Image, Table or Equation in document to insert or edit a
        caption.
      </NormalText>
    </div>
  );
}

function NotCaptionalizableElement({
  selectedElement,
}: {
  selectedElement: NotCaptionalizableElementInfo;
}) {
  return (
    <div style={padded}>
      <Header>Invalid selected element</Header>
      <Paragraph>
        You can't insert or edit a caption in a{" "}
        <Bold>{selectedElement.type}</Bold> element. Select an Image, Table or
        Equation instead.
      </Paragraph>
    </div>
  );
}
