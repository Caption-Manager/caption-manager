import { DEFAULT_LABELS } from "../../common/constants";

/**
 *  Gets the user stored labels. These labels persist through
 * sessions.
 * @return {string} The final position of the element.
 *
 * See:
 * https://stackoverflow.com/questions/28100337/apps-script-element-equality
 * https://sites.google.com/a/mcpher.com/share/Home/excelquirks/docs/sortbookmarks
 *
 * @customfunction
 */
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
