import * as React from "react";
import {
  Form,
  Segment,
  Dropdown,
  Header,
  Grid,
  Radio,
  Image,
  Button,
} from "semantic-ui-react";

export default function InsertList() {
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const [type, setType] = React.useState();

  function onClick(index: number) {
    if (index === activeIndex) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
  }

  return (
    <Form>
      <Segment basic>
        <Header size="small">Element</Header>
        <Dropdown
          value={type}
          text={type}
          placeholder="Select an element"
          selection
          fluid
        >
          <Dropdown.Menu>
            <Dropdown.Item
              value={"Image"}
              icon="image"
              text="Image"
              onClick={(e, { value }) => setType(value as any)}
              active={type === "Image"}
            />
            <Dropdown.Item
              value={"Table"}
              icon="table"
              text="Table"
              onClick={(e, { value }) => setType(value as any)}
              active={type === "Table"}
            />
            <Dropdown.Item
              value={"Equation"}
              icon="calculator"
              text="Equation"
              onClick={(e, { value }) => setType(value as any)}
              active={type === "Equation"}
            />
          </Dropdown.Menu>
        </Dropdown>

        <Header size="small">Type</Header>
        <Grid columns={2} centered>
          <Grid.Column textAlign="center">
            <Segment
              raised={false}
              as={Button}
              textAlign="center"
              onClick={() => onClick(0)}
            >
              <Image
                src="https://react.semantic-ui.com/images/wireframe/image.png"
                size="small"
                // style={{ height: 45 }}
              />
              <Radio
                checked={activeIndex === 0}
                style={{ marginTop: 10, marginBottom: 5 }}
              />
              <p>Numbered</p>
            </Segment>
          </Grid.Column>

          <Grid.Column textAlign="center">
            <Segment
              raised={false}
              as={Button}
              textAlign="center"
              onClick={() => onClick(1)}
            >
              <Image
                src="https://react.semantic-ui.com/images/wireframe/image.png"
                size="small"
                // style={{ height: 45 }}
              />
              <Radio
                checked={activeIndex === 1}
                style={{ marginTop: 10, marginBottom: 5 }}
              />
              <p>Bookmarked</p>
            </Segment>
          </Grid.Column>
        </Grid>
      </Segment>

      <Button primary>Insert list</Button>
    </Form>
  );
}
