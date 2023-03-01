import { getUUID } from "~utils/uuid";
import { Chat, db, Message } from "~utils/store/indexedDB";
import { Messages, Settings } from "~utils/constants";
import { ip_rule, ua_rule } from '~utils/rules';
import { chromeSyncGet } from "~utils/store/chrome";


chrome.declarativeNetRequest.updateDynamicRules({
  // remove exist rules
  // TODO: 1 is the rule in rules.json...check if it's necessary
  removeRuleIds: [1, ip_rule.id, ua_rule.id]
}).then(r => {
  console.log(r);
  chromeSyncGet(Settings.REQUEST_IP).then(r => {
    console.log(r);
    if (r) {
      chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [ip_rule]
      }).then(r => {
        console.log(r);
      });
    }
  });
  chromeSyncGet(Settings.REQUEST_UA).then(r => {
    console.log(r);
    if (r) {
      chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [ua_rule]
      }).then(r => {
        console.log(r);
      });
    }
  });
});

chrome.runtime.onMessage.addListener(
  async (request, sender, sendResponse) => {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");
    if (request.type === Messages.SAVE_CHAT) {
      // TODO: 完善日志体系……
      await saveChatToDB(request.body);
      sendResponse({ success: true });
    } else if (request.type === Messages.RESIZE_WINDOW) {
      console.log(request.body);
      const r1 = await chrome.windows.update(request.body.id, {
        width: request.body.width,
        height: request.body.height,
        state: request.body.state,
      }).catch(error => {
          console.log(error);
        }
      );
      await sendResponse(r1);
    } else if (request.type === Messages.RESIZE_WINDOW_2) {
      // Have no idea why RESIZE_WINDOW is not working when resizing from small to large
      await chrome.windows.update(request.body.id, {
        width: request.body.width,
        height: request.body.height,
      }).catch(error => {
          console.log(error);
        }
      );
      const r2 = await chrome.windows.update(request.body.id, {
        state: request.body.state,
      }).catch(error => {
          console.log(error);
        }
      )
      await sendResponse(r2);

    } else if (request.type === Messages.GET_WINDOW_SIZE) {
      chrome.windows.getCurrent((currentWindow) => {
        console.log(currentWindow);
        sendResponse(currentWindow);
      });
    }
  }
);

const saveChatToDB = async (qAsJSON) => {
  const firstQuestionText = getFirstQuestionText(qAsJSON);
  const chat_id = getUUID();
  const title = handleTitle(firstQuestionText, chat_id);
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
      return chat_turn.questions[0]?.text;
    } else {

    }
  }
  return null;
};
const handleTitle = (firstQuestion, id) => {
  if (firstQuestion) {
    // if (firstQuestion.length > 10) {
    //   return firstQuestion.substring(0, 10);
    // } else {
    return firstQuestion;
    // }
  } else {
    return id;
  }
};
