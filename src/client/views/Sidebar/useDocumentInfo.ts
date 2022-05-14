import React from "react";
// Services
import { DocumentInfo } from "../../../server/docs/refactor/types";
// Types
import GAS from "../../services/GAS";



// See:
// https://stackoverflow.com/questions/24773177/how-to-poll-a-google-doc-from-an-add-on/24773178#24773178

export function useDocumentInfo() {
  const [documentInfo, setDocumentInfo] = React.useState<DocumentInfo>({
    caption: null
  });

  React.useEffect(function onMount() {
    const pollingIntervalId = setInterval(function onInterval() {
      GAS.getDocumentInfo()
        .then(info => setDocumentInfo(info))
        .catch(error => console.log(error));
    }, 2000);

    return function onUnmount() {
      clearInterval(pollingIntervalId);
    };
  }, []);

  return documentInfo;
}
