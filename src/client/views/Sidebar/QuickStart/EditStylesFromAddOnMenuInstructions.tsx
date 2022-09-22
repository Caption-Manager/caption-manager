import React from "react";
import { List, Message } from "semantic-ui-react";
import OpenAddOnMenuInstructions from "./OpenAddOnMenuInstructions";

export default function EditStylesFromAddOnMenuInstructions() {
  return (
    <List ordered>
      <OpenAddOnMenuInstructions />

      <List.Item>
        Click on "<b>Edit Styles</b>". A dialog modal will open.
      </List.Item>

      <List.Item>
        Use the rich text toolbar to customize the text of your captions. You
        can specify the font size, make them bold, italic, or underlined, choose
        a custom color, and set the alignment of the paragraph.
        <List.Description>
          Changes made will be immediately reflected on the illustrative caption
          below on the modal.
        </List.Description>
      </List.Item>

      <List.Item>
        Select or search for a font family from the dropdown selector.
        <Message warning style={{ padding: 10, margin: "10px 0" }}>
          <Message.Content style={{ padding: 0 }}>
            Font family changes <i>currently</i> will <b>not</b> be reflected on
            the illustrative caption below the dropdown. This is a technical
            problem that happens because we don't have easy access to Google
            Fonts through the modal.
          </Message.Content>
        </Message>
      </List.Item>

      <List.Item>
        Click on "<b>Save styles</b>" button and wait a few seconds.
      </List.Item>
    </List>
  );
}
