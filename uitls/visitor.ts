import { QAList, Page } from "./bingPage";
import { domToJpeg, domToPng } from "modern-screenshot";

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

  };

  static forJSON = () => {

  };
}
