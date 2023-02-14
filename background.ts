export {}
import html2canvas from 'html2canvas'

const injectedFunction = async () => {

  const main = document
    .querySelector("#b_sydConvCont > cib-serp")
    .shadowRoot.querySelector("#cib-conversation-main")
    .shadowRoot.querySelector("#cib-chat-main")
  const list = Array.from(main.querySelectorAll("cib-chat-turn"))
  console.log(list)
  // questions
  let paths = list.map(item => {
    let user = item.shadowRoot.querySelector('[source="user"]')
    if (user) {
      return user.shadowRoot.querySelector("cib-message")
    } else {
      // 应对打招呼（无问题），可能要改，看打招呼怎么处理了。
    }
  }).filter(path => path !== undefined);
  // TODO: strip question text?
  let questions = paths.map(path => {
    return path
      .shadowRoot.querySelector("div.content")
  })

  console.log(questions)
  let answers = list.map(item => { // 将NodeList对象转换为数组，然后使用.map()方法
    return item.shadowRoot.querySelector("cib-message-group.response-message-group").shadowRoot
  });
  console.log(answers)

  // (optional) meta info （就是加载的那些文字， e.g. searching in web）
  let metas_list = answers.map(answer => {
    return answer.querySelectorAll('cib-message[type="meta"]');
  });
  let meta_texts = metas_list.map(metas => {
    return Array.from(metas).map(meta => {
      return meta
        .shadowRoot
        .querySelector('div.meta-text')
    })
  })

  console.log(meta_texts)

  const answer_body = answers.map((answer) => answer.querySelector('cib-message[type="text"]')
    .shadowRoot.querySelector("div.content")
  )
  const answer_source = answers.map((answer) => {
      const result = answer.querySelector('cib-message[type="text"]')
        .shadowRoot
        .querySelector("div.content.attributions > cib-message-attributions");
      return result ? result.shadowRoot : null;
    }
  )
  const result_json = {
    questions,
    meta_texts,
    answer_body,
    answer_source,
  }

  // const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
  // const response = await chrome.tabs.sendMessage(tab.id, {result: result_json});
  // // do something with response here, not outside the function
  // console.log(response);
  //

  // html2canvas(main).then(function(canvas) {
  //   document.body.appendChild(canvas);
  // });
  // console.log(result_json)

  // debugger;
}


// chrome.action.onClicked.addListener((tab) => {
//   chrome.scripting.executeScript({
//     target : {tabId : tab.id},
//     func : injectedFunction,
//   });
// });
