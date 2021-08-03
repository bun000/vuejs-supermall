// import Vue from 'vue'
// import VueRouter from 'vue-router'

import {createRouter, createWebHistory} from 'vue-router'

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')

// 1.安装插件
// Vue.use(VueRouter)

const routerHistory = createWebHistory()
// 2.创建路由对象
const routes = [
  {
    path: '',
    redirect: '/home',    
  },
  {
    path: '/home',
    component: Home,
    meta:{
      title:"首页"
    }
  },
  {
    path: '/category',
    component: Category,
    meta:{
      title:"分类"
    }
  },
  {
    path: '/cart',
    component: Cart,
    meta:{
      title:"购物车"
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta:{
      title:"我的"
    }
  },
  {
    path: '/detail/:iid',
    component: Detail,
    meta:{
      title:"详情页"
    }
  }
]

const router = createRouter({
  history: routerHistory,
  routes,
  mode: 'history',
  // linkActiveClass:'active'
})

// 前置钩子(guard)
router.beforeEach((to,from,next)=>{
  document.title = to.matched[0].meta.title
  next()
})
// 后置回调()
// router.afterEach((to,from,next)=>{
//   document.title = to.matched[0].meta.title
// })

// 3.导出router
export default router
