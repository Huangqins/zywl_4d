<template>
    <div class="holeCount">
        <div class="top">
            <panel title="风险TOP10">
                <el-table :data="holeTopList" style="width: 100%">
                    <el-table-column label="漏洞排行" type="index" width="100" align="center"></el-table-column>
                    <el-table-column prop="name" label="漏洞名称" align="center"></el-table-column>
                    <el-table-column prop="vuln_total" label="漏洞数量" align="center"></el-table-column>
                </el-table>
            </panel>
            <panel title="业务系统风险TOP10">
                <div style="height:528px;background:#273143;">
                    <el-table :data="businessList" style="width: 100%">
                    <el-table-column prop="logic_name" label="业务功能名称"></el-table-column>
                    <el-table-column prop="assets_url" label="业务系统"></el-table-column>
                    <el-table-column prop="vuln_Num" label="风险数量"></el-table-column>
                </el-table>
                </div>
            </panel>
        </div>
        <div class="trendChart">
            <panel title="风险变化趋势">
              <div>
                  <charts :chartData="option" id="canvas" ></charts>
              </div>
            </panel>
        </div>
        <div class="spread">
            <panel title="风险类型分布">
              <div>
                    <charts :chartData="vulnType" id="vulnType" ></charts>
              </div>
            </panel>
            <panel title="高中低风险状况">
              <div>
                 <charts :chartData="vulnClass" id="vulnClass"></charts>
              </div>
              
            </panel>
            <panel title="进展分析总体整改情况">
               <div>
                 <charts :chartData="processSution"  id="processSution"></charts>
              </div>
            </panel>
        </div>
        <div class="spreadChart">
            <panel title="资产类型风险分布">
               <charts :chartData="assetsType" id="assetsType"></charts>
            </panel>
            <panel title="区域漏洞分布">
               <charts :chartData="areavuln" id="areavuln"></charts>
            </panel>
        </div>
        <div class="countTable">
            <panel title="漏洞修复统计表">
                <el-table :data="countData" style="width: 100%">
                    <el-table-column prop="vuln_name" label="统计类型" align="center"></el-table-column>
                    <el-table-column prop="vuln_Num" label="修复总数" align="center"></el-table-column>
                    <el-table-column prop="vuln_class" label="小于10天的修复数量" align="center"></el-table-column>
                    <el-table-column prop="vuln_type" label="10 - 30 天的修复数量" align="center"></el-table-column>
                    <el-table-column prop="vuln_des" label="大于30天的修复数量" align="center"></el-table-column>
                    <el-table-column prop="vuln_code" label="未修复总数" align="center"></el-table-column>
                </el-table>
            </panel>
        </div>
    </div>
