export class Page {

  static getWhole = () => {
    return document
      .querySelector("#b_sydConvCont > cib-serp")
      .shadowRoot;
  };

  static getMain = () => {
    return <HTMLElement>Page.getWhole()
      .querySelector("#cib-conversation-main")
      .shadowRoot
      .querySelector("#cib-chat-main");
  };

  static getWelcome = () => {
    return Page.getMain()
      .querySelector("cib-welcome-container");
  };

  static getQAsElement = () => {
    return Page.getMain()
      .querySelectorAll("cib-chat-turn");
  };

  static getFirstQuestion = () => {
    return Page.getMain().querySelector("cib-chat-turn")
      .shadowRoot.querySelector("cib-message-group:nth-child(1)")
      .shadowRoot.querySelector("cib-message")
      .shadowRoot.querySelector("cib-shared > div.content.text-message-content").textContent;
  };

  static handleRefs = (ansFrame: HTMLElement, setFontWeight = true, returnJSON = false) => {
    // ansFrame's css selector is cib-message[type="text"]
    if (ansFrame === null) return [];
    const refsBlock = ansFrame
      .shadowRoot
      .querySelector("cib-message-attributions");
    if (refsBlock) {
      const refsElement = refsBlock.shadowRoot.querySelector("div[role=\"list\"]");
      const linkElementList = Array.from(refsElement.querySelectorAll("a"));
      return linkElementList.map((linkElm, index) => {
        if (setFontWeight) {
          linkElm.style.fontWeight = "400";
        }
        if (returnJSON) {
          return {
            index: index,
            title: linkElm.getAttribute("title"),
            href: linkElm.getAttribute("href")
          };
        }
      });
    } else {
      return [];
    }
  };

  static setFontWeightForAllRefs = () => {
    const groups_roots = Page.getQAsElement();
    for (const groups_root of groups_roots) {
      for (let group of groups_root.shadowRoot.querySelectorAll("cib-message-group")) {
        // check user or bot
        if (group.getAttribute("source") === "bot") {
          // Answer
          const messagesShadowRoot = group.shadowRoot;
          const ansFrame = <HTMLElement>messagesShadowRoot.querySelector("cib-message[type=\"text\"]");
          Page.handleRefs(ansFrame);
        }
      }
    }
  };

  static getFeedbackBar = () => {
    // document.querySelector("#b_sydConvCont > cib-serp").shadowRoot.querySelector("cib-serp-feedback").shadowRoot.querySelector("#fbpgbt")
    return Page.getWhole()
      .querySelector("cib-serp-feedback")
      .shadowRoot;
  };

  static waitForElm = (selector) => {
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


  static getQAsJSON = () => {
    const qas = new QAList(Page.getQAsElement());
    return qas.qaList;
  };

  static getCleanButton = () => {
    return <HTMLElement>Page.getWhole().querySelector("#cib-action-bar-main")
      .shadowRoot.querySelector(".button-compose");
  };
}

export class QAList {
  // list of `cib-chat-turn`
  // * 目前已经QAA在一个QA的组里面
  qaList: any;

  constructor(chat_turn_list: NodeListOf<Element>) {
    this.qaList = this.getQAs(chat_turn_list);
  }

  getQAs = (chat_turn_list: NodeListOf<Element>) => {
    // return a json object [QA]
    return Array.from(chat_turn_list).map(chat_turn => {
      const groups_root = chat_turn.shadowRoot;
      return this.getQA(groups_root);
    });
  };

  getQA = (groups_root: ShadowRoot) => {
    const QA = {
      questions: [],
      answers: []
    };
    for (let group of groups_root.querySelectorAll("cib-message-group")) {
      // check user or bot

      // TODO: may be multiple
      // querySelector("#cib-chat-main > cib-chat-turn:nth-child(4)").shadowRoot
      //   .querySelector("cib-message-group.response-message-group").shadowRoot.querySelector("cib-message:nth-child(2)")
      if (group.getAttribute("source") === "bot") {
        // Answer
        const answer = {
          meta: [],
          text: "",
          html: "",
          refs: []
          //   hints: [],  TODO if realtime
        };
        // meta, optional
        const messagesShadowRoot = group.shadowRoot;
        const metaElements = messagesShadowRoot.querySelectorAll("cib-message[type=\"meta\"]");
        answer.meta = Array.from(metaElements).map(meta => {
          return meta
            .shadowRoot
            .querySelector("div.meta-text")
            .textContent?.trim();
        });
        // body, optional, e.g., meta is loading, but wss does not response
        const ansFrames = messagesShadowRoot.querySelectorAll("cib-message[type=\"text\"]");
        for (let ansFrame of ansFrames) {
          debugger;
          if (ansFrame) {
            const ansHTML = ansFrame
              .shadowRoot.querySelector("div.ac-textBlock");
            // fix:  Cannot read properties of null (reading 'innerHTML')
            if (ansHTML) {
              // 间隔会不会有问题
              answer.html += ansHTML.innerHTML;
              answer.text += ansHTML.textContent?.trim();
            }
            // Note: refs is optional
            answer.refs.concat(Page.handleRefs(<HTMLElement>ansFrame, false, true));

          }
        }
        if (answer.text !== "") {
          console.log(answer);
          QA.answers.push(answer);
        } else {
          console.log("answer is empty");
          console.log(answer);
        }
      } else {
        // Question, source is user
        const html = group.shadowRoot.querySelector("cib-message")
          .shadowRoot.querySelector("div.content");
        QA.questions.push({ text: html.textContent?.trim() });
      }
    }
    return QA;
  };
}
