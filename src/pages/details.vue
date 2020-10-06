<template>
  <div class="page">
    <title-bar :showBack="true" :title="details"></title-bar>
    <div class="details-content">
      <div class="details-picture">
        <img :src="itemInfo.picture" class="picture" />
      </div>
      <div class="details-price-button">
        <div class="details-price">
          <div class="price-value">{{ priceValue }}</div>
          <div class="price-tag">元/人</div>
        </div>
        <div class="details-button" @click="clickOrder">立即下单</div>
      </div>
    </div>
  </div>
</template>
<script>
import { titleBar } from "@/components";
import store from "@/store";

export default {
  data() {
    return {
      itemInfo: undefined,
    };
  },
  computed: {
    details() {
      return this.$t("DAIMIAN_032");
    },
    priceValue() {
      if (this.itemInfo.price) {
        return this.itemInfo.price.match(/\d+/g)[0];
      } else {
        return this.itemInfo.price;
      }
    },
  },
  components: {
    titleBar,
  },
  created() {
    //这里从路由中取出参数，如果有后端支持的话，应该是根据 id 发送请求的
    this.itemInfo = this.$route.params.item;
    console.log(this.itemInfo);
  },
  methods: {
    //下订单
    clickOrder() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let seconds = date.getSeconds();
      let orderTime = `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;
      store.commit("ADD_ORDER", { ...this.itemInfo, orderTime });
    },
  },
};
</script>
<style lang="less" scoped>
.details-picture {
  width: 100vw;
  height: 200px;
  overflow: hidden;
  .picture {
    width: 100%;
    height: 120%;
  }
}
.details-content {
  .details-price-button {
    width: 100vw;
    height: 65px;
    padding: 14px 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 0.5px solid #ddd8ce;
    .details-price {
      align-items: baseline;
      display: flex;
      .price-value {
        margin-right: 4px;
        font-size: 28px;
        color: @MTyellow;
      }
      .price-tag {
        font-size: 14px;
        color: @gray1;
      }
    }
    .details-button {
      height: 40px;
      width: 130px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      color: @white;
      background: @MTyellow;
    }
  }
}
</style>