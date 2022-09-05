import React from "react";
// Hooks
import useDocumentInfo from "./useDocumentInfo";
// Components
import { Message } from "semantic-ui-react";
import UpsertCaptionForm from "./UpsertCaptionForm";
// Utils
import * as HumanReadable from "../../../../common/utils/HumanReadable";

export default function UpsertCaption() {
  const { selectedElement } = useDocumentInfo();
  if (!selectedElement) {
    return <NoSelectedElement />;
  } else if (selectedElement.isCaptionalizable === false) {
    return (
      <NotCaptionalizableElement selectedElementType={selectedElement.type} />
    );
  } else {
    const { caption } = selectedElement;
    return (
      <UpsertCaptionForm
        initialLabel={caption.label}
        number={caption.number}
        initialDescription={caption.description}
        isInitiallyBookmarked={caption.isBookmarked}
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
  selectedElementType,
}: {
  selectedElementType: string;
}) {
  return (
    <React.Fragment>
      <Message warning>
        <Message.Header>Invalid selected element</Message.Header>
        <p>
          You can't update or edit a caption in a{" "}
          <b>{HumanReadable.type(selectedElementType)}</b> element. Select an
          image, table or equation instead.
        </p>
      </Message>
    </React.Fragment>
  );
}
