import * as React from "react";

interface SidebarProps {
  children: React.ReactNode;
}

export function Sidebar(props: SidebarProps) {
  const { children } = props;
  return (
    <div style={{ top: 0, bottom: 0 }} className="sidebar">
      {children}
    </div>
  );
}

function Bottom(props: { children: React.ReactNode }) {
  const { children } = props;
  return <div className="sidebar bottom">{children}</div>;
}

Sidebar.Bottom = Bottom;
