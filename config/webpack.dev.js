const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  devtool: "inline-source-map",
  devServer: {
    hot: true, //启动 hmr(hot module replacement)
    contentBase: "./dist",//devServer里面的contentBase表示的是告诉服务器从哪里提供内容。（只有想提供静态文件时才需要）
    historyApiFallback: true, //historyApiFallback设置为true那么所有的路径都执行index.html。
    overlay: true, // 将错误显示在html之上
  },
});
