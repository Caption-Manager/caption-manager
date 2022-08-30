import * as React from "react";
import { Container, Label, Transition } from "semantic-ui-react";

const PULSE_INTERVAL_IN_MS = 1000;

export default function Help() {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(function pulseLabelOnInterval() {
    const pulseIntervalId = setInterval(function onInterval() {
      setVisible(visible => !visible);
    }, PULSE_INTERVAL_IN_MS * 2);

    return function onOnmount() {
      clearInterval(pulseIntervalId);
    };
  }, []);

  return (
    <div>
      <Container fluid>
        <p>
          Coming{" "}
          <Transition
            animation={"pulse"}
            duration={{
              hide: PULSE_INTERVAL_IN_MS,
              show: PULSE_INTERVAL_IN_MS,
            }}
            visible={visible}
          >
            <Label color="green" horizontal>
              Soon...
            </Label>
          </Transition>
        </p>
      </Container>
    </div>
  );
}
