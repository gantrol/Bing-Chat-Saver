import { getUUID } from "~utils/uuid";
import { Chat, db, Message } from "~utils/store/indexedDB";
import { Messages, Settings } from "~utils/constants";
import { ip_rule, ua_rule } from '~utils/rules';
import { chromeSyncGet } from "~utils/store/chrome";

// TODO: debug mode
// chrome.storage.onChanged.addListener(console.log.bind(console))

// TODO: refactor this
chrome.storage.onChanged.addListener(
  (changes, areaName) => {
if (areaName === "sync") {
      if (changes[Settings.REQUEST_IP]) {
        const rules = [];
        if (changes[Settings.REQUEST_IP].newValue) {
          rules.push(ip_rule);
        } else {
        }
        chrome.declarativeNetRequest.updateDynamicRules({
          removeRuleIds: [1, ip_rule.id],
          addRules: rules
        }).then(r => {
          console.log(`REQUEST_IP 2: ${r}`);
        });
      }
      if (changes[Settings.REQUEST_UA]) {
        const rules = [];
        if (changes[Settings.REQUEST_UA].newValue) {
          rules.push(ua_rule);
        } else {
        }
        chrome.declarativeNetRequest.updateDynamicRules({
          removeRuleIds: [1, ua_rule.id],
          addRules: rules
        }).then(r => {
          console.log(`REQUEST_IP 2: ${r}`);
        });
      }
    }
  }
)

chromeSyncGet(Settings.REQUEST_IP).then(r => {
  const rules = [];
  console.log(`REQUEST_IP: ${r}`);
  if (r) {
    rules.push(ip_rule);
  } else {
  }
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1, ip_rule.id],
    addRules: rules
  }).then(r => {
    console.log(`REQUEST_IP 2: ${r}`);
  });
});
chromeSyncGet(Settings.REQUEST_UA).then(r => {
  console.log(r);
  const rules = [];
  console.log(`REQUEST_IP: ${r}`);
  if (r) {
    rules.push(ua_rule);
  } else {
  }
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1, ua_rule.id],
    addRules: rules
  }).then(r => {
    console.log(r);
  });
});



chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");
    const saveChat = async () => {
      await saveChatToDB(request.body);
      sendResponse({ success: true });
    }
    const handleGetWindowSize = async (request, sendResponse) => {
      console.log(`GET_WINDOW_SIZE: ${request.body}`);
      const currentWindow = await chrome.windows.getCurrent();
      console.log(`GET_WINDOW_SIZE:currentWindow`);
      console.log(currentWindow);
      sendResponse(currentWindow);
    }

    async function resizeWindow() {
      console.log(request.body);
      const r1 = await chrome.windows.update(request.body.id, {
        width: request.body.width,
        height: request.body.height,
        state: request.body.state
      }).catch(error => {
          console.log(error);
        }
      );
      await sendResponse(r1);
    }

    async function resizeWindow2() {
      await chrome.windows.update(request.body.id, {
        width: request.body.width,
        height: request.body.height
      }).catch(error => {
          console.log(error);
        }
      );
      const r2 = await chrome.windows.update(request.body.id, {
        state: request.body.state
      }).catch(error => {
          console.log(error);
        }
      );
      await sendResponse(r2);
    }

    if (request.type === Messages.SAVE_CHAT) {
      // TODO: 完善日志体系……
      saveChat();
    } else if (request.type === Messages.RESIZE_WINDOW) {
      resizeWindow();
    } else if (request.type === Messages.RESIZE_WINDOW_2) {
      // Have no idea why RESIZE_WINDOW is not working when resizing from small to large
      resizeWindow2();
    } else if (request.type === Messages.GET_WINDOW_SIZE) {
      handleGetWindowSize(request, sendResponse);
    }
    return true;
  }
);

const saveChatToDB = async ({qAsJSON, id}) => {
  const firstQuestionText = getFirstQuestionText(qAsJSON);
  const chat_id = id;
  // const title = handleTitle(firstQuestionText, chat_id);
  if (firstQuestionText === undefined || firstQuestionText === null) {
    // don't store record that only have bing hello message
    return ;
  }
  const title = firstQuestionText;
  const currentUsers = db.users.where("login").equals(1);
  const currentUser = await currentUsers.first();
  const user_id = currentUser.id;
  const chat: Chat = {
    id: chat_id,
    title: title,
    user_id: user_id,
    created_time: new Date(),
    updated_time: new Date()
  };
  db.chats.put(chat);

  const messages = [];

  function isIterable(obj) {
    return obj != null && typeof obj[Symbol.iterator] === "function";
  }

  for (let chat_turn of qAsJSON) {
    // map to messages
    if (isIterable(chat_turn.questions)) {
      for (let question of chat_turn.questions) {
        const result_question: Message = {
          id: getUUID(),
          body: question.text,
          is_bing: false,
          chat_id,
          user_id,
          order: messages.length,
          created_time: new Date()
        };
        messages.push(result_question);
      }
    }
    if (isIterable(chat_turn.answers)) {
      for (let answer of chat_turn.answers) {
        const result_answer: Message = {
          id: getUUID(),
          body: answer.text,
          html: answer.html,
          meta: answer.meta,
          refs: answer.refs,
          is_bing: true,
          chat_id,
          user_id,
          order: messages.length,
          created_time: new Date()
        };
        messages.push(result_answer);
      }
    }
  }
  // bulk add to db
  db.messages.bulkAdd(messages).catch(error => {
    console.log(error);
  });
};


const getFirstQuestionText = (input) => {
  for (let chat_turn of input) {
    if (chat_turn.questions) {
      for (let question of chat_turn.questions) {
        if (question.text) {
          return question.text;
        }
      }
    } else {

    }
  }
  return null;
};
