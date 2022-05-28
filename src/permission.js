import router from './router'
import store from './store'
import { getItem } from './utils/storage'

// 路由白名单
const whiteList = ['/login', '/home/**']

router.beforeEach((to, from, next) => {
  const routerNum = router.getRoutes().length
  const routerTotal = getItem('routerNum')
  if (routerNum < routerTotal) {
    store.commit('user/refresh')
    return next(to.fullPath)
  }
  // 查看是否登录
  if (store.getters.token) {
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // next('/login')
      // next() // 测试阶段暂时全部放行
    }
  }
})
