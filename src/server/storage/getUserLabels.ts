import { DEFAULT_LABELS, Labels } from "../../common/constants";

/**
 *  Gets the user stored labels. These labels persist through
 * sessions.
 * @return {string} The final position of the element.
 * @customfunction
 */
export default function getUserLabels(): Labels {
  try {
    const Properties = PropertiesService.getUserProperties();
    const userProperties = Properties.getProperties();

    const userLabels = {};
    for (const key in DEFAULT_LABELS) {
      userLabels[key] = userProperties[key] || DEFAULT_LABELS[key];
    }
    return userLabels as Labels;
  } catch (error) {
    // TODO: currently we just return the default labels.
    // This means that user will lose his stored labels.
    // We could to at least two thing to address that:
    // 1) Improve the cache service, retrying and having other layers of cache
    // 2) Warn the user about what happened
    return DEFAULT_LABELS;
  }
}
