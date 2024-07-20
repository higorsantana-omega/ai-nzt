import { execa } from 'execa'
import { handleError } from '../handle-error'

export async function gitCommit (message: string) {
  try {
    await execa('git', ['commit', '-m', message])
  } catch (error) {
    handleError(error)
  }
}