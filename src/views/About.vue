<template>
  <div class="about">
  <div class="gress-bar clearfix">
      <div><progress></progress></div>
      <div><progress></progress></div>
      <div><progress></progress></div>
      <div><progress></progress></div>
      <div><progress></progress></div>
  </div>
  </div>
</template>

<script>
import Charts from "@/components/Charts";
export default {
  components: {
    Charts
  },
  data() {
    return {
        progressData: [
            {

            }
        ]
    };
  }
};
</script>

<style lang="scss" scoped>
    .gress-bar {
        & > div {
            float: left;
        }
    }
</style>
