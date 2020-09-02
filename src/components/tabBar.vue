<template>
  <div>
    <mt-tabbar class="tabbar-container" v-model="selected">
      <mt-tab-item id="food">
        <div class="icon-container">
          <my-icon imgClassName="icon-meishi-cai" size="24"></my-icon>
        </div>
        {{ $t("DAIMIAN_008") }}
      </mt-tab-item>
      <mt-tab-item id="starred">
        <div class="icon-container">
          <my-icon imgClassName="icon-shoucang-cai" size="24"></my-icon>
        </div>
        {{ $t("DAIMIAN_009") }}
      </mt-tab-item>
      <mt-tab-item id="order">
        <div class="icon-container">
          <my-icon imgClassName="icon-dingdan" size="24"></my-icon>
        </div>
        {{ $t("DAIMIAN_010") }}
      </mt-tab-item>
      <mt-tab-item id="me">
        <div class="icon-container">
          <my-icon imgClassName="icon-wode" size="24"></my-icon>
        </div>
        {{ $t("DAIMIAN_011") }}
      </mt-tab-item>
    </mt-tabbar>
    <div class="tabBar-placeholder"></div>
  </div>
</template>
<script>
import { myIcon } from "@/components";

export default {
  data() {
    return {
      selected: "food",
    };
  },
  components: {
    myIcon,
  },
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
  updated() {},
  created() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.mint-tabbar > .mint-tab-item.is-selected {
  color: @gold6;
  background-color: @white;
}
.mint-tabbar {
  background-color: @white;
  background-image: unset;
  border-radius: 5px;
}
.tabbar-container {
  position: fixed;
  bottom: 0px;
  .icon-container {
    width: 24px;
    height: 24px;
    margin: 0 auto 5px;
  }
}
.tabBar-placeholder {
  height: 55px;
  width: 100%;
}
</style>