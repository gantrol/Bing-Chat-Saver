import { getUUID } from "~utils/uuid";
import { Chat, db, Message } from "~utils/store/indexedDB";
import { Messages } from "~utils/constants";


chrome.runtime.onMessage.addListener(
  async (request, sender, sendResponse) => {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");
    if (request.type === Messages.SAVE_CHAT) {
      // TODO: 完善日志体系……
      await saveChatToDB(request.body);
      sendResponse({ success: true });
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
