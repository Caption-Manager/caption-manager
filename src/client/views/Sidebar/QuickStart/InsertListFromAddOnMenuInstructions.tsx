import React from "react";
import { List } from "semantic-ui-react";
import OpenAddOnMenu from "./OpenAddOnMenuInstructions";

export default function InsertListFromAddOnMenuInstructions() {
  return (
    <List ordered>
      <List.Item>
        Click where you want to insert the list on the document.
        <List.Description>
          The list will be inserted in the next paragraph which is part of the
          main structure of the document.
        </List.Description>
      </List.Item>

      <OpenAddOnMenu />

      <List.Item>
        Tap on "<b>Insert list</b>"" menu.
      </List.Item>

      <List.Item>
        Tap on a targeted <b>element type</b> (image, table, or equation).
      </List.Item>

      <List.Item>
        Click on a <b>list type</b> and wait a few seconds.
      </List.Item>
    </List>
  );
}
