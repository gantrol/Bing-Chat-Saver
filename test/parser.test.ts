import { describe, expect, it } from "@jest/globals";
import { QasJSON2MarkdownParser } from "~uitls/md/parser";


// TODO: read a file instead
const simpleDemoJSON = [
  {
    "answers": [{ "text": "Hello", "html": "<p>Hello</p>" }, { "text": "Hello", "html": "<p>Hello</p>" }]
  }, {
    "questions": [{ "text": "What date is it today?" }],
    "answers": [{
      "text": "Hello, this is Bing. Today is Wednesday, February 15, 2023.",
      "html": "<p>Hello, this is Bing. Today is Wednesday, February 15, 2023.</p>"
    }]
  }, {
    "questions": [{ "text": "狗" }],
    "answers": [
      {
        "meta": [
          "正在搜索: 狗\n",
          "正在搜索: 狗的品种\n",
          "正在搜索: 狗\n",
          "正在搜索: 狗的好处\n",
          "正在为你生成答案…\n"
        ],
        "text": "狗是一种很可爱的动物，养狗有很多好处。比如，养狗可以增加安全感1，降低血压2，缓解压力3，增加运动量2，还可以培养孩子的责任心和爱心4。你是不是也想养一只狗狗呢？\n",
        "html": "<p><a class=\"tooltip-target\" data-citationid=\"a4c09bbd-5612-c5a2-dde3-70b1a3d94132-2-group\" h=\"ID=SERP,5025.1\">狗是一种很可爱的动物，养狗有很多好处。比如，养狗可以增加安全感</a><a href=\"https://new.qq.com/rain/a/20220704A075RT00\" class=\"ac-anchor sup-target\" target=\"_blank\" data-citationid=\"a4c09bbd-5612-c5a2-dde3-70b1a3d94132-2\" aria-label=\"养狗的5大好处！看完你心动了吗？_腾讯新闻\" h=\"ID=SERP,5025.1\"><sup>1</sup></a><a class=\"tooltip-target\" data-citationid=\"a4c09bbd-5612-c5a2-dde3-70b1a3d94132-4-group\" h=\"ID=SERP,5025.1\">，降低血压</a><a href=\"https://bing.com/search?q=%E7%8B%97%E7%9A%84%E5%A5%BD%E5%A4%84\" class=\"ac-anchor sup-target\" target=\"_blank\" data-citationid=\"a4c09bbd-5612-c5a2-dde3-70b1a3d94132-4\" aria-label=\"为什么要养狗 告诉你养狗的十大好处\" h=\"ID=SERP,5025.1\"><sup>2</sup></a><a class=\"tooltip-target\" data-citationid=\"a4c09bbd-5612-c5a2-dde3-70b1a3d94132-6-group\" h=\"ID=SERP,5025.1\">，缓解压力</a><a href=\"https://www.sohu.com/a/551303121_121146720\" class=\"ac-anchor sup-target\" target=\"_blank\" data-citationid=\"a4c09bbd-5612-c5a2-dde3-70b1a3d94132-6\" aria-label=\"养狗的“4个好处”和“6个坏处”，看完你还想养狗吗 ...\" h=\"ID=SERP,5025.1\"><sup>3</sup></a><a class=\"tooltip-target\" data-citationid=\"a4c09bbd-5612-c5a2-dde3-70b1a3d94132-8-group\" h=\"ID=SERP,5025.1\">，增加运动量</a><a href=\"https://bing.com/search?q=%E7%8B%97%E7%9A%84%E5%A5%BD%E5%A4%84\" class=\"ac-anchor sup-target\" target=\"_blank\" data-citationid=\"a4c09bbd-5612-c5a2-dde3-70b1a3d94132-8\" aria-label=\"为什么要养狗 告诉你养狗的十大好处\" h=\"ID=SERP,5025.1\"><sup>2</sup></a><a class=\"tooltip-target\" data-citationid=\"a4c09bbd-5612-c5a2-dde3-70b1a3d94132-10-group\" h=\"ID=SERP,5025.1\">，还可以培养孩子的责任心和爱心</a><a href=\"https://zhidao.baidu.com/question/1868024386629848747.html\" class=\"ac-anchor sup-target\" target=\"_blank\" data-citationid=\"a4c09bbd-5612-c5a2-dde3-70b1a3d94132-10\" aria-label=\"给孩子养狗狗的好处_百度知道\" h=\"ID=SERP,5025.1\"><sup>4</sup></a>。你是不是也想养一只狗狗呢？</p>\n",
        "refs": [
          {
            "index": "1",
            "title": "养狗的5大好处！看完你心动了吗？_腾讯新闻",
            "href": "https://new.qq.com/rain/a/20220704A075RT00"
          },
          {
            "index": "2",
            "title": "为什么要养狗 告诉你养狗的十大好处",
            "href": "https://bing.com/search?q=%e7%8b%97%e7%9a%84%e5%a5%bd%e5%a4%84"
          },
          {
            "index": "3",
            "title": "养狗的“4个好处”和“6个坏处”，看完你还想养狗吗 ...",
            "href": "https://www.sohu.com/a/551303121_121146720"
          },
          {
            "index": "4",
            "title": "给孩子养狗狗的好处_百度知道",
            "href": "https://zhidao.baidu.com/question/1868024386629848747.html"
          }
        ]
      }
    ]
  }, {
    "questions": [{ "text": "Goodbye" }, { "text": "Bye" }]
  }
];

const qasp = new QasJSON2MarkdownParser(simpleDemoJSON);

describe("test simple json", () => {
  it("answer", () => {
    expect(qasp.answer(simpleDemoJSON[0].answers[0])).toBe("Bing: Hello");
  });
  it("answers", () => {
    expect(qasp.answers(simpleDemoJSON[0].answers)).toBe("Bing: Hello\n\nBing: Hello");
    expect(qasp.answers(undefined)).toBe("");
  });
  it("questions", () => {
    expect(qasp.questions(
      simpleDemoJSON[simpleDemoJSON.length - 1].questions))
      .toBe("Q: Goodbye\n\nQ: Bye");
    expect(qasp.questions(undefined)).toBe("");
  });
  it("turn", () => {
    expect(qasp.turn(simpleDemoJSON[1]))
      .toBe(
        "Q: What date is it today?\n\n" +
        "Bing: Hello, this is Bing. Today is Wednesday, February 15, 2023.");
  });
  it("turns", () => {
    // TODO: read a file to match
    console.log(qasp.turns(simpleDemoJSON));
  });
});
