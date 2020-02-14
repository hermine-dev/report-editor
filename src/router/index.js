import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ '../views/Reports/ReportList.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/reports',
    name: 'Reports',
    component: () => import(/* webpackChunkName: "reports" */ '../views/Reports/ReportList.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/report-create',
    name: 'CreateReport',
    component: () => import(/* webpackChunkName: "report-create" */ '../views/Reports/CreateReport.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/report-editor',
    name: 'ReportEditor',
    component: () => import(/* webpackChunkName: "report-editor" */ '../views/Reports/ReportEditor.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['auth/loggedIn']) {
      (async () => {
        try {
          await store.dispatch('auth/userInfo')
        } catch (e) {
          console.log('err', e.message)
        }
      })()
    }
    if (store.getters['auth/loggedIn']) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
