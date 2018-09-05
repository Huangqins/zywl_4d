<template>
    <div :class="className" :style="{height:height,width:width}" :id="id"></div>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

export default {
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "350px"
    },
    className: {
      type: String,
      default: "chart"
    },
    chartData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id));
      this.setOptions(this.chartData);
    },
    setOptions(chartData) {
      this.chart.setOption(chartData);
    }
  },
  mounted() {
    this.initChart();
  }
};
</script>

