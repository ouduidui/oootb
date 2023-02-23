import fs from 'fs'
import { $ } from 'zx'

const tempPath = 'templates'
const templates = fs.readdirSync(tempPath)

await Promise.all(templates.map(temp => $`cd ${tempPath}/${temp} && pnpm install`))
