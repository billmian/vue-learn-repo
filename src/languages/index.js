import English from "./en-US.json";
import Chinese from "./zh-CN.json";
import store from "../store";

const LANGUAGE = {
  cn: Chinese,
  en: English,
};

//获取当前的 localStorage 里面的 language
function getLocale() {
  let language =
    store.state.language || localStorage.getItem("language") || "cn";
  return language;
}
//重置 language
function setLocale(that, language) {
  localStorage.setItem("language", language);
  store.commit("MODIFY_LANGUAGE", language);
  that.$i18n.locale = language;
}

export default LANGUAGE;
export { getLocale, setLocale };
