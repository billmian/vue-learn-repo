export default function(store, paramsObj) {
  Object.keys(paramsObj).forEach((key) => {
    store[key] = paramsObj[key];
  });
}
