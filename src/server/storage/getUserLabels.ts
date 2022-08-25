import { DEFAULT_LABELS } from '../../common/constants';

export default function getUserLabels() {
  try {
    const Properties = PropertiesService.getUserProperties();
    const userProperties = Properties.getProperties();
    
    const userLabels = {};
    for (const key in DEFAULT_LABELS) {
      userLabels[key] = userProperties[key] || DEFAULT_LABELS[key];
    }
    return userLabels as typeof DEFAULT_LABELS;
  } catch (error) {
    return DEFAULT_LABELS;
  }
}