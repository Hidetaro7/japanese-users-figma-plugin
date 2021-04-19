<template>
  <div class="app-inner">

    <div class="tab">
      <button class="button" :class="{'is-active': modeAll===false}" @click="modeAll=false">テキストごと</button>
      <button class="button" :class="{'is-active': modeAll===true}" @click="modeAll=true">フレームごと</button>
    </div>

    <div class="single-exchange container" v-if="!modeAll">
      <p>テキストを選択（複数可）後、いずれかのボタンを選んでください</p>
      <div class="single-buttons">
        <button class="button"  @click="flushUserSingle('name')">名前</button>
        <button class="button"  @click="flushUserSingle('kana')">カナ</button>
        <button class="button"  @click="flushUserSingle('email')">email</button>
        <button class="button"  @click="flushUserSingle('birthday')">生年月日</button>
        <button class="button"  @click="flushUserSingle('pref')">都道府県</button>
        <button class="button"  @click="flushUserSingle('city')">都道府県+市</button>
        <button class="button"  @click="flushUserSingle('town')">都道府県*市+町</button>
        <button class="button"  @click="flushUserSingle('add1')">都道府県*市+町+丁目</button>
      </div>
      
    </div>

    <div class="all-exchange container" v-if="modeAll">
      <div class="content">
        <div class="title">複数のフレーム・インスタンスをまとめて一括で変換</div>

        <p><small>この準備をしましょう！</small></p>
        <img class="capture" src="./capture.gif" alt="">
        <table class="data-example">
          <tr><th class="head">目的のラベル</th><td class="head">説明</td></tr>
          <tr><th>名前</th><td>ダミーの氏名</td></tr>
          <tr><th>ふりがな</th><td>名前のひらがな表記</td></tr>
          <tr><th>住所</th><td>（例）愛媛県西予市宇和町下川4</td></tr>
          <tr><th>都道府県名</th><td>（例）三重県</td></tr>
          <tr><th>都市名</th><td>（例）熊本県熊本市中央区</td></tr>
          <tr><th>email</th><td>メールアドレス</td></tr>
          <tr><th>自己紹介</th><td>自己紹介文（文字数ランダム）</td></tr>
        </table>

        <p class="intro">選択したフレームやインスタンス内のテキストをユーザープロフィールに置き換えます。<br>
        必ず、変換したいテキストにはあらかじめ <b>目的のラベル</b> を入れてください。</p>

      </div>

      <div class="coution">
        <div class="title">うまくできませんか？</div>
        <p>うまく変換できないときは以下のことをチェックしてみてください</p>
        <ul>
          <li>変換したいテキストは<b>Frame</b>もしくはコンポーネントからコピーされた<b>インスタンス</b>の中に含まれている必要があります</li>
          <li><b>コンポーネント本体は無視</b>されます、インスタンスを選択してください</li>
          <li>直接テキストを選択しても変換されません、親要素のフレームかインスタンスを選択して変換ボタンを押してください</li>
        </ul>
      </div>

      <div class="excute-auto-exchange">
        <p style="margin-top: 0;">フレームまたはインスタンスを選択してください</p>
        <button class="button" @click="flushUser">変換！！</button>
      </div>
    </div>

    <div class="hidden">
      <img ref="faceImages" class="face-images" src="./images/ookawa.webp" alt="ookawa">
    </div>
    
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding-top: 60px;
}
.tab {
  position: fixed;
  width: 100vw;
  height: 60px;
  left: 0;
  top: 0;
  background-color: rgba(#fff, .95);
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .button {
    background-color: #fff;
    min-width: initial;
    color: #999;
    margin: 0 1rem;
    position: relative;
    &::after {
      position: absolute;
      bottom: -2px;
      left: 0;
      content: "";
      width: 0%;
      display: block;
      height: 2px;
      background-color: #444;
      border-radius: 4px;
      transition: .3s;
    }
    &.is-active {
      color: #000;
      font-weight: bold;
      &::after {
        width: 100%;
      }
    }
    &:active {
      background-color: transparent;
    }
  }
}
.button {
  cursor: pointer;
  outline: none;
  border-radius: 8px;
  appearance: none;
  padding: 0.4rem .8rem;
  display: inline-flex;
  justify-content: center;
  border: none;
  background-color: rgb(216, 22, 22);
  color: white;
  align-items: center;
  font-size: 100%;
  min-width: 300px;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    background-color: rgb(196, 20, 20);
  }
}
.title {
  font-weight: bold;
  margin-bottom: 1rem;
}
.intro {
  font-size: 80%;
}
.capture {
  width: 100%;
  margin-bottom: 1rem;
}
.data-example {
  border-collapse: collapse;
  width: 100%;
  th, td {
  border-bottom: 1px solid #eee;
  padding: 0.4rem 1rem;
  font-size: 80%;
  margin: 1rem 0;
  }
  .head {
    background-color: #eeeeee;
    font-size: x-small;
  }
}
.coution {
  background-color: rgb(245, 245, 240);
  padding: 1rem;
  border-radius: 1.4rem;
  margin: 1rem 0;
  font-size: 0.7em;
}
.app-inner {
  padding: 1rem 1rem 140px;
  font-family: sans-serif;
}
.excute-auto-exchange {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(#fff, .95);
  border-top: 1px solid #ccc;
}
.single-buttons {
  .button {
    width: 80%;
    display: block;
    text-align: left;
    margin: auto;
    background-color: #fff;
    border: 1px solid #ccc;
    color: #000;
    margin-bottom: 0.2rem;
    &:hover {
      background-color: #eee;
    }
    &:active {
      background-color: #ccc;
    }
  }
}
</style>

<script>
import "tailwindcss/tailwind.css";
export default {
  name: "App",
  data() {
    return {
      modeAll: false
    };
  },
  methods: {
    flushUser: function() {
      //画像を生成
      const image = this.$refs.faceImages;
      const imageSize = {w: image.clientWidth, h: image.clientHeight}
      const canvas = document.createElement("canvas");
      canvas.width = imageSize.w;
      canvas.height = imageSize.h;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0,0 );
      const imageData = ctx.getImageData(0, 0, image.width, image.height);
      parent.postMessage(
        { pluginMessage: { type: "auto-exchange", params: "_userParam", faceImages: imageData } },
        "*"
      );
    },
    flushUserSingle(_param) {
      parent.postMessage(
        { pluginMessage: { type: "single-exchange", params: _param } },
        "*"
      );
    }
  },
  created() {
    onmessage = (event) => {
      console.log("got this from the plugin code", event.data.pluginMessage)
    }
  }
};
</script>
