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
            <div class="order-time">
              {{ `下单时间：${formatTimeStamp(item.order_time)}` }}
            </div>
            <div class="order-price">{{ `价格：${item.price}` }}</div>
            <div class="order-position">{{ `收货信息：默认地址` }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { titleBar } from "@/components";
import store from "@/store";
import http from "@/http";
import { formatTime } from "@/libs";

export default {
  data() {
    return {
      orderList: [],
    };
  },
  computed: {
    orderTitle() {
      return this.$t("DAIMIAN_033");
    },
  },
  created() {
    console.log("这里输出uid:", store.state);
    http
      .post("http://localhost:3000/Order/cgi/getOrderList", {
        uid: store.state.uid,
      })
      .then((res) => {
        console.log("这里输出订单List:", res.data);
        this.orderList = res.data;
      });
  },
  components: { titleBar },
  methods: {
    formatTimeStamp(timeStamp) {
      return formatTime(Number(timeStamp));
    },
  },
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