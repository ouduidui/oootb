import path from 'path'
import fs from 'fs'

export const canSafelyOverwrite = (dir) => !fs.existsSync(dir) || fs.readdirSync(dir).length === 0

export const isValidPackageName = (projectName) => /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(projectName)

export const toValidPackageName = (projectName) =>
  projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z0-9-~]+/g, '-')

export const emptyDir = (dir) => {
  if (!fs.existsSync(dir)) return

  postOrderDirectoryTraverse(
    dir,
    (dir) => fs.rmdirSync(dir),
    (file) => fs.unlinkSync(file)
  )
}

function postOrderDirectoryTraverse(dir, dirCallback, fileCallback) {
  for (const filename of fs.readdirSync(dir)) {
    const fullPath = path.resolve(dir, filename)
    if (fs.lstatSync(fullPath).isDirectory()) {
      postOrderDirectoryTraverse(fullPath, dirCallback, fileCallback)
      dirCallback(fullPath)
      continue
    }
    fileCallback(fullPath)
  }
}
