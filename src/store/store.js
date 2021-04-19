import requireFiles from "@/libs";
import Vue from "vue";
import Vuex from "vuex";

const context = require.context("./mutations", false, /\.js$/);
const mutations = requireFiles(context);
const userMsg = localStorage.getItem("userMsg") || null;
let storeObj = {
  state: {
    campus: "Shahe",
    language: "cn",
    orderInfo:
      localStorage.getItem("orderInfo") &&
      JSON.parse(localStorage.getItem("orderInfo")),
    ...JSON.parse(userMsg),
  },
  mutations,
};

Vue.use(Vuex);
const store = new Vuex.Store(storeObj);

export default store;
