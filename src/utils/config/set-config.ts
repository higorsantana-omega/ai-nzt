import fs from 'node:fs'

import { ConfigKey, getConfig, validConfigKeys } from "./get-config"
import { configDirectory } from '../config-directory'

export function setConfig (key: ConfigKey, value: string) {
  if (!validConfigKeys.includes(key)) {
    throw new Error(`Invalid config key: ${key}`)
  }
  
  const config = getConfig()
  config[key] = value
  fs.writeFileSync(configDirectory, JSON.stringify(config, null, 2), { encoding: 'utf-8' })
}