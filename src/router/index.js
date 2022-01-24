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
  {
    path: '/confirm',
    name: 'confirm',
    component: () => import('@/views/confirm/confirmOrder.vue'),
  },
  {
    path: '/rules',
    name: 'rules',
    component: () => import('@/views/confirm/page/orderRules.vue'),
  },
]

// 用户登录状态信息
// const user = JSON.parse(window.localStorage.getItem('user'))

const router = new VueRouter({
  routes,
})

// 路由导航守卫:也就是所有页面的导航都会经过这里
// to: 要去的路由信息
// from: 来自哪里的路由信息
// next: 放行方法(符合通过条件可调用放行)
// router.beforeEach((to, from, next) => {
//   // 验证登录页面的登录状态
//   if (to.path == '/confirm') {
//     if (user) {
//       // 已登录,允许通过
//       next()
//     } else {
//       // 没有登录信息,跳转到登陆页面
//       next('/login')
//     }
//   } else {
//     // 如果是登录页面 就允许通过
//     next()
//   }
// })

export default router
