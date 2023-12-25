const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json", ".css"],
  },
  entry: "./src/index.ts", // 번들링 시작 위치
  output: {
    path: path.resolve(__dirname, "dist"), // 번들 결과물 위치
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /[\.js]$/, // .js 에 한하여 babel-loader를 이용하여 transpiling
        exclude: /node_modules/, // node_modules 내의 파일 제외
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // 기존의 index.html 파일 위치
      filename: "index.html", // 출력될 파일명
      inject: "body", // 번들을 body 태그 끝에 주입
    }),
    // ... (추가적인 플러그인 설정)
  ],

  devServer: {
    host: "localhost", // live-server host 및 port
    port: 5500,
  },
};
