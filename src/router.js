import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Layout = async () => await import('./views/layout')

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard',
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
            path: '/assetsManage',
            component: Layout,
            name: 'assetsManage',
            redirect: 'noredirect',
            meta: {
                title: '资产管理'
            },
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
                },
                {
                    path: 'assetsCount',
                    name: 'assetsCount',
                    meta: {
                        title: '资产统计',
                        menuCode: '02-02'
                    },
                    component: () =>
                        import('@/views/assetsCount')
                },
                {
                    path: 'assetDetail',
                    name: 'AssetDetail',
                    meta: {
                        title: '资产详情',
                        menuCode: '02-02'
                    },
                    component: () =>
                        import('@/views/assetsInfo/assetDetail')
                }
            ]
        },
        {
            path: '/taskManage',
            name: 'taskManage',
            component: Layout,
            redirect: 'noredirect',
            meta: {
                title: '任务管理'
            },
            children: [
                {
                    path: 'customTestGroup',
                    name: 'customTestGroup',
                    meta: {
                        title: '自定义测试组',
                        menuCode: '03-03'
                    },
                    component: () =>
                        import('@/views/customTestGroup')
                },
                {
                    path: 'taskInfo',
                    name: 'taskInfo',
                    meta: {
                        title: '任务信息',
                        menuCode: '03-01'
                    },
                    component: () =>
                        import('@/views/taskInfo')
                },
                {
                    path: 'taskExec',
                    name: 'taskExec',
                    meta: {
                        title: '任务进度',
                        menuCode: '03-01'
                    },
                    component: () =>
                        import('@/views/taskExec')
                },
                {
                    path: 'taskResult',
                    name: 'taskResult',
                    meta: {
                        title: '任务结果详情',
                        menuCode: '03-01'
                    },
                    component: () =>
                        import('@/views/taskResult')
                },
                {
                    path: 'assetsGroup',
                    name: 'assetsGroup',
                    meta: {
                        title: '测试组',
                        menuCode: '03-03'
                    },
                    component: () =>
                        import('@/views/assetsGroup')
                }
            ]
        },
        {
            path: '/holeManage',
            name: 'holeManage',
            component: Layout,
            redirect: 'noredirect',
            meta: {
                title: '风险管理'
            },
            children: [
                {
                    path: 'holeInfo',
                    name: 'holeInfo',
                    meta: {
                        title: '风险信息',
                        menuCode: '04-01'
                    },
                    component: () =>
                         import('@/views/holeInfo')
                },
                {
                    path: 'holeFollow',
                    name: 'holeFollow',
                    meta: {
                        title: '风险跟踪',
                        menuCode: '04-02'
                    },
                    component: () =>
                         import('@/views/holeFollow')
                },
                {
                    path: 'holeCount',
                    name: 'holeCount',
                    meta: {
                        title: '风险统计',
                        menuCode: '04-03'
                    },
                    component: () =>
                         import('@/views/holeCount')
                },
                {
                    path: 'vulnDetail',
                    name: 'vulnDetail',
                    meta: {
                        title: '风险详情',
                        menuCode: '04-03'
                    },
                    component: () =>
                         import('@/views/holeInfo/vulnDetail')
                },{
                    path: 'vulnAdd',
                    name: 'vulnAdd',
                    meta: {
                        title: '风险添加',
                        menuCode: '04-03'
                    },
                    component: () =>
                         import('@/views/holeInfo/vulnAdd')
                }

            ]
        },
        {
           path: '/workManage',
           name: 'workManage',
           component: Layout,
           redirect: 'noredirect',
           meta: {
                title: '工单管理'           
            },
            children: [
                {
                    path: 'workInfo',
                    name: 'workInfo',
                    meta: {
                        title: '工单信息',
                        menuCode: '05-01'
                    },
                    component: () =>
                         import('@/views/workInfo')
                },
                {
                    path: 'workPending',
                    name: 'workPending',
                    meta: {
                        title: '待办工单',
                        menuCode: '05-02'
                    },
                    component: () =>
                         import('@/views/workPending')
                },
                {
                    path: 'workAdd',
                    name: 'workAdd',
                    meta: {
                        title: '创建工单',
                        menuCode: '05-02'
                    },
                    component: () =>
                         import('@/views/workInfo/workAdd')
                },
                {
                    path: 'workContent',
                    name: 'workContent',
                    meta: {
                        title: '工单详情',
                        menuCode: '05-02'
                    },
                    component: () =>
                         import('@/views/workContent')
                }
            ]
        },
        {
            path: '/statisticalAnalysis',
            name: 'statisticalAnalysis',
            component: Layout,
            redirect: 'noredirect',
            meta: {
                title: '统计分析'
            },
            children: [
                {
                    path: 'LoopholeRatioReport',
                    name: 'LoopholeRatioReport',
                    meta: {
                        title: '漏洞环比统计报表',
                        menuCode: '06-01'
                    },
                    component: () =>
                         import('@/views/LoopholeRatioReport')
                },
                {
                    path: 'NetworkSecurityReport',
                    name: 'NetworkSecurityReport',
                    meta: {
                        title: '网络安全整改报表',
                        menuCode: '05-02'
                    },
                    component: () =>
                         import('@/views/NetworkSecurityReport')
                }
            ]
        },
        {
            path: '/knowledgeManagement',
            name: 'knowledgeManagement',
            component: Layout,
            redirect: 'noredirect',
            meta: {
                title: '知识管理'
            },
            children: [
                {
                    path: 'vulnDatabase',
                    name: 'vulnDatabase',
                    meta: {
                        title: '漏洞库信息',
                        menuCode: '07-01'
                    },
                    component: () =>
                         import('@/views/vulnDatabase')
                },
                {
                    path: 'ComplianceLibrary',
                    name: 'ComplianceLibrary',
                    meta: {
                        title: '合规库信息',
                        menuCode: '07-02'
                    },
                    component: () =>
                         import('@/views/ComplianceLibrary')
                },
                {
                    path: 'information',
                    name: 'information',
                    meta: {
                        title: '资讯信息',
                        menuCode: '07-03'
                    },
                    component: () =>
                         import('@/views/information')
                },
                {
                    path: 'addDatabase',
                    name: 'addDatabase',
                    meta: {
                        title: '漏洞编辑',
                        menuCode: '07-03'
                    },
                    component: () =>
                         import('@/views/vulnDatabase/addDatabase')
                },
            ]
        },
        {
            path: '/',
            component: Layout,
            redirect: 'noredirect',
            children: [
                {
                    path: 'reportManagement',
                    name: 'reportManagement',
                    meta: {
                        title: '报告管理',
                        menuCode: '08'
                    },
                    component: () =>
                         import('@/views/reportManagement')
                },
                {
                    path: 'addReport',
                    name: 'addReport',
                    meta: {
                        title: '创建报告',
                        menuCode: '08-01'
                    },
                    component: () =>
                         import('@/views/reportManagement/addReport')
                }
            ]
        },
        {
            path: '/userManagement',
            component: Layout,
            redirect: 'noredirect',
            name: 'userManagement',
            meta: {
                title: '用户管理'
            },
            children: [
                {
                    path: 'propertyManagement',
                    name: 'propertyManagement',
                    meta: {
                        title: '权限管理',
                        menuCode: '09-01'
                    },
                    component: () =>
                         import('@/views/propertyManagement')
                },
                {
                    path: 'userLists',
                    name: 'userLists',
                    meta: {
                        title: '用户列表',
                        menuCode: '09-02'
                    },
                    component: () =>
                         import('@/views/userLists')
                },
                {
                    path: 'authority',
                    name: 'authority',
                    meta: {
                        title: '用户权限',
                        menuCode: '09-01'
                    },
                    component: () => 
                    import('@/views/authority')
                },
                {
                    path: 'addUser',
                    name: 'addUser',
                    meta: {
                        title: '用户操作',
                        menuCode: '09-02-01'
                    },
                    component: () => 
                    import('@/views/addUser')
                }
            ]
        },
        {
            path: '/systemManagement',
            name: 'systemManagement',
            redirect: 'noredirect',
            component: Layout,
            meta: {
                title: '系统管理'
            },
            children: [
                {
                    path: 'interfaces',
                    name: 'interfaces',
                    meta: {
                        title: '接口配置',
                        menuCode: '10-01'
                    },
                    component: () =>
                         import('@/views/interfaces') 
                },
                {
                    path: 'configurations',
                    name: 'configurations',
                    meta: {
                        title: '参数配置',
                        menuCode: '10-02'
                    },
                    component: () =>
                         import('@/views/configurations') 
                },
                {
                    path: 'logsManagement',
                    name: 'logsManagement',
                    meta: {
                        title: '日志管理',
                        menuCode: '10-03'
                    },
                    component: () =>
                         import('@/views/logsManagement') 
                },
                {
                    path: 'systemState',
                    name: 'systemState',
                    meta: {
                        title: '系统状态',
                        menuCode: '10-04'
                    },
                    component: () =>
                         import('@/views/systemState') 
                },
                {
                    path: 'dataDictionary',
                    name: 'dataDictionary',
                    meta: {
                        title: '数据字典配置',
                        menuCode: '10-05'
                    },
                    component: () =>
                         import('@/views/dataDictionary') 
                },
                {
                    path: 'PolicySettings',
                    name: 'PolicySettings',
                    meta: {
                        title: '策略配置',
                        menuCode: '10-06'
                    },
                    component: () =>
                         import('@/views/PolicySettings') 
                },
                {
                    path: 'addPolicySetting',
                    name: 'addPolicySetting',
                    meta: {
                        title: '新增策略',
                        menuCode: '10-06'
                    },
                    component: () =>
                         import('@/views/PolicySettings/addPolicySetting') 
                }
            ]
        }
    ]
})