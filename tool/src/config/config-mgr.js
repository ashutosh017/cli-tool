import { createRequire } from "module";
import { cosmiconfig, cosmiconfigSync } from "cosmiconfig";
import Ajv from 'ajv'
import betterAjvErrors from 'better-ajv-errors';
import createLogger from "../logger.js";

const logger = createLogger('config:mgr')

const configLoader = cosmiconfig("tool");
const require = createRequire(import.meta.url);
const schema = require('./schema.json')
const ajv = new Ajv()

function getConfig() {
    const result = configLoader.search(process.cwd())
  if (!result) {
    logger.warning('could not find configuration, using defualt')
      return { port: 1234 };
  }
  else {
    const isValid = ajv.validate(schema,result.config)
    console.log("control is reaching here...")
    if(!isValid){
        logger.warning('invalid configuration was supplied')
        console.log();
        console.log(betterAjvErrors(schema,result.config,ajv.errors))
        process.exit(1)
    }
    logger.debug("found configuration: ", result.config)

    return result.config
  }
}

export default getConfig;
