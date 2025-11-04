import chalk from 'chalk';

export function displayLogo(): void {
  console.log();
  console.log(chalk.bold.cyan('  █████╗ ██████╗ ██╗    ██████╗ ██╗      █████╗ ████████╗███████╗ ██████╗ ██████╗ ███╗   ███╗'));
  console.log(chalk.bold.cyan(' ██╔══██╗██╔══██╗██║    ██╔══██╗██║     ██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██╔══██╗████╗ ████║'));
  console.log(chalk.bold.cyan(' ███████║██████╔╝██║    ██████╔╝██║     ███████║   ██║   █████╗  ██║   ██║██████╔╝██╔████╔██║'));
  console.log(chalk.bold.cyan(' ██╔══██║██╔═══╝ ██║    ██╔═══╝ ██║     ██╔══██║   ██║   ██╔══╝  ██║   ██║██╔══██╗██║╚██╔╝██║'));
  console.log(chalk.bold.cyan(' ██║  ██║██║     ██║    ██║     ███████╗██║  ██║   ██║   ██║     ╚██████╔╝██║  ██║██║ ╚═╝ ██║'));
  console.log(chalk.bold.cyan(' ╚═╝  ╚═╝╚═╝     ╚═╝    ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝'));
  console.log();
  console.log(chalk.bold.white('                           API Platform Dev Kit'));
  console.log();
}
