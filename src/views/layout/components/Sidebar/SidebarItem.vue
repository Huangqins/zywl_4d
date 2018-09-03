<template>
        <!--  没有子菜单的情况 -->
        <router-link v-if="!item.children" :to="item.path">
            <el-menu-item :index="item.path">
                <svg-icon v-if="item.icon" :icon-class="item.icon"></svg-icon>
                <span slot="title">{{item.title}}</span>
            </el-menu-item>
        </router-link>
        <!--  有子菜单的情况 -->
        <el-submenu v-else :index="item.name||item.path">
            <template slot="title">
                <svg-icon v-if="item.icon" :icon-class="item.icon"></svg-icon>
                <span slot="title" >{{item.title}}</span>
            </template>
            <template v-for="child in item.children">
                <sidebar-item :is-nest="true"  v-if="child.children && child.children.length>0" :item="child" :key="child.path" :base-path="resolvePath(child.path)"></sidebar-item>
                <router-link v-else :to="resolvePath(child.path)" :key="child.name" tag="div">
                    <el-menu-item :index="resolvePath(child.path)">
                        <svg-icon v-if="child.icon" :icon-class="child.icon"></svg-icon>
                        <span  v-if="child.title" slot="title" class="childtitle">{{child.title}}</span>
                    </el-menu-item>
                </router-link>
            </template>
        </el-submenu>
</template>

<script>
    import path from 'path'

    export default {
        name: 'SidebarItem',
        props: {
            // route object
            item: {
                type: Object,
                required: true
            },
            isNest: {
                type: Boolean,
                default: false
            },
            basePath: {
                type: String,
                default: ''
            }
        },
        methods: {
            resolvePath(...paths) {
                return path.resolve(this.basePath, ...paths)
            }
        }
    }
</script>

<style lang="scss" scoped>
.childtitle{
    font-size: 12px;
}
</style>
