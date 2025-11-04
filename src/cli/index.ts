#!/usr/bin/env node

import { Command } from 'commander';
import { InitCommand } from '../commands/init.js';

const program = new Command();

program
  .name('apip-devkit')
  .description('API Platform Dev Kit - CLI tool for API platform development')
  .version('1.0.0');

// Init command
program
  .command('init')
  .description('Initialize API Platform Dev Kit in the current directory')
  .option('--here', 'Initialize in the current directory')
  .action(async (options) => {
    const initCommand = new InitCommand();
    await initCommand.execute(options);
  });

program.parse();
