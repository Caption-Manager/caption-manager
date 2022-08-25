import React from "react";
// Components
import {
  Sidebar,
  TextInput,
  ErrorText,
  PrimaryButton,
  Divider,
  Bold,
  NormalText,
  Checkbox,
  Collapsible,
} from "../../components";
// Services
import GAS from "../../services/GAS";
// Utils
import { capitalizeOnlyFirstLetter, CaptionParts } from "../../../common/utils";
// Types
import {
  CaptionLabel,
  CaptionNumber,
  CaptionDescription,
  CaptionText,
  CaptionParentType,
} from "../../../common/types";

interface Props {
  initialLabel: CaptionLabel;
  number: CaptionNumber;
  initialDescription: CaptionDescription;
  selectedElementType: CaptionParentType;
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
  } = useHandleSubmit();

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
    const newText = event.target.value;
    const prefix = captionParts.getAsPrefix();
    const isDeletingPrefix = newText.length < prefix.length;
    setDescription(isDeletingPrefix ? "" : newText.replace(prefix, ""));
  }

  function onChangeAutoUpdateCaptions() {
    setAutoUpdateCaptions(!autoUpdateCaptions);
  }

  function onSubmit() {
    handleSubmit(selectedElementType, label, captionParts.getAsText());
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
        onChangeAutoUpdateCaptons={onChangeAutoUpdateCaptions}
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

function Options({
  label,
  onChangeLabel,
  autoUpdateCaptions,
  onChangeAutoUpdateCaptons,
  selectedElementType,
}) {
  return (
    <div style={{ marginTop: 15, marginBottom: 15 }}>
      <DividerWithLeftText text={"Options"} />
      <TextInput
        label={`Label for ${humanReadableType(selectedElementType)}`}
        value={label}
        onChange={onChangeLabel}
      />
      <Checkbox
        checked={autoUpdateCaptions}
        label={"Auto update captions"}
        style={{ marginTop: 10 }}
        onChange={onChangeAutoUpdateCaptons}
      />
      <Divider />
    </div>
  );
}

function DividerWithLeftText({ text }: any) {
  return (
    <div style={{ display: "flex", marginBottom: 5 }}>
      <NormalText style={{ marginRight: 5 }}>
        <Bold>{text}</Bold>
      </NormalText>

      <div style={{ width: "100%", marginTop: 2 }}>
        <Divider />
      </div>
    </div>
  );
}

function useHandleSubmit() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [autoUpdateCaptions, setAutoUpdateCaptions] = React.useState(true);
  const [error, setError] = React.useState<null | string>(null);

  function handleSubmit(
    type: CaptionParentType,
    label: string,
    text: CaptionText
  ) {
    setError(null);
    setIsLoading(true);

    GAS.setUserLabel(type, label)
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

function humanReadableType(type: CaptionParentType) {
  switch (type) {
    case "INLINE_IMAGE":
      return "Image";
    default:
      return capitalizeOnlyFirstLetter(type);
  }
}
