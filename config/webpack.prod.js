const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const TerserJSPlugin = require("terser-webpack-plugin");
// const UglifyJSPlugin = require("uglifyjs-webpack-plugin");  //出现了bug，maxStack问题，因为uglifyJSPlugin是递归的
const common = require("./webpack.common.js");
const webpack = require("webpack");

module.exports = merge(common, {
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        cache: true, // 是否缓存
        parallel: true, // 是否并行打包
        sourceMap: true,
      }),
    ],
  },
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin(),
    // new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
  ],
});
