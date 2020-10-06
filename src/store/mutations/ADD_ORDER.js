//添加订单
export default function(store, paramsObj) {
  if (Object.prototype.toString.call(paramsObj) !== "[object Object]") {
    console.error("ADD_ORDER mutation with error params");
    return null;
  }
  if (!Array.isArray(store.order)) {
    store.order = [paramsObj];
  } else {
    store.order.push(paramsObj);
  }
}
