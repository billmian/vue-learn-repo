import Vue from "vue";
import App from "./App";
import MintUI from "mint-ui";
import Router from "vue-router";
import VueI18n from "vue-i18n";
import VueCookies from "vue-cookies";
import "mint-ui/lib/style.css";
import "./style.css";
import "./mock";

import login from "@/pages/login";
import home from "@/pages/home";

import language, { getLocale } from "@/languages";
import store from "./store";

Vue.use(VueCookies);
Vue.use(MintUI);
Vue.use(Router);
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: getLocale(), // 设置语言 
  fallbackLocale: "cn",
  messages: language, //多语内容
});

const router = new Router({
  // 指定路由选中时的样式类名
  linkActiveClass: "active",
  hashbang: false, // 将路径格式化为#!开头
  history: true, // 启用HTML5 history模式，可以使用pushState和replaceState来管理记录
  routes: [
    {
      path: "/login",
      component: login,
    },
    {
      path: "/home",
      component: home,
    },
    {
      path: "/",
      component: login,
    },
  ],
});
new Vue({
  el: "#app",
  router, //路由
  i18n, //多语
  store, //状态管理
  render: (h) => h(App),
});
