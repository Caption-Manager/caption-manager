import React from "react";
// Components
import {
  Button,
  Form,
  Loader,
  Message,
  Segment,
  TextArea,
} from "semantic-ui-react";
import RichTextEditor from "./RichTextEditor";
// Services
import GAS from "../../services/GAS";
// Types
import { Styles } from "../../../common/types";

export type FormValues = Styles;

export default function CaptionStyleModal() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const { values, setValues, isLoadingValues } = useDocumentValues();

  function onChangeFormValue(key: keyof FormValues, value: any) {
    setValues(previous => ({ ...previous, [key]: value }));
  }

  async function handleSubmit() {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await GAS.updateAllCaptionsStyles(values);
    } catch (error) {
      setSubmitError(error.message || "We couldn't save your styles");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoadingValues) {
    return <LoadingPlaceholder />;
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
          Apply styles
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

const FALLBACK_FORM_VALUES: Styles = {
  fontSize: 11,
  bold: false,
  italic: false,
  underline: false,
  color: "#000000",
  alignment: "center",
};

function useDocumentValues() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [values, setValues] = React.useState<FormValues>(FALLBACK_FORM_VALUES);

  React.useEffect(function onMount() {
    (async function fetchDocumentCaptionStyles() {
      try {
        const docStyles = await GAS.getDocumentCaptionStyles();
        setValues(docStyles);
      } catch (error) {
        // TODO: warn user here somehow?
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { values, setValues, isLoadingValues: isLoading };
}

function LoadingPlaceholder() {
  return (
    <Segment placeholder>
      <Loader active size="medium">
        Loading document styles...
      </Loader>
    </Segment>
  );
}
