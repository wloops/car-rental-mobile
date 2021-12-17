import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register/register.vue'),
  },
  {
    path: '/',
    // name: 'Layout',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "layout" */ '@/views/layout/layout.vue'),
    children: [
      // 子路由
      {
        path: '', // path为空，会作为默认的子路由渲染
        name: 'home',
        component: () => import('@/views/home/home.vue'),
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('@/views/orders/orders.vue'),
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my/my.vue'),
      },
    ],
  },
  {
    path: '/problems',
    name: 'problems',
    component: () => import('@/views/home/pages/problems.vue'),
  },
  {
    path: '/feedbacks',
    name: 'feedbacks',
    component: () => import('@/views/home/pages/feedbacks.vue'),
  },
  {
    path: '/guide',
    name: 'guide',
    component: () => import('@/views/home/pages/guide.vue'),
  },
  {
    path: '/contactUs',
    name: 'contactUs',
    component: () => import('@/views/home/pages/contactUs.vue'),
  },
  {
    path: '/model',
    name: 'model',
    component: () => import('@/views/model/selectModel.vue'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
