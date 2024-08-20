import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import register from '@/views/register/index.vue' // 假设你的注册页面组件在这里
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/profile',
    hidden: true,
    component: Layout,
    children: [
      {
        path: '',
        name: 'Profile',
        component: () => import('@/views/profile/index'),
        meta: { title: '个人界面', icon: 'user' }
      }
    ]
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '菜单', icon: 'dashboard' }
    }]
  },

  {
    path: '/member',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '会员管理',
        component: () => import('@/views/member/index'),
        meta: { title: '会员管理', icon: 'form' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '商品管理',
        component: () => import('@/views/form/index'),
        meta: { title: '商品管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/marking',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '营销管理',
        component: () => import('@/views/marking/index'),
        meta: { title: '营销管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/money',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '资金管理',
        component: () => import('@/views/money/index'),
        meta: { title: '资金管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/courierService',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '物流管理',
        component: () => import('@/views/courierService/index'),
        meta: { title: '物流管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '订单管理',
        component: () => import('@/views/order/index'),
        meta: { title: '订单管理', icon: 'form' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '*', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
