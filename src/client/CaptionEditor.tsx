import React from "react";

export default function CaptionEditor() {
  const [labelName, setLabelName] = React.useState("Equação");
  const [legend, setLegend] = React.useState("");

  const labelCount = 2;
  const label = `${labelName} ${labelCount}`;

  function onChangeLegend(event) {
    const { value } = event.target;
    const isDeletingLabel = value.length <= label.length;
    if (isDeletingLabel) {
      setLegend("");
    } else {
      setLegend(value.replace(label, ""));
    }
  }

  const legendInputValue = `${label}${legend}`;

  return (
    <div style={{ padding: "3px", overflowX: "hidden" }}>
      <div className="inline form-group">
        <label htmlFor="legend">Legenda</label>
        <input value={legendInputValue} onChange={onChangeLegend} type="text" />
      </div>

      <div>
        <p>Opções</p>

        <div style={{ paddingLeft: "15px" }}>
          <label htmlFor="select">Rótulo: </label>
          <select onChange={event => setLabelName(event.target.value)}>
            <option value="Equação">Equação</option>
            <option value="Tabela">Tabela</option>
            <option value="Figura">Figura</option>
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
        <button> Cancelar</button>
        <button className="action"> Ok</button>
      </div>
    </div>
  );
}
