import * as React from "react";
// Components
import { Header, Accordion, Segment, Icon } from "semantic-ui-react";
import UpsertCaptionsInstructionsList from "./UpsertCaptionInstructionsList";
import InsertListInstructionsList from "./InsertListInstructionsList";
import InsertListFromAddOnMenuInstructionsList from "./InsertListFromAddOnMenuInstructiontsList";

export default function QuickStart() {
  return (
    <Segment basic style={{ padding: 0 }}>
      <Section
        title="Insert or update a caption"
        description="You can insert and update captions for images, tables and equations elements."
      >
        <AccordionListItem title="Insert or update a caption">
          <UpsertCaptionsInstructionsList />
        </AccordionListItem>
      </Section>

      <Section
        title="Insert a list"
        description={
          <span>
            You can insert lists of captions in a way similar to how you can add{" "}
            <a
              target={"_blank"}
              href="https://support.google.com/docs/answer/116338?hl=en&co=GENIE.Platform%3DDesktop#zippy=%2Cadd-or-delete-a-table-of-contents"
            >
              Table of Contents
            </a>
            .
          </span>
        }
      >
        <AccordionListItem title="Insert a list">
          <InsertListInstructionsList />
        </AccordionListItem>

        <AccordionListItem title="Insert a list from add-ons menu">
          <InsertListFromAddOnMenuInstructionsList />
        </AccordionListItem>
      </Section>
    </Segment>
  );
}

interface SectionProps {
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
}

function Section({ title, description, children }: SectionProps) {
  const headerStyles = { paddingLeft: 10, paddingRight: 10, paddingBottom: 0 };
  return (
    <Segment basic style={{ paddingLeft: 0, paddingRight: 0 }}>
      <Header>
        <Header.Content as={"h3"} style={headerStyles}>
          {title}
        </Header.Content>
        <Header.Subheader style={headerStyles}>{description}</Header.Subheader>
      </Header>
      {children}
    </Segment>
  );
}

interface AccordionListItemProps {
  title: string;
  children: React.ReactNode;
}

function AccordionListItem({ title, children }: AccordionListItemProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Accordion style={{ margin: 0 }}>
      <Accordion.Title
        onClick={() => setIsOpen(previous => !previous)}
        active={isOpen}
      >
        <Icon name="dropdown" />
        {title}
      </Accordion.Title>

      <Accordion.Content
        active={isOpen}
        style={{ padding: 10, paddingBottom: 15 }}
      >
        {children}
      </Accordion.Content>
    </Accordion>
  );
}
