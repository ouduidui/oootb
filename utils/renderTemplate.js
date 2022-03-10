import path from 'path'
import fs from 'fs'

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
    // TODO merge

    return
  }

  if (/^\./.test(filename)) return

  if (/^\_/.test(filename)) {
    dest = path.resolve(path.dirname(dest), filename.replace(/^_/, '.'))
  }

  fs.copyFileSync(src, dest)
}
