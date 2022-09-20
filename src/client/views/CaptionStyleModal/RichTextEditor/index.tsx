import React from "react";
// Components
import { Button, Icon, Segment } from "semantic-ui-react";
import FontSizeEditor from "./FontSizeEditor";
// Types
import { FormValues } from "../CaptionStyleModal";
import ColorPickerModal from "./ColorPickerModal";

interface Props {
  values: FormValues;
  onChangeValue: (key: keyof FormValues, value: any) => void;
}

export default function RichTextEditor({ values, onChangeValue }: Props) {
  return (
    <Segment.Inline
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <FontSizeEditor
        fontSize={values.fontSize}
        onChangeFontSize={newValue => onChangeValue("fontSize", newValue)}
      />

      <Button.Group basic size="small">
        <Button
          icon
          active={values.bold}
          onClick={() => onChangeValue("bold", !values.bold)}
        >
          <Icon name="bold" />
        </Button>

        <Button
          icon
          active={values.italic}
          onClick={() => onChangeValue("italic", !values.italic)}
        >
          <Icon name="italic" />
        </Button>

        <Button
          icon
          active={values.underline}
          onClick={() => onChangeValue("underline", !values.underline)}
        >
          <Icon name="underline" />
        </Button>

        <ColorPickerModal
          color={values.color}
          onChangeColor={newColor => onChangeValue("color", newColor)}
        />
      </Button.Group>

      <Button.Group basic size="small">
        <Button
          icon
          active={values.alignment === "left"}
          onClick={() => onChangeValue("alignment", "left")}
        >
          <Icon name="align left" />
        </Button>

        <Button
          icon
          active={values.alignment === "center"}
          onClick={() => onChangeValue("alignment", "center")}
        >
          <Icon name="align center" />
        </Button>

        <Button
          icon
          active={values.alignment === "right"}
          onClick={() => onChangeValue("alignment", "right")}
        >
          <Icon name="align right" />
        </Button>

        <Button
          icon
          active={values.alignment === "justify"}
          onClick={() => onChangeValue("alignment", "justify")}
        >
          <Icon name="align justify" />
        </Button>
      </Button.Group>
    </Segment.Inline>
  );
}
