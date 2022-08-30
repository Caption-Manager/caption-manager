import React from "react";
// Components
import {
  Segment,
  Accordion,
  Icon,
  AccordionTitleProps,
} from "semantic-ui-react";
import EditCaption from "./EditCaption";
import InsertList from "./InsertList";
// Services
import GAS from "../../services/GAS";
// Constants
import { SIDEBAR_WIDTH } from "./constants";
// Types
import { DocumentInfo } from "../../../common/types";

export default function Sidebar() {
  const { selectedElement } = useDocumentInfo();
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
      <Accordion
        defaultActiveIndex={activeIndexes}
        fluid
        styled
        exclusive={false}
      >
        <AccordionItem
          title="Edit a caption"
          index={0}
          onClick={onItemClick}
          active={activeIndexes.includes(0)}
        >
          <EditCaption selectedElement={selectedElement} />
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
          title="Help"
          index={2}
          onClick={onItemClick}
          active={activeIndexes.includes(2)}
        >
          WriteWrite help code hereWrite help code hereWrite help code hereWrite
          help code hereWrite help code hereWrite help code hereWrite help code
          hereWrite help code hereWrite help code hereWrite help code hereWrite
          help code hereWrite help code hereWrite help code hereWrite help code
          hereWrite help code hereWrite help code hereWrite help code hereWrite
          help code hereWrite help code hereWrite help code hereWrite help code
          hereWrite help code hereWrite help code hereWrite help code hereWrite
          help code hereWrite help code hereWrite help code hereWrite help code
          here help code here Write help code hereWrite help code hereWrite help
          code hereWrite help code hereWrite help code hereWrite help code
          hereWrite help code hereWrite help code hereWrite help code hereWrite
          help code hereWrite help code hereWrite help code hereWrite help code
          hereWrite help code hereWrite help code hereWrite help code hereWrite
          help code hereWrite help code hereWrite help code hereWrite help code
          hereWrite help code hereWrite help code hereWrite help code hereWrite
          help code hereWrite help code here
        </AccordionItem>
      </Accordion>
    </Segment>
  );
}

const INITIAL_DOCUMENT_INFO = { selectedElement: null };

// See:
// https://stackoverflow.com/questions/24773177/how-to-poll-a-google-doc-from-an-add-on/24773178#24773178
export function useDocumentInfo(): DocumentInfo {
  const [documentInfo, setDocumentInfo] = React.useState<DocumentInfo>(
    INITIAL_DOCUMENT_INFO
  );

  React.useEffect(function onMount() {
    const pollingIntervalId = setInterval(async function onInterval() {
      try {
        const documentInfo = await GAS.getDocumentInfo();
        setDocumentInfo(documentInfo);
      } catch (error) {
        // TODO: fix this: we don't want to have to set the document info
        // to it's initial value when an error occurs...
        // Just receive a new document info
        setDocumentInfo(INITIAL_DOCUMENT_INFO);
        console.error(error.message || error);
      }
    }, 2000);

    return function onUnmount() {
      clearInterval(pollingIntervalId);
    };
  }, []);

  // TODO: fix this
  // For some strange reason, sometimes "documentInfo" is null
  // so we return an the initial document info instead
  return documentInfo || INITIAL_DOCUMENT_INFO;
}

function useAccordion() {
  const [activeIndexes, setActiveIndexes] = React.useState([1]);

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
}

function AccordionItem({
  active,
  index,
  title,
  onClick,
  children,
}: AccordionItemProps) {
  return (
    <React.Fragment>
      <Accordion.Title active={active} index={index} onClick={onClick}>
        <Icon name="dropdown" />
        {title}
      </Accordion.Title>
      <Accordion.Content active={active}>{children}</Accordion.Content>
    </React.Fragment>
  );
}
