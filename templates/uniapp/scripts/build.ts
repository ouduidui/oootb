import clear from 'clear'
import inquirer from 'inquirer'
import minimist from 'minimist'
import { execa } from 'execa'
import { PLATFORMS, log } from './helper'

(async function() {
  clear()
  const args = minimist(process.argv.slice(2))
  const alias = args._[0] || ''

  let platform = PLATFORMS.find(item => item.alias === alias)

  if (!platform) {
    const choices = PLATFORMS.map(p => ({ name: p.id, value: p.id }))
    const { platformId } = await inquirer.prompt({
      type: 'list',
      name: 'platformId',
      message: 'please choose the platform:',
      choices,
    })
    if (!platformId)
      process.exit(1)

    platform = PLATFORMS.find(item => item.id === platformId)
  }

  platform.commandArgs.unshift('build')
  log('Starting build...', 'white')
  log('')
  log(`Command:${platform.command} ${platform.commandArgs.join(' ')}`, 'white')
  await execa(platform.command, platform.commandArgs, { stdio: 'inherit' })
})()
