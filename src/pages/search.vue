<template>
  <search></search>
</template>

<script>
import { tabbar, search } from "@/components";

export default {
  name: "homePage",
  components: {
    // tabbar,
    search,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="less"  >
.mint-searchbar {
  background-color: @MTyellow;
}
</style>