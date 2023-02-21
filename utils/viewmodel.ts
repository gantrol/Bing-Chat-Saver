/**
 * Used for connecting UI script and `chrome.storage` api
 */
import { chromeSyncGet } from "~utils/store/chrome";
import { Settings } from "~utils/constants";


export const handleElementVisibility = async (elem: HTMLElement, key, prevDisplay='flex') => {
  const setElementVisibility = async (elem, key) => {
    const isHidden = await chromeSyncGet(key);
    if (isHidden) {
      elem.style.display = 'none';
    } else {
      elem.style.display = prevDisplay;
    }
  }
  await setElementVisibility(elem, key);
  chrome.storage.onChanged.addListener(async (changes, namespace) => {
    if (key in changes) {
      await setElementVisibility(elem, key);
    }
  });
}

export const handleExportSetting = async () => {
  return await chromeSyncGet(Settings.EXPORT);
}
