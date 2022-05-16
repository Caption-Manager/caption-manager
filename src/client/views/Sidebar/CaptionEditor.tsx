import React from "react";
// Services
import GAS from "../../services/GAS";
// Utils
import { CaptionParts } from "../../../common/caption/CaptionParts";
// Types
import {
  CaptionLabel,
  CaptionNumber,
  CaptionDescription,
} from "../../../common/types";

interface Props {
  initialLabel: CaptionLabel;
  number: CaptionNumber;
  initialDescription: CaptionDescription;
}

export default function CaptionEditor({
  initialLabel,
  number,
  initialDescription,
}: Props) {
  const [captionState, setCaptionState] = React.useState({
    label: initialLabel,
    description: initialDescription,
  });

  const captionParts = new CaptionParts(
    captionState.label,
    number,
    captionState.description
  );

  function onChangeLabel(event: any) {
    const { value: newLabel } = event.target;
    setCaptionState(state => ({ ...state, label: newLabel }));
  }

  function onChangeDescription(event: any) {
    const { value: newText } = event.target;
    const prefix = captionParts.getAsPrefix();
    const isDeletingPrefix = newText.length < prefix.length;
    setCaptionState(state => ({
      ...state,
      description: isDeletingPrefix ? "" : newText.replace(prefix, ""),
    }));
  }

  function onSubmit() {
    GAS.upsertCaption(captionParts.getAsText()).catch();
  }

  return (
    <div style={{ padding: "3px", overflowX: "hidden" }}>
      <div className="inline form-group">
        <label htmlFor="caption">Caption</label>
        <input
          value={captionParts.getAsText()}
          onChange={onChangeDescription}
          type="text"
        />
      </div>

      <div>
        <p>Options</p>
        <div style={{ paddingLeft: "15px" }}>
          <label htmlFor="select">Label: </label>
          <select value={captionState.label} onChange={onChangeLabel}>
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
