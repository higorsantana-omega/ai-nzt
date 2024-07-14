import { execa } from 'execa'

const excludeFromDiff = (path: string) => `:(exclude)${path}`;

const exclude = [
	'package-lock.json',
	'pnpm-lock.yaml',
	'*.lock',
].map(excludeFromDiff);

export async function getGitStagedChanges(): Promise<{ fileNames: string[]; stagedFiles: string[] }> {
  try {
    const { stdout: stagedStdout } = await execa('git', ['diff', '--diff-algorithm=minimal', ...exclude])
    const stagedFiles = stagedStdout.split('\n').filter(Boolean)

    const { stdout: diffStdout } = await execa('git', ['diff', '--name-only'])
    const fileNames = diffStdout.split('\n').filter(Boolean)
  
    return {
      stagedFiles,
      fileNames
    }
  } catch (error) {
    console.error('Error getting git staged changes:', error)
    return {
      stagedFiles: [],
      fileNames: []
    }
  }
}