<template>
  <div>
    <router-view></router-view>
    <tabbar></tabbar>
  </div>
</template>

<script>
import { tabbar, titleBar, search, fakeSearchBar } from "@/components";
import store from "@/store";
export default {
  name: "homePage",
  components: {
    tabbar,
    titleBar,
    fakeSearchBar,
  },
  data() {
    return {};
  },
  beforeRouteUpdate(to, from, next) {
    if (/\/home\/[^\/]+$/.test(to.path)) {
      let selectedPage = to.path.match(/\/home\/([^\/]+)$/)[1];
      store.commit("SELECTED_PAGE", selectedPage);
    }
    next();
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