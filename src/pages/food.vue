<template>
  <div class="page-container">
    <fakeSearchBar></fakeSearchBar>
    <!-- 校区  食堂  -->
    <div class="condition-bar" :class="fixConditionBar ? 'fixed' : ''">
      <div class="select-campus" @click="clickOpenCampus">
        <div :class="openCampus ? 'selectedCampus' : ''">{{ allCampus }}</div>
        <myIcon
          class="arrow-icon"
          :imgClassName="arrowTarget1"
          size="14"
        ></myIcon>
      </div>
      <div class="select-canteen" @click="clickOpenCanteen">
        <div :class="openCanteen ? 'selectedCanteen' : ''">
          {{ allCanteen }}
        </div>
        <myIcon
          class="arrow-icon"
          :imgClassName="arrowTarget2"
          size="14"
        ></myIcon>
      </div>
    </div>
    <div class="condition-bar-placeholder" v-if="fixConditionBar"></div>
    <div
      class="select-popup"
      :class="fixConditionBar ? 'towardsTop' : ''"
      v-if="openCampus || openCanteen"
      @click="clickMask"
    >
      <div class="select-popup-block" @click="clickItem($event)">
        <!-- 生成校区列表 -->
        <div class="popup-left">
          <div
            class="select-item"
            v-for="(item, index) in campus"
            :class="index === selectedCampus ? 'selectedCampus' : ''"
            :key="item"
            @click="clickCampus(index)"
          >
            {{ item }}
          </div>
        </div>
        <div class="popup-right">
          <!-- 生成餐厅列表 -->
          <div
            class="select-item"
            v-for="(item, index) in canteen"
            :class="index === selectedCanteen ? 'selectedCanteen' : ''"
            :key="item"
            @click="clickCanteen(index)"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
    <!-- 这里应该是后端返回一个对象数组，对象中包含：{
        餐厅图片链接，
        所在餐厅名称和地址：
        店名，
        人均价格
        是否支持打包。
        "DAIMIAN_014": "清水河",
        "DAIMIAN_015": "沙河",
    }-->
    <div class="food-container">
      <div
        class="food-blocks"
        v-for="item in foodList"
        :key="item.pid"
        @click="goToFoodPage(item)"
      >
        <div class="food-item">
          <div class="item-left">
            <div class="food-picture">
              <img :src="item.picture" width="80px" height="80px" />
            </div>
          </div>
          <div class="item-right">
            <div class="restaurantName">{{ item.restaurant_name }}</div>
            <div class="restaurantInfo">
              <div class="price">{{ item.price }}元/500g</div>
              <!-- <div class="position">{{ item.position }}</div> -->
              <div class="enablePack">
                {{ item.enablePack ? "支持零售" : "支持批发" }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { fakeSearchBar, myIcon } from "@/components";
import http from "@/http";
import store from "@/store";

export default {
  name: "foodPage",
  data() {
    return {
      foodList: [],
      page: 1,
      openCampus: false,
      openCanteen: false,
      fixConditionBar: false,
      //0表示所有，1表示清水河，2表示沙河
      selectedCampus: 0,
      selectedCanteen: 0,
      //缓存上一次选中的 campus 和 canteen。用来比较每次选择校区和餐厅时，如果没更改，不更新列表
      cacheCampus: 0,
      cacheCanteen: 0,
    };
  },
  computed: {
    campus() {
      return [
        this.$t("DAIMIAN_023"),
        this.$t("DAIMIAN_014"),
        this.$t("DAIMIAN_015"),
        this.$t("DAIMIAN_036"),
        this.$t("DAIMIAN_037"),
      ];
    },
    canteen() {
      //如果换校区的话，这边的数组会变。这样的话原本的 index 就可能不对了，应该每次换校区把 index 置为 0
      if (this.selectedCampus === 0) {
        return [
          this.$t("DAIMIAN_024"),
          this.$t("DAIMIAN_025"),
          this.$t("DAIMIAN_026"),
          this.$t("DAIMIAN_027"),
          this.$t("DAIMIAN_028"),
          this.$t("DAIMIAN_029"),
          this.$t("DAIMIAN_030"),
        ];
      } else if (this.selectedCampus === 1) {
        return [
          this.$t("DAIMIAN_024"),
          this.$t("DAIMIAN_025"),
          this.$t("DAIMIAN_026"),
          this.$t("DAIMIAN_027"),
        ];
      } else {
        return [
          this.$t("DAIMIAN_024"),
          this.$t("DAIMIAN_028"),
          this.$t("DAIMIAN_029"),
          this.$t("DAIMIAN_030"),
        ];
      }
    },
    allCampus() {
      return this.campus[this.selectedCampus];
    },
    allCanteen() {
      return this.canteen[this.selectedCanteen];
    },
    arrowTarget1() {
      return this.openCampus
        ? "icon-jiantou-copy-copy-copy"
        : "icon-jiantou-copy-copy";
    },
    arrowTarget2() {
      return this.openCanteen
        ? "icon-jiantou-copy-copy-copy"
        : "icon-jiantou-copy-copy";
    },
  },
  created() {
    this.getRestaurantList(
      this.page,
      this.selectedCampus,
      this.selectedCanteen
    );
  },
  components: {
    myIcon,
    fakeSearchBar,
  },
  mounted() {
    addEventListener("scroll", this.handleScroll()); //监听函数
  },
  methods: {
    goToFoodPage(item) {
      this.$router.push({
        name: "details",
        params: {
          pid: item.pid,
        },
      });
    },
    clickItem(e) {
      if (e) {
        e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
      }
    },
    closeCondition() {
      //这里设置reset为true，表示不再将返回的列表拼接原本的列表，而是直接创建新的
      if (
        this.cacheCampus !== this.selectedCampus ||
        this.cacheCanteen !== this.selectedCanteen
      ) {
        this.getRestaurantList(
          this.page,
          this.selectedCampus,
          this.selectedCanteen,
          true
        );
        this.cacheCampus = this.selectedCampus;
        this.cacheCanteen = this.selectedCanteen;
      }
      this.openCampus = false;
      this.openCanteen = false;
    },
    clickMask() {
      //点击幕布不更新列表内容
      this.closeCondition();
    },
    clickCampus(index) {
      console.log("这里点击了campus：", index);
      if (index !== this.selectedCampus) {
        this.selectedCampus = index;
        this.selectedCanteen = 0;
      }
    },
    clickCanteen(index) {
      if (index !== this.selectedCanteen) {
        this.selectedCanteen = index;
      }
    },
    clickOpenCampus() {
      if (this.openCampus || this.openCanteen) {
        this.closeCondition();
      } else {
        this.openCampus = !this.openCampus;
      }
    },
    clickOpenCanteen() {
      if (this.openCampus || this.openCanteen) {
        this.closeCondition();
      } else {
        this.openCanteen = !this.openCanteen;
      }
    },
    //用来发送请求获取店铺
    getRestaurantList(page, selectedCampus, selectedCanteen, checkReset) {
      selectedCampus = selectedCampus || 0;
      selectedCanteen = selectedCanteen || 0;
      checkReset = checkReset || false;
      http
        .post("http://localhost:3000/Food/cgi/getFoodList", {
          page,
          campus: selectedCampus,
          canteen: selectedCanteen,
        })
        .then((res) => {
          if (res.data || res.data.length !== 0) {
            if (checkReset) {
              this.foodList = res.data;
            } else {
              this.foodList = this.foodList.concat(res.data);
            }
          }
        });
      this.page++;
    },
    handleScroll() {
      // 用一个变量来debounce
      let enableGetBottom = true;
      return () => {
        let scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        let windowHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        let scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight;
        if (scrollTop >= 10) {
          this.fixConditionBar = true;
        } else {
          this.fixConditionBar = false;
        }
        if (scrollTop + windowHeight === scrollHeight && enableGetBottom) {
          this.getRestaurantList(
            this.page,
            this.selectedCampus,
            this.selectedCanteen
          );
          enableGetBottom = false;
          setTimeout(() => {
            enableGetBottom = true;
          }, 50);
        }
      };
    },
  },
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
    &.fixed {
      position: fixed;
      top: 60px;
    }
    .select-campus {
      color: #666;
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50%;
      border-right: 1px solid @MTBackgound;
      .arrow-icon {
        margin-left: 6px;
      }
    }
    .select-canteen {
      color: #666;
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50%;
      .arrow-icon {
        margin-left: 6px;
      }
    }
  }
  .condition-bar-placeholder {
    height: 53px;
    width: 100%;
  }
  //弹出的popup，用于选择 campus 和 canteen
  .select-popup {
    position: fixed;
    width: 100%;
    top: 113px;
    height: calc(100vh - 93px);
    background-color: @MaskColor;
    z-index: 99;
    &.towardsTop {
      top: 103px;
    }
    .select-popup-block {
      width: 100%;
      background-color: @white;
      display: flex;
      font-size: 14px;
      .select-item {
        margin: 4px 0;
        width: 100%;
        text-align: center;
      }
      .popup-left {
        padding: 10px 0;
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 50%;
        border-right: 1px solid #f4f4f4;
      }
      .popup-right {
        padding: 10px 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        width: 50%;
        border-right: 1px solid #f4f4f4;
      }
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
          display: flex;
          flex-direction: column;
          margin-left: 8px;
          margin-top: 4px;
          .restaurantName {
            color: #333333;
            font-size: 17px;
            font-weight: 500;
          }
          .restaurantInfo {
            color: #666666;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            line-height: 16px;
            .enablePack {
              margin-top: 22px;
              color: rgb(108, 186, 178);
            }
          }
        }
      }
    }
  }
}
.selectedCampus {
  color: #06c1ae;
}
.selectedCanteen {
  color: #06c1ae;
}
</style>