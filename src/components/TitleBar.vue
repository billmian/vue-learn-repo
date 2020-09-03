<template>
  <mt-header class="header" :title="title">
    <router-link to="/" slot="left" v-if="showBack">
      <mt-button icon="back">{{ $t("DAIMIAN_012") }}</mt-button>
    </router-link>
    <!-- <mt-button icon="more" slot="right"></mt-button> -->
  </mt-header>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    showBack: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    back() {
      return this.$t("DAIMIAN_012");
    },
  },
  methods: {},
};
</script>
<style lang='less' scoped>
.mint-header {
  height: 50px;
  font-size: 16px;
  background-color: @MTyellow2;
  color: @black;
}
</style>