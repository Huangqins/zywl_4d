<template>
    <div class="panel">
    <div class="panel-title" v-if="title">
      <p class="panel-title-text">{{title}}</p>
    </div>
    <div class="panel-content">
       <slot />
    </div>
    </div>
</template>
<script>
export default {
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
    height:15px;
    font-size:16px;
    color:rgba(209,255,255,1);
    margin-bottom: 15px;
    &-text{
        font-size:16px;
    }
}
.panel-content{
    background: rgba(38,49,67,1);
    height:auto;
}
</style>
