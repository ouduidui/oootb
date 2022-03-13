import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { persist } from 'pinia-persists'
import App from './App.vue'
import router from '~/routes/index'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

createApp(App).use(router).use(createPinia().use(persist())).mount('#app')
