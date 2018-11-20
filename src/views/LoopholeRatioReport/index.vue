<template>
  <div>
    <div>
      <panel title='漏洞环比当月报表'>
        <div style="height:318px;">
          <el-table :data="vulnData" style="width: 100%;height:274px;overflow:auto;">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="group_name" label="系统名称" align="center"></el-table-column>
            <el-table-column prop="vuln_total" label="漏洞数量" align="center"></el-table-column>
            <el-table-column prop="vuln_oper" label="本月新增漏洞数量" align="center"></el-table-column>
            <el-table-column prop="vuln_Port" label="上月遗漏漏洞数量" align="center"></el-table-column>
            <el-table-column prop="vuln_IP" label="完成整改数" align="center"></el-table-column>
          </el-table>
          <div style="padding-bottom:5px;">
            <!-- <pages :total="vulnpageTotal" @pageChange="vulnpageChange"></pages> -->
          </div>
        </div>
      </panel>
    </div>
    <div>
      <panel title='漏洞环比月度报表'>
        <div class="vulncircle">
          <div class="vulncircle-search">
            <span>业务系统级别:</span>
            <el-input v-model="input" placeholder="请输入内容" style="width:200px;margin:0 10px"></el-input>
            <span>部门机构:</span>
            <el-input v-model="input" placeholder="请输入内容" style="width:200px;margin:0 10px"></el-input>
            <el-date-picker v-model="start_time" type="datetime" placeholder="选择日期"></el-date-picker>
            <span style="margin:0 10px;">至</span>
            <el-date-picker v-model="end_time" type="datetime" placeholder="选择日期" style="margin-right:30px;"></el-date-picker>
            <el-button>查询</el-button>
          </div>
          <div class="vulncircle-content">
            <p>漏洞环比月度报表</p>
            <charts :chartData="option" id="canvas"></charts>
            <div class="vulnmonth">
              <p>漏洞环比月度报表</p>
              <el-table :data="tableData3" style="width: 100%">
                <el-table-column prop="stop" label="" width="150">
                  <el-table-column prop="" label=""></el-table-column>

                </el-table-column>
                <el-table-column prop="date" label="2018年05" width="150">
                  <el-table-column prop="province" label=""></el-table-column>
                  <el-table-column prop="city" label=""></el-table-column>
                  <el-table-column prop="address" label=""></el-table-column>
                  <el-table-column prop="zip" label=""></el-table-column>
                </el-table-column>

                <el-table-column label="2018年06">
                  <el-table-column prop="province" label=""></el-table-column>
                  <el-table-column prop="city" label=""></el-table-column>
                  <el-table-column prop="address" label=""></el-table-column>
                  <el-table-column prop="zip" label=""></el-table-column>
                </el-table-column>
                <el-table-column label="2018年07">
                  <el-table-column prop="province" label=""></el-table-column>
                  <el-table-column prop="city" label=""></el-table-column>
                  <el-table-column prop="address" label=""></el-table-column>
                  <el-table-column prop="zip" label=""></el-table-column>
                </el-table-column>

              </el-table>
            </div>
          </div>
        </div>
      </panel>
    </div>
  </div>
</template>
<script>
import Panel from "@/components/panel";
import Pages from "@/components/Pages";
import Charts from "@/components/Charts";
export default {
  components: {
    Panel,
    Pages,
    Charts
  },
  data() {
    return {
      input: "",
      start_time: "",
      end_time: "",
      tableData3: [
        {
          stop: "已整改漏洞"
        },
        {
          stop: "未整改漏洞"
        }
      ],
      vulnData: [],
      vulnpageTotal: 0,
      mock: [
        {
          group_name: "操作类型",
          vuln_IP: "2018-07",
          vuln_total: 10,
          vuln_status: 3
        },
        {
          group_name: "终端程序",
          vuln_IP: "2018-08",
          vuln_total: 5,
          vuln_status: 3
        },
        {
          group_name: "提交数据",
          vuln_IP: "2018-08",
          vuln_total: 13,
          vuln_status: 4
        },
        {
          group_name: "终端程序",
          vuln_IP: "2018-09",
          vuln_total: 6,
          vuln_status: 3
        },
        {
          group_name: "操作类型",
          vuln_IP: "2018-09",
          vuln_total: 8,
          vuln_status: 1
        },
        {
          group_name: "操作类型",
          vuln_IP: "2018-09",
          vuln_total: 12,
          vuln_status: 3
        },
        {
          group_name: "提交数据",
          vuln_IP: "2018-09",
          vuln_total: 18,
          vuln_status: 2
        }
      ],
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: [ '已整改','未整改'  ]
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

          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
            textStyle: {
              color: "#CCCCCC"
            }
          }
          }
        ],
        series: [  ]
      }
    };
  },
  created() {
    this.vulnMonthTotal();
    this.vulnMonth();
  },
  methods: {
    async vulnMonthTotal() {
      let res = await this.$api.vulnMonthTotal();
      if (res.data.result == "0") {
        this.vulnData = res.data.vulns;
      }
    },
    async vulnMonth() {
      let res = await this.$api.vulnMonth();
      if (res.data.result == "0") {
        let data = res.data.vulns;
        console.log(data.filter(item => {
          return item.vuln_total !== 0
        }), '数量')
        // let data = this.mock;
        let timeArr = [],
          typeArr = [],
          lastArr = [];
        timeArr = data.map(item => {
          return item.vuln_IP;
        });
        timeArr = Array.from(new Set(timeArr));
        // 类型提取，需要所有类型
        typeArr = data.map(item => {
          return item.group_name;
        });
        typeArr = Array.from(new Set(typeArr));
        this.option.xAxis[0].data = timeArr;
        let temp = ["已整改", "未整改"];
        // 创建seria
        let series = [];
        
        typeArr.forEach(item => {
          
          temp.forEach(it => {
            series.push({
              name:`${it}${item}`,
              type: "bar",
              stack: item,
              status: `${it}${item}`,
              data: []
            });
          });
        });
        console.log(series)
        // 模拟基本结构
        res.data.vulns.forEach(item => {
          if (
            item.vuln_status == 0 ||
            item.vuln_status == 3 ||
            item.vuln_status == 4
          ) {
            item.status = "未整改" + item.group_name;
          } else {
            item.status = "已整改" + item.group_name;
          }
        });
        series.forEach(item => {
          let temp = [];
          temp =res.data.vulns.filter(it => {             
            return it.status == item.status;
          });         
          temp.forEach(ti => {
            for (let i = 0; i < timeArr.length; i++) {
              if (ti.vuln_IP === timeArr[i]) {
                item.data[i] = ti.vuln_total;
              }
            }
          });
          if (temp.length === 0) {
            for (let i = 0; i < timeArr.length; i++) {
              item.data[i] = 0;
            }
          }
        });
        // 处理最终数据
        series.forEach(item => {
          if (item.data.length !== timeArr.length) {
            item.data[timeArr.length - 1] = 0;
          }
        });
        series.forEach(item => {
          if (item.data.length === timeArr.length) {
            for (let i = 0; i < item.data.length; i++) {
              if (item.data[i] === undefined) {
                item.data[i] = 0;
              }
            }
          }
        });
        this.option.series = series;
        
      }
    },

    vulnpageChange() {}
  }
};
</script>
<style lang="scss" scoped>
.vulncircle {
  padding: 0 20px;
  font-size: 14px;
  &-search {
    padding: 10px;
    border-bottom: 1px solid #6b778a;
  }
}
.vulnmonth p {
  padding: 0 30px;
  color: #18bb9a;
}
</style>


