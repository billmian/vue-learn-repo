<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <el-input v-model="msg" placeholder="请输入内容"></el-input>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.msg = "这个是home页面";
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
h1 {
  color: #cc3333;
}
</style>