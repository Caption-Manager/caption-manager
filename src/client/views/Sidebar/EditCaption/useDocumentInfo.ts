import * as React from "react";
import GAS from "../../../services/GAS";
import { DocumentInfo } from "../../../../common/types";

const INITIAL_DOCUMENT_INFO = { selectedElement: null };

// See:
// https://stackoverflow.com/questions/24773177/how-to-poll-a-google-doc-from-an-add-on/24773178#24773178
export default function useDocumentInfo(): DocumentInfo {
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
