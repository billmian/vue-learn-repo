<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import home from "@/pages/home";
import axios from "axios"; // 引入axios

export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    home,
  },
  created() {},
  mounted() {
    //这里监听浏览器刷新，刷新前将订单信息和star信息存入 localStorage
    // window.addEventListener("beforeunload", (e) => {
    //   this.$store.state.order &&
    //     localStorage.setItem(
    //       "orderInfo",
    //       JSON.stringify(this.$store.state.order)
    //     );
    // });
  },
  methods: {},
};
</script>

<style>
</style>