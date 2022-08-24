import * as React from "react";

interface DividerProps {
  size?: number;
}

export function Divider(props: DividerProps) {
  const { size = 0 } = props;
  return <hr style={{ borderTop: `${size}px solid lightgray` }} />;
}
