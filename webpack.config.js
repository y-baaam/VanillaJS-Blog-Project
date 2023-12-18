const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // 기존의 index.html 파일 위치
      filename: "index.html", // 출력될 파일명
      inject: "body", // 번들을 body 태그 끝에 주입
    }),
    // ... (추가적인 플러그인 설정)
  ],

  module: {
    rules: [
      {
        test: /\.js$/, // .js 파일에 대한 설정
        exclude: /node_modules/, // node_modules 내의 파일 제외
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"], // ES6 및 JSX를 일반 JavaScript로 변환
          },
        },
      },
    ],
  },
};
