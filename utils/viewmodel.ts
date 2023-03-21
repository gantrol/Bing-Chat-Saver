/**
 * Used for connecting UI script and `chrome.storage` api
 */
import { exportActions, Settings } from "~utils/constants";
import { Page } from "~utils/bingPage";
import { DownloadVisitor } from "~utils/visitor";
import { browserSyncGet } from "~utils/store/browser";

export const handleElementVisibility = async (elem: HTMLElement, key, prevDisplay='flex') => {
  if (key === Settings.LOGO) {
    console.log("logo", elem);
  }
  const setElementVisibility = async (elem, key) => {
    const isHidden = await browserSyncGet(key);
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

export const handleWelcomeVisibility = async () => {
  const welcomeElement = <HTMLElement>Page.getWelcome();
  for (const child of welcomeElement.shadowRoot.children) {
    // logo control
    if (child.classList.contains("container-logo")) {
      // sometimes do not work, so move to the end
    } else if (child.classList.contains("container-control") || child.tagName.toLowerCase() === 'cib-tone-selector') {
      await handleElementVisibility(<HTMLElement>child, Settings.TONE);
    } else {
      await handleElementVisibility(<HTMLElement>child, Settings.WELCOME);
    }
  }
  const logo = welcomeElement.shadowRoot.querySelector("div.container-logo");
  await handleElementVisibility(<HTMLElement>logo, Settings.LOGO);
}

export const handleExportSetting = async () => {
  return await browserSyncGet(Settings.EXPORT);
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
  } else {
    throw new Error(`There is not action type of ${action}`);
  }
}
