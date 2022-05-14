import React from "react";
// Services
import GAS from "../../services/GAS";
// Types
import { ICaption, CaptionParts } from "../../../server/docs/refactor/types";

interface Props {
  caption: ICaption;
}

type CaptionState = Omit<CaptionParts, "number">;

export default function CaptionEditor({ caption }: Props) {
  // const captionParts = caption.getParts();
  console.log(caption);
  const captionParts: CaptionParts = { label: "", number: 10, suffix: "" };
  const [captionState, setCaptionState] = React.useState<CaptionState>({
    ...captionParts,
  });
  const captionNumber = captionParts.number;

  const prefix = `${captionState.label} ${captionNumber} - `;
  const text = `${prefix}${captionState.suffix}`;

  function onChangeText(event: any) {
    const { value: newText } = event.target;
    const isDeletingPrefix = newText.length < prefix.length;
    setCaptionState(state => ({
      ...state,
      suffix: isDeletingPrefix ? "" : newText.replace(prefix, ""),
    }));
  }

  function onChangeLabel(event: any) {
    const { value: newLabel } = event.target;
    setCaptionState(state => ({ ...state, label: newLabel }));
  }

  function onSubmit() {
    caption
      .upsertText({ ...captionState, number: captionNumber })
      .then(() => GAS.updateCaptions(caption.getType()))
      .catch(error => console.log(error));
  }

  return (
    <div style={{ padding: "3px", overflowX: "hidden" }}>
      <div className="inline form-group">
        <label htmlFor="caption">Caption</label>
        <input value={text} onChange={onChangeText} type="text" />
      </div>

      <div>
        <p>Options</p>
        <div style={{ paddingLeft: "15px" }}>
          <label htmlFor="select">Label: </label>
          <select onChange={onChangeLabel}>
            {["Figure", "Table"].map(label => (
              <option value={label}>{label}</option>
            ))}
          </select>
        </div>
      </div>
      <div />

      <hr />
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button onClick={onSubmit} className="action">
          Ok
        </button>
      </div>
    </div>
  );
}
