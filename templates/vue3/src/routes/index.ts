import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    name: 'Home',
    path: '/',
    component: () => import('~/pages/home.vue'),
  },
  {
    name: 'About',
    path: '/about',
    component: () => import('~/pages/about.vue'),
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
