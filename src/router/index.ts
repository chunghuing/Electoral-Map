import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/Electoral-Map/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("../views/index.vue")
    }
  ]
})

export default router
