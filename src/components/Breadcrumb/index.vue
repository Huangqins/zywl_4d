<template>
	<div class="breadcrumb">
		<el-breadcrumb separator="/">
      <template v-if="menuList.length === 1">
        <el-breadcrumb-item>{{menuList[0].meta.title}}</el-breadcrumb-item>
      </template>
      <template v-else>
        <el-breadcrumb-item v-for="(item, index) in menuList" :key="item.path">
          <span v-if="index === menuList.length-1 || item.redirect === 'noredirect'" class="no-path">{{item.meta.title}}</span>
           <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
	</div>
</template>
<script>
export default {
  watch: {
    '$route': {
      handler(to)  {
          this.menuList = to.matched.filter(item => item.name);
            console.log( this.menuList)
      },
      immediate: true
    }
  },
  data() {
    return {
      menuList: []
    }
  }
}
</script>


<style lang="scss" scoped>
.breadcrumb {
  margin-bottom: 15px;
}

</style>



