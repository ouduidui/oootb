export enum OPTION_KEY {
  TEMPLATE = 'template',
  DIR = 'directory',
}

export const TEMPLATES = [
  {
    id: 'vue',
    name: 'vue template (vue3 + ts)',
    url: 'ouduidui/oootb/templates/vue',
  },
  {
    id: 'react',
    name: 'react template (react18 + ts)',
    url: 'ouduidui/oootb/templates/react',
  },
  {
    id: 'ts',
    name: 'typescript template',
    url: 'ouduidui/oootb/templates/ts',
  },
]

export enum DIR_OPTION {
  CONTINUE,
  CANCEL,
  RESET,
}

export const OPTIONS = {
  [OPTION_KEY.TEMPLATE]: {
    key: OPTION_KEY.TEMPLATE,
    alias: 't',
    commandDescribe: `choose a template (${TEMPLATES.map(t => t.id).join('|')})`,
    describe: 'choose a template',
  },
  [OPTION_KEY.DIR]: {
    key: OPTION_KEY.DIR,
    alias: 'd',
    commandDescribe: 'project directory',
    describe: 'project directory',
  },
}
