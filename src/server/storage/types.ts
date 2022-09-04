export type DocumentLabelStorageKey = "INLINE_IMAGE" | "TABLE" | "EQUATION";

export type DocumentLabels = {
  [key in DocumentLabelStorageKey]: string;
};
