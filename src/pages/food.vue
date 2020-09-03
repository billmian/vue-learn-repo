<template>
  <div class="page-container">
    <fakeSearchBar></fakeSearchBar>
    <!-- 校区  食堂  -->
    <div class="condition-bar">
      <div class="select-campus">{{allCampus}}</div>
      <div class="select-canteen">{{allCanteen}}</div>
    </div>
    <!-- 这里应该是后端返回一个对象数组，对象中包含：{
        餐厅图片链接，
        所在餐厅名称和地址：
        店名，
        人均价格
        是否支持打包。
    }-->
    <div class="food-container">
      <div class="food-blocks" v-for="item in foodList" :key="item.id">
        <div class="food-item">
          <div class="item-left">
            <div class="food-picture">
              <img :src="item.picture" />
            </div>
          </div>
          <div class="item-right">
            <div class="restaurantName">{{item.restaurantName}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { fakeSearchBar } from "@/components";
import http from "@/http";

export default {
  name: "foodPage",
  data() {
    return {
      foodList: [],
    };
  },
  computed: {
    allCampus() {
      return this.$t("DAIMIAN_023");
    },
    allCanteen() {
      return this.$t("DAIMIAN_024");
    },
  },
  created() {
    console.error(this.foodList, this.nice);
    http
      .post("/mock/foods", {
        page: 1,
      })
      .then((res) => {
        if (res.data || res.data.length !== 0) {
          this.foodList = this.foodList.concat(res.data);
        }
      });
  },
  components: {
    fakeSearchBar,
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.page-container {
  min-height: calc(100vh - 55px);
  background-color: @MTBackgound;
  .condition-bar {
    background-color: @white;
    margin-top: 10px;
    height: 42px;
    width: 100%;
    display: flex;
    border-bottom: 1px solid #d8d8d8;
    .select-campus {
      color: #666;
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
      border-right: 1px solid @MTBackgound;
    }
    .select-canteen {
      color: #666;
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
    }
  }
  .food-container {
    .food-blocks {
      border-bottom: 1px solid #d8d8d8;
      .food-item {
        display: flex;
        padding: 10px 15px;
        background-color: @white;
        .item-left {
        }
        .item-right {
          margin-left: 8px;
          .restaurantName {
            font-size: 17px;
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style>