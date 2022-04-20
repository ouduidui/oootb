export type RouteKey = keyof typeof _routes

const _routes = {
  index: {
    path: '/pages/index/index',
    name: 'Home',
  },
  about: {
    path: '/pages/about/index',
    name: 'About',
  },
}

export const routes: Record<RouteKey, { path: string; name: string }> = _routes
