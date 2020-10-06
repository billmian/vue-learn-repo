import store from "./store";

window.addEventListener("beforeunload", (event) => {
  event.preventDefault();
  console.error("这里unload了：");
  localStorage.setItem("userMsg", JSON.stringify(store.state));
  localStorage.setItem("orderInfo", JSON.stringify(store.state.order));
});

export default store;
