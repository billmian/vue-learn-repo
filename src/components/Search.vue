<template>
  <div class="search-page-container">
    <div class="search-container">
      <div class="search-input-container">
        <myIcon imgClassName="icon-sousuo" size="18"></myIcon>
        <div class="dividing-line"></div>
        <input class="search-input" :placeholder="searchPlaceholder" v-model="inputData" v-focus />
        <div></div>
      </div>
      <div class="search-cancel" @click="clickCancel">{{$t('DAIMIAN_017')}}</div>
    </div>
    <div class="search-result" v-for="item in result" :key="item.id"></div>
  </div>
</template>
<script>
import { myIcon } from "@/components";
import http from "@/http";

function debounce(fn, delay) {
  let timeId = null;
  return () => {
    clearTimeout(timeId);
    timeId = setTimeout(() => {
      fn();
      timeId = null;
    }, delay);
  };
}

function getSearchResult(value) {
  http
    .post("/mock/search", {
      value,
    })
    .then((res) => {
      console.error("这里输出返回的结果：", res);
    });
}
const deGetResult = debounce(getSearchResult);

export default {
  data() {
    return {
      inputData: "",
      result: [],
    };
  },
  components: {
    myIcon,
  },
  watch: {
    inputData: function () {},
  },
  computed: {
    searchPlaceholder() {
      return this.$t("DAIMIAN_016");
    },
  },
  methods: {
    clickCancel() {
      this.inputData = "";
      this.$router.back(-1);
    },
  },
};
</script>
<style lang='less'>
.search-page-container {
  height: 100vh;
  width: 100vw;
  .search-container {
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: @MTyellow2;
    padding: 0 10px;
    box-sizing: border-box;
    .search-input-container {
      height: 30px;
      border-radius: 8px;
      background-color: @white;
      flex: 1;
      display: flex;
      align-items: center;
      padding: 0 8px;
      .dividing-line {
        position: relative;
        margin-left: 4px;
        margin-right: 4px;
        height: 15px;
        width: 1px;
        background-color: @gray1;
      }
      .search-input {
        border: 0px;
        flex-grow: 1;
      }
    }
    .search-cancel {
      width: 40px;
      height: 30px;
      padding-left: 10px;
      line-height: 30px;
      box-sizing: border-box;
      text-align: center;
      font-size: 14px;
    }
  }
}
</style>