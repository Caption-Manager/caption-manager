import React from "react";
// Components
import { Button, Icon, Segment } from "semantic-ui-react";
import FontSizeEditor from "./FontSizeEditor";
import ColorPickerModal from "./ColorPickerModal";
// Types
import { Styles } from "../../../../common/types";

interface Props {
  styles: Styles;
  onChangeStyle: (key: keyof Styles, value: any) => void; // TODO: use Typescript to infer the correct type of value
}

export default function RichTextEditor({ styles, onChangeStyle }: Props) {
  return (
    <Segment.Inline
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <FontSizeEditor
        value={styles.fontSize}
        onChangeValue={newFontSize => onChangeStyle("fontSize", newFontSize)}
      />

      <Button.Group basic size="small">
        <Button
          icon
          active={styles.bold}
          onClick={() => onChangeStyle("bold", !styles.bold)}
        >
          <Icon name="bold" />
        </Button>

        <Button
          icon
          active={styles.italic}
          onClick={() => onChangeStyle("italic", !styles.italic)}
        >
          <Icon name="italic" />
        </Button>

        <Button
          icon
          active={styles.underline}
          onClick={() => onChangeStyle("underline", !styles.underline)}
        >
          <Icon name="underline" />
        </Button>

        <ColorPickerModal
          color={styles.color}
          onChangeColor={newColor => onChangeStyle("color", newColor)}
        />
      </Button.Group>

      <Button.Group basic size="small">
        <Button
          icon
          active={styles.alignment === "left"}
          onClick={() => onChangeStyle("alignment", "left")}
        >
          <Icon name="align left" />
        </Button>

        <Button
          icon
          active={styles.alignment === "center"}
          onClick={() => onChangeStyle("alignment", "center")}
        >
          <Icon name="align center" />
        </Button>

        <Button
          icon
          active={styles.alignment === "right"}
          onClick={() => onChangeStyle("alignment", "right")}
        >
          <Icon name="align right" />
        </Button>

        <Button
          icon
          active={styles.alignment === "justify"}
          onClick={() => onChangeStyle("alignment", "justify")}
        >
          <Icon name="align justify" />
        </Button>
      </Button.Group>
    </Segment.Inline>
  );
}
