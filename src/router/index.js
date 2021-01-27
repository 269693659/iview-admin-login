import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import ViewUI from 'view-design'
// import { canTurnTo, setTitle } from '@/libs/util'
import { setTitle } from '@/libs/util'
// import { decode } from '@/libs/base64'

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history'
})
// const LOGIN_PAGE_NAME = 'login'

// const turnTo = (to, access, next) => {
//   if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
//   else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
// }

// 保留控制编码
const handlerInitCtrlCode = (to, from, next) => {
return store
.dispatch('handlerInitCtrlCode', [
])
}
const whiteList = ['/login'] // 白名单

const toApp = (to, from, next) => {
  const hasToken = store.state.user.token
  if (hasToken) {
    // 有token
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 如果没有权限
      // ...

      // 如果有权限
      next()
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
  // console.log(from)
  // if (to.fullPath.startsWith('/login')) {
  //   next({
  //     name: LOGIN_PAGE_NAME
  //   })
  //   // beforeApp(to, from, next)
  // } else if (to.fullPath.startsWith('/home')) {
  //   // 未登陆且要跳转的页面是登录页
  //   next() // 跳转
  // } else {
  //   // 其他控制页面
  //   return next()
  // }
}

router.beforeEach(async (to, from, next) => {
  ViewUI.LoadingBar.start()

  // 获取控制编码
  try {
    await handlerInitCtrlCode()
  } catch (error) {
    console.info(error)
  }
  try {
    await toApp(to, from, next)
  } finally {
    ViewUI.LoadingBar.finish()
  }
})

router.afterEach(to => {
  setTitle(to, router.app)
  ViewUI.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
