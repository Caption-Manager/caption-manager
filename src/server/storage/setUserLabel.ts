import { DEFAULT_LABELS } from '../../common/constants';
import { LabelKey } from '../../common/types';

export default function setUserLabel(key: LabelKey, label: string) {
  try {
    const Properties = PropertiesService.getUserProperties();
    Properties.setProperty(key, label);
  } catch (error) {
    return DEFAULT_LABELS[key];
  }
}