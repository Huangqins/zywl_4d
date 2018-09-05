<template>
  <div class="about">
    <el-scrollbar style="height: 200px">
      <div style="color:#fff;height: 500px">
          你好
      </div>
    </el-scrollbar>
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
