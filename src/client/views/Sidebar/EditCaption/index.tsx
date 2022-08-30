import React from "react";
// Hooks
import useDocumentInfo from "./useDocumentInfo";
// Components
import { Message } from "semantic-ui-react";
import EditCaptionForm from "./EditCaptionForm";
// Utils
import { capitalizeOnlyFirstLetter } from "../../../../common/utils";
// Types
import { NotCaptionalizableElementInfo } from "../../../../common/types";

export default function EditCaption() {
  const { selectedElement } = useDocumentInfo();
  if (!selectedElement) {
    return <NoSelectedElement />;
  } else if (selectedElement.isCaptionalizable === false) {
    return <NotCaptionalizableElement selectedElement={selectedElement} />;
  } else {
    const { captionParts: docCaptionParts } = selectedElement;
    return (
      <EditCaptionForm
        initialLabel={docCaptionParts.label}
        number={docCaptionParts.number}
        initialDescription={docCaptionParts.description}
        selectedElementType={selectedElement.type}
      />
    );
  }
}

function NoSelectedElement() {
  return (
    <React.Fragment>
      <Message info>
        <Message.Header>No selected element</Message.Header>
        <p>
          Select an image, table or equation in document to edit or insert a
          caption.
        </p>
      </Message>
    </React.Fragment>
  );
}

function NotCaptionalizableElement({
  selectedElement,
}: {
  selectedElement: NotCaptionalizableElementInfo;
}) {
  return (
    <React.Fragment>
      <Message warning>
        <Message.Header>Invalid selected element</Message.Header>
        <p>
          You can't insert or edit a caption in a{" "}
          <b>{capitalizeOnlyFirstLetter(selectedElement.type)}</b> element.
          Select an image, table or equation instead.
        </p>
      </Message>
    </React.Fragment>
  );
}
