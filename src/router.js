import { createWebHistory, createRouter } from 'vue-router'

import Home from './components/Home.vue'
import Crop from './components/Crop.vue'

const routes = [
  { path: '/', component: Home },

  { path: '/crop/:id', component: Crop }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router