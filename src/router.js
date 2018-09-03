import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Layout = async () => await import('./views/layout')

export default new Router({
    routes: [
        {
            path: '/',
            component: Layout
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('./views/About')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/login')
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Layout,
            meta: {
                title: '首页',
                menuCode: '01'
            }
        },
        {   // 消息通知
            path: '/messageNotice',
            name: 'messageNotice',
            meta: {
                title: '消息通知',
                menuCode: '01',
            },
            component: () => import('@/views/messageNotice')
        },
        {   // 个人信息
            path: 'userInfo',
            name: 'userInfo',
            meta: {
                title: '个人信息',
                menuCode: '01'
            },
            component: () => import('@/views/userInfo')
        }

    ]
})
