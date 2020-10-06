<template>
  <div class="order-page">
    <title-bar :showBack="true" :title="orderTitle"></title-bar>
    <div class="order-list">
      <div
        v-for="(item, index) in orderList"
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
            <div class="order-position">{{ `位置：${item.position}` }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { titleBar } from "@/components";
import store from "@/store";

export default {
  data() {
    return {};
  },
  computed: {
    orderTitle() {
      return this.$t("DAIMIAN_033");
    },
    orderList() {
      return store.state.order || [];
    },
  },
  components: { titleBar },
  methods: {},
};
</script>
<style lang="less">
.order-page {
  background-color: #f4f4f4;
  min-height: calc(100vh - 55px);
}
.order-list {
  background-color: @white;
  margin-top: 10px;
}
.order-item-container {
  &.first-item {
    border-top: none;
  }
  display: flex;
  min-height: 70px;
  padding: 15px 14px;
  border-top: 0.5px solid rgb(204, 204, 204);
  .order-picture {
    margin-right: 6px;
    height: 40px;
    width: 40px;
    .picture {
      width: 100%;
      height: 100%;
    }
  }
  .order-content {
    .order-title {
      font-size: 18px;
    }
    .order-tag {
      color: #999;
      font-size: 13px;
      margin-top: 3px;
      .order-time {
      }
    }
  }
}
</style>