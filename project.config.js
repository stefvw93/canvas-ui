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
      development: path.join("src", "index.template.pug"),
      production: path.join("src", "index.template.pug")
    },
    aliases: {
      // "@authentication/*": ["authentication/*"],
      // "@common/*": ["common/*"],
      // "@sub-modules/*": ["sub-modules/*"],
    }
  },

  devServer: {
    hot: true,
    ip: "localhost", //localIp,
    open: true,
    port: 12020
  }
};
