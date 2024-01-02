const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  resolve: {
    extensions: [".ts", ".js", ".json", ".css"],
  },
  entry: path.resolve(__dirname, "../src/index.ts"), // 번들링 시작 위치

  plugins: [
    new HtmlWebpackPlugin({
      title: "Production",
      template: path.resolve(__dirname, "../public/index.html"), // 기존의 index.html 파일 위치
      filename: "index.html", // 출력될 파일명
      inject: "body", // 번들을 body 태그 끝에 주입
    }),
    new CssMinimizerPlugin(),
    // new MiniCssExtractPlugin(),
  ],
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
      // {
      //   test: /\.css$/i,
      //   use: [MiniCssExtractPlugin.loader, "css-loader"],
      // },
      {
        test: /\.css$/i,
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

  output: {
    path: path.resolve(__dirname, "../dist"), // 번들 결과물 위치
    filename: "bundle.js",
    publicPath: "/", // 애플리케이션의 모든 애셋에 대한 기본 경로
    clean: true, // 내보내기 전에 output 디렉터리를 정리합니다.
  },
};