</template>
<script>
import panel from "@/components/panel";
import Charts from "@/components/Charts";
export default {
  components: {
    panel,
    Charts
  },
  data() {
    return {
      holeTopList: [],
      businessList: new Array(10),
      countData: [],
      option: {
        xAxis: {
          type: "category",
          data: [],
          axisLabel: {
            textStyle: {
              color: "#CCCCCC"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#CCCCCC"
            }
          }
        },
        yAxis: {

          type: "value",
          axisLabel: {
            textStyle: {
              color: "#CCCCCC"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#263143"
            }
          }
        },
        series: [
          {
            data: [],
            type: "line",
            smooth: true
          }
        ]
      },
      vulnType: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        color: ["#003366", "#006699", "#4cabce", "#e5323e"],
        legend: {
          data: []
        },
        xAxis: {
          type: "category",
          data: [],
          axisLabel: {
            textStyle: {
              color: "#CCCCCC"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#CCCCCC"
            }
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              color: "#CCCCCC"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#263143"
            }
          }
        },
        series: [
          {
            data: [],
            type: "bar"
          }
        ]
      },
      vulnClass: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
          {
            name: "风险分布",
            type: "pie",
            radius: "40%",
            center: ["50%", "45%"],
            color: ["#c33936", "#e27c32", "#e5b918", "#47b30d", "#36a5c1"],
            data: [
              { value: 0, name: "极高风险" },
              { value: 0, name: "高风险" },
              { value: 0, name: "中风险" },
              { value: 0, name: "低风险" },
              { value: 0, name: "极低风险" }
            ]
          }
        ]
      },
      processSution: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
          {
            name: "风险分布",
            type: "pie",
            radius: "40%",
            center: ["50%", "45%"],
            color: ["#c33936", "#e27c32", "#e5b918", "#47b30d", "#36a5c1"],
            data: [
              { value: 0, name: "接受风险" },
              { value: 0, name: "已处理" },
              { value: 0, name: "待处理" }
            ]
            //  data: [    ]
          }
        ]
      },
      assetsType: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["极高风险", "高风险", "中风险", "低风险", "极低风险"],
          textStyle: {
            color: "#fff"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisLabel: {
              textStyle: {
                color: "#CCCCCC"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#CCCCCC"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#CCCCCC"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#263143"
              }
            }
          }
        ],
        series: [
          {           
                name: "极低",
                type: "bar",
                stack: "",
                data: []             
       
          },
          {           
                name: "低",
                type: "bar",
                stack: "",
                data: []           
       
          },
          {           
                name: "中",
                type: "bar",
                stack: "",
                data: []            
       
          },
          {           
                name: "高",
                type: "bar",
                stack: "",
                data: []            
       
          },
          {     name: "极高",
                type: "bar",
                stack: "",
                data: []        
       
          }
          
        ]
      },
      areavuln: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["极低风险", "低风险", "中风险", "高风险", "极高"],
          textStyle: {
            color: "#fff"
          }
        },
         color: [
          "#36A5C1",
          "#47B30D",
          "#E5B918",
          "#E27C32",
          "#C33936",
          "#CAD5DB"
        ],
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisLabel: {
              textStyle: {
                color: "#CCCCCC"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#CCCCCC"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#CCCCCC"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#263143"
              }
            }
          }
        ],
        series: [
           {           
                name: "极低",
                type: "bar",
                stack: "",
                data: []             
       
          },
          {           
                name: "低",
                type: "bar",
                stack: "",
                data: []           
       
          },
          {           
                name: "中",
                type: "bar",
                stack: "",
                data: []            
       
          },
          {           
                name: "高",
                type: "bar",
                stack: "",
                data: []            
       
          },
          {     name: "极高",
                type: "bar",
                stack: "",
                data: []        
       
          }
        ]
      }
    };
  },
  created() {
    this.vulnTopTen();
    this.vulnNumTotal();
    this.vulnTrend();
    this.vulnTotal();
    this.vulnCorrective();
    this.getVulnLevel();
    this.getAreaVuln();
    this.logicVuln();
    this.repairTotal()
  },
  methods: {
    //漏洞修复统计表
    async repairTotal(){
      let res=await this.$api.repairTotal();
      if(res.data.result==0){
        let data=res.data.list
        console.log(data)
        this.countData=data
      }
    },
    // 资产类型风险分布
    async getVulnLevel() {
      let res = await this.$api.getVulnLevel();
      if (res.data.result === 0) {
          let data = res.data.assets;      
          this.assetsType.series[0].data.push(
              data[0].vuln_tips,
              data[1].vuln_tips,
              data[2].vuln_tips
              // item.vuln_tips,
              // item.vuln_tips
          )
          this.assetsType.series[1].data.push(
              data[0].vuln_low,
              data[1].vuln_low,
              data[2].vuln_low
          )
          this.assetsType.series[2].data.push(
              data[0].vuln_medium,
              data[1].vuln_medium,
              data[2].vuln_medium
          )
          this.assetsType.series[3].data.push(
              data[0].vuln_high,
              data[1].vuln_high,
              data[2].vuln_high
          )
          this.assetsType.series[4].data.push(
              data[0].vuln_urgent,
              data[1].vuln_urgent,
              data[2].vuln_urgent
          )    
           data.forEach(item=>{
             this.assetsType.xAxis[0].data.push(item.name);
           })
          
      
      }
    },
    //业务系统风险Top10
    async logicVuln() {
      let res = await this.$api.logicVuln();
      if (res.data.result == 0) {
        let data = res.data.vulns;
        this.businessList = data;
      }
    },
    //风险Top10
    async vulnTopTen() {
      let res = await this.$api.vulnTopTen();
      if (res.data.result === 0) {
        if (res.data.lists.length < 10) {
          let fill = new Array(10 - res.data.lists.length);
          this.holeTopList = [...res.data.lists, ...fill];
        } else {
          this.holeTopList = res.data.lists;
        }
      }
    },
    // 风险变化趋势
    async vulnTrend(params) {
      let res = await this.$api.vulnTrend(params);
      if (res.data.result == "0") {
        let data = res.data.lists;
        data.forEach(item => {
          this.option.series[0].data.push({
            value: item.vuln_total,
            name: item.vuln_name
          });
          this.option.xAxis.data.push(item.vuln_name);
        });
      }
    },
    // 风险类型分布
    async vulnNumTotal() {
      let res = await this.$api.vulnNumTotal();
      if (res.data.result === 0) {
        let data = res.data.vulns;
        data.forEach(item => {
          this.vulnType.series[0].data.push({
            value: item.vuln_total,
            name: item.vuln_type
          });
          this.vulnType.xAxis.data.push(item.vuln_type);
          this.vulnType.legend.data.push(item.vuln_type);
        });
      }
    },
    // 高中低风险状况
    async vulnTotal() {
      let res = await this.$api.vulnTotal();
      if (res.data.result === 0) {
        res.data.vulns.forEach(item => {
          this.vulnClass.series[0].data[4 - item.vuln_level].value =
            item.vuln_total;
        });
      }
    },
    //进展情况
    async vulnCorrective() {
      let res = await this.$api.vulnCorrective();
      if (res.data.result === 0) {
        res.data.vulns.forEach(item => {
          this.processSution.series[0].data[0].value = item.vuln_total;
          this.processSution.series[0].data[1].value = item.vuln_status;
          this.processSution.series[0].data[2].value = item.vuln_detail;
        });
      }
    },
    
    // 区域漏洞分布
    async getAreaVuln() {
      let res = await this.$api.getAreaVuln();
      if (res.data.result === 0) {
        let data = res.data.assets;
        this.areavuln.series[0].data.push(
              data[0].vuln_tips,
              // data[1].vuln_tips,
              // data[2].vuln_tips
              // item.vuln_tips,
              // item.vuln_tips
          )
          this.areavuln.series[1].data.push(
              data[0].vuln_low,
              // data[1].vuln_low,
              // data[2].vuln_low
          )
          this.areavuln.series[2].data.push(
              data[0].vuln_medium,
              // data[1].vuln_medium,
              // data[2].vuln_medium
          )
          this.areavuln.series[3].data.push(
              data[0].vuln_high,
              // data[1].vuln_high,
              // data[2].vuln_high
          )
          this.areavuln.series[4].data.push(
              data[0].vuln_urgent,
              // data[1].vuln_urgent,
              // data[2].vuln_urgent
          )  
        data.forEach(item => {    
          this.areavuln.xAxis[0].data.push(item.area_name);
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.top,
.spreadChart {
  display: flex;
  & > div {
    flex: 1;
  }
  & > div:nth-child(1) {
    margin-right: 20px;
  }
}

.spread {
  display: flex;
  & > div:not(:last-child) {
    margin-right: 20px;
  }
  & > div:nth-child(1) {
    flex: 2;
  }
  & > div:nth-child(2),
  & > div:nth-child(3) {
    flex: 1;
  }
}
</style>
