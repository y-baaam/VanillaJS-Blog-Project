const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map", // 또는 프로덕션 환경에 맞게 조정
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
});
