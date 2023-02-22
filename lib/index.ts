#!/usr/bin/env node
/* eslint-disable no-console */
import fs from 'fs'
import path from 'path'
import { Command } from 'commander'
import prompts from 'prompts'
import degit from 'degit'
import { DIR_OPTION, OPTIONS, OPTION_KEY, TEMPLATES } from './constants'
import type { CommandInfo } from './type'

const handleError = (err: Error) => {
  const msg = typeof err === 'string' ? err : err.message
  console.error(msg)
  process.exit(1)
}

const getCommandInfo = () => new Promise<CommandInfo>((resolve) => {
  try {
    const command = new Command().argument('[project-name]')

    Object.keys(OPTIONS).forEach((key) => {
      const { alias, commandDescribe } = OPTIONS[key as OPTION_KEY]
      command.option(`-${alias}, --${key}`, commandDescribe)
    })

    command.action((name, opts) => resolve({ name, opts })).parse()
  }
  catch (err: any) {
    handleError(err)
  }
})

const canSafelyOverwrite = (dir: string) => !fs.existsSync(dir) || fs.readdirSync(dir).length === 0

const emptyDir = (dir: string) => {
  if (!fs.existsSync(dir)) return

  postOrderDirectoryTraverse(
    dir,
    dir => fs.rmdirSync(dir),
    file => fs.unlinkSync(file),
  )
}

function postOrderDirectoryTraverse(dir: string, dirCallback: (dir: string) => void, fileCallback: (file: string) => void) {
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

const getOptions = async(): Promise<CommandInfo> => {
  const commandInfo = await getCommandInfo()

  const questions: Parameters<typeof prompts>[0] = []

  const temp = TEMPLATES.find(t => t.id === commandInfo.opts.template)?.id

  if (!commandInfo.name) {
    questions.push({
      name: 'name',
      type: 'text',
      message: 'Project name:',
    })
  }

  if (!temp) {
    questions.push({
      name: OPTION_KEY.TEMPLATE,
      type: 'select',
      choices: TEMPLATES.map(t => ({ title: t.name, value: t.id })),
      message: OPTIONS[OPTION_KEY.TEMPLATE].describe,
    })
  }

  if (questions.length) {
    try {
      const {
        name = commandInfo.name,
        [OPTION_KEY.TEMPLATE]: template = { value: temp },
      } = await prompts(questions)
      commandInfo.name = name
      commandInfo.opts[OPTION_KEY.TEMPLATE] = template
    }
    catch (err: any) {
      handleError(err)
    }
  }

  let dir = commandInfo.opts[OPTION_KEY.DIR] || `./${commandInfo.name}`

  while (!canSafelyOverwrite(dir)) {
    const { dirHandle, resetDir = `./${commandInfo.name}` } = await prompts([
      {
        name: 'dirHandle',
        type: 'select',
        choices: [
          { title: 'Continue', value: DIR_OPTION.CONTINUE },
          { title: 'Cancel', value: DIR_OPTION.CANCEL },
          { title: 'Reset Directory', value: DIR_OPTION.RESET },
        ],
        message: `Directory ${dir} is not empty. Remove existing files and continue?`,
      },
      {
        name: 'resetDir',
        type: prev => prev === DIR_OPTION.RESET ? 'text' : null,
        message: 'Reset Directory:',
      },
    ])

    switch (dirHandle) {
      case DIR_OPTION.CANCEL:
        handleError(new Error('Cancel'))
        break
      case DIR_OPTION.RESET:
        dir = resetDir
        break
      default:
        emptyDir(dir)
        break
    }
  }

  commandInfo.opts[OPTION_KEY.DIR] = dir

  return commandInfo
}

const init = async() => {
  const { opts: { directory, template: tempId } } = await getOptions()

  const temp = TEMPLATES.find(t => t.id === tempId)!

  const dir = path.resolve(process.cwd(), directory)

  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

  degit(temp.url, { force: true })
    .on('warn', (err: any) => handleError(err)).clone(dir)
    .then(() => console.log('done'))
}

init().catch(handleError)
