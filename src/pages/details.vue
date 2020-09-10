<template>
  <div class="page">
    <title-bar :showBack="true" :title="details"><div>456</div></title-bar>
    <div>123</div>
  </div>
</template>
<script>
import { titleBar } from "@/components";
export default {
  data() {
    return {};
  },
  computed: {
    details() {
      return this.$t("DAIMIAN_032");
    },
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