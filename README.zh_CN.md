# 必应聊天分享与保存

## 功能

通过添加相关按钮，这个插件添加可以将聊天记录导出，目前支持的格式为：

- PNG

> 注意：为了避免欢迎页占用过多篇幅，这个插件直接移除了欢迎页面，后续将考虑作为选项。

## 下载

- 去[releases页面](https://github.com/gantrol/Bing-Chat-Saver/releases/), 下载 `.zip`并到 `edge://extensions/`加载插件。正如下文结果示意图必应所说，你可就着浏览器翻译功能，参考[这篇文章](https://www.howtogeek.com/510543/how-to-install-and-use-extensions-in-the-new-microsoft-edge/)
- Edge商城的下载正待审核

## 用法

安装插件后，在与必应聊天的界面（非搜索侧边栏），右下角原先只有反馈按钮，会增加相应导出按钮。如PNG即为导出为PNG。

![1676378602296](https://user-images.githubusercontent.com/31330732/218741972-65e4d64a-35a7-4c7e-83fd-1a9720afbd66.png)

现阶段结果示例（可导出长图）：

![image](assets/demo_cn.png)

> 目前引用部分的导出仍有部分问题，这可能是依赖包 `modern-screenshot`的缺陷。而这已经是个人能找到最好的依赖包了，后续会先查明原因，实在不行就另行实现。

## 接下来的主要 TODO

1. 导出格式添加JSON、Markdown
2. 通过导入 JSON，“重新加载”对话
3. 自动缓存历史对话列表

Others are placed in [todo.md](todo.md)

## 开发

> 以下是`Plasmo`库的文档。后续有空再调整为中文。

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
