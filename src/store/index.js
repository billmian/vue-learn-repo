import store from "./store";

window.addEventListener("beforeunload", (event) => {
  event.preventDefault();
  localStorage.setItem("userMsg", JSON.stringify(store.state));
});

export default store;
