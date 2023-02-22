import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { persist } from 'pinia-persists'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from '~pages'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const router = createRouter({
  // ...
  routes,
  history: createWebHistory(),
})

createApp(App).use(router).use(createPinia().use(persist())).mount('#app')
