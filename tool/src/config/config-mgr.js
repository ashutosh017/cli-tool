import chalk from "chalk";
import {pkgUp} from "pkg-up";
import { createRequire } from "module";
import { cosmiconfigSync } from "cosmiconfig";
import Ajv from 'ajv'
import betterAjvErrors from 'better-ajv-errors';
import createLogger from "../logger.js";

const logger = createLogger('config:mgr')

const configLoader = cosmiconfigSync("tool");
const require = createRequire(import.meta.url);
const schema = require('./schema.json')
const ajv = new Ajv({jsonPointers:true})

function getConfig() {
  //   const pkgPath = pkgup.sync({ cwd: process.cwd() });
    const result = configLoader.search(process.cwd())
//   const pkg = require(pkgPath);
  // const pkg = {pkgPath}
  if (!result) {
    //   console.log(chalk.yellow("could not find configuation, using default"));
    logger.warning('could not find configuration, using defualt')
      return { port: 1234 };
    // console.log("found configuation: ", pkg.tool);
    // return pkg.tool;
  }
//    else if (hasJSConfigFile()) {
//     return JSConfigFile();
//   } 
  else {
    const isValid = ajv.validate(schema,result.config)
    console.log("control is reaching here...")
    if(!isValid){
        // console.log(chalk.yellow("invalid configuration was supplied"))
        logger.warning('invalid configuration was supplied')
        console.log();
        // console.log(ajv.errors)
        console.log(betterAjvErrors(schema,result.config,ajv.errors))
        process.exit(1)
    }
    // console.log("found configuation: ", result.config)
    logger.debug("found configuration: ", result.config)

    return result.config
  }
}

export default getConfig;
