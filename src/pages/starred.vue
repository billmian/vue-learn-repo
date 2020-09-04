<template>
  <div class="starred-page">
    <title-bar :title="starredTitle"></title-bar>
    <div class="starred-container">
      <div class="starred-block">
        <div class="block-left">
          <img
            src="http://p0.meituan.net/200.0/deal/8bdbad981a2beb71096bb0bec7ac5bd0103535.jpg@69_0_419_419a%7C267h_267w_2e_90Q"
            width="80px"
            height="80px"
          />
        </div>
        <div class="block-right">
          <div class="restaurant-name">玩好餐厅</div>
          <div class="restaurant-info">
            <div class="price">¥12/人</div>
            <div class="position">沙河校区桂园餐厅</div>
            <div class="enablePack">可以打包</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { titleBar } from "@/components";
import http from "@/http";

export default {
  data() {
    return {};
  },
  created() {},
  computed: {
    starredTitle() {
      return this.$t("DAIMIAN_031");
    },
  },
  components: {
    titleBar,
  },
  methods: {},
};
</script>
<style lang="less">
.starred-page {
  background-color: @MTBackgound;
}
.starred-container {
  width: 100%;
  margin-top: 10px;
  min-height: calc(100vh - 115px);
  background-color: @white;
  padding-bottom: 20px;
  box-sizing: border-box;
  .starred-block {
    padding: 10px 15px;
    border-bottom: 1px solid #ddd8ce;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    .block-right {
      flex-grow: 1;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      .restaurant-name {
        color: #333333;
        font-size: 17px;
        font-weight: 500;
      }
      .restaurant-info {
        color: #666666;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        line-height: 16px;
        .price {
        }
        .position {
        }
        .enablePack {
          margin-top: 5px;
          color: #6cbab2;
        }
      }
    }
  }
}
</style>