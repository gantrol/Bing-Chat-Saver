import { getNowWithFormat } from "~utils/time";

export {};


import TurndownService from "turndown";
import { genTitle } from "~utils/filename";


/**
 * MarkdownParser for Question and answer JSON
 */
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
    let partOfFirstQuestion = "";
    if (sections.length > 0 && sections[0] && sections[0].length > this.quesPrefix.length) {
      partOfFirstQuestion = sections[0].substring(this.quesPrefix.length).trim();
      partOfFirstQuestion = `${genTitle(partOfFirstQuestion)}...`;
    }
    const title = `Bing_${partOfFirstQuestion}${formatNow}`;
    return [`# ${partOfFirstQuestion}${this.sep}${sections.join(this.sep)}`, title];
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
  // {"body": "Hello", "html": "<p>Hello</p>", "ref": [...]} => Hello
  answer(obj) {
    const body = `${this.ansPrefix}${this.toMD.turndown(obj.html)}`;
    const refs = obj.refs;
    if (refs && refs.length > 0) {
      const refs_md = refs.map((ref, index) => {
        return `${index + 1}. [${ref.title}](${ref.href})`;
      }).join("\n");
      const refsText = refs_md;
      return `${body}${this.sep}${refsText}`
    } else {
      return body;
    }
  }

  questions(objs) {
    if (objs) {
      const question_list = objs.map(obj => {
        return `${obj.text.split('\n').map(line => `${this.quesPrefix}${line}`).join('\n')}`;
      });
      return question_list.join(this.sep);
    } else {
      return "";
    }
  }
}
