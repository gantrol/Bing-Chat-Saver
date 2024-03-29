import { Page } from "~utils/bingPage";


import { exportActions, Settings } from "~utils/constants";
import {
  getDownloadFunction,
  handleElementVisibility,
  handleWelcomeVisibility,
  waitForChatAppear
} from "~utils/viewmodel";
import { getUUID } from "~utils/uuid";
import { DownloadVisitor } from "~utils/visitor";

let hasSaved = false;

const init = async () => {
  await waitForChatAppear();

  await handleWelcomeVisibility();
  const feedbackGroup = Page.getFeedbackBar();
  const feedbackButton = feedbackGroup.querySelector("#fbpgbt");

  addButtonGroups(feedbackGroup, feedbackButton);

  await handleElementVisibility(<HTMLElement>feedbackButton, Settings.FEEDBACK, "block");


  const reset = () => {
    session_keys = getUUID();
  };
  const saveToDB = async (reset_flag = true) => {
    if (reset_flag) {
      reset();
      await DownloadVisitor.forDB(session_keys);
      hasSaved = true;
    } else {
      // TODO: update if there are needs in future,
      //   but it is not necessary now
    }
  };
  const addOnclick = (elem: HTMLElement) => {
    elem.addEventListener("click", async (event) => {
      event.preventDefault();
      await saveToDB();

      const eventName = "background-onclick";
      const div = document.createElement("div");
      const customEvent = new Event(eventName);

      div.addEventListener(eventName, function() {
        div.click();
      });

      div.dispatchEvent(customEvent);
      div.remove();
    });
  };

  let session_keys;

  reset();
  // it seems feedback will reload the page,
  //   so it is not necessary to add event listener for this button,
  //   or it will be saved twice
  // addOnclick(Page.getFeedbackBar());
  addOnclick(Page.getCleanButton());
  // edge case for tone buttons
  // TODO: change the "auto saving" logic instead...
  //  e.g. save when listen on wss event
  //   Page.getWelcome().shadowRoot
  //     .querySelector("div.container-control > cib-tone-selector")
  //     .shadowRoot.querySelector("#tone-options").querySelectorAll("button").forEach((elem) => {
  //       console.log(elem, "onload");
  //
  //       addOnclick(elem);
  //   });

  window.addEventListener("beforeunload", () => {
    console.log("save to db");
    saveToDB();
  }, false);

  window.addEventListener("unload", function() {
    if (!hasSaved) {
      saveToDB();
    }
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
    return getDownloadFunction(action);
  };
  downloadButton.onclick = getOnClickByAction(action);
  actionsArea.appendChild(downloadButton);
};


init();
