import { Command } from "commander";
import { getGitStagedChanges } from "../utils/git/git-staged-changes";
import chalk from "chalk";
import prompts from 'prompts'

export const commit = new Command()
  .name('commit')
  .description('Commit changes')
  .action(async () => {
    const { stagedFiles, fileNames } = await getGitStagedChanges()

    console.log(chalk.greenBright('Staged files:'))
    console.log(chalk.greenBright(fileNames.join('\n')))

    await promptForCommit()
  })

export const promptForCommit = async () => {
  const hightlight = (text: string) => chalk.cyanBright(text)

  const { commit } = await prompts({
    type: 'confirm',
    name: 'commit',
    message: hightlight('Do you want to commit these changes?'),
    initial: true
  })

  if (!commit) {
    console.log(chalk.yellow('Aborted commit'))
    return
  }

  console.log(chalk.green('Committing changes...'))
}