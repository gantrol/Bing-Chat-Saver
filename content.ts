import html2canvas from "html2canvas";

const PNG = "PNG";
const MD = "Markdown";
const JSON = "JSON";
const init = async () => {
  await waitForElm("#b_sydConvCont > cib-serp");
  const whole = getWhole();
  const main = getMain();
  document.querySelector("#b_sydConvCont > cib-serp").shadowRoot.querySelector("#cib-conversation-main").shadowRoot.querySelector("#cib-chat-main > cib-welcome-container");
  main
    .querySelector("cib-welcome-container")
    .remove();

  const feedbackGroup = whole
    .querySelector("cib-serp-feedback")
    .shadowRoot
    .querySelector("div.root");
  const feedbackButton = feedbackGroup.querySelector("#fbpgbt");
  console.log(feedbackButton);

  addButtonGroups(feedbackGroup, feedbackButton);
};

const getWhole = () => {
  return document
    .querySelector("#b_sydConvCont > cib-serp")
    .shadowRoot;
};

const getMain = () => {
  return getWhole()
    .querySelector("#cib-conversation-main")
    .shadowRoot
    .querySelector("#cib-chat-main");
};

const waitForElm = (selector) => {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
};

const addButtonGroups = (actionsArea, WaitingButton) => {
  // TODO: 5 change css, 并排
  addButton(actionsArea, WaitingButton, PNG);
  // TODO: add markdown
};

const addButton = (actionsArea, WaitingButton, type) => {
  const downloadButton = WaitingButton.cloneNode(true);
  downloadButton.id = `${type}-download-button`;
  downloadButton.innerText = type;

  const getOnClickByType = (type) => {
    if (type === PNG) {
      return forImage;
    } else if (type === MD) {
      return forMD;
    } else if (type === JSON) {
      return forJSON;
    }
  };
  downloadButton.onclick = getOnClickByType(type);
  actionsArea.appendChild(downloadButton);
};

const forImage = () => {
  const main = getMain();
  // TODO: 2 调整参数，以免导出排版有问题的图片
  // 1. 调整基线
  // 2. (optional) 白色背景
  html2canvas(<HTMLElement>main).then(async (canvas) => {
    const imgData = canvas.toDataURL("image/png");
    requestAnimationFrame(() => {
      const binaryData = atob(imgData.split("base64,")[1]);
      const data = [];
      for (let i = 0; i < binaryData.length; i++) {
        data.push(binaryData.charCodeAt(i));
      }
      const blob = new Blob([new Uint8Array(data)], { type: "image/png" });
      const url = URL.createObjectURL(blob);

      window.open(url, "_blank");
    });
  });
};


const forMD = () => {

};

const forJSON = () => {

};

init();
