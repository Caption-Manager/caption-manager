import React from "react";
import { List } from "semantic-ui-react";
import OpenAddOnMenuInstructionsList from "./OpenAddOnMenuInstructionsList";

export default function InsertListFromAddOnMenuInstructionsList() {
  return (
    <List ordered>
      <OpenAddOnMenuInstructionsList />

      <List.Item>
        Click where you want to insert the list on document.
        <List.Description>
          The list will be inserted on the next paragraph which is part of the
          main structure of the document.
        </List.Description>
      </List.Item>

      <List.Item>
        Tap on <b>Insert a list</b>.
      </List.Item>

      <List.Item>
        Tap on an <b>element type</b> (image, table or equation).
      </List.Item>

      <List.Item>
        Click on a <b>list type</b> (how you want the list to look) to insert
        the list.
      </List.Item>
    </List>
  );
}
