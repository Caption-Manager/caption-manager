import * as React from "react";
import { Bold, NormalText } from "./Typography";

const DEFAULT_HR_COLOR = "lightgray";

interface HrProps {
  size?: number;
  color?: string;
}

interface DividerProps extends HrProps {
  leftText?: string;
}

export function Divider(props: DividerProps) {
  const { size, color, leftText } = props;

  if (leftText) {
    return <DividerWithLeftText size={size} color={color} text={leftText} />;
  }

  return <Hr size={size} color={color} />;
}

function Hr(props: HrProps) {
  const { size = 0, color = DEFAULT_HR_COLOR } = props;
  return <hr style={{ borderTop: `${size}px solid ${color}` }} />;
}

interface DividerWithLeftTextProps extends HrProps {
  text: string;
}

function DividerWithLeftText(props: DividerWithLeftTextProps) {
  const { size, color, text } = props;
  return (
    <div style={{ display: "flex", marginBottom: 5 }}>
      <NormalText style={{ marginRight: 5 }}>
        <Bold>{text}</Bold>
      </NormalText>

      <div style={{ width: "100%", marginTop: 2 }}>
        <Hr size={size} color={color} />
      </div>
    </div>
  );
}
