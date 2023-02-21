import { Page } from "./bingPage";
import { domToJpeg, domToPng } from "modern-screenshot";
import { QasJSON2MarkdownParser } from "~utils/md/parser";
import { handleExportSetting } from "~utils/viewmodel";
import { exportTypes } from "~utils/constants";

export class DownloadVisitor {
  static async forImage(func, type, way = "newTab") {
    const main = Page.getMain();
    // 处理链接分行的问题
    Page.setFontWeightForAllRefs();
    const dataURL = await func(main, {
      backgroundColor: "rgb(217, 230, 249)",
      // filter: (node: HTMLElement) => {
      //   return node.tagName?.toLowerCase() !== 'cib-welcome-container';
      // }
    });

    if (way === "newTab") {
      requestAnimationFrame(() => {
        const binaryData = atob(dataURL.split("base64,")[1]);
        const data = [];
        for (let i = 0; i < binaryData.length; i++) {
          data.push(binaryData.charCodeAt(i));
        }
        const blob = new Blob(
          [new Uint8Array(data)],
          { type: `image/${type}` });
        const url = URL.createObjectURL(blob);

        window.open(url, "_blank");
      });
    } else {
      const link = document.createElement("a");
      link.download = `my-image-name.${type}`;
      link.href = dataURL;
      link.click();
      link.remove();
    }
  }

  static forPNG = async () => {
    await DownloadVisitor.forImage(domToPng, "png", "download");
  };

  static forJPG = async () => {
    await DownloadVisitor.forImage(domToJpeg, "jpeg", "download");
  };

  static forMD = () => {
    // TODO: 可以将下载重构
    const jsonResult = Page.getQAsJSON();
    const qasp = new QasJSON2MarkdownParser(jsonResult);
    const [md, title] = qasp.md();
    const dataStr = "data:text/md;charset=utf-8," + encodeURIComponent(md);
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${title}.md`);
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  static forJSON = () => {
    const result = Page.getQAsJSON();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    const timestamp = Date.now().toString();
    downloadAnchorNode.setAttribute("download", `bing-chat-${timestamp}.json`);
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };
  /**
   * demo input :
   *    [
   *         {
   *             "id": 1,
   *             "on": true,
   *             "size": 300,
   *             "type": "PNG导出"
   *         },
   *         {
   *             "id": 2,
   *             "on": false,
   *             "size": 300,
   *             "type": "JPG"
   *         },
   *         {
   *             "id": 3,
   *             "on": false,
   *             "size": 300,
   *             "type": "Markdown"
   *         },
   *         {
   *             "id": 4,
   *             "on": false,
   *             "size": 300,
   *             "type": "JSON"
   *         }
   *    ]
   */
  static forAll = async () => {
    const resultJson = await handleExportSetting();
    for (let item of resultJson) {
      if (item.on) {
        const type = item.type;
        if (type === exportTypes.PNG) {
          await DownloadVisitor.forPNG();
        } else if (type === exportTypes.JPG) {
          await DownloadVisitor.forJPG();
        } else if (type === exportTypes.MD) {
          await DownloadVisitor.forMD();
        } else if (type === exportTypes.JSON) {
          await DownloadVisitor.forJSON();
        } else {
          throw Error(`Not type of ${type}`);
        }
      }
    }
  };

  static forPreview = async () => {
    await DownloadVisitor.forImage(domToPng, "png");
  };
}
