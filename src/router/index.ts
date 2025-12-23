import { createRouter, createWebHistory } from 'vue-router'
import Twin from '@/views/Twin.vue'

const routes = [
  {
    path: '/',
    redirect: '/twin?panel=drainage'
  },
  {
    path: '/twin',
    name: 'Twin',
    component: Twin
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router