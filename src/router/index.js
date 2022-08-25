import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
VueRouter.prototype.replace = function replace(location) {
  return originalPush.call(this, location).catch(err => err)
}

const Index = () => import('../views/index')
const Search = () => import('../views/search')
const Detail = () => import('../views/detail')
const Register = () => import('../views/register')
const StoreRegister = () => import('../views/storeRegister')
const Login = () => import('../views/login')
const ForgetPassword = () => import('../views/forgetPassword')
const Cart = () => import('../views/cart')
const Order = () => import('../views/order')
const Sign = () => import('../views/sign')
const MyOrder = () => import('../views/myOrder')
const MyTicket = () => import('../views/myTicket')
const MyAccount = () => import('../views/myAccount')
const MyAddress = () => import('../views/myAddress')
const AccountSearch = () => import('../views/accountSearch')
const Notice = () => import('../views/notice')
const Explain = () => import('../views/explain')
const LeaveMessage = () => import('../views/leaveMessage')

// 后台路由
const AdminIndex = () => import('../views/adminIndex')
const AdminWelcome = () => import('../views/adminWelcome')
const MonthPlanTable = () => import('../views/monthPlanTable')
const YearPlanTable = () => import('../views/yearPlanTable')

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: Index
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/detail',
    component: Detail
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/storeRegister',
    component: StoreRegister
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/forgetPassword',
    component: ForgetPassword
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/order',
    component: Order
  },
  {
    path: '/sign',
    component: Sign
  },
  {
    path: '/myOrder',
    component: MyOrder
  },
  {
    path: '/myTicket',
    component: MyTicket
  },
  {
    path: '/myAccount',
    component: MyAccount
  },
  {
    path: '/myAddress',
    component: MyAddress
  },
  {
    path: '/accountSearch',
    component: AccountSearch
  },
  {
    path: '/notice',
    component: Notice
  },
  {
    path: '/explain',
    component: Explain
  },
  {
    path: '/leaveMessage',
    component: LeaveMessage
  },
  {
    path: '/adminIndex',
    component: AdminIndex
  },
  {
    path: '/adminWelcome',
    component: AdminWelcome
  },
  {
    path: '/monthPlanTable',
    component: MonthPlanTable
  },
  {
    path: '/yearPlanTable',
    component: YearPlanTable
  }
]

const router = new VueRouter({
  // base: '/sun_go/',
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return {
      x: 0,
      y: 0,
      behavior: 'smooth'
    }
  }
})

export default router
