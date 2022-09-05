import * as React from "react";
import { List } from "semantic-ui-react";
import OpenSidebarInstructionsList from "./OpenSidebarInstructionsList";

export default function InsertListInstructionsList() {
  return (
    <List ordered>
      <OpenSidebarInstructionsList />

      <List.Item>
        Open the <b>"Insert a list"</b>
        editor above.
      </List.Item>

      <List.Item>
        Click where you want to insert the list on document.
        <List.Description>
          The list will be inserted on the next paragraph which is part of the
          main structure of the document.
        </List.Description>
      </List.Item>

      <List.Item>
        Select the targeted <b>element type</b> (image, table or equation) of
        your list.
      </List.Item>

      <List.Item>
        Select the targeted <b>list type</b> of your list (how you want the list
        to look).
      </List.Item>

      <List.Item>
        Click on the "<b>Insert list</b>" button.
      </List.Item>
    </List>
  );
}
