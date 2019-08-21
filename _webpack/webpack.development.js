const { paths, filenames, devServer, app } = require("../project.config");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  devServer: {
    hot: devServer.hot,
    port: devServer.port,
    host: devServer.ip,
    open: devServer.open,
    historyApiFallback: true
  },
  context: paths.compiled,
  entry: [
    path.join(paths.compiled, paths.test, filenames.entry),
    path.join(paths.compiled, paths.src, filenames.entry)
  ],
  plugins: [
    new HTMLWebpackPlugin({
      title: app.title,
      template: `!!pug-loader!${paths.templates.development}`
    }),
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify(process.env.API_URL)
    })
  ],
  resolve: {
    alias: paths.aliases,
    modules: [paths.compiled, "node_modules"]
  }
};
