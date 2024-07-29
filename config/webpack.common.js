const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin; // 번들의 내용 시각화하여 분석할 수 있게 해주는 도구

module.exports = {
  mode: "development",
  resolve: {
    extensions: [".ts", ".js", ".json", ".css"],
    fallback: {
      buffer: require.resolve("buffer/"),
    },
    alias: {
      "@": path.resolve(__dirname, "../src"),
      "@comp": path.resolve(__dirname, "../src/components"),
      "@views": path.resolve(__dirname, "../src/views"),
    },
  },
  entry: path.resolve(__dirname, "../src/index.ts"),

  plugins: [
    new HtmlWebpackPlugin({
      title: "Production",
      template: path.resolve(__dirname, "../public/index.html"),
      filename: "index.html",
      inject: "body",
    }),

    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),

    new BundleAnalyzerPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
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
        test: /\.md$/,
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.module\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          { loader: "postcss-loader" },
        ],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },

      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext][query]",
        },
      },
      {
        test: /\.(otf|ttf|woff|woff2)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext][query]",
        },
      },
    ],
  },

  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.js",
    publicPath: "/",
    clean: true,
  },
};
