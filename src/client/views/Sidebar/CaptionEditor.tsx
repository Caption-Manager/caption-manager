import React from "react";
// Components
import {
  TextInput,
  ErrorText,
  PrimaryButton,
  Divider,
  Checkbox,
} from "../../components";
// Services
import GAS from "../../services/GAS";
// Utils
import { CaptionParts } from "../../../common/utils";
// Types
import {
  CaptionLabel,
  CaptionNumber,
  CaptionDescription,
  CaptionText,
  StorageLabelKey,
  CaptionalizableSelectedElementType,
} from "../../../common/types";

interface Props {
  initialLabel: CaptionLabel;
  number: CaptionNumber;
  initialDescription: CaptionDescription;
  selectedElementType: CaptionalizableSelectedElementType;
}

export default function CaptionEditor({
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
    // TODO: fix wrong description when user tries to delete
    // just part of the prefix
    const newText = event.target.value;
    const prefix = captionParts.getAsPrefix();
    const isDeletingPrefix = newText.length < prefix.length;
    setDescription(isDeletingPrefix ? "" : newText.replace(prefix, ""));
  }

  function onChangeAutoUpdateCaptions() {
    setAutoUpdateCaptions(!autoUpdateCaptions);
  }

  function onSubmit() {
    handleSubmit(label, captionParts.getAsText());
  }

  return (
    <React.Fragment>
      <TextInput
        label={"Caption:"}
        value={captionParts.getAsText()}
        onChange={onChangeDescription}
      />

      <Options
        label={label}
        onChangeLabel={onChangeLabel}
        autoUpdateCaptions={autoUpdateCaptions}
        onChangeAutoUpdateCaptions={onChangeAutoUpdateCaptions}
        selectedElementType={selectedElementType}
      />

      <div className="block">
        <PrimaryButton disabled={isLoading} onClick={onSubmit}>
          {isLoading ? "Loading..." : "Save caption"}
        </PrimaryButton>
        <ErrorText>{error}</ErrorText>
      </div>
    </React.Fragment>
  );
}

interface OptionsProps {
  label: string;
  onChangeLabel: (event: React.ChangeEvent<HTMLInputElement>) => void;
  autoUpdateCaptions: boolean;
  onChangeAutoUpdateCaptions: () => void;
  selectedElementType: CaptionalizableSelectedElementType;
}

function Options({
  label,
  onChangeLabel,
  autoUpdateCaptions,
  onChangeAutoUpdateCaptions,
  selectedElementType,
}: OptionsProps) {
  return (
    <div style={{ marginTop: 15, marginBottom: 15 }}>
      <Divider leftText="Options" />
      <TextInput
        label={`Label for ${humanReadableType(selectedElementType)}`}
        value={label}
        onChange={onChangeLabel}
      />
      <Checkbox
        checked={autoUpdateCaptions}
        label={"Auto update captions"}
        style={{ marginTop: 10 }}
        onChange={onChangeAutoUpdateCaptions}
      />
      <Divider />
    </div>
  );
}

function useHandleSubmit(type: CaptionalizableSelectedElementType) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [autoUpdateCaptions, setAutoUpdateCaptions] = React.useState(false);
  const [error, setError] = React.useState<null | string>(null);

  function handleSubmit(label: string, text: CaptionText) {
    setError(null);
    setIsLoading(true);

    GAS.setUserLabel(getStorageLabelKeyFromType(type), label)
      .then(function onStoredUserLabel() {
        return GAS.upsertCaption(text);
      })
      .then(function onCaptionUpserted() {
        if (!autoUpdateCaptions) return;
        else return GAS.updateCaptions(label);
      })
      .then(function onFinish() {
        setIsLoading(false);
      })
      .catch(function onError(error) {
        setError(error.message);
        setIsLoading(false);
      });
  }

  return {
    isLoading,
    autoUpdateCaptions,
    setAutoUpdateCaptions,
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
      throw new Error(`Invalid type ${type} to get storage key from.`);
  }
}

function humanReadableType(type: CaptionalizableSelectedElementType) {
  switch (type) {
    case "INLINE_IMAGE":
      return "Image";
    case "TABLE_CELL":
      return "Table";
    case "EQUATION":
      return "Equation";
    default:
      return "Unknown";
  }
}
