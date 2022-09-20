import React from "react";
// Components
import { Button, Form, Message, Segment, TextArea } from "semantic-ui-react";
import RichTextEditor from "./RichTextEditor";

type Alignment = "left" | "center" | "right" | "justify";

const INITIAL_FORM_VALUES = {
  fontSize: 16,
  bold: false,
  italic: false,
  underline: false,
  color: "#000",
  alignment: "left" as Alignment,
};

export type FormValues = typeof INITIAL_FORM_VALUES;

export default function CaptionStyleModal() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const [values, setValues] = React.useState<FormValues>(INITIAL_FORM_VALUES);

  function onChangeFormValue(key: keyof FormValues, value: any) {
    setValues(previous => ({ ...previous, [key]: value }));
  }

  async function handleSubmit() {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await (function wait() {
        return new Promise(resolve => {
          setTimeout(() => resolve(""), 1000);
        });
      })();
      throw new Error("Invalid font");
    } catch (error) {
      setSubmitError(error.message || "We couldn't save your styles");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form>
      <Segment style={{ paddingTop: 5 }} textAlign="center">
        <RichTextEditor values={values} onChangeValue={onChangeFormValue} />
        <CaptionTextArea values={values} />
      </Segment>

      <div style={{ position: "fixed", bottom: 0, width: "100%" }}>
        <Button
          loading={isSubmitting}
          onClick={handleSubmit}
          primary
          fluid
          size="large"
        >
          Save styles
        </Button>

        {submitError && (
          <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{submitError}</p>
          </Message>
        )}
      </div>
    </Form>
  );
}

function CaptionTextArea({ values }: { values: FormValues }) {
  return (
    <TextArea
      value={"Figure 1 - Some descriptive text"}
      rows={1}
      disabled
      style={
        {
          marginTop: "1em",
          maxHeight: 120,
          resize: "none",
          color: values.color,
          fontSize: values.fontSize,
          fontWeight: values.bold ? "bold" : "normal",
          fontStyle: values.italic ? "italic" : "normal",
          textDecoration: values.underline ? "underline" : undefined,
          textAlign: values.alignment as any,
        } as React.CSSProperties
      }
    />
  );
}
