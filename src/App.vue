<template>
  <div>
    <button @click="flushUser('name')">名前</button>
    <button @click="flushUser('kana')">カナ</button>
    <button @click="flushUser('email')">email</button>
    <button @click="flushUser('birthday')">生年月日</button>
    <button @click="flushUser('pref')">都道府県</button>
    <button @click="flushUser('city')">都道府県+市</button>
    <button @click="flushUser('town')">都道府県*市+町</button>
    <button @click="flushUser('add1')">都道府県*市+町+丁目</button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
    };
  },
  methods: {
    flushUser: function(_userParam) {
      parent.postMessage(
        { pluginMessage: { type: "create-rectangles", params: _userParam } },
        "*"
      );
    }
  },
  created() {}
};
</script>
