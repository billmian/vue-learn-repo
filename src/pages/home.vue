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
      console.log("🚀 ~ file: home.vue ~ line 24 ~ beforeRouteUpdate ~ selectedPage", selectedPage)
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