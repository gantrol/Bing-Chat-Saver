import type { PlasmoCSConfig } from "plasmo";
import { DownloadVisitor } from "~utils/visitor";
import { domToJpeg, domToPng } from "modern-screenshot";

export const config: PlasmoCSConfig = {
  matches: ["*://yiyan.baidu.com/*"],
  all_frames: true
}


const t = function () {
  console.log("T");
  function removeWatermark() {
    const watermark = document.getElementById('eb-watermark');
    if (watermark) {
      watermark.remove();
      console.log('Watermark removed.');
    }
  }

  function observeDOM(targetNode, callback) {
    const config = {
      attributes: true,
      childList: true,
      subtree: true
    };

    const observer = new MutationObserver((mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          callback();
        }
      }
    });

    observer.observe(targetNode, config);
  }

  removeWatermark();
  observeDOM(document.body, removeWatermark);
}

t();

const newConvButtonGroup = document.querySelector("#root > div > div.N_eugr4S > div > div.x8oakxJk > div > span")

const newConvButton = document.querySelector("#root > div > div.N_eugr4S > div > div.x8oakxJk > div > span > span")

const DEFAULT_WITDH = 0;

class DarkDownloadVisitor {
  static async forImage(func, type, way = "newTab", width = DEFAULT_WITDH) {

    const options =
      {
        backgroundColor: "rgb(217, 230, 249)"
      };


    await (new Promise((resolve) => {
      setTimeout(resolve, 20);
    }));

    console.log("start to download");
    const main = <HTMLElement>document.querySelector("div.dialogueCardListContent > div");

    console.log(main);
    const dataURL = await func(main, options);
    console.log(dataURL);
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
      console.log("end");
    }
  }

  static forPNG = async (width = DEFAULT_WITDH) => {
    await this.forImage(domToPng, "png", "download", width);
  };

  static forJPG = async (width = DEFAULT_WITDH) => {
    await this.forImage(domToJpeg, "jpeg", "download", width);
  };
}


const button = document.createElement('button');
button.innerHTML = 'PNG';
// set the button style
button.style.position = 'fixed';
button.style.bottom = '20px';
button.style.right = '20px';
button.style.zIndex = '9999';
button.style.alignItems = 'center';
button.style.background = '#efebef';
button.style.borderRadius = '6px';
button.style.color = '#4955f5';
button.style.display = 'flex';
button.style.fontFamily = 'PingFangSC-Medium';
button.style.fontSize = '16px';
button.style.fontWeight = '500';
button.style.height = '40px';
button.style.justifyContent = 'center';
button.style.letterSpacing = '0';
button.style.lineHeight = '20px';
button.style.userSelect = 'none';
button.style.width = '120px';
button.onclick = () => DarkDownloadVisitor.forPNG();
document.body.appendChild(button);
