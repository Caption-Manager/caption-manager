import React from "react";
// Components
import { Button, Dropdown, Form, Segment, TextArea } from "semantic-ui-react";
import RichTextEditor from "./RichTextEditor";

export interface FormValues {
  fontSize: number;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  color: string;
  alignment: string;
}

const INITIAL_FORM_VALUES: FormValues = {
  fontSize: 16,
  bold: false,
  italic: false,
  underline: false,
  color: "#000",
  alignment: "left",
};

export default function CaptionStyleModal() {
  const [values, setValues] = React.useState<FormValues>(INITIAL_FORM_VALUES);

  function onChangeFormValue(key: keyof FormValues, value: any) {
    setValues(previous => ({ ...previous, [key]: value }));
  }

  return (
    <Form>
      <Segment style={{ paddingTop: 5 }} textAlign="center">
        <RichTextEditor values={values} onChangeValue={onChangeFormValue} />
        {/* Not ready to commit this yet */}
        {/* <FontFamilyDropdown /> */}
        <TextArea
          value={"Figure 1 - Some descriptive text"}
          readOnly
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
      </Segment>

      <Button
        primary
        fluid
        size="large"
        style={{ position: "fixed", bottom: 0 }}
      >
        Save styles
      </Button>
    </Form>
  );
}

// function FontFamilyDropdown() {
//   const fontOptions = [
//     { key: "af", value: "af", text: "Afghanistan" },
//     { key: "ax", value: "ax", text: "Aland Islands" },
//     { key: "al", value: "al", text: "Albania" },
//     { key: "dz", value: "dz", text: "Algeria" },
//     { key: "as", value: "as", text: "American Samoa" },
//     { key: "ad", value: "ad", text: "Andorra" },
//     { key: "ao", value: "ao", text: "Angola" },
//     { key: "ai", value: "ai", text: "Anguilla" },
//     { key: "ag", value: "ag", text: "Antigua" },
//     { key: "ar", value: "ar", text: "Argentina" },
//     { key: "am", value: "am", text: "Armenia" },
//     { key: "aw", value: "aw", text: "Aruba" },
//     { key: "au", value: "au", text: "Australia" },
//     { key: "at", value: "at", text: "Austria" },
//     { key: "az", value: "az", text: "Azerbaijan" },
//     { key: "bs", value: "bs", text: "Bahamas" },
//     { key: "bh", value: "bh", text: "Bahrain" },
//     { key: "bd", value: "bd", text: "Bangladesh" },
//     { key: "bb", value: "bb", text: "Barbados" },
//     { key: "by", value: "by", text: "Belarus" },
//     { key: "be", value: "be", text: "Belgium" },
//     { key: "bz", value: "bz", text: "Belize" },
//     { key: "bj", value: "bj", text: "Benin" },
//   ];

//   return (
//     <Dropdown
//       placeholder="Select Font"
//       fluid
//       search
//       selection
//       options={fontOptions}
//       style={{ margin: "1em 0" }}
//     />
//   );
// }
