#!/usr/bin/env node
import * as Yargs from 'yargs'

Yargs
  .scriptName('tinp')
  .usage('Usage: $0 [options] [.tinp file]')
  .example('$0 hello.tinp', '')
  .version('v')
  .alias('v', 'version')
  .help('h')
  .alias('h', 'help')
  .epilog('Created by Mario Matheus and Rafael Coelho.')

const path = Yargs.argv._[0]
