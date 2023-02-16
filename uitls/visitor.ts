import { Page } from "./bingPage";
import { domToJpeg, domToPng } from "modern-screenshot";
import { QasJSON2MarkdownParser } from "~uitls/md/parser";

export class DownloadVisitor {
  static async forImage(func, type, way = "newTab") {
    const main = Page.getMain();

    // 处理链接分行的问题
    Page.setFontWeightForAllRefs();

    const dataURL = await func(main, {
      backgroundColor: "rgb(217, 230, 249)"
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
    await DownloadVisitor.forImage(domToPng, "png");
  };

  static forJPG = async () => {
    await DownloadVisitor.forImage(domToJpeg, "jpeg");
  };

  static forMD = () => {
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
}
