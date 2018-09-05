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
            component: () =>
                import('./views/About')
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import('./views/login')
        },
        {
            path: '/',
            component: Layout,
            children: [{
                path: 'dashboard',
                name: 'dashboard',
                meta: {
                    title: '首页',
                    menuCode: '01'
                },
                component: () =>
                    import('@/views/dashboard')
            }],

        },
        { // 消息通知
            path: '/',
            component: Layout,
            children: [{
                name: 'messageNotice',
                path: 'messageNotice',
                meta: {
                    title: '消息通知',
                    menuCode: '01',
                },
                component: () =>
                    import('@/views/messageNotice')
            }]
        },
        { // 个人信息
            path: '/',
            component: Layout,
            children: [
                {
                    path: 'userInfo',
                    name: 'userInfo',
                    meta: {
                        title: '个人信息',
                        menuCode: '01'
                    },
                    component: () =>
                        import('@/views/userInfo')
                }
            ]
        },
        {
            path: '/',
            component: Layout,
            children: [
                {
                    path: 'assetsInfo',
                    name: 'assetsInfo',
                    meta: {
                        title: '资产信息',
                        menuCode: '02-01'
                    },
                    component: () =>
                        import('@/views/assetsInfo')
                }
            ]
        },
        {
            path: '/',
            component: Layout,
            children: [
                {
                    path: 'assetsCount',
                    name: 'assetsCount',
                    meta: {
                        title: '资产统计',
                        menuCode: '02-02'
                    },
                    component: () =>
                        import('@/views/assetsCount')
                }
            ]
        },
        {
            path: '/',
            component: Layout,
            children: [
                {
                    path: 'customTestGroup',
                    name: 'customTestGroup',
                    meta: {
                        title: '自定义测试组',
                        menuCode: '02-02'
                    },
                    component: () =>
                        import('@/views/customTestGroup')
                }
            ]
        },
        {
            path: '/taskManage',
            component: Layout,
            children: [
                {
                    path: 'taskInfo',
                    name: 'taskInfo',
                    meta: {
                        title: '任务信息',
                        menuCode: '02-02'
                    },
                    component: () =>
                        import('@/views/taskInfo')
                }
            ]
        }
    ]
})