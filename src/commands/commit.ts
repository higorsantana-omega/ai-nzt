import { Command } from "commander";
import { getGitStagedChanges } from "../utils/git/git-staged-changes";
import chalk from "chalk";
import prompts from 'prompts'
import { createCommitMessage } from "../utils/ai/gemini";
import { getConfig } from "../utils/config/get-config";
import { gitCommit } from "../utils/git/git-commit";

export const commit = new Command()
  .name('commit')
  .description('Commit changes')
  .action(async () => {
    const { stagedFiles, fileNames } = await getGitStagedChanges()

    console.log(chalk.greenBright('Staged files:'))
    console.log(chalk.greenBright(fileNames.join('\n')))

    await promptForCommit()

    const config = getConfig()

    if (!config.GEMINI_API_KEY) {
      console.log(chalk.red('GEMINI_API_KEY is not set.'))
      console.log(chalk.red('Please run the following command to set the API key:'))
      console.log(chalk.cyan('ai-nzt config -s GEMINI_API_KEY=your-api-key'))
      process.exit(1)
    }

    const commitMessage = await createCommitMessage(stagedFiles.join('\n'))
    const confirmedCommit = await promptAfterGenerateCommitMessage(commitMessage)

    console.log(confirmedCommit)

    if (confirmedCommit) {
      await promptCommit(commitMessage)
    }
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
}

export const promptAfterGenerateCommitMessage = async (commitMessage: string) => {
  const hightlight = (text: string) => chalk.cyanBright(text)

  console.log(chalk.whiteBright(`\n Commit message: ${commitMessage} \n`))

  const { commit } = await prompts({
    type: 'confirm',
    name: 'commit',
    message: hightlight('Do you want to commit with the following message?'),
    initial: true
  })

  if (!commit) {
    const { edit } = await prompts({
      type: 'confirm',
      name: 'edit',
      message: hightlight('Do you want to edit the commit message?'),
      initial: false
    })

    if (edit) {
      const { editedCommitMessage } = await prompts({
        type: 'text',
        name: 'editedCommitMessage',
        message: hightlight('Enter the new commit message'),
        initial: commitMessage
      })

      await promptAfterGenerateCommitMessage(editedCommitMessage)
    }
  
    return false
  }

  return true
}

export const promptCommit = async (commitMessage: string) => {
  console.log(chalk.green('Committing changes...'))

  await gitCommit(commitMessage)

  console.log(chalk.green('Changes committed successfully'))
}