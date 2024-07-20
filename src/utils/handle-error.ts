import chalk from "chalk";

export function handleError(error: unknown) {
  if (typeof error === "string") {
    console.error(chalk.red(error))
    process.exit(1)
  }

  if (error instanceof Error) {
    console.error(chalk.red(error.message))
    process.exit(1)
  }

  console.error(chalk.red("Something went wrong. Please try again."))
  process.exit(1)
}