<template>
    <div class="side-bar-container">
        <!-- 侧边栏 -->
        <el-scrollbar  style="height: 100%">
        <el-menu class="side-bar-menu" background-color="#2b3544" text-color="#18BB9A" active-text-color="#D1FFFF"
                 :collapse="isCollapse">
            <sideitem-bar v-for="(item, index) in menuList" :key="index" :item="item"
                          :base-path="item.path"></sideitem-bar>
        </el-menu>
        </el-scrollbar>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import sideitemBar from './SidebarItem'

    export default {
        computed: {
            ...mapGetters(['isCollapse'])
        },
        components: {
            sideitemBar
        },
        data() {
            return {
                menuList: [
                    {
                        path: '/dashboard',
                        title: '首页',
                        icon: 'home'
                    },
                    {
                        // 资产管理
                        path: '/assetsManage',
                        title: '资产管理',
                        icon: 'assetsManage',
                        children: [
                            {
                                path: 'assetsInfo',
                                title: '资产信息'
                            },
                            {
                                path: 'assetsCount',
                                title: '资产统计'
                            }
                        ]
                    },
                    {
                        // 任务管理
                        path: '/taskManage',
                        title: '任务管理',
                        icon: 'taskManage',
                        children: [
                            {
                                path: 'customTestGroup',
                                title: '自定义测试组'
                            },
                            {
                                path: 'taskInfo',
                                title: '任务信息'
                            },
                            {
                                path: 'historyTask',
                                title: '历史任务'
                            }
                        ]
                    },
                    {
                        // 风险管理
                        path: '/holeManage',
                        title: '风险管理',
                        icon: 'holeManage',
                        children: [
                            {
                                path: 'holeInfo',
                                title: '风险信息'
                            },
                            {
                                path: 'holeFollow',
                                title: '风险跟踪'
                            },
                            {
                                path: 'holeCount',
                                title: '风险统计'
                            }
                        ]
                    },
                    {
                        // 工单管理
                        path: '/workManage',
                        title: '工单管理',
                        icon: 'workManage',
                        children: [
                            {
                                path: 'workInfo',
                                title: '工单信息'
                            },
                            {
                                path: 'workPending',
                                title: '待办工单'
                            }
                        ]
                    },
                    {
                        // 统计分析
                        path: '/statisticalAnalysis',
                        title: '统计分析',
                        icon: 'statisticalAnalysis',
                        children:[
                            {
                                path: 'LoopholeRatioReport',
                                title: '漏洞环比统计报表'
                            },
                            {
                                path: 'NetworkSecurityReport',
                                title: '网络安全整改报表'
                            }
                        ]
                    },
                    {
                      path:'/knowledgeManagement',
                      title:'知识管理',
                        icon: 'knowledgeManagement',
                      children:[
                           {
                                path: 'vulnDatabase',
                                title: '漏洞库信息'
                            },
                            {
                                path: 'ComplianceLibrary',
                                title: '合规库信息'
                            },
                            {
                                path: 'information',
                                title: '资讯信息'
                            }

                      ]
                    },
                    {
                        path: '/reportManagement',
                        title: '报告管理',
                        icon: 'reportManagement'
                    },{
                        path:'/userManagement',
                        title:'用户管理',
                        icon: 'userManagement',
                        children:[
                            {
                                path: 'propertyManagement',
                                title: '权限管理'
                            },
                            {
                                path: 'userLists',
                                title: '用户列表'
                            }
                            
                        ]
                    },{
                        path:'/systemManagement',
                        title:'系统管理',
                        icon: 'systemManagement',
                        children:[
                            {
                                path: 'interfaces',
                                title: '接口配置'
                            },
                            {
                                path: 'configurations',
                                title: '参数配置'
                            },
                            {
                                path: 'logsManagement',
                                title: '日志管理'
                            },
                            {
                                path: 'systemState',
                                title: '系统状态'
                            },
                            {
                                path: ' dataDictionary',
                                title: '数据字典配置'
                            },
                            {
                                path: 'PolicySettings',
                                title: '策略配置'
                            }

                        ]
                    }
                ]
            }
        },
    }
</script>
<style lang="scss" scoped>
    .side-bar-container {
        position: fixed;
        top: 50px;
        left: 0;
        bottom: 0;
        box-shadow: 1px 1px 4px 1px #202731;
        z-index: 9999;
        overflow: hidden;
    }

    .el-menu {
        border-right: none;
        // width: 100% !important;
        overflow-x: hidden;
    }

    // .el-submenu .el-menu-item {
    //     width: 152px;
    // }
    .side-bar-menu:not(.el-menu--collapse) {
        width: 162px;
        min-height: 100%;
    }

    .el-menu--collapse {
        width: 64px;
        // transition: width 0.2s;
        min-height: 100%;
    }
</style>


