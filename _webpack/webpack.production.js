const { app, paths, filenames } = require("../project.config");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const DotENVWebpackPlugin = require("dotenv-webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const path = require("path");

module.exports = {
  mode: "production",
  context: paths.compiled,
  entry: [
    path.join(paths.compiled, paths.test, filenames.entry),
    path.join(paths.compiled, paths.src, filenames.entry)
  ],
  plugins: [
    new HTMLWebpackPlugin({
      title: app.title
    }),
    new DotENVWebpackPlugin(),
    process.env.ANALYZE_BUILD ? new BundleAnalyzerPlugin() : function() {}
  ],
  resolve: {
    alias: paths.aliases,
    modules: [paths.compiled, "node_modules"]
  },
  output: { path: paths.distribution, filename: "[name].[chunkhash].js" },
  optimization: {
    moduleIds: "hashed",
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all"
    }
  }
};
