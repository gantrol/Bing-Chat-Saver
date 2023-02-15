# Bing Chat Saver

[![cn](https://img.shields.io/badge/看我-中文-red.svg)](README.zh_CN.md)

> Note: alpha developing

## Feature

This edge extension adds a Button for exporting Bing Chat Content as: 

- PNG

And it removes the welcome message.

## Usage

Click Button below feedback button at right bottom of the chat UI.

![buttons](https://user-images.githubusercontent.com/31330732/218730012-7a7a7f0d-1762-4d9c-b9b9-d6cb05f21382.png)

Current result:

![demo](assets/demo.png)

> As you can see, some ref is not rendered correctly now. It might be issue for `modern-screenshot`. However, this package is the best one.

## Download

- Go to release, download `.zip` and load unpacked at `edge://extensions/` . As the bing saying, you can reference [this acticle](https://dev.to/ben/how-to-install-chrome-extensions-manually-from-github-1612#:~:text=How%20to%20install%20Chrome%20extensions%20manually%20from%20GitHub,navivigate%20to%20the%20folder%20you%20downloaded%20from%20GitHub)
- Edge store download is coming soon.

## Main TODO

1. export as Markdown, JSON
2. reload chat with JSON
3. auto cache the history session

Others: [bing-search-saver broad](https://github.com/users/gantrol/projects/5)

## Dev
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
