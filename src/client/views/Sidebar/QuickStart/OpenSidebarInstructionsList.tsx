import React from "react";
import { List } from "semantic-ui-react";
import OpenAddOnMenuInstructionsList from "./OpenAddOnMenuInstructionsList";

export default function OpenSidebarInstructionsList() {
  return (
    <React.Fragment>
      <OpenAddOnMenuInstructionsList />
      <List.Item>
        Tap on <b>Open sidebar</b>.
      </List.Item>
    </React.Fragment>
  );
}
