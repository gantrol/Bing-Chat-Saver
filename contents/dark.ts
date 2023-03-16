import type { PlasmoCSConfig } from "plasmo";

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

