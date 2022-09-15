import * as React from "react";
import { List } from "semantic-ui-react";

export default function InsertListInstructionsList() {
  return (
    <List ordered>
      <List.Item>
        Open the <b>"Insert list"</b> panel, the second item of this sidebar.
      </List.Item>

      <List.Item>
        Click where you want to insert the list on the document.
        <List.Description>
          The list will be inserted in the next paragraph which is part of the
          main structure of the document.
        </List.Description>
      </List.Item>

      <List.Item>
        Select the targeted <b>element type</b> (image, table, or equation) of
        your list.
      </List.Item>

      <List.Item>
        Select the targeted <b>list type</b> of your list.
      </List.Item>

      <List.Item>
        Click on the "<b>Insert list</b>" button and wait a few seconds.
      </List.Item>
    </List>
  );
}
