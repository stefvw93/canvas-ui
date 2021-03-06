const { execSync } = require("child_process");
const projectConfig = require("../project.config");
const { paths } = projectConfig;
const colors = require("colors");

const buildCommand = [
  `rm -rf ${paths.compiled} ${paths.distribution} &&`,
  "tsc &&",
  "webpack",
  `--config ${paths.webpack}/webpack.production`,
  "--display-error-details"
].join(" ");

console.log(`${colors.green.bold("Compiling production...")}`);

// build
execSync(buildCommand, { stdio: "inherit" });
