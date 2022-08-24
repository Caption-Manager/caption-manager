import React from "react";
// Components
import {
  Sidebar,
  TextInput,
  ErrorText,
  PrimaryButton,
  Divider,
  Select,
  Bold,
  NormalText,
} from "../../components";
// Services
import GAS from "../../services/GAS";
// Utils
import { CaptionParts } from "../../../common/caption/CaptionParts";
// Types
import {
  CaptionLabel,
  CaptionNumber,
  CaptionDescription,
  CaptionText,
} from "../../../common/types";
import { CloseButton, CreateButton } from "../../components";

const userLabels = ["Figure", "Table", "Equation"];

interface Props {
  initialLabel: CaptionLabel;
  number: CaptionNumber;
  initialDescription: CaptionDescription;
}

export default function CaptionEditor({
  initialLabel,
  number,
  initialDescription,
}: Props) {
  const [label, setLabel] = React.useState(initialLabel);
  const [description, setDescription] = React.useState(initialDescription);

  React.useEffect(
    function onNewSelectedElement() {
      setLabel(initialLabel);
      setDescription(initialDescription);
    },
    [initialLabel, initialDescription]
  );

  const { isLoading, error, saveCaption } = useSaveCaption();

  const captionParts = new CaptionParts(label, number, description);

  function onChangeLabel(event: any) {
    setLabel(event.target.value);
  }

  function onChangeDescription(event: any) {
    const { value: newText } = event.target;
    const prefix = captionParts.getAsPrefix();
    const isDeletingPrefix = newText.length < prefix.length;
    setDescription(isDeletingPrefix ? "" : newText.replace(prefix, ""));
  }

  function onSubmit() {
    saveCaption(captionParts.getAsText());
  }

  return (
    <Sidebar>
      <TextInput
        label={"Caption"}
        value={captionParts.getAsText()}
        onChange={onChangeDescription}
      />

      <Options
        labels={[...userLabels, initialLabel]}
        onChangeLabel={onChangeLabel}
      />

      <div className="block">
        <PrimaryButton disabled={isLoading} onClick={onSubmit}>
          {isLoading ? "Loading..." : "Save caption"}
        </PrimaryButton>
        <ErrorText>{error}</ErrorText>
      </div>
    </Sidebar>
  );
}

function Options({ labels, onChangeLabel }) {
  return (
    <div style={{ marginTop: 15, marginBottom: 15 }}>
      <OptionsDivider />
      <LabeledSelect
        label="Label:"
        options={labels.map(l => ({ key: l, value: l, text: l }))}
        onChange={onChangeLabel}
      />

      <CloseButton onClick={() => {}}>New label</CloseButton>
      <CreateButton disabled onClick={() => {}}>
        Delete label
      </CreateButton>
      <Divider />
    </div>
  );
}

function OptionsDivider() {
  return (
    <div style={{ display: "flex" }}>
      <NormalText style={{ marginRight: 5 }}>
        <Bold>Options</Bold>
      </NormalText>

      <div style={{ width: "100%", marginTop: 2 }}>
        <Divider />
      </div>
    </div>
  );
}

function LabeledSelect(props: { label: string; options: any; onChange: any }) {
  const { label, options, onChange } = props;
  return (
    <div
      style={{
        display: "flex",
        marginTop: 5,
        marginBottom: 15,
        alignItems: "center",
      }}
    >
      <NormalText style={{ marginRight: 20 }}>{label}</NormalText>
      <Select options={options} onChange={onChange} />
    </div>
  );
}

function useSaveCaption() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<null | string>(null);

  function saveCaption(text: CaptionText) {
    setError(null);
    setIsLoading(true);

    GAS.upsertCaption(text)
      .then(() => GAS.updateCaptionNumbers())
      .then(() => setIsLoading(false))
      .catch(function onError(error) {
        setError(error.message);
        setIsLoading(false);
      });
  }

  return { isLoading, error, saveCaption };
}
