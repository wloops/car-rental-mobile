import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'Layout',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Layout" */ '@/views/layout/Layout.vue'),
    children: [
      // 子路由
      {
        path: '', // path为空，会作为默认的子路由渲染
        name: 'Home',
        component: () => import('@/views/home/Home.vue'),
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('@/views/orders/Orders.vue'),
      },
      {
        path: 'my',
        name: 'My',
        component: () => import('@/views/my/My.vue'),
      },
    ],
  },
  {
    path: '/problems',
    name: 'Problems',
    component: () => import('@/views/home/pages/Problems.vue'),
  },
  {
    path: '/feedbacks',
    name: 'Feedbacks',
    component: () => import('@/views/home/pages/Feedbacks.vue'),
  },
  {
    path: '/guide',
    name: 'Guide',
    component: () => import('@/views/home/pages/Guide.vue'),
  },
  {
    path: '/contactUs',
    name: 'ContactUs',
    component: () => import('@/views/home/pages/ContactUs.vue'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
