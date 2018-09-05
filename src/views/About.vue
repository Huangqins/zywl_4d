<template>
  <div class="about">
      <charts :chartData="option" id="canvas"></charts>
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
      option: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss">
</style>
