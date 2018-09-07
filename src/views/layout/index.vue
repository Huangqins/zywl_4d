<template>
    <div :class="['app-wrapper',{'hidden-bar': isCollapse}]">
            <navbar></navbar>     
            <!-- 布局容器 侧边栏-->
               <sidebar></sidebar>
            <div class="main-container">
                <!-- 主界面 -->
                <!--  面包屑 -->
                <app-main></app-main>
            </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AppMain from './components/AppMain'


export default {
    components: {
        Navbar,
        Sidebar,
        AppMain
    },
    computed: {
        ...mapGetters(['isCollapse'])
    }
}
</script>
<style lang="scss">
.hidden-bar{
    .app-main {
        margin-left: 70px;
    }
}
    .scroll-bar {
        height: 100%;
    }
</style>