<template>
    <div class="side-bar-container">
        <!-- 侧边栏 -->
        <el-menu class="side-bar-menu"  background-color="#202731" text-color="#18BB9A" active-text-color="#D1FFFF" :collapse="isCollapse">
            <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
            </el-menu-item>
       </el-menu>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(['isCollapse'])
    }
}
</script>
<style lang="scss" scoped>
    .side-bar-container {
        position: fixed;
        top: 50px;
        left:0;
        bottom:0;
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


