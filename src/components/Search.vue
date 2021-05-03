<template>
  <div class="search-page-container">
    <div class="search-container">
      <div class="search-input-container">
        <myIcon imgClassName="icon-sousuo" size="18"></myIcon>
        <div class="dividing-line"></div>
        <input
          class="search-input"
          :placeholder="searchPlaceholder"
          v-model="inputData"
          v-focus
          @input="onChange"
        />
        <div></div>
      </div>
      <div class="search-cancel" @click="clickCancel">
        {{ $t("DAIMIAN_017") }}
      </div>
    </div>
    <div
      class="search-result"
      v-for="(item, index) in searchResult"
      :key="index"
    >
      <div class="search-item" @click="clickSearchItem(item)">
        <myIcon imgClassName="icon-sousuo" size="18"></myIcon>
        <div class="search-text">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { myIcon } from "@/components";
import http from "@/http";

function debounce(fn, delay) {
  let timeId = null;
  return async (params, result) => {
    clearTimeout(timeId);
    timeId = setTimeout(async () => {
      result = await fn(params);
      timeId = null;
    }, delay);
  };
}

async function getSearchResult(value) {
  const result = await http.post("http://localhost:3000/Search/cgi/search", {
    params: value,
  });
  return result;
}
// const deGetResult = debounce(getSearchResult);

export default {
  data() {
    return {
      inputData: "",
      searchResult: [],
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
    clickSearchItem(item) {
      console.log("这里输出item:", item);
      this.$router.push({
        name: "details",
        params: {
          pid: item.pid,
        },
      });
    },
    clickCancel() {
      this.inputData = "";
      this.$router.back(-1);
    },
    async onChange() {
      const {
        data: { data },
      } = await getSearchResult(this.inputData);
      this.searchResult = data;
    },
  },
};
</script>
<style lang='less'>
.search-page-container {
  height: 100vh;
  width: 100vw;
  .search-container {
    height: 70px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #389e0d;
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
      color: white;
      height: 30px;
      padding-left: 10px;
      line-height: 30px;
      box-sizing: border-box;
      text-align: center;
      font-size: 14px;
    }
  }
}
.search-result {
  margin-top: 6px;
  .search-item {
    display: flex;
    font-size: 14px;
    padding: 4px 2px;
    .search-text {
      margin-left: 2px;
    }
  }
}
</style>