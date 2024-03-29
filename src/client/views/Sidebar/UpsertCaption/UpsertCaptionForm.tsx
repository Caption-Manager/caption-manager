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
  Popup,
} from "semantic-ui-react";
// Services
import GAS from "../../../services/GAS";
// Utils
import * as Validation from "../../../../common/utils/Validation";
import * as HumanReadable from "../../../../common/utils/HumanReadable";
// Types
import {
  CaptionLabel,
  CaptionNumber,
  CaptionDescription,
  CaptionalizableSelectedElementType,
  CaptionPrefix,
} from "../../../../common/types";

interface Props {
  initialLabel: CaptionLabel;
  number: CaptionNumber;
  initialDescription: CaptionDescription;
  isInitiallyBookmarked: boolean;
  selectedElementType: CaptionalizableSelectedElementType;
}

interface FormValues {
  label: CaptionLabel;
  description: CaptionDescription;
  autoUpdateCaptions: boolean;
  bookmark: boolean;
}

interface ValidationErrors {
  label: string;
}

export default function UpsertCaptionForm({
  initialLabel,
  number,
  initialDescription,
  isInitiallyBookmarked,
  selectedElementType,
}: Props) {
  const [isSubmiting, setIsSubmiting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [values, setValues] = React.useState<FormValues>({
    label: initialLabel,
    description: initialDescription,
    autoUpdateCaptions: true,
    bookmark: isInitiallyBookmarked,
  });
  const [errors, setErrors] = React.useState<ValidationErrors>({
    label: null,
  });

  React.useEffect(
    function onNewSelectedElement() {
      setValues(v => ({
        ...v,
        label: initialLabel,
        description: initialDescription,
        bookmark: isInitiallyBookmarked,
      }));
      setErrors(e => ({
        ...e,
        label: Validation.validate("label", initialLabel),
      }));
    },
    [initialLabel, initialDescription, isInitiallyBookmarked]
  );

  function onChangeLabel(event: React.ChangeEvent<HTMLInputElement>) {
    const newLabel = event.target.value;
    setErrors(e => ({ ...e, label: Validation.validate("label", newLabel) }));
    setValues(v => ({ ...v, label: newLabel }));
  }

  function onChangeDescription(event: React.ChangeEvent<HTMLInputElement>) {
    setValues(v => ({ ...v, description: event.target.value }));
  }

  function onChangeAutoUpdateCaptions() {
    setValues(v => ({ ...v, autoUpdateCaptions: !v.autoUpdateCaptions }));
  }

  function onChangeBookmark() {
    setValues(v => ({ ...v, bookmark: !v.bookmark }));
  }

  async function handleSubmit() {
    if (isSubmiting) return;

    // We could focus on the input instead
    const errors: ValidationErrors = {
      label: Validation.validate("label", values.label),
    };
    setErrors(errors);
    const hasValidationErrors = Object.values(errors).some(Boolean);
    if (hasValidationErrors) return;

    setIsSubmiting(true);
    setSubmitError(null);
    try {
      const { label, description, autoUpdateCaptions, bookmark } = values;
      await GAS.onSaveCaption(
        { label, number, description },
        { autoUpdateCaptions, bookmark }
      );
    } catch (error) {
      setSubmitError(
        "Some unexpected error occurred. We couldn't save your caption."
      );
    } finally {
      setIsSubmiting(false);
    }
  }

  function onKeyPress(event) {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }

  const captionPrefix: CaptionPrefix = `${values.label} ${number}`;

  const hasValidationErrors = Object.values(errors).some(Boolean);
  const disableSubmitButton = isSubmiting || hasValidationErrors;

  return (
    <Form>
      <Input
        label={captionPrefix}
        placeholder="Write a description here..."
        fluid
        autoFocus
        value={values.description}
        onChange={onChangeDescription}
      />

      <Options
        label={values.label}
        labelError={errors.label}
        onChangeLabel={onChangeLabel}
        autoUpdateCaptions={values.autoUpdateCaptions}
        onChangeAutoUpdateCaptions={onChangeAutoUpdateCaptions}
        bookmark={values.bookmark}
        onChangeBookmark={onChangeBookmark}
        selectedElementType={selectedElementType}
      />

      <Button
        loading={isSubmiting}
        disabled={disableSubmitButton}
        onClick={handleSubmit}
        onKeyPress={onKeyPress}
        primary
        style={{ marginTop: 20 }}
      >
        Save caption
      </Button>

      {submitError && (
        <Message negative>
          <Message.Header>Something went wrong</Message.Header>
          <p>{submitError}</p>
        </Message>
      )}
    </Form>
  );
}

interface OptionsProps {
  label: string;
  labelError: string | null;
  onChangeLabel: (event: React.ChangeEvent<HTMLInputElement>) => void;
  autoUpdateCaptions: boolean;
  onChangeAutoUpdateCaptions: () => void;
  bookmark: boolean;
  onChangeBookmark: () => void;
  selectedElementType: CaptionalizableSelectedElementType;
}

function Options({
  label,
  labelError,
  onChangeLabel,
  autoUpdateCaptions,
  onChangeAutoUpdateCaptions,
  bookmark,
  onChangeBookmark,
  selectedElementType,
}: OptionsProps) {
  const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);
  const humanReadableType = HumanReadable.type(selectedElementType);
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
            value={label}
            label={`Label for ${humanReadableType}`}
            onChange={onChangeLabel}
            error={labelError}
          />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <Popup
              content={`This will update all captions of type "${humanReadableType}"
               with the provided label and correct number`}
              trigger={
                <Checkbox
                  checked={autoUpdateCaptions}
                  style={{ marginBottom: 10 }}
                  label={"Auto update captions"}
                  onChange={onChangeAutoUpdateCaptions}
                />
              }
              mouseEnterDelay={500}
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
