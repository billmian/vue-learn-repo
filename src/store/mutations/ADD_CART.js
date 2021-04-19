//添加购物车
export default function(store, paramsObj) {
  if (Object.prototype.toString.call(paramsObj) !== "[object Object]") {
    console.error("ADD_ORDER mutation with error params");
    return null;
  }
  if (!Array.isArray(store.cart)) {
    store.cart = [paramsObj];
  } else {
    store.cart.push(paramsObj);
  }
}
