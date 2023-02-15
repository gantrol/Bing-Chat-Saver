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

  static handleRefs = (ansFrame: HTMLElement, setFontWeight=true, returnJSON=false) => {
    // ansFrame's css selector is cib-message[type="text"]
    if (ansFrame === null) return;
    const refsBlock = ansFrame
      .shadowRoot
      .querySelector("cib-message-attributions");
    if (refsBlock) {
      const refsElement = refsBlock.shadowRoot.querySelector("div[role=\"list\"]");
      const linkElementList = Array.from(refsElement.querySelectorAll("a"));
      return linkElementList.map(linkElm => {
        if (setFontWeight) {
          linkElm.style.fontWeight = "400";
        }
        if (returnJSON) {
          return {
            index: linkElm.getAttribute("tabindex"),
            title: linkElm.getAttribute("title"),
            href: linkElm.getAttribute("href")
          };
        }
      });
    }
  }

  static setFontWeightForAllRefs = () => {
    const groups_roots = Page.getQAsElement();
    for (const groups_root of groups_roots) {
      for (let group of groups_root.shadowRoot.querySelectorAll("cib-message-group")) {
        console.log(`setFontWeightForAllRefs: ${group}`);
        // check user or bot
        if (group.getAttribute("source") === "bot") {
          // Answer
          const messagesShadowRoot = group.shadowRoot;
          const ansFrame = <HTMLElement> messagesShadowRoot.querySelector("cib-message[type=\"text\"]");
          Page.handleRefs(ansFrame);
        }
      }
    }
  };

  static getFeedbackBar = () => {
    return Page.getWhole()
      .querySelector("cib-serp-feedback")
      .shadowRoot
      .querySelector("div.root");
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
  }
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

      if (group.getAttribute("source") === "bot") {
        // Answer
        const answer = {
          meta: [],
          body: "",
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
            .textContent;
        });
        // body, optional, e.g., meta is loading, but wss does not response
        const ansFrame = <HTMLElement>messagesShadowRoot.querySelector("cib-message[type=\"text\"]");
        if (ansFrame) {
          const ansHTML = ansFrame
            .shadowRoot.querySelector("div.ac-textBlock");
          answer.html = ansHTML.innerHTML;
          answer.body = ansHTML.textContent;
        }
        // Note: refs is optional
        answer.refs = Page.handleRefs(ansFrame, false, true);

        QA.answers.push(answer);
      } else {
        // Question, source is user
        const html = group.shadowRoot.querySelector("cib-message")
          .shadowRoot.querySelector("div.content");
        QA.questions.push({ text: html.textContent });
      }
    }
    return QA;
  };
}
