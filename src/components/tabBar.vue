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
      <mt-tab-item id="profile">
        <div class="icon-container">
          <my-icon imgClassName="icon-wode" size="24"></my-icon>
        </div>
        {{ $t("DAIMIAN_011") }}
      </mt-tab-item>
    </mt-tabbar>
    <div class="tabBar-placeholder">{{ selectedPage }}</div>
  </div>
</template>
<script>
import { myIcon } from "@/components";

export default {
  data() {
    return {
      lastSelected: this.$store.state.selected || "food",
      selected: this.$store.state.selected || "food",
    };
  },
  components: {
    myIcon,
  },
  computed: {
    selectedPage() {
      return this.$store.state.selected;
    },
  },
  watch: {
    selectedPage(newValue) {
      this.selected = newValue;
      this.lastSelected = newValue;
    },
  },
  updated() {
    // 但是这样写只能监听到直接点击 tabBar，无法监听 返回
    if (this.selected !== this.lastSelected) {
      this.$router.push({
        path: `/home/${this.selected}`,
      });
      this.$store.commit("SELECTED_PAGE", this.selected);
      this.lastSelected = this.selected;
    }
  },
  created() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.mint-tabbar > .mint-tab-item.is-selected {
  color: #389e0d;
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