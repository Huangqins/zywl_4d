<template>
    <div class="nav-bar-container">
        <!-- 顶部栏 -->
       <el-menu mode="horizontal" class="nav-bar" background-color="#2b3544" text-color="#18BB9A" 
       active-text-color="#18BB9A" menu-trigger="click">
           <hamburger class="hamburger-container" :toggleClick="TOGGLE_OPEN" :isActive="isCollapse"></hamburger>
           <div class="drop-menu">
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    王姣姣<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
           </div>
       </el-menu>
    </div>
</template>
<script>
import Hamburger from '@/components/Hamburger'
import { mapMutations } from 'vuex'
import { mapGetters } from 'vuex'

export default {
    components: {
        Hamburger
    },
    methods: {
        ...mapMutations(['TOGGLE_OPEN'])
    },
    computed: {
        ...mapGetters(['isCollapse'])
    }
}
</script>
<style lang="scss" scoped>
$color: #18BB9A;

.nav-bar {
    align-items: center;
    box-shadow: 1px 1px 4px 1px #202731;
    height: 50px;
    background: url(../../../../public/img/png/logoS.png) left 65px center no-repeat;
    background-size: 70px 30px;
}
.el-menu--horizontal {
    border: none;
}
.hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
    margin-left: 12px;
    outline: none;
}
.el-dropdown-menu {
    background-color: #1D242E;
    border: none;
    margin-top: 18px;
}
.el-dropdown {
    color: $color;
}
.el-dropdown-menu__item {
    color: $color;
}
.drop-menu {
    float: right;
    margin: 14px 50px 0 0;
}


</style>


