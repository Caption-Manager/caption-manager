import * as React from "react";
// Components
import {
  Form,
  Segment,
  Dropdown,
  Grid,
  Radio,
  Button,
  Icon,
  Message,
  DropdownItemProps,
  Label,
} from "semantic-ui-react";
// Utils
import * as Validation from "../../../../common/utils/Validation";

interface FormValues {
  [key: string]: string | undefined;
}

interface ValidationErrors {
  [key: string]: string | null;
}

type ListType = "Numbered" | "Bookmarked";

export default function InsertList() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  const [values, setValues] = React.useState<FormValues>({
    element: undefined,
    type: undefined,
  });

  const [errors, setErrors] = React.useState<ValidationErrors>({
    element: null,
    type: null,
  });

  function onSelectElement(e, { value: selectedElement }: DropdownItemProps) {
    setErrors(e => ({
      ...e,
      element: Validation.validate("element", selectedElement as string),
    }));
    setValues(v => ({ ...v, element: selectedElement as string }));
  }

  function onSelectType(selectedType: ListType) {
    setErrors(e => ({
      ...e,
      type: Validation.validate("list_type", selectedType),
    }));
    setValues(v => ({ ...v, type: selectedType }));
  }

  async function onSubmit() {
    if (isSubmitting) return;
    setHasSubmitted(true);

    const errors: ValidationErrors = {
      element: Validation.validate("element", values.element),
      type: Validation.validate("list_type", values.type),
    };
    setErrors(errors);
    const hasValidationErrors = Object.values(errors).some(Boolean);
    if (hasValidationErrors) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await wait();
    } catch (error) {
      setSubmitError(error.message || "Please try again later");
    } finally {
      setIsSubmitting(false);
    }
  }

  const hasValidationErrors = Object.values(errors).some(Boolean);
  const disableSubmitButton =
    isSubmitting || (hasSubmitted && hasValidationErrors);

  return (
    <Form>
      <Segment basic>
        <ElementDropdown
          value={values.element}
          error={errors.element}
          onSelectElement={onSelectElement}
        />

        <ListTypeRadioButtons
          value={values.type as ListType}
          error={errors.type}
          onButtonClick={onSelectType}
        />
      </Segment>

      <Button
        loading={isSubmitting}
        disabled={disableSubmitButton}
        onClick={onSubmit}
        primary
      >
        Insert list
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

interface ElementDropdownProps {
  value: string | undefined;
  error: string | null;
  onSelectElement: (e, { value: selectedElement }: DropdownItemProps) => void;
}

function ElementDropdown({
  value,
  error,
  onSelectElement,
}: ElementDropdownProps) {
  return (
    <Form.Dropdown
      value={value}
      text={value}
      error={error}
      label={"Element"}
      placeholder="Select an element"
      fluid
      required
      selection
    >
      <Dropdown.Menu>
        <Dropdown.Item
          value={"Image"}
          icon="image"
          text="Image"
          onClick={onSelectElement}
          active={value === "Image"}
        />
        <Dropdown.Item
          value={"Table"}
          icon="table"
          text="Table"
          onClick={onSelectElement}
          active={value === "Table"}
        />
        <Dropdown.Item
          value={"Equation"}
          icon="calculator"
          text="Equation"
          onClick={onSelectElement}
          active={value === "Equation"}
        />
      </Dropdown.Menu>
    </Form.Dropdown>
  );
}

interface ListTypeRadioButtonsProps {
  value: ListType | undefined;
  error: string | null;
  onButtonClick: (selectedType: ListType) => void;
}

function ListTypeRadioButtons({
  value,
  error,
  onButtonClick,
}: ListTypeRadioButtonsProps) {
  return (
    <React.Fragment>
      <Form.Field required label="Type" style={{ marginBottom: 0 }} />
      <Grid columns={2} centered stretched>
        <Grid.Column textAlign="center">
          <TypeRadioButton
            icon={
              <Icon name="ordered list" size="big" style={{ marginLeft: 8 }} />
            }
            checked={value === "Numbered"}
            onClick={() => onButtonClick("Numbered")}
          >
            Numbered
          </TypeRadioButton>
        </Grid.Column>

        <Grid.Column textAlign="center">
          <TypeRadioButton
            icon={
              <Icon
                name="list"
                color="blue"
                size="big"
                style={{ marginLeft: 8 }}
              />
            }
            checked={value === "Bookmarked"}
            onClick={() => onButtonClick("Bookmarked")}
          >
            Bookmarked
          </TypeRadioButton>
        </Grid.Column>
      </Grid>

      {error && (
        <Form.Field>
          <Label
            pointing
            prompt
            style={{ width: "100%", textAlign: "center", marginTop: 15 }}
          >
            {error}
          </Label>
        </Form.Field>
      )}
    </React.Fragment>
  );
}

interface TypeRadioButtonProps {
  checked: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function TypeRadioButton({
  checked,
  onClick,
  children,
  icon,
}: TypeRadioButtonProps) {
  return (
    <Segment
      raised={checked}
      as={Button}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: 120,
        maxHeight: 120,
      }}
      onClick={onClick}
    >
      {icon}
      <Radio checked={checked} style={{ marginTop: 15, marginBottom: 5 }} />
      <p>{children}</p>
    </Segment>
  );
}

async function wait() {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) resolve();
      else reject("A bad error");
    }, 500);
  });
}
