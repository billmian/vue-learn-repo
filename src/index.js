import Vue from "vue";
import App from "./App";
import MintUI from "mint-ui";
import Router from "vue-router";
import VueI18n from "vue-i18n";
import VueCookies from "vue-cookies";

import "mint-ui/lib/style.css";
import "./style.css";
import "./mock";

import {
  login,
  home,
  search,
  food,
  profile,
  starred,
  order,
  details,
} from "@/pages";

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

// 注册一个全局自定义指令 `v-focus`
Vue.directive("focus", {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el) {
    // 聚焦元素
    el.focus();
  },
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
      name: "details",
      path: "/details/:id",
      component: details,
    },
    {
      path: "/home",
      component: home,
      children: [
        // 当/home 匹配成功， food 会被默认选人
        { path: "", component: food },
        {
          // 当 /home/food 匹配成功，
          //  food 会被渲染在 home 的 <router-view> 中
          path: "food",
          component: food,
        },
        {
          path: "profile",
          component: profile,
        },
        {
          path: "starred",
          component: starred,
        },
        {
          path: "order",
          component: order,
        },
      ],
    },
    {
      path: "/",
      component: login,
    },
    {
      path: "/search",
      component: search,
    },
    {
      // 当没有匹配到正确路由的时候，匹配notOpen组件
      path: "*",
      component: login,
      meta: {
        footShow: false, // true显示，false隐藏
      },
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
