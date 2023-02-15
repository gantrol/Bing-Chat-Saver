# Develop Manuals

## Bing Page Structure

- search(dafault tab)
- chat
  - Welcome
  - Q&A list
    - A ?
      - welcome tips
    - Q & A
      - Q
      - A
    - Q Q & A
      - network problem
        - handle with Q + Q & A
    - Q & A A
      - unknown problem
      - 
    - Q ?
      - export at sending question
  - feedback

### A

- meta-text
- body
- learn more
- tips

### JSON example

#### plain text version

```json
{
    "QAs":[
        {
            "A": [{"body": "Hello"}]
        }, {
            "Q": [{"body": "What date is it today?"}],
            "A": [{"body": "Hello, this is Bing. Today is Wednesday, February 15, 2023."}]
        }, {
            "Q": [{"body": "What date is it today?"}],
            "A": [{
              "meta": [
                "Searching for: weather",
                "Searching for: user location",
                "Generating answers for you…"
              ],
              "body": "I’m sorry, I don’t know your location 0. The weather depends on where you are. You can try searching for the weather in your city or country. 1",
              "refs": [
                {
                  "index": 0,
                  "link": "https://bing.com/search?q=weather"
                }, {
                  "index": 1,
                  "link": "https://www.accuweather.com/en/de/nuremberg/90402/weather-forecast/167559"
                }
              ]
            }]
        }, {
            "Q": [{"body": "Goodbye"}]
        }
    ]
}
```

#### html version?

for A, add a html field

### feedback

```html
#fdbkDialogContainer {
  display: block;
  box-sizing: content-box;
  position: fixed;
  left: initial;
  top: initial;
  right: 0;
  bottom: 0;
  z-index: 1000002;
  box-shadow: 0 4px 16px rgba(0,0,0,.2);
  border-radius: 6px 6px 0 0;
  background-color: #fff;
}
```

```css
#fbpgdg {
    display: block;
    box-sizing: content-box;
    padding: 0 20px 0 20px;
    width: 320px;
    max-width: 100%;
    max-height: 100%;
    line-height: 20px;
    font-size: 14px;
    color: #444;
    overflow: auto;
}
```

## Library

### Library Examples



### Library Documents

[Introduction to Plasmo – Plasmo](https://docs.plasmo.com/)

[qq15725/modern-screenshot: 📸 Fast generates an image from a DOM node using HTML5 canvas and SVG. (github.com)](https://github.com/qq15725/modern-screenshot)

[bubkoo/html-to-image: ✂️ Generates an image from a DOM node using HTML5 canvas and SVG. (github.com)](https://github.com/bubkoo/html-to-image)
