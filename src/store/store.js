import requireFiles from "@/libs";
import Vue from "vue";
import Vuex from "vuex";

const context = require.context("./mutations", false, /\.js$/);
const mutations = requireFiles(context);

let storeObj = {
  state: {
    campus: "Shahe",
    language: "cn",
  },
  mutations,
};

Vue.use(Vuex);
const store = new Vuex.Store(storeObj);
localStorage.getItem("userMsg") &&
  store.replaceState(
    Object.assign(store.state, JSON.parse(localStorage.getItem("userMsg")))
  );

export default store;
