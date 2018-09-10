<template>
	<div class="breadcrumb">
		<el-breadcrumb separator="/">
      <template v-if="menuList.length === 1">
        <el-breadcrumb-item><span class="no-path">{{menuList[0].meta.title}}</span></el-breadcrumb-item>
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
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(107,119,138,1);
}
.no-path {
  color: #CAD5DB;
}

</style>



