import { StorageLabelKey } from "../../common/types";

export default function setUserLabel(key: StorageLabelKey, label: string) {
  try {
    const Properties = PropertiesService.getUserProperties();
    Properties.setProperty(key, label);
  } catch (error) {
    // TODO: currently we let the client deal with this error
    // but maybe we could try to retry or have multiple storage
    // services
    throw error;
  }
}
