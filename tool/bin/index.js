#! /usr/bin/env node

// const arg = require('arg')
import arg from 'arg'
// const chalk = require('chalk')
import chalk from 'chalk'
import path from 'path'
import getConfig from '../src/config/config-mgr.js'
import start from '../src/commands/start.js'

const args = arg({
    
    '--start':Boolean,
    '--build':Boolean
})

// console.log(args)
try {
    if(args['--start']){
        // const pkg = (path.join(process.cwd(),'package.json'))
        // console.log(pkg)
        // console.log(chalk.bgCyanBright("starting the app"))
        const config = getConfig()
        console.log("logging config in tool/bin/index.js: ",config)
        start(config)
    }
} catch (error) {
    console.log(chalk.yellow(error.message))
    console.log();
    usage()
}
function usage() {
    console.log(`${chalk.whiteBright('tool [CMD]')}
    ${chalk.greenBright('--start')}\tStarts the app
    ${chalk.greenBright('--build')}\tBuilds the app`);
  }