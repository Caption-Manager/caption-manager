import * as React from "react";

interface CheckboxProps {
  checked: boolean;
  disabled?: boolean;
  label?: string;
  onChange?: () => void;
  style?: React.CSSProperties;
}

export function Checkbox(props: CheckboxProps) {
  const { checked, disabled, label, onChange, style } = props;
  return (
    <div
      style={style}
      onClick={event => {
        if (onChange) onChange();
      }}
    >
      <input type="checkbox" checked={checked} disabled={disabled} />
      <label>{label}</label>
    </div>
  );
}
