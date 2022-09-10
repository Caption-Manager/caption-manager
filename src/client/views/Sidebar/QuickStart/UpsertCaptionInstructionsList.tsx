import * as React from "react";
import { List } from "semantic-ui-react";

export default function UpsertCaptionsInstructionsList() {
  return (
    <List ordered>
      <List.Item>
        Open the <b>"Insert or update a caption"</b> panel, the first item of
        this sidebar.
      </List.Item>

      <List.Item>
        Select an image, table or equation on document.
        <List.Description>
          If the selected element already has a <b>caption</b>, the{" "}
          <b>"Insert or update a caption"</b> panel will be filled with the
          corresponding caption information.
        </List.Description>
      </List.Item>

      <List.Item>
        Provide a <b>caption description</b>.
        <List.Description>
          Any text that describes the caption. It will appear after the caption
          label and number.
        </List.Description>
      </List.Item>

      <List.Item>
        On the <b>Options</b> menu:
        <List.List>
          <List.Item>
            Provide a <b>caption label</b>.
          </List.Item>
          <List.Description style={{ marginBottom: 5 }}>
            Type a label that best describes the selected element, such as
            "Figure", "Table", or "Equation". Labels are attached to the
            selected element type and, after edited, are saved through document
            sessions.
          </List.Description>

          <List.Item>
            Enable or disable <br />
            <b>Auto Update Captions</b>.
            <List.Description style={{ marginBottom: 5 }}>
              If enabled, all captions of the selected element type will be
              updated with the given label and corresponding number.
            </List.Description>
          </List.Item>

          <List.Item>
            Enable or disable {"\n"}
            <b>Bookmark</b>.
            <List.Description style={{ marginBottom: 5 }}>
              If enabled, the inserted caption will have a{" "}
              <a
                target={"_blank"}
                href="https://support.google.com/docs/answer/45893?hl=en&co=GENIE.Platform%3DDesktop#zippy=%2Ccriar-um-favorito%2Ccreate-a-bookmark"
              >
                Bookmark
              </a>
              , which can be referenced to help people find the caption in your
              document.
            </List.Description>
          </List.Item>
        </List.List>
      </List.Item>

      <List.Item>
        Press enter or click on the "<b>Save Caption</b>" button and wait a few
        seconds.
      </List.Item>
    </List>
  );
}
