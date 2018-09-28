<template>
     <div>
          <el-tooltip effect="dark" :content="vulnMap[vuln_level]" placement="top">
              <div :class="['vuln-level-tag',`vuln-level-${vuln_level}`]"></div>
          </el-tooltip>
     </div>
      
</template>

<script>

const vulnMap = [
  "极低风险",
  "低风险",
  "中风险",
  "高风险",
  "极高风险"
];

export default {
    props: {
        vuln_level: {
            type: [Number,String],
            default: ''
        }
    },
    data() {
        return {
            vulnMap
        }
    }
}
</script>

<style lang="scss" scoped>
.vuln-level-tag {
  width: 50px auto;
  height: 7px;
}
@for $i from 0 through 4 {
  .vuln-level-#{$i} {
    background: url(../../../public/img/png/#{$i}.png) center center no-repeat;
    background-size: 50px 7px;
  }
}
</style>

