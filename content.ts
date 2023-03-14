import { Page } from "~utils/bingPage";


import { exportActions, Settings } from "~utils/constants";
import { getDownloadFunction, handleElementVisibility, waitForChatAppear } from "~utils/viewmodel";
import { getUUID } from "~utils/uuid";
import { DownloadVisitor } from "~utils/visitor";


const init = async () => {
  await waitForChatAppear();
  await handleElementVisibility(<HTMLElement>Page.getWelcome(), Settings.WELCOME);
  const feedbackGroup = Page.getFeedbackBar();
  const feedbackButton = feedbackGroup.querySelector("#fbpgbt");

  addButtonGroups(feedbackGroup, feedbackButton);

  await handleElementVisibility(<HTMLElement>feedbackButton, Settings.FEEDBACK, "block");



  const reset = () => {
    session_keys = getUUID();
  }
  const saveToDB = async (reset_flag = true) => {
    if (reset_flag) {
      reset();
      await DownloadVisitor.forDB(session_keys);
    } else {
      // TODO: update if there are needs in future,
      //   but it is not necessary now
    }
  }
  const addOnclick = (elem: HTMLElement) => {
    elem.addEventListener("click", async (event) => {
      event.preventDefault();
      await saveToDB();

      const eventName = "background-onclick";
      const dev = document.createElement("div")
      const customEvent = new Event(eventName);

      dev.addEventListener(eventName, function() {
        dev.click();
      });

      dev.dispatchEvent(customEvent);
      dev.remove();
    });
  }

  // - TODO: auto save, how to handle return bing search and
  //    - re-search
  let session_keys;

  reset();
  // it seems feedback will reload the page,
  //   so it is not necessary to add event listener for this button,
  //   or it will be saved twice
  // addOnclick(Page.getFeedbackBar());
  addOnclick(Page.getCleanButton());

  window.addEventListener("beforeunload", () => {
    saveToDB();
  });
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
