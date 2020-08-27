<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <home></home>
  </div>
</template>

<script>
import home from "@/pages/home";

export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js",
    };
  },
  components: {
    home,
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.msg = "123";
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