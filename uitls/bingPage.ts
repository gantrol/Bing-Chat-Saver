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

  static setFontWeightForAllRefs = () => {
    const groups_roots = Page.getQAsElement();
    for (const groups_root of groups_roots) {
      for (let group of groups_root.shadowRoot.querySelectorAll("cib-message-group")) {
        console.log(`setFontWeightForAllRefs: ${group}`);
        // check user or bot
        if (group.getAttribute("source") === "bot") {
          // Answer
          const messagesShadowRoot = group.shadowRoot;
          const ansFrame = messagesShadowRoot.querySelector("cib-message[type=\"text\"]");
          const refsBlock = ansFrame
            .shadowRoot
            .querySelector("cib-message-attributions");
          if (refsBlock) {
            const refsElement = refsBlock.shadowRoot.querySelector("div[role=\"list\"]");
            const linkElementList = Array.from(refsElement.querySelectorAll("a"));
            linkElementList.map(linkElm => {
              linkElm.style.fontWeight = "400";
            });
          }
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
}

