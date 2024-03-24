import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/ElectoralMap/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("../views/index.vue")
    }
  ]
})

export default router
