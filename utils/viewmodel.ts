/**
 * Used for connecting UI script and `chrome.storage` api
 */
import { chromeSyncGet } from "~utils/store/chrome";
import { exportActions, Settings } from "~utils/constants";
import { Page } from "~utils/bingPage";
import { DownloadVisitor } from "~utils/visitor";

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

// Page.waitForElm("#b_sydConvCont > cib-serp");
export const waitForChatAppear = async () => {
  const result = await Page.waitForElm("#b_sydConvCont > cib-serp");
  return true;
}

export const getDownloadFunction = (action) => {
  if (action === exportActions.ALL) {
    return DownloadVisitor.forAll;
  } else if (action === exportActions.PREVIEW) {
    return DownloadVisitor.forPreview;
  } else if (action === 'AUTO') {
    return DownloadVisitor.forDbAuto;
  } else {
    throw new Error(`There is not action type of ${action}`);
  }
}
