const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
      "@comp": path.resolve(__dirname, "../src/components"),
      "@views": path.resolve(__dirname, "../src/views"),
    },
  },
  devServer: {
    // historyApiFallback: SPA에서 클라이언트 사이드 라우팅을 위해 필요한 설정입니다.
    // 이 설정은 새로고침이나 직접 URL 입력 시 404 오류 대신 index.html을 제공하여
    // JavaScript가 클라이언트 사이드에서 라우트를 처리할 수 있게 해줍니다.
    historyApiFallback: true,
    static: [
      {
        directory: path.join(__dirname, "../public"),
      },
      {
        directory: path.join(__dirname, "../public/content/posts"),
      },
    ],
    port: 8080,
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].bundle.js",
  },
});
