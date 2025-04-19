#! /usr/bin/env node

import arg from "arg";
import chalk from "chalk";
import getConfig from "../src/config/config-mgr.js";
import start from "../src/commands/start.js";

const args = arg({
  "--start": Boolean,
  "--build": Boolean,
});

try {
  if (args["--start"]) {
    const config = getConfig();
    console.log("logging config in tool/bin/index.js: ", config);
    start(config);
  }
} catch (error) {
  console.log(chalk.yellow(error.message));
  console.log();
  usage();
}
function usage() {
  console.log(`${chalk.whiteBright("tool [CMD]")}
    ${chalk.greenBright("--start")}\tStarts the app
    ${chalk.greenBright("--build")}\tBuilds the app`);
}
