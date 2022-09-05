import React from "react";
import { List } from "semantic-ui-react";

export default function OpenAddOnMenuInstructionsList() {
  return (
    <React.Fragment>
      <List.Item>
        On your computer, open a document in <a>Google Docs</a>.
      </List.Item>

      <List.Item>
        Tap on the{" "}
        <a
          target={"_blank"}
          href="https://support.google.com/docs/answer/2942256?hl=en&co=GENIE.Platform%3DAndroid#zippy=%2Cuse-add-ons"
        >
          add-ons
        </a>{" "}
        menu.
      </List.Item>

      <List.Item>
        Tap on the <b>Caption Manager</b> add-on.
      </List.Item>
    </React.Fragment>
  );
}
