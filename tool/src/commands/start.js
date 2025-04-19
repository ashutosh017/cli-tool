import createLogger from '../logger.js'
const logger = createLogger("commands:start")
function start(config){
    logger.highlight("starting the app")
    logger.debug("recieved configuration is start: ",config)
}

export default start