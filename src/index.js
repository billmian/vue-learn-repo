// index.js
// 需 npm i vue --save
import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "./style.css";

Vue.use(ElementUI);

new Vue({
  el: "#app",
  render: (h) => h(App),
});
