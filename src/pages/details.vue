<template>
  <div class="page">
    <title-bar :showBack="true" title="详情页"></title-bar>
    <div>123</div>
  </div>
</template>
<script>
import { titleBar } from "@/components";
export default {
  data() {
    return {};
  },
  components: {
    titleBar,
  },
  created() {
    console.error("这里输出路由的参数：", this.$route.params.id);
  },
  methods: {},
};
</script>
<style lang="less" scoped>
</style>