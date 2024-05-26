const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { execSync } = require("child_process");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",

  plugins: [
    // sitemap 생성 플러그인
    {
      apply: (compiler) => {
        compiler.hooks.beforeRun.tap("GenerateSitemapPlugin", () => {
          execSync(
            "pnpm exec ts-node " +
              path.resolve(__dirname, "../src/util/generateSitemap/index.ts")
          );
        });
      },
    },

    new CopyWebpackPlugin({
      patterns: [
        { from: "public/content/posts", to: "content/posts" },
        { from: "public/sitemap.xml", to: "sitemap.xml" },
        { from: "public/robots.txt", to: "robots.txt" },
      ],
    }),
  ],
});
