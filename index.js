#!/usr/bin/env node
/* eslint-disable no-console */
// @ts-check

import path from 'path'
import fs from 'fs'
import prompts from 'prompts'
import { Command } from 'commander/esm.mjs'
import degit from 'degit'

const defaultProjectName = 'ou-app'
const templates = [
  {
    id: 'vue',
    name: 'vue template (vue3 + ts)',
    url: 'ouduidui/react-template',
  },
  {
    id: 'react',
    name: 'react template (react18 + ts)',
    url: 'ouduidui/vue-template',
  },
  {
    id: 'ts',
    name: 'typescript template',
    url: 'ouduidui/typescript-template',
  },
  {
    id: 'nuxt',
    name: 'nuxt template (nuxt3 + ts)',
    url: 'ouduidui/nuxt-template',
  },
  {
    id: 'uniapp',
    name: 'uniapp template (uniapp v3 + ts)',
    url: 'ouduidui/uniapp-template',
  },
]

const canSafelyOverwrite = dir => !fs.existsSync(dir) || fs.readdirSync(dir).length === 0

const getCommandOptions = () => {
  return new Promise((resolve, reject) => {
    try {
      new Command()
        .argument('[project-name]', 'project name', defaultProjectName)
        .option('-t, --template <template>', `choose a template (${templates.map(t => t.id).join('|')})`)
        .option('-r, --root', 'create in the current directory', false)
        .option('-f, --force', 'for force overwriting', false)
        .action((name, opts) => {
          resolve({ name, opts })
        }).parse()
    }
    catch (err) {
      reject(err)
      console.log(err.message)
    }
  })
}

const emptyDir = (dir) => {
  if (!fs.existsSync(dir)) return

  postOrderDirectoryTraverse(
    dir,
    dir => fs.rmdirSync(dir),
    file => fs.unlinkSync(file),
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

const init = async() => {
  const cwd = process.cwd()

  const { name, opts } = await getCommandOptions()
  if (!name || !opts)
    process.exit(1)

  let template = opts.template && templates.find(t => t.id === opts.template) ? opts.template : ''
  const root = opts.root
  let force = opts.force

  // error template
  if (template === '') {
    try {
      const res = await prompts({
        name: 'template',
        type: 'select',
        choices: templates.map(t => ({ title: t.name, value: t.id })),
        message: 'Choose a template:',
      })
      template = res.template
    }
    catch (err) {
      console.log(err.message)
      process.exit(1)
    }
    finally {
      if (!template)
        process.exit(1)
    }
  }

  // cannot safe overwrite
  if (!force && !canSafelyOverwrite(root ? '.' : name)) {
    try {
      const { shouldOverwrite } = await prompts({
        name: 'shouldOverwrite',
        type: 'toggle',
        initial: true,
        active: 'Yes',
        inactive: 'No',
        message: () => {
          const dirForPrompt = root ? 'Current directory' : `Target directory "${name}"`
          return `${dirForPrompt} is not empty. Remove existing files and continue?`
        },
      })

      if (shouldOverwrite)
        force = true
      else
        process.exit(1)
    }
    catch (err) {
      console.log(err.message)
      process.exit(1)
    }
  }

  const dir = root ? cwd : path.join(cwd, name)

  if (!root) {
    if (fs.existsSync(dir) && force) { emptyDir(dir) }
    else if (fs.existsSync(dir) && !force) {
      console.log(`Directory "${dir}" already exists.`)
      process.exit(1)
    }
    else {
      fs.mkdirSync(dir)
    }
  }

  console.log(`\nScaffolding project in ${dir}...`)

  const temp = templates.find(t => t.id === template)
  const emitter = degit(temp.url, {
    force: true,
  })
  emitter.on('warn', err => console.log(err))
  emitter.clone(dir).then(() => console.log('done'))
}

init().catch((e) => {
  console.error(e)
})
