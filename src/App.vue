<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
}
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #222934;
}
.router-link-active {
   background-color:  rgb(30,36,46)
}
  .el-scrollbar__view {
    height: 100%;
  }
  ul {
      margin: 0;
      padding: 0;
  }
  li {
      margin: 0;
      padding: 0;
    list-style-type: none;
  }
</style>
