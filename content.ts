import { Page } from "~uitls/bingPage";
import { DownloadVisitor } from "~uitls/visitor";


const PNG = "PNG";
const JPG = "JPG";
const MD = "Markdown";
const JSON = "JSON";


const init = async () => {
  await Page.waitForElm("#b_sydConvCont > cib-serp");
  // remove welcome bar
  Page.getWelcome().remove();
  const feedbackGroup = Page.getFeedbackBar();
  const feedbackButton = feedbackGroup.querySelector("#fbpgbt");
  addButtonGroups(feedbackGroup, feedbackButton);
};


const addButtonGroups = (actionsArea, WaitingButton) => {
  addButton(actionsArea, WaitingButton, PNG);
  addButton(actionsArea, WaitingButton, JPG);
  addButton(actionsArea, WaitingButton, JSON);
};

const addButton = (actionsArea, WaitingButton, type) => {
  const downloadButton = WaitingButton.cloneNode(true);
  downloadButton.id = `${type}-download-button`;
  downloadButton.innerText = type;

  const getOnClickByType = (type) => {
    if (type === PNG) {
      return DownloadVisitor.forPNG;
    } else if (type === JPG) {
      return DownloadVisitor.forJPG;
    } else if (type === MD) {
      return DownloadVisitor.forMD;
    } else if (type === JSON) {
      return DownloadVisitor.forJSON;
    }
  };
  downloadButton.onclick = getOnClickByType(type);
  actionsArea.appendChild(downloadButton);
};

init();
