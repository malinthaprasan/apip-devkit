import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import { displayLogo } from '../utils/logo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class InitCommand {
  async execute(options: { here?: boolean }): Promise<void> {
    // Display the logo
    displayLogo();

    // Determine target directory
    const targetDir = options.here ? process.cwd() : process.cwd();

    // Get the template directory path (it will be in the dist/templates folder after build)
    const templateDir = path.join(__dirname, '../../templates/.claude');
    const targetClaudeDir = path.join(targetDir, '.claude');

    try {
      // Check if template directory exists
      if (!fs.existsSync(templateDir)) {
        console.error(chalk.red(`Error: Template directory not found at ${templateDir}`));
        process.exit(1);
      }

      // Copy all template files recursively
      this.copyDirectoryRecursive(templateDir, targetClaudeDir);

      console.log(chalk.green(`✓ Successfully initialized .claude directory in ${targetDir}`));
      console.log(chalk.cyan('\nGetting started:'));
      console.log(chalk.white('  1. Start claude agent'));
      console.log(chalk.white('  2. Run /apip:init'));
      console.log(chalk.white('  3. Start building API Platform features!'));
      console.log();
    } catch (error) {
      console.error(chalk.red('Error during initialization:'), error);
      process.exit(1);
    }
  }

  private copyDirectoryRecursive(sourceDir: string, targetDir: string): void {
    // Create target directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Read all files and directories in source
    const entries = fs.readdirSync(sourceDir, { withFileTypes: true });

    for (const entry of entries) {
      const sourcePath = path.join(sourceDir, entry.name);
      const targetPath = path.join(targetDir, entry.name);

      if (entry.isDirectory()) {
        // Recursively copy directory
        this.copyDirectoryRecursive(sourcePath, targetPath);
      } else {
        // Copy file (overwrite if exists)
        fs.copyFileSync(sourcePath, targetPath);
        console.log(chalk.gray(`  Copied: ${path.relative(process.cwd(), targetPath)}`));
      }
    }
  }
}
