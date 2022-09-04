import { removeLineBreaks } from "../../common/utils";
import upsertBookmark from "../bookmark/upsertBookmark";
import getCaptions from "../caption/getCaptions";
import stringToElementType from "../utils/stringToElementType";
import { HEADER_ATTRIBUTES, PARAGRAPH_ITEM_ATTRIBUTES } from "./constants";
import * as HumanReadable from "../../common/utils/HumanReadable";
import {
  CaptionalizableSelectedElementType,
  ListType,
} from "../../common/types";

export default function insertList(
  elementType: CaptionalizableSelectedElementType,
  listType: ListType
) {
  const body = DocumentApp.getActiveDocument().getBody();
  const initialParagraph = getListInitialParagraphAndDeleteSelectedElements();
  const initialParagraphIndex = body.getChildIndex(initialParagraph as any); // TODO: find way to type this

  const header = body.insertParagraph(
    initialParagraphIndex,
    `List of ${HumanReadable.type(elementType)}s`
  );
  header.setAttributes(HEADER_ATTRIBUTES);

  const captions = getCaptions(stringToElementType(elementType));

  let currentParagraphIndex = initialParagraphIndex + 1;
  for (const caption of captions) {
    const formattedCaptionText = removeLineBreaks(caption.getText());
    const item = body.insertParagraph(
      currentParagraphIndex,
      formattedCaptionText
    );
    item.setAttributes(PARAGRAPH_ITEM_ATTRIBUTES);

    if (listType === "BOOKMARKED") {
      const bookmark = upsertBookmark(caption);
      item.setLinkUrl(
        `https://docs.google.com/document/d/${DocumentApp.getActiveDocument().getId()}/edit#bookmark=${bookmark.getId()}`
      );
    }

    currentParagraphIndex += 1;
  }
}

function getListInitialParagraphAndDeleteSelectedElements() {
  const cursor = DocumentApp.getActiveDocument().getCursor();
  if (cursor) {
    const cursorElement = cursor.getElement();
    if (cursorElement.getType() === DocumentApp.ElementType.PARAGRAPH)
      return cursorElement.asParagraph();

    // I think the only possibility is the cursor element is a Paragraph
    // Or a Text, which is child of a parent
    // Maybe we should account for more edge cases here.
    return cursorElement.getParent().asParagraph();
  }

  const selection = DocumentApp.getActiveDocument().getSelection();
  const body = DocumentApp.getActiveDocument().getBody();
  if (!selection) {
    // Appends the paFragraph to the end of the document
    return body.appendParagraph("");
  }

  // This mimics the docs behaviour. If you insert a table of contents
  // while selecting elements, it deletes the selection and inserts
  // the table of contents on top
  const selectedElements = selection
    .getRangeElements()
    .map(rangeElement => rangeElement.getElement());
  const firstSelectedElement = selectedElements[0];

  if (firstSelectedElement.getType() === DocumentApp.ElementType.TABLE_CELL) {
    // TODO: remove the contents of the table cell, if any
    // TODO: No need to add a paragraph if there's already one
    return firstSelectedElement.asTableCell().appendParagraph("");
  }

  const elementsToDelete = selectedElements.slice(1, selectedElements.length);

  if (firstSelectedElement.getType() === DocumentApp.ElementType.PARAGRAPH) {
    elementsToDelete.forEach(function deleteElement(element) {
      element.removeFromParent();
    });
    return firstSelectedElement;
  }

  let firstParentParagraph = firstSelectedElement.getParent();
  while (firstParentParagraph.getType() !== DocumentApp.ElementType.PARAGRAPH) {
    firstParentParagraph = firstParentParagraph.getParent();
  }

  elementsToDelete.forEach(function deleteElement(element) {
    element.removeFromParent();
  });

  if (firstSelectedElement.getType() === DocumentApp.ElementType.TEXT) {
    firstSelectedElement.asText().setText(" ");
  }

  return firstParentParagraph;
}
