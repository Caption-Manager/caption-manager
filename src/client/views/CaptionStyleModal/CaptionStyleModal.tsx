import React from "react";
// Components
import {
  Button,
  Dropdown,
  Form,
  Loader,
  Message,
  Segment,
  TextArea,
} from "semantic-ui-react";
import RichTextEditor from "./RichTextEditor";
// Services
import GAS from "../../services/GAS";
// Constants
import { FALLBACK_CAPTION_STYLES } from "../../../common/constants";
// Types
import { Styles } from "../../../common/types";
// Data
import { googleFonts } from "./googleFonts";

export default function CaptionStyleModal() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const { styles, setStyles, isLoadingDocumentStyles } = useDocumentStyles();

  function onChangeStyle(key: keyof Styles, value: any) {
    // TODO: use Typescript to infer the correct type of value
    setStyles(previous => ({ ...previous, [key]: value }));
  }

  async function handleSubmit() {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await GAS.updateAllCaptionsStyles(styles);
    } catch (error) {
      setSubmitError(error.message || "We couldn't save your styles");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoadingDocumentStyles) {
    return <LoadingPlaceholder />;
  }

  return (
    <Form>
      <Segment style={{ paddingTop: 5 }} textAlign="center">
        <RichTextEditor styles={styles} onChangeStyle={onChangeStyle} />
        <FontFamilyDropdown
          value={styles.fontFamily}
          onChangeStyle={onChangeStyle}
        />
        <CaptionTextArea styles={styles} />
        <DismissableMessage />
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

function CaptionTextArea({ styles }: { styles: Styles }) {
  return (
    <TextArea
      value={"Figure 1 - Some descriptive text"}
      rows={1}
      disabled
      style={
        {
          marginBottom: "1em",
          maxHeight: 120,
          resize: "none",
          color: styles.color,
          fontSize: styles.fontSize,
          fontWeight: styles.bold ? "bold" : "normal",
          fontStyle: styles.italic ? "italic" : "normal",
          textDecoration: styles.underline ? "underline" : undefined,
          textAlign: styles.alignment as any,
        } as React.CSSProperties
      }
    />
  );
}

function useDocumentStyles() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [styles, setStyles] = React.useState<Styles>(FALLBACK_CAPTION_STYLES);

  React.useEffect(function onMount() {
    (async function() {
      try {
        const docStyles = await GAS.getDocumentCaptionStyles();
        setStyles(docStyles);
      } catch (error) {
        // TODO: warn user here somehow?
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { styles, setStyles, isLoadingDocumentStyles: isLoading };
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

interface FontFamilyDropdownProps {
  value: string;
  onChangeStyle: (key: keyof Styles, value: any) => void;
}

function FontFamilyDropdown({ value, onChangeStyle }: FontFamilyDropdownProps) {
  return (
    <Dropdown
      value={value}
      onChange={(e, { value }) => onChangeStyle("fontFamily", value)}
      placeholder="Select Font"
      fluid
      search
      selection
      options={googleFonts}
      style={{ margin: "1em 0" }}
    />
  );
}

const HAS_DISMISSED_KEY = "HAS_DISMISSED_KEY";

function DismissableMessage() {
  const hasDismissed = localStorage.getItem(HAS_DISMISSED_KEY);
  const [isVisible, setIsVisible] = React.useState(!hasDismissed);

  if (!isVisible) return null;

  function onDismiss() {
    localStorage.setItem(HAS_DISMISSED_KEY, "true");
    setIsVisible(false);
  }

  return (
    <Message
      onDismiss={onDismiss}
      header={"Heads up!"}
      content={
        "Currently we don't support live visualization of the selected Google Font on the illustrative caption above. But rest assured changes will be reflected on your Google Document when you save styles."
      }
      size="small"
      style={{ textAlign: "left", marginBottom: "3em", marginTop: 0 }}
    />
  );
}
