import path from 'path'
import fs from 'fs-extra'
import { type PackageJson } from 'type-fest'

export function getPackageInfo(): Promise<PackageJson> {
  const packageJsonPath = path.join('package.json')
  return fs.readJSONSync(packageJsonPath)
}