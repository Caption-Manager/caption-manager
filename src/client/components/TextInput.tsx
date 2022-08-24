import * as React from "react";

interface TextInputProps {
  label?: string;
  value: string;
  placeholder?: string;
  rows?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties | undefined;
}

export function TextInput(props: TextInputProps) {
  const { label, value, placeholder, onChange, style } = props;
  return (
    <div style={{ width: "100%", ...style }} className="inline form-group">
      <label>{label}</label>
      <input
        value={value}
        placeholder={placeholder}
        type="text"
        onChange={event => {
          if (onChange) onChange(event);
        }}
        style={{ width: "100%", ...style }}
      />
    </div>
  );
}
