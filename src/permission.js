import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken 

// 直接进入白名单
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
    NProgress.start()
    // 无token时候
    if(getToken()) {
        if(to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
        } else {
            next()
            NProgress.done()
        }
    } else { 
        if (whiteList.indexOf(to.path) !== -1) {
            next()
          } else {
            next('/login')
            NProgress.done()
          }
    }
})
router.afterEach(() => {
    NProgress.done() // 结束Progress
  })