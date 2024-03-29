const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");

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
    new Dotenv(),
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
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          minimize: true,
        },
      },

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
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000, // 10kb 미만 파일은 Data URL로 변환
              name: "images/[name].[ext]", // 10kb 이상 파일은 file-loader가 처리
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
