<template>
  <div class="starred-page">
    <title-bar :showBack="true" :title="starredTitle"></title-bar>
    <div class="starred-container">
      <div
        v-for="(item, index) in cartList"
        :key="index"
        class="order-item-container"
        :class="index === 0 ? 'first-item' : ''"
      >
        <div class="order-picture">
          <img :src="item.picture" class="picture" />
        </div>
        <div class="order-content">
          <div class="order-title">{{ item.restaurantName }}</div>
          <div class="order-tag">
            <div class="order-time">{{ `下单时间：${item.orderTime}` }}</div>
            <div class="order-price">{{ `价格：${item.price}` }}</div>
            <div class="order-position">{{ "收货信息：默认地址" }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { titleBar } from "@/components";
import http from "@/http";
import store from "@/store";
export default {
  data() {
    return {};
  },
  created() {},
  computed: {
    starredTitle() {
      return this.$t("DAIMIAN_031");
    },
    cartList() {
      return store.state.cart || [];
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