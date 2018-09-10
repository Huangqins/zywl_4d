<template>
    <div class="panel">
    <div class="panel-title" v-if="title">
      <p class="panel-title-text" :style="{height: titleStyle}">{{title}}</p>
    </div>
    <div class="panel-content">
       <slot />
    </div>
    </div>
</template>
<script>
export default {
    computed: {
    titleStyle() {
      if (!this.title) {
        return "100%";
      } else {
        return "calc(100% - 31px)";
      }
    }
  },
  props: {
    title: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang="scss" scoped>
.panel-title{
    color:rgba(209,255,255,1);
    &-text{
        font-size:16px;
        margin: 22px 0 8px 12px;
    }
}
.panel-content{
    background: $main-bg;
    width: auto;
    // height: calc(100% - 31px);
    box-shadow: 4px 0px 4px rgba(29,36,46,1)
}
</style>
