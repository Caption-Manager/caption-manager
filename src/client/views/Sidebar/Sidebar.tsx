import React from "react";
// Components
import {
  Segment,
  Accordion,
  AccordionTitleProps,
  Icon,
} from "semantic-ui-react";
import UpsertCaption from "./UpsertCaption";
import InsertList from "./InsertList";
import QuickStart from "./QuickStart/index"; // TODO: remove unnecessary "index"
// Constants
import { SIDEBAR_WIDTH } from "./constants";

export default function Sidebar() {
  const { activeIndexes, onItemClick } = useAccordion();
  return (
    <Segment
      basic
      style={{
        width: SIDEBAR_WIDTH,
        padding: 0,
        minHeight: "100vh",
        overflow: "scroll",
      }}
    >
      <Accordion fluid styled exclusive={false}>
        <AccordionItem
          title="Insert or update a caption"
          index={0}
          onClick={onItemClick}
          active={activeIndexes.includes(0)}
        >
          {/* This prevents unnecessary polling while the component is not mounted */}
          {activeIndexes.includes(0) && <UpsertCaption />}
        </AccordionItem>

        <AccordionItem
          title="Insert a list"
          index={1}
          onClick={onItemClick}
          active={activeIndexes.includes(1)}
        >
          <InsertList />
        </AccordionItem>

        <AccordionItem
          title="Quick start"
          index={2}
          onClick={onItemClick}
          active={activeIndexes.includes(2)}
          contentStyle={{ padding: 0, border: 0 }}
        >
          <QuickStart />
        </AccordionItem>
      </Accordion>
    </Segment>
  );
}

function useAccordion() {
  const [activeIndexes, setActiveIndexes] = React.useState([0]);

  function onItemClick(event: any, data: AccordionTitleProps) {
    const newIndex = Number(data.index);
    if (activeIndexes.includes(newIndex)) {
      setActiveIndexes(previous =>
        previous.filter(index => index !== newIndex)
      );
    } else {
      setActiveIndexes(previous => [...previous, newIndex]);
    }
  }

  return { activeIndexes, onItemClick };
}

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  active: boolean;
  index: number;
  onClick?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: AccordionTitleProps
  ) => void;
  contentStyle?: React.CSSProperties;
}

function AccordionItem({
  active,
  index,
  title,
  onClick,
  contentStyle,
  children,
}: AccordionItemProps) {
  return (
    <React.Fragment>
      <Accordion.Title active={active} index={index} onClick={onClick}>
        <Icon name="dropdown" />
        {title}
      </Accordion.Title>
      <Accordion.Content active={active} style={contentStyle}>
        {children}
      </Accordion.Content>
    </React.Fragment>
  );
}
