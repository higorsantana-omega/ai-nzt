import { Command } from 'commander';
import { getPackageInfo } from './utils/get-package-info';

process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

async function main () {
  const program = new Command();

  const packageInfo = await getPackageInfo()

  program
    .name('ai-nzt')
    .description('CLI to some ai code utilities')
    .version(packageInfo.version || '0.0.1',
      '-v, --version',
      'display the version number');

  program.parse();
}

main()
