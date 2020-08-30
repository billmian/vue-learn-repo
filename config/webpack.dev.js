const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

//https://juejin.im/post/6844903686632636423

module.exports = merge(common, {
  devtool: "inline-source-map",
  devServer: {
    hot: true, //启动 hmr(hot module replacement)
    contentBase: path.resolve(__dirname, "../dist"), //不设置的话，默认是当前执行的目录，一般是项目根目录。会在项目根目录查找index.html文件。
    historyApiFallback: true, //historyApiFallback设置为true那么所有的路径都执行index.html。
    overlay: true, // 将错误显示在html之上
    publicPath: "/", //可以看出devServer里面的publicPath表示的是打包生成的静态文件所在的位置
  },
});
