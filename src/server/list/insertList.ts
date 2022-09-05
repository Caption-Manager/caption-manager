// Core
import getCaptions from "../caption/getCaptions";
import getCaption from "../caption/getCaption";
import isCaptionalizable from "../caption/isCaptionalizable";
import getNextBodyChildParagraph from "../caption/getNextBodyChildParagraph";
// Bookmark
import upsertBookmark from "../bookmark/upsertBookmark";
// Server Utils
import getLastSelectedOrCursorElement from "../utils/getLastSelectedOrCursorElement";
import stringToElementType from "../utils/stringToElementType";
// Common Utils
import { removeLineBreaks } from "../../common/utils";
import * as HumanReadable from "../../common/utils/HumanReadable";
// Constants
import { HEADER_ATTRIBUTES, PARAGRAPH_ITEM_ATTRIBUTES } from "./constants";
// Types
import {
  Caption,
  CaptionalizableSelectedElementType,
  ListType,
} from "../../common/types";

/**
 * Inserts a list of the given element and list types on the body.
 *
 * @param {CaptionalizableSelectedElementType} elementType A type of element to insert a list.
 * @param {ListType} listType A type of list.
 * @return {void}
 * @customfunction
 */
export default function insertList(
  elementType: CaptionalizableSelectedElementType,
  listType: ListType
): void {
  const initialParagraphIndex = getListInitialBodyChildParagraphIndex();
  const header = insertHeader(
    initialParagraphIndex,
    `List of ${HumanReadable.type(elementType)}s`
  );
  insertCaptionItems(initialParagraphIndex, elementType, listType);
  setCursorOnList(header);
}

/**
 * Gets the initial paragraph of the list, which is a paragraph created as the
 * body child element immediately after the last selected element or cursor
 * element. If the last selected element or cursor element is a caption,
 * creates a paragraph right after the caption (this way the list is not created
 * between the last selected or cursor element and the caption)
 *
 * @return {number} The index of the initial paragraph of the list.
 * @customfunction
 */
function getListInitialBodyChildParagraphIndex(): number {
  const lastSelectedElement = getLastSelectedOrCursorElement();
  const parentBodyChild = getParentBodyChild(lastSelectedElement);

  const body = DocumentApp.getActiveDocument().getBody();
  const nextBodyChild = body.insertParagraph(
    body.getChildIndex(parentBodyChild as any) + 1,
    ""
  );
  return body.getChildIndex(nextBodyChild as any);
}

/**
 * Gets the parent body child from a given element. If the element is
 * captionalizable and has a caption, considers the caption as the
 * parent body child. If it has no caption, it gets the next body
 * child paragraph as the parent body child.
 *
 * @param {GoogleAppsScript.Document.Element} element An element to the the parent body child from.
 * @return {GoogleAppsScript.Document.Element | GoogleAppsScript.Document.Paragraph} The parent element which is a direct body child.
 * @customfunction
 */
function getParentBodyChild(
  element: GoogleAppsScript.Document.Element
): GoogleAppsScript.Document.Element | GoogleAppsScript.Document.Paragraph {
  if (isCaptionalizable(element)) {
    // Escape the caption, we don't want to insert a list between a
    // selected element and its caption.
    const caption = getCaption(element);
    if (caption) return caption.getParent().asParagraph();
    else return getNextBodyChildParagraph(element); // Maybe we don't even need that. We are adding an extra paragraph here
  }

  // Just get the parent which is a direct child of the body
  let parentBodyChild = element;
  while (
    parentBodyChild.getParent().getType() !==
    DocumentApp.ElementType.BODY_SECTION
  ) {
    parentBodyChild = parentBodyChild.getParent() as any;
  }
  return parentBodyChild;
}

/**
 * Inserts a header on the beginning of the list.
 * @param {number} initialParagraphIndex The index of the first paragraph of the list.
 * @param {string} text The text content of the header.
 * @return {GoogleAppsScript.Document.Paragraph} The inserted header paragraph.
 * @customfunction
 */
function insertHeader(
  initialParagraphIndex: number,
  text: string
): GoogleAppsScript.Document.Paragraph {
  const body = DocumentApp.getActiveDocument().getBody();
  const header = body.insertParagraph(initialParagraphIndex, text);
  header.setAttributes(HEADER_ATTRIBUTES);
  return header;
}

/**
 * Inserts the caption items of the list.
 * @param {number} initialParagraphIndex The index of the first paragraph of the list.
 * @param {CaptionalizableSelectedElementType} elementType A type of element to insert a list.
 * @param {ListType} listType A type of list.
 * @return {void}
 * @customfunction
 */
function insertCaptionItems(
  initialParagraphIndex: number,
  elementType: CaptionalizableSelectedElementType,
  listType: ListType
): void {
  let parentBodyChildIndex = initialParagraphIndex + 1;
  const captions = getCaptions(stringToElementType(elementType));
  for (const caption of captions) {
    insertCaptionItem(parentBodyChildIndex, caption, listType);
    parentBodyChildIndex += 1;
  }
}

/**
 * Inserts the caption item on the list.
 * @param {number} paragraphIndex The index of the paragraph of the corresponding caption item on the list.
 * @param {Caption} caption A caption to get the text content from.
 * @param {ListType} listType A type of list.
 * @return {void}
 * @customfunction
 */
function insertCaptionItem(
  paragraphIndex: number,
  caption: Caption,
  listType: ListType
): void {
  const body = DocumentApp.getActiveDocument().getBody();

  const item = body.insertParagraph(
    paragraphIndex,
    removeLineBreaks(caption.getText())
  );

  item.setAttributes(PARAGRAPH_ITEM_ATTRIBUTES);

  if (listType === "BOOKMARKED") {
    const bookmark = upsertBookmark(caption);
    item.setLinkUrl(getBookmarkUrl(bookmark.getId()));
  }
}

/**
 * Gets the URL on document for a given bookmark id.
 * @param {string} id The id of a bookmark.
 * @return {string} The bookmark URL.
 * @customfunction
 */
function getBookmarkUrl(id: string): string {
  return `https://docs.google.com/document/d/${DocumentApp.getActiveDocument().getId()}/edit#bookmark=${id}`;
}

/**
 * Sets the cursor on active document to be on the header
 * paragraph of the inserted list.
 *
 * @param {GoogleAppsScript.Document.Paragraph} header The header paragraph to focus on.
 * @return {void}
 * @customfunction
 */
function setCursorOnList(header: GoogleAppsScript.Document.Paragraph): void {
  const document = DocumentApp.getActiveDocument();
  const position = document.newPosition(header.getChild(0), 0);
  document.setCursor(position);
}
