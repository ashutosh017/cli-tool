import chalk from 'chalk'
import createLogger from '../logger.js'
const logger = createLogger("commands:start")
function start(config){
    // console.log(chalk.bgCyanBright("starting the app"))
    logger.highlight("starting the app")
    // console.log("logging config in tool/src/commands/start.js: ",config)
    // console.log(chalk.gray("recieved configuration in start: "),config)
    logger.debug("recieved configuration is start: ",config)
}

export default start