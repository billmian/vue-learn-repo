import requireFiles from "@/libs";
import Vue from "vue";
import Vuex from "vuex";

const context = require.context("./mutations", false, /\.js$/);
const mutations = requireFiles(context);

//这里为了刷新页面时防止清空 vuex
let storeObj = {
  state: {
    campus: "Shahe",
    language: "cn",
    orderInfo: JSON.parse(localStorage.getItem("orderInfo")),
    ...JSON.parse(localStorage.getItem("userMsg")),
  },
  mutations,
};

Vue.use(Vuex);
const store = new Vuex.Store(storeObj);

export default store;
