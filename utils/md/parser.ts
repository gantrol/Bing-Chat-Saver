import { getNowWithFormat } from "~utils/time";

export {};


import TurndownService from "turndown";


export class QasJSON2MarkdownParser {
  private qas: any;
  private toMD: TurndownService;
  private sep = "\n\n";
  private quesPrefix = "> ";
  private ansPrefix = "";

  constructor(qasJson) {
    // https://github.com/mixmark-io/turndown/blob/master/README.md
    this.toMD = new TurndownService({
      headingStyle: "atx",
      hr: "---",
      bulletListMarker: "-",
      codeBlockStyle: "indented",
      fence: "```",
      emDelimiter: "*",
    });
    this.qas = qasJson;
  }

  md() {
    return this.turns(this.qas);
  }

  turns(objs) {
    const turn_md_list = objs.map(obj => this.turn(obj));
    const formatNow = getNowWithFormat();
    const sections = turn_md_list;
    // const sections = [];
    // for (let i = 0; i < turn_md_list.length; i++) {
    //   sections.push(
    //     `## ${i + 1}${this.sep}${turn_md_list[i]}`
    //   );
    // }
    // TODO: modified title
    const title = `Bing Chat at ${formatNow}`;
    return [`# ${title}${this.sep}${sections.join(this.sep)}`, title];
  }

  turn(obj) {
    const ques_md = this.questions(obj.questions);
    const ans_md = this.answers(obj.answers);
    let result;
    if (ques_md) {
      result = ques_md;
    } else {
      result = "";
    }

    // TODO: keep meta
    //  Add to discuss
    if (ans_md) {
      if (result) {
        return `${result}${this.sep}${ans_md}`;
      } else {
        return ans_md;
      }
    } else {
      return result;
    }
    // TODO: get a list of ref?
    //  Add to discuss
  }

  answers(objs) {
    if (objs) {
      const answers_list = objs?.map(obj => this.answer(obj));
      return answers_list.join(this.sep);
    } else {
      return "";
    }
  }

  // {"body": "Hello", "html": "<p>Hello</p>"} => Hello
  answer(obj) {
    return `${this.ansPrefix}${this.toMD.turndown(obj.html)}`;
  }

  questions(objs) {
    if (objs) {
      const question_list = objs.map(obj => {
        return `${obj.text.split('\n').map(line => `${this.quesPrefix} ${line}`).join('\n')}`;
      });
      return question_list.join(this.sep);
    } else {
      return "";
    }
  }
}
