import fs from 'node:fs'

import { configDirectory } from "../config-directory"

export type ConfigKey = 'GEMINI_API_KEY'

export type Config = {
  [key in ConfigKey]: string
}

export const validConfigKeys = ['GEMINI_API_KEY']

export function getConfig (): Config {
  if (!fs.existsSync(configDirectory)) {
    fs.writeFileSync(configDirectory, JSON.stringify({}, null, 2))
  }

  const config = fs.readFileSync(configDirectory, 'utf-8')

  return JSON.parse(config)
}