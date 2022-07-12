#!/usr/bin/env node

import { Command } from 'commander';
import getDiff from '../src/DiffLogic.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((url1, url2) => {
    getDiff(url1, url2);
  });

program.parse(process.argv);