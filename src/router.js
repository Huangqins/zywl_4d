import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Layout = async () => await import('./views/layout')

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/login')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
