import React from "react";
// Components
import { Button, Icon } from "semantic-ui-react";

// TODO: move this to a different file
// See:
// https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp
const hideNumericInputArrowCss = `
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
}
`;

interface Props {
  fontSize: number;
  onChangeFontSize: (newValue: number) => void;
}

export default function FontSizeEditor({ fontSize, onChangeFontSize }: Props) {
  function verifiedOnChange(number: number) {
    if (number < 0) return;
    if (Number.isNaN(number)) return;
    if (number > 400) return onChangeFontSize(400);
    onChangeFontSize(number);
  }

  return (
    <Button.Group basic size="mini">
      <Button
        icon
        onClick={() => verifiedOnChange(fontSize - 1)}
        disabled={fontSize <= 0}
      >
        <Icon name="minus" />
      </Button>

      <style>{hideNumericInputArrowCss}</style>
      <input
        type={"number"}
        value={fontSize}
        style={{ width: 40, fontSize: 14, padding: 5, textAlign: "center" }}
        onChange={event => verifiedOnChange(Number(event.target.value))}
      />

      <Button
        icon
        onClick={() => verifiedOnChange(fontSize + 1)}
        disabled={fontSize >= 400}
      >
        <Icon name="plus" />
      </Button>
    </Button.Group>
  );
}
