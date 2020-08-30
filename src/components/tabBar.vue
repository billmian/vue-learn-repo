<template>
  <mt-tabbar v-model="selected">
    <mt-tab-item id="food">
      <img slot="icon" src="../assets/100x100.png" />
      {{ $t("DAIMIAN_008") }}
    </mt-tab-item>
    <mt-tab-item id="collect">
      <img slot="icon" src="../assets/100x100.png" />
      {{ $t("DAIMIAN_009") }}
    </mt-tab-item>
    <mt-tab-item id="order">
      <img slot="icon" src="../assets/100x100.png" />
      {{ $t("DAIMIAN_010") }}
    </mt-tab-item>
    <mt-tab-item id="me">
      <img slot="icon" src="../assets/100x100.png" />
      {{ $t("DAIMIAN_011") }}
    </mt-tab-item>
  </mt-tabbar>
</template>
<script>
export default {
  data() {},
  computed: {
    food() {
      return this.$t("DAIMIAN_008");
    },
    collect() {
      return this.$t("DAIMIAN_009");
    },
    order() {
      return this.$t("DAIMIAN_010");
    },
    me() {
      return this.$t("DAIMIAN_011");
    },
  },
  created() {},
  methods: {},
};
</script>
<style lang="less" scoped>
</style>