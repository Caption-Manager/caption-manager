import React from "react";
import { List } from "semantic-ui-react";

export default function OpenAddOnMenu() {
  return (
    <React.Fragment>
      <List.Item>
        Tap on "<b>Add-ons menu</b>"". Your current add-ons will be listed.
      </List.Item>

      <List.Item>
        Tap on "<b>Caption Manager</b>" menu.
      </List.Item>
    </React.Fragment>
  );
}
