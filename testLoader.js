const loaderUtils = require("loader-utils");

module.exports = function(source) {
  console.log("这里mdloader输出内容：", typeof source, source);
  const options = loaderUtils.getOptions(this);

  // 对资源应用一些转换……
  return source;
};
