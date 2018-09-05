<template>
    <!-- <el-scrollbar  class="app-main"> -->
    <section class="app-main">
        <transition name="fade-transform" mode="out-in">
        <router-view :key="key"></router-view>
    </transition>
    </section>
    <!-- </el-scrollbar> -->
</template>

<script>
export default {
  computed: {
    key() {
      return this.$route.fullPath;
    },
    isCollapse() {
      return true;
    }
  }
};
</script>
<style lang="scss">
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  height: calc(100vh - 50px);
  position: relative;
  margin-left: 150px;
  min-width: 1200px;
  overflow: auto;
  transition: margin-left 0.4s;
  color: #fff;
}
</style>

