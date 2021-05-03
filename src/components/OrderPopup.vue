<template>
  <popup v-model="computedPopupVisible" position="bottom">
    <div class="orderPopup-container">
      <div class="orderPopup-info">
        <div class="orderPopup-picture">
          <img :src="this.itemInfo.picture" style="width: 100%; height: 100%" />
        </div>
        <div class="orderPopup-info-content">
          <div class="orderPopup-name">
            <div>{{ productName }}</div>
            <div>{{ price }}¥/500g</div>
          </div>
          <div class="orderPopup-num">
            <div class="orderPopup-icon" @click="minusNum">-</div>
            <div style="color: #faad14">{{ productNum }}</div>
            <div class="orderPopup-icon" @click="addNum">+</div>
          </div>
        </div>
      </div>
      <div class="orderPopup-bottom">
        <div class="orderPopup-final-price">¥ {{ finalPrice }}</div>
        <div class="orderPopup-button">
          <div class="orderPopup-cancel">取消</div>
          <div class="orderPopup-confirm" @click="clickConfirm">确认</div>
        </div>
      </div>
    </div>
  </popup>
</template>
<script>
import { Toast, Popup } from "mint-ui";
import http from "@/http";
import store from "@/store";

export default {
  data() {
    return {
      productNum: 1,
    };
  },
  updated() {},
  props: ["popupVisible", "itemInfo", "changePopupVisible"],
  components: {
    popup: Popup,
  },
  computed: {
    finalPrice() {
      return this.itemInfo.price * this.productNum;
    },
    price() {
      return this.itemInfo.price;
    },
    productName() {
      return this.itemInfo.product_name;
    },
    computedPopupVisible: {
      get() {
        return this.popupVisible;
      },
      set(value) {
        this.changePopupVisible(value);
      },
    },
  },
  methods: {
    minusNum() {
      if (this.productNum > 0) {
        this.productNum--;
      }
    },
    addNum() {
      this.productNum++;
    },
    clickConfirm() {
      let date = new Date().valueOf();
      console.log("userInfo：", store.state);
      http
        .post("http://localhost:3000/Order/cgi/addOrder", {
          ...this.itemInfo,
          finalPrice: this.finalPrice,
          orderTime: date,
          uid: store.state.uid,
        })
        .then((res) => {
          Toast({
            message: "下订单成功",
            iconClass: "icon icon-success",
          });
        });
    },
  },
};
</script>
<style lang="less">
.orderPopup-container {
  padding: 10px;
  width: 100vw;
  .orderPopup-info {
    display: flex;
    .orderPopup-picture {
      width: 80px;
      margin-right: 10px;
    }
    .orderPopup-info-content {
      flex-grow: 1;
      display: flex;
      justify-content: space-between;

      .orderPopup-num {
        display: flex;
        .orderPopup-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          line-height: 20px;
          height: 20px;
          width: 20px;
          margin: 0 6px;
          border-radius: 4px;
          border: 1px solid black;
          box-sizing: border-box;
        }
      }
    }
  }

  .orderPopup-bottom {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #d9d9d9;
    display: flex;
    justify-content: space-between;
    .orderPopup-final-price {
      color: red;
      margin-left: 8px;
      display: flex;
      align-items: center;
    }
    .orderPopup-button {
      display: flex;
      .orderPopup-cancel {
        border-radius: 5px;
        margin-right: 4px;
        padding: 6px;
        // background-color: ;
      }
      .orderPopup-confirm {
        border-radius: 5px;
        margin-right: 4px;
        padding: 6px 8px;
        background-color: #ff7875;
      }
    }
  }
}
</style>