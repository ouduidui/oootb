import path from 'path'
import fs from 'fs'
import { deepMerge, sortDependencies } from './helpers.js'

export const renderTemplate = (src, dest) => {
  const stat = fs.statSync(src)

  if (stat.isDirectory()) {
    if (path.basename(src) === 'node_modules') return

    fs.mkdirSync(dest, { recursive: true })
    for (const file of fs.readdirSync(src)) {
      renderTemplate(path.resolve(src, file), path.resolve(dest, file))
    }
    return
  }

  const filename = path.basename(src)

  if (filename === 'package.json' && fs.existsSync(dest)) {
    const existing = JSON.parse(fs.readFileSync(dest))
    const newPackage = JSON.parse(fs.readFileSync(src))
    const pkg = sortDependencies(deepMerge(newPackage, existing))
    fs.writeFileSync(dest, JSON.stringify(pkg, null, 2) + '\n')
    return
  }

  if (/^\./.test(filename)) return

  if (/^\_/.test(filename)) {
    dest = path.resolve(path.dirname(dest), filename.replace(/^_/, '.'))
  }

  fs.copyFileSync(src, dest)
}
