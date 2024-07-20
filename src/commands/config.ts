import { Command } from "commander";
import chalk from "chalk";
import { setConfig } from "../utils/config/set-config";
import { handleError } from "../utils/handle-error";

export const config = new Command()
  .name('config')
  .description('Manage configuration')
  .option('-s, --set <key-value>', 'Set a configuration key and value')
  .action((options) => {
    try {
      const { set } = options

      if (!set) {
        console.log(chalk.red('Please provide a key and value in the format key=value'))
        process.exit(1)
      }

      const [setKey, setValue] = set.split('=')
  
      if (!setKey || !setValue) {
        console.log(chalk.red('Please provide a key and value'))
        process.exit(1)
      }

      setConfig(setKey, setValue)

      console.log(chalk.green('Configuration updated'))
    } catch (e) {
      handleError(e)
    }
  })