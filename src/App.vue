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
  mounted() {},
  methods: {},
};
</script>

<style>
</style>