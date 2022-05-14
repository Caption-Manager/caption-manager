import * as React from 'react';


interface CaptionParts {
  label: string;
  readonly number: number;
  description: string;
}

type CaptionElement = GoogleAppsScript.Document.InlineImage |
                      GoogleAppsScript.Document.Table;

interface Caption extends GoogleAppsScript.Document.Text {
  getElement(): CaptionElement;
  getParts(): CaptionParts;
}

interface CaptionalizableElement extends Caption {
  exists: true;
  isCaptionalizable: true;
}

interface NotCaptionalizableElement extends GoogleAppsScript.Document.Element {
  exists: true;
  isCaptionalizable: false;
}

type SelectedElement = { exists: false } | CaptionalizableElement | NotCaptionalizableElement;

interface DocumentInfo {
  selectedElement: SelectedElement;
}

function typeTest() {
  const documentInfo = {} as DocumentInfo;
  const {selectedElement} = documentInfo;

  if (!selectedElement.exists) {
    return selectedElement;
  } else if (!selectedElement.isCaptionalizable) {
    return selectedElement;
  } else {
    // here we know that the selected element is a caption
    return selectedElement;
  }
}


function useCaption(element: CaptionElement): Caption {
  const text = {} as GoogleAppsScript.Document.Text;

  React.useEffect(function onReceivedElement() {
    async function transformElementIntoCaption() {
      try {
        
      } catch (error) {
        
      }
    }
  }, [element])

  return {
    ...text,
    getElement: () => element,
    parts: {
      label: "",
      number: 10,
      description: ""
    }
  };
}