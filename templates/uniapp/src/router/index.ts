import qs from 'qs'
import type { BackOptions, DefaultOptions, NavOptions } from './types'
import type { RouteKey } from './routes'
import { routes } from './routes'

const handleUrl = (key: RouteKey, options: NavOptions | DefaultOptions) => {
  const route = routes[key]

  if (!route)
    throw new Error(`route ${key} not found`)

  let url = route.path
  if (options.query) {
    url += `?${qs.stringify(options.query)}`
    delete options.query
  }

  return url
}

/**
 * navigate to a page
 * @param key
 * @param options
 */
export const nav = (key: RouteKey, options: NavOptions = {}) => {
  uni.navigateTo({
    url: handleUrl(key, options),
    ...options,
  })
}

/**
 * switch to a tab page
 * @param key
 * @param options
 */
export const tab = (key: RouteKey, options: DefaultOptions = {}) => {
  uni.switchTab({
    url: handleUrl(key, options),
    ...options,
  })
}

/**
 * redirect to a page
 * @param key
 * @param options
 */
export const redirect = (key: RouteKey, options: DefaultOptions = {}) => {
  uni.redirectTo({
    url: handleUrl(key, options),
    ...options,
  })
}

/**
 * relaunch to a page
 * @param key
 * @param options
 */
export const reLaunch = (key: RouteKey, options: DefaultOptions = {}) => {
  uni.reLaunch({
    url: handleUrl(key, options),
    ...options,
  })
}

/**
 * navigate back
 * @param options
 */
export const back = (options: BackOptions = {}) => {
  uni.navigateBack({
    ...options,
  })
}
