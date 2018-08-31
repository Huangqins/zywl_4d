<template>
    <div class="side-bar-container">
        <!-- 侧边栏 -->
        <el-menu class="side-bar-menu"  background-color="#252D3A" text-color="#18BB9A" active-text-color="#D1FFFF" :collapse="isCollapse">
            <sideitem-bar v-for="(item, index) in menuList" :key="index" :item="item" :base-path="item.path"></sideitem-bar>
       </el-menu>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
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
                    icon: 'home',
                    children: [
                        {   // 消息通知
                            path: 'messageNotice',
                            title: '消息通知',
                            icon: 'notice'
                        },
                        {   // 个人信息
                            path: 'userInfo',
                            title: '个人信息',
                            icon: 'user'
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
        left:0;
        bottom:0;
        box-shadow: 1px 1px 4px 1px #202731;
        z-index: 9999;
    }
    .el-menu {
        border-right: none;
    }
    .side-bar-menu:not(.el-menu--collapse) {
        width: 152px;
        min-height: 100%;
    }
    .el-menu--collapse {
        width: 64px;
        transition: width 0.2s;
        min-height: 100%;
    }
</style>


