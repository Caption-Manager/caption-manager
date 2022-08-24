import * as React from "react";

interface TypographyProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function Header(props: TypographyProps) {
  const { children } = props;
  return <h1>{children}</h1>;
}

export function Bold(props: TypographyProps) {
  const { children } = props;
  return <b>{children}</b>;
}

interface LinkProps extends TypographyProps {
  to: string;
}

export function Link(props: LinkProps) {
  const { to, children } = props;
  return <a href={to}>{children}</a>;
}

export function CurrentNavigation(props: TypographyProps) {
  const { children } = props;
  return <span className="current">{children}</span>;
}

export function NormalText(props: TypographyProps) {
  const { children, style } = props;
  return <span style={style}>{children}</span>;
}

export function Paragraph(props: TypographyProps) {
  const { children } = props;
  return <p>{children}</p>;
}

export function ErrorText(props: TypographyProps) {
  const { children } = props;
  return <span className="error">{children}</span>;
}

export function GrayText(props: TypographyProps) {
  const { children } = props;
  return <span className="gray">{children}</span>;
}

export function SecondaryText(props: TypographyProps) {
  const { children } = props;
  return <span className="secondary">{children}</span>;
}
