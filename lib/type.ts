import type { OPTION_KEY } from './constants'

export interface CommandInfo {
  name: string
  opts: {
    [OPTION_KEY.TEMPLATE]: string
    [OPTION_KEY.DIR]: string
  }
}
