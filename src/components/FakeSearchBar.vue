<template>
  <div>
    <div class="fake-title-bar">
      <div class="fake-title-bar-container">
        <div class="fake-search-container" @click="clickSearch">
          <my-icon imgClassName="icon-sousuo" size="18"></my-icon>
          <div class="search-food">搜索美食</div>
        </div>
      </div>
    </div>
    <div class="fake-title-bar-placeholder"></div>
  </div>
</template>
<script>
import store from "@/store";
import { myIcon } from "@/components";

export default {
  data() {
    return {};
  },
  components: {
    myIcon,
  },
  computed: {},
  methods: {
    clickSearch() {
      this.$router.push({
        path: "/search",
      });
    },
  },
};
</script>
<style lang="less" scoped>
.fake-title-bar {
  height: 50px;
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  padding: 0 15px;
  box-sizing: border-box;
  background-color: @MTyellow2;
  .fake-title-bar-container {
    height: 30px;
    position: relative;
    margin: 10px 0;
    display: flex;
    justify-content: center;
    .fake-search-container {
      height: 30px;
      flex-grow: 1;
      margin-left: 10px;
      background-color: @white;
      border-radius: 8px;
      display: flex;
      align-items: center;
      padding-left: 6px;
      .search-food {
        color: @gray1;
        font-size: 12px;
        padding-left: 5px;
      }
    }
  }
}

.campus {
  padding-right: 6px;
  position: relative;
  font-size: 14px;
  font-weight: bold;
  line-height: 30px;
  font-family: "Microsoft YaHei", Arial, Helvetica, sans-serif, "宋体";
  .selected-container {
    height: 30px;
    width: 54px;
  }
  &.towardTop {
    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 12px;
      right: 4px;
      border-top: 2px solid #000;
      border-left: 2px solid #000;
      transform: rotate(45deg);
      width: 6px;
      height: 6px;
    }
  }
  &.towardBottom {
    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 8px;
      right: 4px;
      border-bottom: 2px solid #000;
      border-right: 2px solid #000;
      transform: rotate(45deg);
      width: 6px;
      height: 6px;
    }
  }
  .select-campus {
    line-height: 20px;
  }
}
.fake-title-bar-placeholder {
  height: 50px;
  width: 100%;
}
</style>