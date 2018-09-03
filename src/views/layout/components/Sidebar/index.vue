<template>
    <div class="side-bar-container">
        <!-- 侧边栏 -->
        <el-menu class="side-bar-menu" background-color="#252D3A" text-color="#18BB9A" active-text-color="#D1FFFF"
                 :collapse="isCollapse">
            <sideitem-bar v-for="(item, index) in menuList" :key="index" :item="item"
                          :base-path="item.path"></sideitem-bar>
        </el-menu>
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
                    {   // 消息通知
                        path: 'messageNotice',
                        title: '消息通知',
                        icon: 'notice'
                    },
                    {   // 个人信息
                        path: 'userInfo',
                        title: '个人信息',
                        icon: 'user'
                    },
                    {
                        // 资产管理
                        path: '/assetsManage',
                        title: '资产管理',
                        icon: 'assets',
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
                        title: '统计分析'
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
    }

    .el-menu {
        border-right: none;
        // width: 100% !important;
        overflow: hidden;
    }

    // .el-submenu .el-menu-item {
    //     width: 152px;
    // }
    .side-bar-menu:not(.el-menu--collapse) {
        width: 152px;
        min-height: 100%;
    }

    .el-menu--collapse {
        width: 64px;
        // transition: width 0.2s;
        min-height: 100%;
    }
</style>


