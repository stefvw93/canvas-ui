const path = require("path");
const localIp = require("local-ip")();

module.exports = {
  app: {
    title: "Canvas UI"
  },

  filenames: {
    entry: "./index.js"
  },

  paths: {
    compiled: path.join(__dirname, "__compiled"),
    distribution: path.join(__dirname, "_dist"),
    webpack: path.join(__dirname, "_webpack"),
    templates: {
      development: path.join("test", "index.pug")
    },
    src: "src",
    test: "test",
    aliases: {
      // "@authentication/*": ["authentication/*"],
      // "@common/*": ["common/*"],
      // "@sub-modules/*": ["sub-modules/*"],
    }
  },

  devServer: {
    hot: false,
    ip: localIp,
    open: true,
    port: 12020
  }
};
