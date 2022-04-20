import fs from 'fs'
import clear from 'clear'
import inquirer from 'inquirer'
import minimist from 'minimist'
import { routes } from '../src/router/routes'
import pages from '../src/pages.json'
import { createDir, log, toCamelCase } from './helper'

(async function() {
  clear()
  log('Starting dev server...', 'white')

  let { k: key, t: title, s: subPackage } = minimist(process.argv.slice(2))

  if (!key || !title || routes[key]) {
    if (routes[key])
      log('There has the same route key, please change a other route key.', 'red')

    const ans = await inquirer.prompt([
      {
        type: 'input',
        name: 'key',
        message: 'please input the route key:',
        default: key || '',
        validate: (val) => {
          if (routes[val])
            return 'There has the same route key, please change a other route key.'
          else
            return true
        },
      },
      {
        type: 'input',
        name: 'title',
        message: 'please input the route title:',
        default: title || '',
      },
      {
        type: 'input',
        name: 'subPackage',
        default: typeof subPackage === 'string' && subPackage ? subPackage : '',
        message: 'if the page need add the subpackage, please input the subpackage name (no input if not need):',
      },
    ])

    key = ans.key
    title = ans.title
    subPackage = ans.subPackage || ''

    if (!key || !title) {
      log('please input the route key and title.', 'red')
      process.exit(1)
    }
  }

  key = toCamelCase(key)
  subPackage = subPackage ? toCamelCase(subPackage) : ''

  log(`Starting create ${key} page...`, 'white')
  createPageFile(key, subPackage)
  updateRoutesTs(key, title, subPackage)
  updatePagesJson(key, title, subPackage)
})()

function createPageFile(key: string, subPackage: string) {
  if (subPackage) {
    createDir('./src/subPackages', false)
    createDir(`./src/subPackages/${subPackage}`, false)
  }

  const routePath = createDir(subPackage ? `./src/subPackages/${subPackage}/${key}` : `./src/pages/${key}`)
  if (routePath) {
    fs.writeFileSync(`${routePath}/index.vue`,
      `<script setup lang="ts"></script>

<template>${key} page.</template>

<style lang="scss" scope></style>`)
  }
}

function updateRoutesTs(key: string, title: string, subPackage: string) {
  routes[key] = {
    path: subPackage ? `/subPackages/${subPackage}/${key}/index` : `/pages/${key}/index`,
    name: `${title}`,
  }
  const routesTemp = `export type RouteKey = keyof typeof _routes

const _routes = ${JSON.stringify(routes, null, 2)}

export const routes: Record<RouteKey, { path: string; name: string }> = _routes`

  fs.writeFileSync('./src/router/routes.ts', routesTemp)
}

interface SubPackagesOption {
  root: string
  pages: ({
    path: string
    style: Record<string, string>
  })[]
}

function updatePagesJson(key: string, title: string, subPackage: string) {
  const localPages: any = pages
  if (subPackage) {
    if (!localPages.subPackages)
      localPages.subPackages = [] as SubPackagesOption[]

    const pageInfo = {
      path: `${key}/index`,
      style: {
        navigationBarTitleText: `${title}`,
      },
    }
    const sp = localPages.subPackages.find(s => s.root === subPackage)
    if (sp) {
      sp.pages.push(pageInfo)
    }
    else {
      localPages.subPackages.push({
        root: subPackage,
        pages: [pageInfo],
      })
    }
  }
  else {
    localPages.pages.push({
      path: `pages/${key}/index`,
      style: {
        navigationBarTitleText: `${title}`,
      },
    })
  }

  fs.writeFileSync('./src/pages.json', JSON.stringify(localPages, null, 2))
}
