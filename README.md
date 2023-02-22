# Bing Chat Saver

[![cn](https://img.shields.io/badge/看我-中文-blue.svg?style=for-the-badge&logo=appveyor)](README.zh_CN.md)
[![install-chrome](https://img.shields.io/badge/Chrome-install-critical.svg?style=for-the-badge&logo=appveyor)](https://chrome.google.com/webstore/detail/bing-chat-saver/ficbllnhlgldegblbimkeldcdhfjppkg?hl=en)
[![谷歌安装](https://img.shields.io/badge/谷歌-安装-critical.svg?style=for-the-badge&logo=appveyor)](https://chrome.google.com/webstore/detail/bing-chat-saver/ficbllnhlgldegblbimkeldcdhfjppkg?hl=zh-CN)

## Feature

This edge extension adds a Button for exporting Bing Chat Content as: 

- PNG
- JPG
- JSON
- Markdown

And it removes the welcome message.

## Usage

Click Buttons below feedback button at right bottom of the chat UI.

![buttons](assets/demo_buttons.png)

Current result:

![demo](assets/demo.png)

## Download

- [Chrome Store](https://chrome.google.com/webstore/detail/bing-chat-saver/ficbllnhlgldegblbimkeldcdhfjppkg?hl=en) for stable version.
- Go to release for latest version, download `.zip` and load unpacked at `edge://extensions/` . As the bing saying, you can reference [this acticle](https://dev.to/ben/how-to-install-chrome-extensions-manually-from-github-1612#:~:text=How%20to%20install%20Chrome%20extensions%20manually%20from%20GitHub,navivigate%20to%20the%20folder%20you%20downloaded%20from%20GitHub)
- Edge store download is coming soon.

## Main TODO

1. reload chat with JSON
3. auto cache the history session

Others: [bing-search-saver broad](https://github.com/users/gantrol/projects/5)

## Dev

> Plasmo default document below, other develop infomation at [manual](./docs/manual.md)

This is a [Plasmo extension](https://docs.plasmo.com/) project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).

### Getting Started

First, make sure to replace `type="ts"` with `lang="ts"` in your Svelte components.

Second, run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. To add an options page, simply add a `options.tsx` file to the root of the project, with a react component default exported. Likewise to add a content page, add a `content.ts` file to the root of the project, importing some module and do some logic, then reload the extension on your browser.

For further guidance, [visit our Documentation](https://docs.plasmo.com/)

### Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.

### Submit to the webstores

The easiest way to deploy your Plasmo extension is to use the built-in [bpp](https://bpp.browser.market) GitHub action. Prior to using this action however, make sure to build your extension and upload the first version to the store to establish the basic credentials. Then, simply follow [this setup instruction](https://docs.plasmo.com/framework/workflows/submit) and you should be on your way for automated submission!
