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
  CaptionText,
} from "../../../common/types";

interface Props {
  label: CaptionLabel;
  number: CaptionNumber;
  initialDescription: CaptionDescription;
}

export default function CaptionEditor({
  label,
  number,
  initialDescription,
}: Props) {
  const [description, setDescription] = React.useState(initialDescription);

  React.useEffect(
    function onNewSelectedElement() {
      setDescription(initialDescription);
    },
    [initialDescription]
  );

  const { isLoading, error, saveCaption } = useSaveCaption();

  const captionParts = new CaptionParts(label, number, description);

  function onChangeDescription(event: any) {
    const { value: newText } = event.target;
    const prefix = captionParts.getAsPrefix();
    const isDeletingPrefix = newText.length < prefix.length;
    setDescription(isDeletingPrefix ? "" : newText.replace(prefix, ""));
  }

  function onSubmit() {
    saveCaption(captionParts.getAsText());
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

      <hr />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button disabled={isLoading} onClick={onSubmit} className="action">
          {isLoading ? "Loading..." : "Save"}
        </button>

        <p style={{ color: "red" }}>{error}</p>
      </div>
    </div>
  );
}

function useSaveCaption() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<null | string>(null);

  function saveCaption(text: CaptionText) {
    setError(null);
    setIsLoading(true);

    GAS.upsertCaption(text)
      .then(() => GAS.updateCaptionNumbers())
      .then(() => setIsLoading(false))
      .catch(function onError(error) {
        setError(error.message);
        setIsLoading(false);
      });
  }

  return { isLoading, error, saveCaption };
}
