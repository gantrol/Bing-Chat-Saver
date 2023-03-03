import { Page } from "~utils/bingPage";


import { exportActions, Settings } from "~utils/constants";
import { getDownloadFunction, handleElementVisibility, waitForChatAppear } from "~utils/viewmodel";


const init = async () => {
  await waitForChatAppear();
  await handleElementVisibility(<HTMLElement>Page.getWelcome(), Settings.WELCOME);
  const feedbackGroup = Page.getFeedbackBar();
  const feedbackButton = feedbackGroup.querySelector("#fbpgbt");

  addButtonGroups(feedbackGroup, feedbackButton);

  await handleElementVisibility(<HTMLElement>feedbackButton, Settings.FEEDBACK, "block");

  // TODO: auto save to db?
  // get session keys
  let session_keys;
  while (await waitForChatAppear()) {
    console.log("Chat appear");
    // save to db

    // sleep 5 s
  }

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
    return getDownloadFunction(action)
  };
  downloadButton.onclick = getOnClickByAction(action);
  actionsArea.appendChild(downloadButton);
};


init();
