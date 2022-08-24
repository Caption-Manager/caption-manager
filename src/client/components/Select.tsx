import * as React from "react";

interface Option {
  key: string;
  value: any;
  text: string;
}

interface SelectProps {
  label?: string;
  disabled?: boolean;
  options: Option[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function Select(props: SelectProps) {
  const { label, disabled, options, onChange } = props;
  const id = disabled ? "disabled-select" : "select";
  return (
    <div className="block form-group" style={{ width: "100%" }}>
      <label>{label}</label>
      <select
        id={id}
        onChange={event => {
          if (onChange) onChange(event);
        }}
        style={{ width: "100%" }}
      >
        {options.map(function renderOption({ key, value, text }) {
          return (
            <option key={key} value={value}>
              {text}
            </option>
          );
        })}
      </select>
    </div>
  );
}
