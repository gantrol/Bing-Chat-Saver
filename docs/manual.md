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
- tips (ignore for now)

## transform

### JSON example

#### plain text version

```json
{
    "QAs":[
        {
            "answers": [{"body": "Hello"}]
        }, {
            "questions": [{"body": "What date is it today?"}],
            "answers": [{
              "body": "Hello, this is Bing. Today is Wednesday, February 15, 2023.",
              "html": "..."
            }]
        }, {
            "questions": [{"body": "What's the weather like today?"}],
            "answers": [{
              "meta": [
                "Searching for: weather",
                "Searching for: user location",
                "Generating answers for you…"
              ],
              "body": "I’m sorry, I don’t know your location 1. The weather depends on where you are. You can try searching for the weather in your city or country. 2",
              "html": "...",
              "refs": [
                {
                  "index": 1,
                  "title": "Bing Weather",
                  "link": "https://bing.com/search?q=weather"
                }, {
                  "index": 2,
                  "title": "accuweather",
                  "link": "https://www.accuweather.com/en/de/nuremberg/90402/weather-forecast/167559"
                }
              ]
            }]
        }, {
            "questions": [{"body": "Goodbye"}]
        }
    ]
}
```

### Markdown example

> should render by html in json for keeping links
> 
> 多个links好像不好处理

```markdown
# Bing Chat at ${YYYY-MM-DD}

## 1
Bing: Hello

## 2

Q: What date is it today?

Bing: Hello, this is Bing. Today is Wednesday, February 15, 2023.

## 3

Q: What's the weather like today?

> Searching for: weather
> 
> Searching for: user location
> 
> Generating answers for you…

Bing: I’m sorry, I don’t know your location [^1]. The weather depends on where you are. You can try searching for the weather in your city or country. [^2]

## Ref

[^1]: https://bing.com/search?q=weather 	"Bing Weather"
[^2]: https://www.accuweather.com/en/de/nuremberg/90402/weather-forecast/167559	"accuweather"

```



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

## chat

store a chat-like record in browser

indexedDB

### structure

- user
  - id
  - chats
    - chat1
      - id
      - name
      - chat-content-json
    - chat2

### user id

#### set by user(by hand...)

create a uuid, a user name

#### others

> edge cannot use, ref: [api-support](https://github.com/MicrosoftDocs/edge-developer/blob/main/microsoft-edge/extensions-chromium/developer-guide/api-support.md)

- chrome.identity.getProfileUserInfo
- chrome.identity


### chat id 

generator a uuid

### chat name

first chat question of chat json

## Request

### fake Edge

User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.50

### fake not mainland

X-Forwarded-For: 1.36.5.8

## Library

### Library Examples



### Library Documents

[Introduction to Plasmo – Plasmo](https://docs.plasmo.com/)

[qq15725/modern-screenshot: 📸 Fast generates an image from a DOM node using HTML5 canvas and SVG. (github.com)](https://github.com/qq15725/modern-screenshot)

[bubkoo/html-to-image: ✂️ Generates an image from a DOM node using HTML5 canvas and SVG. (github.com)](https://github.com/bubkoo/html-to-image)

https://github.com/mixmark-io/turndown/


