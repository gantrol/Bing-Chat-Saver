import { Page } from "~utils/bingPage";
import { DownloadVisitor } from "~utils/visitor";

import { exportActions, Settings } from "~utils/constants";
import { handleElementVisibility } from "~utils/viewmodel";


const init = async () => {
  await Page.waitForElm("#b_sydConvCont > cib-serp");
  await handleElementVisibility(<HTMLElement>Page.getWelcome(), Settings.WELCOME);
  const feedbackGroup = Page.getFeedbackBar();
  const feedbackButton = feedbackGroup.querySelector("#fbpgbt");

  addButtonGroups(feedbackGroup, feedbackButton);

  await handleElementVisibility(<HTMLElement>feedbackButton, Settings.FEEDBACK, "block");
};


const addButtonGroups = (actionsArea, WaitingButton) => {
  addButton(actionsArea, WaitingButton, exportActions.ALL);
  addButton(actionsArea, WaitingButton, exportActions.PREVIEW);
};

const addButton = (actionsArea, WaitingButton, action) => {
  const downloadButton = WaitingButton.cloneNode(true);
  downloadButton.id = `${action}-download-button`;
  downloadButton.innerText = action;

  const getOnClickByAction = (action) => {
    if (action === exportActions.ALL) {
      return DownloadVisitor.forAll;
    } else if (action === exportActions.PREVIEW) {
      return DownloadVisitor.forPreview;
    } else {
      throw new Error(`There is not action type of ${action}`);
    }
  };
  downloadButton.onclick = getOnClickByAction(action);
  actionsArea.appendChild(downloadButton);
};


init();
