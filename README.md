# Japanese Users for Figma

![cover-japaneseusers](https://user-images.githubusercontent.com/281424/108389563-22679d80-7253-11eb-8225-c236e589977b.png)

ダミーの日本人ユーザーリストを手早く作成できるFigmaプラグイン

![Plugin icon - 1](https://user-images.githubusercontent.com/281424/108389585-272c5180-7253-11eb-88e2-cef723f28fe3.png)

This demonstrates:

- bundling plugin code using Webpack, and
- using Vue.

The main plugin code is in `src/code.ts`. The HTML for the UI is in
`src/ui.html`, while the embedded JavaScript is in `src/ui.js` and the Vue script is in `src/App.vue`.

These are compiled to files in `build/`, which are what Figma will use to run
your plugin as set in the `manifest.json`.

To build:

    $ npm install
    $ npx webpack

n 11.14.0

    $ yarn watch

[webpack]: ../webpack/
