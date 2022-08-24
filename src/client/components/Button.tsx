import * as React from "react";

interface ButtonProps {
  disabled?: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

export function PrimaryButton(props: ButtonProps) {
  const { children, ...rest } = props;
  return (
    <button className="action" {...rest}>
      {children}
    </button>
  );
}

export function CloseButton(props: ButtonProps) {
  const { children, ...rest } = props;
  return <button {...rest}>{children}</button>;
}

export function CreateButton(props: ButtonProps) {
  const { children, ...rest } = props;
  return (
    <button className="create" {...rest}>
      {children}
    </button>
  );
}

export function ShareButton(props: ButtonProps) {
  const { children, ...rest } = props;
  return (
    <button className="share" {...rest}>
      {children}
    </button>
  );
}
