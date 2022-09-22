import React from "react";
import { List } from "semantic-ui-react";
import OpenAddOnMenuInstructions from "./OpenAddOnMenuInstructions";

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

      <OpenAddOnMenuInstructions />

      <List.Item>
        Tap on "<b>Insert list of images</b>" or <br />"
        <b>Insert list of tables</b>" or <br />"<b>Insert list of equations</b>"
        menu.
      </List.Item>

      <List.Item>
        Click on a <b>list type</b> (default or bookmarked) and wait a few
        seconds.
      </List.Item>
    </List>
  );
}
