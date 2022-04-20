import fs from 'fs'
import path from 'path'
import type { Color } from 'chalk'
import chalk from 'chalk'

/**
 * data
 */

export const PLATFORMS: {
  id: string
  alias: string
  command: string
  commandArgs: string[]
}[] = [
  {
    id: 'h5',
    alias: 'h5',
    command: 'uni',
    commandArgs: [],
  },
  {
    id: 'h5:ssr',
    alias: 'ssr',
    command: 'uni',
    commandArgs: ['--ssr'],
  },
  {
    id: 'mp-weixin',
    alias: 'wx',
    command: 'uni',
    commandArgs: ['-p', 'mp-weixin'],
  },
  {
    id: 'app',
    alias: 'app',
    command: 'uni',
    commandArgs: ['-p', 'app'],
  },
  {
    id: 'custom',
    alias: 'cs',
    command: 'uni',
    commandArgs: ['-p'],
  },
  {
    id: 'mp-alipay',
    alias: 'ali',
    command: 'uni',
    commandArgs: ['-p', 'mp-alipay'],
  },
  {
    id: 'mp-baidu',
    alias: 'bd',
    command: 'uni',
    commandArgs: ['-p', 'mp-baidu'],
  },
  {
    id: 'mp-kuaishou',
    alias: 'ks',
    command: 'uni',
    commandArgs: ['-p', 'mp-kuaishou'],
  },
  {
    id: 'mp-lark',
    alias: 'fs',
    command: 'uni',
    commandArgs: ['-p', 'mp-lark'],
  },
  {
    id: 'mp-qq',
    alias: 'qq',
    command: 'uni',
    commandArgs: ['-p', 'mp-qq'],
  },
  {
    id: 'mp-toutiao',
    alias: 'tt',
    command: 'uni',
    commandArgs: ['-p', 'mp-toutiao'],
  },
  {
    id: 'mp-toutiao',
    alias: 'tt',
    command: 'uni',
    commandArgs: ['-p', 'mp-toutiao'],
  },
  {
    id: 'quickapp-webview',
    alias: 'qa',
    command: 'uni',
    commandArgs: ['-p', 'quickapp-webview'],
  },
  {
    id: 'quickapp-webview-huawei',
    alias: 'qa-hw',
    command: 'uni',
    commandArgs: ['-p', 'quickapp-webview-huawei'],
  },
  {
    id: 'quickapp-webview-union',
    alias: 'qa-un',
    command: 'uni',
    commandArgs: ['-p', 'quickapp-webview-union'],
  },
]

/**
 * log
 */

// eslint-disable-next-line no-console
export const log = (msg: string, color: Color = 'green') => console.log(chalk[color](msg))

/**
 * format
 */

export const toCamelCase = (key: string) => key.split(' ').join('-').replace(/-([a-z])/g, (all, letter) => letter.toUpperCase())

/**
 * path
 */

const checkHasDir = (dir: string) => {
  try {
    log(`start check whether has same directory: ${dir}`, 'white')
    fs.accessSync(dir, fs.constants.F_OK)
    return true
  }
  catch (_) {
    return false
  }
}

const __dirname = path.dirname('.')
const getAbsolutePath = (p: string): string => path.resolve(__dirname, p)

export const createDir = (dir: string, needLog = true): string => {
  const localDir = getAbsolutePath(dir)
  if (checkHasDir(localDir)) {
    needLog && log('createDir: the path already exists', 'red')
    return
  }
  needLog && log('start create topic directory', 'white')
  fs.mkdirSync(localDir)
  needLog && log('topic directory create success')
  return localDir
}
