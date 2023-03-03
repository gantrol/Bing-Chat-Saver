import { Page } from "./bingPage";
import { domToJpeg, domToPng } from "modern-screenshot";
import { QasJSON2MarkdownParser } from "~utils/md/parser";
import { handleExportSetting } from "~utils/viewmodel";
import { exportTypes, exportWidthTemplateKeys, Messages } from "~utils/constants";
import type { Options } from "modern-screenshot/options";

const DEFAULT_WITDH = 0;

export class DownloadVisitor {
  static async forImage(func, type, way = "newTab", width = DEFAULT_WITDH) {

    const options: Options =
      {
        backgroundColor: "rgb(217, 230, 249)"
      };

    const callback = await DownloadVisitor.window_handler(width);

    // TODO: try to remove sleep...
    //  for now, it promise the windows is resized
    console.log("sleep 20ms");
    await (new Promise((resolve) => {
      setTimeout(resolve, 20);
    }));

    console.log("start to download");
    const main = Page.getMain();
    // 处理链接分行的问题
    Page.setFontWeightForAllRefs();
    const dataURL = await func(main, options);

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

    await callback();
  }

  static forPNG = async (width = DEFAULT_WITDH) => {
    await DownloadVisitor.forImage(domToPng, "png", "download", width);
  };

  static forJPG = async (width = DEFAULT_WITDH) => {
    await DownloadVisitor.forImage(domToJpeg, "jpeg", "download", width);
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

  static forDB = async () => {
    const qAsJSON = Page.getQAsJSON();
    const response = await chrome.runtime.sendMessage({
      type: Messages.SAVE_CHAT,
      body: qAsJSON
    });
    // do something with response here, not outside the function
    console.log(response);
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
    DownloadVisitor.forDB().catch(error => {
      console.log(error);
    });
    const resultJson = await handleExportSetting();
    if (resultJson) {
      for (let item of resultJson) {
        if (item.on) {
          let width = DEFAULT_WITDH;
          // TODO: width = item.width;
          if (item.size_template === exportWidthTemplateKeys.MOBILE) {
            width = 375;
          }
          const type = item.type;
          if (type === exportTypes.PNG) {
            await DownloadVisitor.forPNG(width);
          } else if (type === exportTypes.JPG) {
            await DownloadVisitor.forJPG(width);
          } else if (type === exportTypes.MD) {
            await DownloadVisitor.forMD();
          } else if (type === exportTypes.JSON) {
            await DownloadVisitor.forJSON();
          } else {
            throw Error(`Not type of ${type}`);
          }
        }
      }
    } else {
      // TODO: alert for setting?
      await DownloadVisitor.forPNG();
    }
  };

  static forPreview = async () => {
    DownloadVisitor.forDB().catch(error => {
      console.log(error);
    });
    DownloadVisitor.forImage(domToPng, "png").catch(error => {
      console.log(error);
    });
  };

  static window_handler = async (width) => {
    // TODO: set font size?
    if (width > 50) {
      let prev_window
      const size = await chrome.runtime.sendMessage({
        type: Messages.GET_WINDOW_SIZE
      });
      console.log(`GET window, Current STATE: ${size.state}`);
      console.log(size);
      if (size) {
        prev_window = {...size};
        // Uncaught (in promise) TypeError: Cannot set properties of undefined (setting 'width')
        size.width = width;
        size.state = 'normal';
        console.log(`Set to normal STATE: ${size.state}`)

        const response = await chrome.runtime.sendMessage({
          type: Messages.RESIZE_WINDOW,
          body: size
        });
        console.log(response)
        console.log(prev_window)
        // while check current window state
        let current_size;
        do {
          current_size = await chrome.runtime.sendMessage({
            type: Messages.GET_WINDOW_SIZE
          });
          console.log(`Current STATE: ${current_size.state}`)
        } while (current_size.state !== size.state)
        const callback = async () => {
          await chrome.runtime.sendMessage({
            type: Messages.RESIZE_WINDOW_2,
            body: prev_window
          }).catch((error) => {
            console.error(error);
          })
        }
        return callback
      } else {
        throw Error('Cannot get window size')
      }
    }
    return () => {};

  }

  static forDbAuto = () => {

  }
}
