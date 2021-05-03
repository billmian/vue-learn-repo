<template>
  <div class="page">
    <title-bar :showBack="true" :title="details"></title-bar>
    <div class="details-content">
      <div class="details-picture">
        <img :src="itemInfo.picture" class="picture" />
      </div>
      <div class="details-price-button">
        <div class="details-name">
          <div class="name-content">{{ productName }}</div>
        </div>
        <div class="details-price">
          <div class="price-value">{{ priceValue }}</div>
          <div class="price-tag">元/500g</div>
        </div>
      </div>
      <div class="cart-button" @click="clickCart">加入购物车</div>
      <div class="details-button" @click="clickOrder">立即下单</div>
      <orderPopup
        :popupVisible="popupVisible"
        :itemInfo="getItemInfo"
        :changePopupVisible="changePopupVisible"
      ></orderPopup>
    </div>
  </div>
</template>
<script>
import { titleBar, orderPopup } from "@/components";
import store from "@/store";
import { Toast } from "mint-ui";
import http from "@/http";

export default {
  data() {
    return {
      popupVisible: false,
      itemInfo: {
        picture: "",
        priceValue: null,
      },
    };
  },
  computed: {
    getItemInfo() {
      console.log("this.itemInfo", this.itemInfo);
      return this.itemInfo;
    },
    details() {
      return this.$t("DAIMIAN_032");
    },
    productName() {
      return this.itemInfo.product_name;
    },

    priceValue() {
      if (this.itemInfo.price) {
        return this.itemInfo.price;
      } else {
        return null;
      }
    },
  },
  components: {
    titleBar,
    orderPopup,
  },
  created() {
    //这里从路由中取出参数，如果有后端支持的话，应该是根据 id 发送请求的
    const foodPid = this.$route.params.pid;
    http
      .post("http://localhost:3000/Food/cgi/getFoodInfo", {
        pid: foodPid,
      })
      .then((result) => {
        this.itemInfo = result.data.data;
        console.log("这里输出result:", this.itemInfo);
      });
  },
  methods: {
    changePopupVisible(value) {
      this.popupVisible = value;
    },
    clickCart() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let seconds = date.getSeconds();
      let orderTime = `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;
      store.commit("ADD_CART", { ...this.itemInfo, orderTime });
      Toast({
        message: "添加购物车成功",
        iconClass: "icon icon-success",
      });
    },
    //下订单
    clickOrder() {
      this.popupVisible = true;
      //store.commit("ADD_ORDER", { ...this.itemInfo, orderTime });
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
    height: 100%;
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
        color: #389e0d;
      }
      .price-tag {
        font-size: 14px;
        color: @gray1;
      }
    }
  }
}
.details-button {
  bottom: 6px;
  right: 5px;
  position: fixed;
  height: 40px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  color: @white;
  background: #ff7875;
}
.cart-button {
  bottom: 6px;
  right: 110px;
  position: fixed;
  height: 40px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  color: @white;
  background: @MTyellow;
}
.name-content {
  font-size: 20px;
}
</style>