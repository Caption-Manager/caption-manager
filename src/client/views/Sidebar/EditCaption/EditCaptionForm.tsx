import React from "react";
// Components
import {
  Form,
  Input,
  Segment,
  Accordion,
  Checkbox,
  Button,
  Icon,
  Message,
} from "semantic-ui-react";
// Services
import GAS from "../../../services/GAS";
// Utils
import { CaptionParts } from "../../../../common/utils";
// Types
import {
  CaptionLabel,
  CaptionNumber,
  CaptionDescription,
  CaptionText,
  StorageLabelKey,
  CaptionalizableSelectedElementType,
} from "../../../../common/types";

interface Props {
  initialLabel: CaptionLabel;
  number: CaptionNumber;
  initialDescription: CaptionDescription;
  selectedElementType: CaptionalizableSelectedElementType;
}

export default function EditCaptionForm({
  initialLabel,
  number,
  initialDescription,
  selectedElementType,
}: Props) {
  const [label, setLabel] = React.useState(initialLabel);
  const [description, setDescription] = React.useState(initialDescription);
  const {
    isLoading,
    autoUpdateCaptions,
    setAutoUpdateCaptions,
    bookmark,
    setBookmark,
    error,
    handleSubmit,
  } = useHandleSubmit(selectedElementType);

  React.useEffect(
    function onNewSelectedElement() {
      setLabel(initialLabel);
      setDescription(initialDescription);
    },
    [initialLabel, initialDescription]
  );

  const captionParts = new CaptionParts(label, number, description);

  function onChangeLabel(event: React.ChangeEvent<HTMLInputElement>) {
    setLabel(event.target.value);
  }

  function onChangeDescription(event: React.ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
  }

  function onChangeAutoUpdateCaptions() {
    setAutoUpdateCaptions(!autoUpdateCaptions);
  }

  function onChangeBookmark() {
    setBookmark(!bookmark);
  }

  function onSubmit() {
    handleSubmit(label, captionParts.getAsText());
  }

  function onKeyPress(event) {
    if (event.key === "Enter") {
      handleSubmit(label, captionParts.getAsText());
    }
  }

  return (
    <Form>
      <Input
        label={captionParts.getAsPrefix()}
        placeholder="Write your description here..."
        fluid
        autoFocus
        value={description}
        onChange={onChangeDescription}
      />

      <Options
        label={label}
        onChangeLabel={onChangeLabel}
        autoUpdateCaptions={autoUpdateCaptions}
        onChangeAutoUpdateCaptions={onChangeAutoUpdateCaptions}
        bookmark={bookmark}
        onChangeBookmark={onChangeBookmark}
        selectedElementType={selectedElementType}
      />

      <Button
        loading={isLoading}
        disabled={isLoading}
        onClick={onSubmit}
        onKeyPress={onKeyPress}
        primary
        style={{ marginTop: 20 }}
      >
        Save caption
      </Button>

      {error && (
        <Message negative>
          <Message.Header>Something went wrong</Message.Header>
          <p>{error}</p>
        </Message>
      )}
    </Form>
  );
}

interface OptionsProps {
  label: string;
  onChangeLabel: (event: React.ChangeEvent<HTMLInputElement>) => void;
  autoUpdateCaptions: boolean;
  onChangeAutoUpdateCaptions: () => void;
  bookmark: boolean;
  onChangeBookmark: () => void;
  selectedElementType: CaptionalizableSelectedElementType;
}

function Options({
  label,
  onChangeLabel,
  autoUpdateCaptions,
  onChangeAutoUpdateCaptions,
  bookmark,
  onChangeBookmark,
  selectedElementType,
}: OptionsProps) {
  const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);

  return (
    <Accordion>
      <Accordion.Title
        onClick={() => setIsOptionsOpen(p => !p)}
        active={isOptionsOpen}
      >
        <Icon name="dropdown" />
        Options
      </Accordion.Title>

      <Accordion.Content active={isOptionsOpen}>
        <Segment basic>
          <Form.Input
            inline
            value={label}
            label={`Label for ${humanReadableType(selectedElementType)}`}
            onChange={onChangeLabel}
          />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <Checkbox
              checked={autoUpdateCaptions}
              style={{ marginBottom: 10 }}
              label={"Auto update captions"}
              onChange={onChangeAutoUpdateCaptions}
            />
            <Checkbox
              checked={bookmark}
              label={"Bookmark"}
              onChange={onChangeBookmark}
            />
          </div>
        </Segment>
      </Accordion.Content>
    </Accordion>
  );
}

function useHandleSubmit(type: CaptionalizableSelectedElementType) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [autoUpdateCaptions, setAutoUpdateCaptions] = React.useState(false);
  const [bookmark, setBookmark] = React.useState(false);
  const [error, setError] = React.useState<null | string>(null);

  async function handleSubmit(label: string, text: CaptionText) {
    setError(null);
    setIsLoading(true);
    try {
      await Promise.all([
        GAS.setUserLabel(getStorageLabelKeyFromType(type), label),
        GAS.upsertCaption(text),
      ]);
      if (autoUpdateCaptions) {
        await GAS.updateCaptions(label);
      }
    } catch (error) {
      setError(error.message || "We couldn't update your caption");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    autoUpdateCaptions,
    setAutoUpdateCaptions,
    bookmark,
    setBookmark,
    error,
    handleSubmit,
  };
}

function getStorageLabelKeyFromType(
  type: CaptionalizableSelectedElementType
): StorageLabelKey {
  switch (type) {
    case "INLINE_IMAGE":
      return "INLINE_IMAGE";
    case "TABLE_CELL":
      return "TABLE";
    case "EQUATION":
      return "EQUATION";
    default:
      // This should be impossible
      return type;
  }
}

function humanReadableType(type: CaptionalizableSelectedElementType) {
  switch (type) {
    case "INLINE_IMAGE":
      return "Inline Image";
    case "TABLE_CELL":
      return "Table";
    case "EQUATION":
      return "Equation";
    default:
      return type;
  }
}
