import React from "react";
// Components
import {
  Button,
  Segment,
  Modal,
  Input,
  Divider,
  Grid,
  Popup,
} from "semantic-ui-react";
// Utils
import * as Validation from "../../../../common/utils/Validation";

const COMMON_COLORS = [
  { text: "black", hex: "#000000" },
  { text: "dark grey 4", hex: "#434343" },
  { text: "dark grey 3", hex: "#666666" },
  { text: "dark grey 2 ", hex: "#999999" },
  { text: "dark grey 1", hex: "#b7b7b7" },
  { text: "grey", hex: "#cccccc" },
];

interface Props {
  color: string;
  onChangeColor: (value: string) => void;
}

export default function ColorPickerModal({ color, onChangeColor }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [hexError, setHexError] = React.useState(null);
  const [hexColor, setHexColor] = React.useState(color.replace("#", ""));
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  function onChangeHexColor(value: string) {
    setHexColor(value);
    setHexError(Validation.validate("hex", `#${value}`));
  }

  function onSubmit() {
    setHasSubmitted(true);

    const hexError = Validation.validate("hex", `#${hexColor}`);
    if (hexError) return setHexError(hexError);

    onChangeColor(`#${hexColor}`);
    setIsOpen(false);
  }

  const showHexError = Boolean(hasSubmitted && hexError);

  return (
    <Modal
      open={isOpen}
      trigger={
        <Button icon onClick={() => setIsOpen(true)}>
          <i aria-hidden="true" className="font icon" style={{ color }}></i>
        </Button>
      }
    >
      <Modal.Content>
        <Segment>
          <Segment.Inline
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              padding: 5,
            }}
          >
            <Circle radius={50} color={`#${hexColor}`} />
            <b>Hexadecimal</b>
            <div>
              <Input
                value={hexColor}
                onChange={event => onChangeHexColor(event.target.value)}
                label={"#"}
                placeholder={"Provide a hex color"}
                error={showHexError}
                maxLength={6}
              />

              <p
                style={{
                  position: "absolute",
                  fontSize: 11,
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                {hexError}
              </p>
            </div>
          </Segment.Inline>

          <Divider />

          <Grid>
            <Grid.Row>
              {COMMON_COLORS.map(color => (
                <Grid.Column key={color.hex}>
                  <Popup
                    size="small"
                    inverted
                    content={color.text}
                    mouseEnterDelay={500}
                    mouseLeaveDelay={0}
                    on="hover"
                    trigger={
                      <Button
                        basic
                        style={{ padding: 0, boxShadow: "none" }}
                        onClick={() =>
                          onChangeHexColor(color.hex.replace("#", ""))
                        }
                      >
                        <Circle color={color.hex} radius={40} />
                      </Button>
                    }
                  />
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
        </Segment>
      </Modal.Content>

      <Modal.Actions>
        <Button basic onClick={() => setIsOpen(false)}>
          Cancel
        </Button>

        <Button disabled={showHexError} primary onClick={onSubmit}>
          OK
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

interface CircleProps {
  radius: number;
  color: string;
}

function Circle({ radius, color }: CircleProps) {
  return (
    <span
      style={{
        width: radius / 2,
        height: radius / 2,
        borderRadius: "50%",
        backgroundColor: color,
        display: "inline-block",
      }}
    ></span>
  );
}
