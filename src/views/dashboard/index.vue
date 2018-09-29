<template>
  <div class="homePage">
    <div class="outsideInfo">
      <div>外部资讯:</div>
      <div>{{outsideInfo}}</div>
      <div>更多...</div>
    </div>
    <div class="sectionOne">
      <div class='sectionOne-left'>
        <panel>
          <div class="deviceType">
              <charts :chartData="assetsoption" id="assetsoption" height="100%"></charts>
          </div>
        </panel>
      </div>
      <div class='sectionOne-state'>
        <panel>
          <div class="deviceType">
            <charts :chartData="option" id="canvas" height="100%"></charts>
          </div>
        </panel>
      </div>
      <div class='sectionOne-vulnLeveal'>
        <panel>
          <div class="sectionOne-vulnLeveal-left">
            <charts :chartData="chartData" height="100%" id="chartData"></charts>
          </div>
          <div class="vulntext">
            <div>
              <p><span>极</span>极高风险数</p>
              <p>{{vuln_level_num[4]}}</p>
            </div>
            <div>

              <p><span style="background: #DD7C35;">高</span>高风险数</p>
              <p>{{vuln_level_num[3]}}</p>
            </div>
            <div>

              <p><span style="background: #E2B928;">中</span>中风险数</p>
              <p>{{vuln_level_num[2]}}</p>

            </div>
            <div>

              <p> <span style="background: #51B323;">低</span>低风险数</p>
              <p>{{vuln_level_num[1]}}</p>
            </div>
            <div>

              <p><span style="background: #46A5C0;">末</span>极低风险数</p>
              <p>{{vuln_level_num[0]}}</p>
            </div>
          </div>
        </panel>
      </div>
    </div>
    <div class="sectionTwo">
        <div class='sectionTwo-left'>
            <panel title="风险变化趋势">
                <div class="">
                    <charts :chartData="vulnchange" id="vulnchange" height="254px"></charts>
                </div>
            </panel>    
        </div>
        <div class='sectionTwo-state'>
            <panel title="服务情况">
                <el-scrollbar  style="height: 100%">
                <div class="hole-record-types" style="overflow:auto;margin-top:17px;height:240px">            
                    <div class="hole-pic" v-for="(item,index) in serviceLists" :key="index" v-if="serviceLists.length>0" >
                        <h3>{{item.total_num}}</h3>
                        <h5>
                          <el-tooltip :content='item.info' placement="bottom" effect="light">
                            <span>{{item.info.length>12?item.info.slice(0,6):item.info}}</span>
                          </el-tooltip>                          
                        </h5>
                    </div>          
               </div>
               </el-scrollbar>
            </panel>    
        </div>
        <div class='sectionTwo-vulnLeveal'>
            <panel title="资产情况">                
                <div class="vulnChange-tasks">
                         <div >
                            <div class="task-data-1 host"></div>
                            <p>{{hostTotal}}</p>
                            <p>主机数</p>
                        </div>                       
                        <div >
                            <div class="task-data-1 vulnTotal"></div>                  
                            <p>{{vulnTotalS}}</p>
                            <p>开放服务</p>
                        </div>
                       
                         <div>
                            <div class="task-data-1 riskTotal"></div>
                            <p>{{holeTotal}}</p>
                            <p>风险总数</p>
                        </div>
                        <div>
                            <div class="task-data-1 hostvuln"></div>
                            <p>{{mainvulnTotal}}</p>
                            <p>主机漏洞总数</p>
                        </div>
                        <div>
                            <div class="task-data-1 webvuln"></div>
                            <p>{{webvulnTotal}}</p>
                            <p>WEB漏洞总数</p>
                        </div>
                        <div>
                            <div class="task-data-1 yw"></div>
                            <p>{{ywvulnTotal}}</p>
                            <p>业务风险总数</p>
                        </div>
             </div>
            </panel>    
        </div>
    </div>
    <div class="sectionThree">
        <div class='sectionThree-left'>
            <panel title="资产列表">
                <div class="">
                    <el-table :data="assetsList" style="width: 100%;" height="528px">
                        <el-table-column prop="assets_url" label="域名" ></el-table-column>
                        <el-table-column prop="assets_ip" label="IP" ></el-table-column>
                        <el-table-column prop="assets_os_type" label="操作系统" ></el-table-column>
                        <!-- <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button  type="text" size="small">删除</el-button>
                                <el-button type="text" size="small">修改</el-button>
                            </template>
                       </el-table-column> -->
                    </el-table>
                </div>
            </panel>    
        </div>
        <div class='sectionThree-state'>
            <panel title="最新风险">
                <div class="">
                    <el-table :data="latestRisk" style="width: 100%;" height="528px">
                            <el-table-column prop="vuln_level" label="风险等级" align="center">
                               <template slot-scope="scope">
                                     <vuln-degree :vuln_level="scope.row.vuln_level"></vuln-degree>
                                </template>
                            </el-table-column>
                            <el-table-column prop="assets_url" label="目标资产" align="center"></el-table-column>
                            <el-table-column prop="vuln_name" label="风险名称" align="center"></el-table-column>
                            <el-table-column prop="vuln_ftime" label="发现时间" align="center"></el-table-column>
                            <el-table-column prop="vuln_useInfo" label="利用情况" align="center"></el-table-column>
                    </el-table>
                </div>
            </panel>    
        </div>       
    </div>
    <div class="sectionFour">
        <div class='sectionFour-left'>
            <panel title="正在执行的任务">
                <div class="">
                   <el-table :data="TasksInExecution" style="width: 100%" height="618px">
                            <el-table-column prop="target_name" label="任务名称" align="center"></el-table-column>
                            <el-table-column prop="target_url" label="任务目标" align="center"></el-table-column>
                            <el-table-column prop="target_teststra" label="策略" align="center"></el-table-column>
                            <el-table-column prop="target_starttime" label="开始时间" align="center">                             
                                <template slot-scope="scope">
                                  <span v-if="scope.row.target_starttime != null">
                                    {{ fomatterTime(new Date(scope.row.target_starttime.time)) }}
                                  </span>
                                  <span v-else>
                                    {{scope.row.target_starttime}}
                                  </span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="target_endtime" label="结束时间" align="center">
                               <template slot-scope="scope">
                                  <el-button type="text" size="mini" style="border:none;" v-if="scope.row.target_endtime != null">
                                    {{ fomatterTime(new Date(scope.row.target_endtime.time))  }}
                                  </el-button>
                                  <span v-else>
                                    {{scope.row.target_endtime}}
                                  </span>
                                </template>
                         <!-- <template slot-scope="scope">
                                <span v-if="scope.row.target_endtime != 'null'">{{ fomatterTime(new Date(scope.row.target_endtime.time))  }}</span>
                                <span v-else> {{scope.row.target_endtime}}</span>
                              </template>
                              <template slot-scope="scope">
                                <span v-if="scope.row.target_endtime != 'null'">{{ fomatterTime(new Date(scope.row.target_endtime.time))  }}</span>
                                <span v-else> {{scope.row.target_endtime}}</span>
                              </template> -->
                            </el-table-column>
                            <el-table-column prop="target_struts" label="任务状态" align="center">
                              <template slot-scope="scope">                                  
                                  <span>
                                    {{targetState[scope.row.target_struts]}}
                                  </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button  type="text" size="small">详情</el-button>
                                
                            </template>
                       </el-table-column>
                    </el-table>
                </div>
            </panel>    
        </div>
             
    </div>
    <div class="sectionFive">
        <div class='sectionFive-left'>
            <panel title="待办事项">
                <div class="">
                    <el-table :data="todoList" style="width: 100%">
                            <el-table-column prop="date" label="工单名称" align="center"></el-table-column>
                            <el-table-column prop="name" label="工单紧急程度" align="center"></el-table-column>
                            <el-table-column prop="date" label="工单类型" align="center"></el-table-column>
                            <el-table-column prop="date" label="工单状态" align="center"></el-table-column>
                            <el-table-column prop="date" label="发起时间" align="center"></el-table-column>
                            <el-table-column prop="date" label="审批时间" align="center" ></el-table-column>
                            <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button  type="text" size="small">查看</el-button>
                                <el-button  type="text" size="small">驳回</el-button>
                                <el-button  type="text" size="small">通过</el-button>                                
                            </template>
                       </el-table-column>
                    </el-table>
                </div>
            </panel>    
        </div>
             
    </div>
  </div>

</template>
<script>
import Panel from "@/components/panel";
import Charts from "@/components/Charts";
import { fomatterTime, deepClone, formatTime, staticAssetPath } from "@/utils";
import vulnDegree from "@/components/vulnDegree";
const levelSchema = {
  "4": { name: "极高风险", color: "red" },
  "3": { name: "高风险", color: "#DD7C35" },
  "2": { name: "中风险", color: "#E2B928" },
  "1": { name: "低风险", color: "#51B323" },
  "0": { name: "极低风险", color: "#46A5C0" }
};
const targetState = {
  "2": "待执行",
  "-2": "目标确立失败",
  "-1": "取消",
  "1": "已完成",
  "0": "执行中"
};
const colors = ["#36A5C1", "#47B30D", "#E5B918", "#E27C32", "#C33936"];
export default {
  components: {
    Panel,
    Charts,
    vulnDegree
  },
  data() {
    return {
      params: {
        page: "1",
        rows: "10"
      },
      shebeidata: [],
      targetState: targetState,
      fomatterTime: fomatterTime,
      assetsList: [],
      latestRisk: [],
      TasksInExecution: [],
      todoList: [],
      serviceLists: [],
      holeTotal: 0,
      vulnTotalS: 0,
      hostTotal: 0,
      hostvulnTotal: 0,
      webvulnTotal: 0,
      ywvulnTotal: 0,
      mainvulnTotal: 0,
      outsideInfo: "",
      kb_vuln_ref: "",
      assetsoption: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        backgroundColor: "#263143",
        color: [
          "#36A5C1",
          "#47B30D",
          "#E5B918",
          "#E27C32",
          "#C33936",
          "#CAD5DB"
        ],
        // legend: {
        //   data: ["极低", "低", "中", "高", "极高"],
        //   bottom: "2%",
        //   right: "5%",
        //   icon: "circle",
        //   textStyle: {
        //     color: "#c6e5ff"
        //   }
        // },
        grid: {
          left: "3%",
          right: "5%",
          bottom: "5%",
          top: "5%",
          containLabel: true
        },
        xAxis: [
          {
            type: "value",
            show: false
          },
          {
            type: "value",
            show: false
          }
        ],
        yAxis: [
          {
            type: "category",
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: "#fff",
              // fontSize: 36,
              // fontWeight: 400,
              interval: 0
            },
            // offset: 40,
            data: []
          },
          {
            type: "category",
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: "#fff",
              // fontSize: 36,
              // fontWeight: 300,
              interval: 0
            }
            // data: [123, "312", "3123", "3123", "1231"]
          }
        ],
        series: [
          {
            name: "极低",
            type: "bar",
            barWidth: 25,
            stack: "总量",
            itemStyle: {
              normal: {
                barBorderRadius: [30, 0, 0, 30],
                shadowColor: colors[0]
              }
            },
            data: []
          },
          {
            name: "低",
            type: "bar",
            barWidth: 25,
            stack: "总量",
            itemStyle: {
              normal: {
                shadowColor: colors[1]
              }
            },
            data: []
          },
          {
            name: "中",
            type: "bar",
            stack: "总量",
            barWidth: 25,
            itemStyle: {
              normal: {
                shadowColor: colors[2]
              }
            },
            data: []
          },
          {
            name: "高",
            type: "bar",
            barWidth: 25,
            stack: "总量",
            itemStyle: {
              normal: {
                shadowColor: colors[3]
              }
            },
            // data: [120, 132, 101, 134, 90]
            data: []
          },
          {
            name: "极高",
            type: "bar",
            barWidth: 25,
            stack: "总量",
            itemStyle: {
              normal: {
                barBorderRadius: [0, 15, 15, 0],
                shadowColor: colors[4]
              }
            },
            // data: [120, 132, 101, 134, 90]
            // data: [320, 302, 301, 334, 390]
            data: []
          }
        ]
      },
      vulnchange: {
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
        // grid: {
        //   left: "8%",
        //   right: "0%",
        //   bottom: "20%",
        //   top: "10%",
        //   containLabel: false
        // },
        yAxis: {
          type: "value",
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
        series: [
          {
            data: [],
            type: "line",
            smooth: true
          }
        ]
      },
      option: {
        title: {
          text: "漏洞修复状态(开放/关闭)",
          x: "center",
          y: "85%",
          textStyle: {
            color: "#18BB9A",
            fontSize: "14px"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          x: "center",
          y: "10%",
          data: ["已修复", "未修复"],
          textStyle: {
            color: "#d8d8d8"
          }
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "40%",
            center: ["50%", "50%"],
            color: ["#47B30D", "#128C96"],
            data: [{ value: 0, name: "已修复" }, { value: 0, name: "未修复" }],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      //风险等级
      chartData: {
        title: {
          text: "漏洞等级分布",
          x: "right",
          y: "85%",
          textStyle: {
            color: "#18BB9A",
            fontSize: "14px"
          }
        },
        tooltip: {
          formatter: "{b} ({c})"
        },
        series: [
          {
            type: "pie",
            radius: "40%",
            center: ["50%", "50%"],
            data: [],
            labelLine: { normal: { show: false } },
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: "{b} \n ({d}%)",
                  textStyle: { color: "#128c96" }
                }
              }
            }
          }
        ]
      },
      vuln_level_num: {
        "0": 0,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      }
    };
  },
  created() {
    let data = Object.assign({}, this.params, { is_page: 0 });
    this.getInformation(data);
    this.assetsInfo({ is_page: 1 });
    this.targetInfo({ target_struts: 0 });
    this.vulnrepair({ target_id: 0 });
    this.vulnTotal({ target_id: 0 });
    this.serviceTotal({ target_id: 0 });
    this.vulnTypeTotal({ target_id: 0 });
    this.vulnSearch({ flag: 1 });
    this.getAssetsNum({ target_id: 0 });
    this.getServiceList({ is_new: -1 });
    this.getVulnLevel();
    this.vulnScore();
  },
  methods: {
    //风险变化趋势
    vulnScore() {
      this.$api.vulnScore().then(res => {
        let data = res.data.vulns;
        if (res.data.result == "0") {
          let data = res.data.vulns;
          data.forEach(item => {
            this.vulnchange.series[0].data.push({
              value: item.vuln_score,
              name: item.vuln_ftime
            });
            this.vulnchange.xAxis.data.push(item.vuln_ftime);
          });
        }
      });
    },
    async getServiceList(params) {
      let res = await this.$api.getServiceList(params);
      this.vulnTotalS = res.data.lists.length;
    },
    async vulnSearch(params) {
      let res = await this.$api.vulnSearch(params);
      this.latestRisk = res.data.rows;
      if(res.data.rows.length>10){
       this.latestRisk=res.data.rows.slice(0,10)
      }else{
        this.latestRisk=res.data.rows
      }
    },
    async getInformation(params) {
      let res = await this.$api.getInformation(params);
      if (res.data.result === 0 && res.data.kb.length > 0) {
        this.outsideInfo = res.data.kb[0].kb_vuln_name;
      }
    },
    async vulnrepair(param) {
      let res = await this.$api.vulnrepair(param);
      if (res.data.result === 0) {
        this.option.series[0].data[0].value = res.data.handle;
        this.option.series[0].data[1].value = res.data.pending;
      }
    },
    async assetsInfo(param) {
      let res = await this.$api.assetsInfo(param);
      if (res.data.result === 0) {
        if(res.data.rows.length>10){
          this.assetsList = res.data.rows.slice(0,10);
        }else{
           this.assetsList = res.data.rows
        }
        
      }
    },
    async targetInfo(params) {
      let res = await this.$api.targetInfo(params);
      if (res.data.result === 0) {
        if(res.data.targets.length >10){
            this.TasksInExecution = res.data.targets.slice(0,10)
        }else{
            this.TasksInExecution = res.data.targets;
        }
        
      }
    },
    async vulnTotal(params) {
      let res = await this.$api.vulnTotal(params);
      if (res.data.result === 0 && res.data.vulns.length > 0) {
        this.chartData.series[0].data = res.data.vulns.map(item => {
          this.vuln_level_num[item.vuln_level] = item.vuln_total;
          return {
            value: item.vuln_total,
            name: levelSchema[item.vuln_level].name,
            itemStyle: {
              color: levelSchema[item.vuln_level].color
            }
          };
        });
      }
    },
    async serviceTotal(params) {
      let res = await this.$api.serviceTotal(params);
      if (res.data.result === 0) {
        this.serviceLists = res.data.lists;
      }
    },
    //设备类型风险统计
    getVulnLevel() {
      this.$api.getVulnLevel().then(res => {
        let data = res.data.assets;
        this.assetsoption.series[0].data.push(
          data[0].vuln_tips,
          data[1].vuln_tips,
          data[2].vuln_tips,
          data[3].vuln_tips
        );
        this.assetsoption.series[1].data.push(
          data[0].vuln_low,
          data[1].vuln_low,
          data[2].vuln_low,
          data[3].vuln_low
        );
        this.assetsoption.series[2].data.push(
          data[0].vuln_medium,
          data[1].vuln_medium,
          data[2].vuln_medium,
          data[3].vuln_medium
        );
        this.assetsoption.series[3].data.push(
          data[0].vuln_high,
          data[1].vuln_high,
          data[2].vuln_high,
          data[3].vuln_high
        );
        this.assetsoption.series[4].data.push(
          data[0].vuln_urgent,
          data[1].vuln_urgent,
          data[2].vuln_urgent,
          data[3].vuln_urgent
        );
        data.forEach(item => {
          if (!item.name) {
            item.name = "未知设备";
          }
        });
        if (data.length < 5) {
          this.shebeidata = data;
          this.shebeidata.push({ name: "数据库" });
          this.shebeidata.forEach(item => {
            this.assetsoption.yAxis[0].data.push(item.name);
          });
        } else {
          this.assetsoption.yAxis[0].data.push(item.name);
        }
      });
    },
    //资产情况
    async getAssetsNum(params) {
      let res = await this.$api.getAssetsNum(params);
      this.hostTotal = res.data.assetsNum;
    },
    //任务数据
    async vulnTypeTotal(params) {
      let res = await this.$api.vulnTypeTotal(params);
      if (res.data.result == 0 && res.data.vulns.length > 0) {
        let data = res.data.vulns;
        data.forEach(item => {
          if (item.vuln_class == "web漏洞") {
            this.webvulnTotal = item.vuln_Num;
          } else if (item.vuln_class == "业务风险") {
            this.ywvulnTotal = item.vuln_Num;
          } else if (item.vuln_class == "主机漏洞") {
            this.mainvulnTotal = item.vuln_Num;
          }
        });
        this.holeTotal =
          Number(this.mainvulnTotal) +
          Number(this.ywvulnTotal) +
          Number(this.webvulnTotal);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.homePage {
  /*margin: 0 15px;*/
  /*height: auto;*/
  /*overflow-y: auto;*/
}
.outsideInfo {
  padding: 0 30px;
  color: #fff;
  height: 40px;
  background: rgba(38, 49, 67, 1);
  line-height: 40px;
  font-weight: 400;
  box-shadow: 4px 0px 4px rgba(29, 36, 46, 1);
  display: flex;
  & > div:first-child {
    color: rgba(209, 255, 255, 1);
    font-size: 16px;
  }
  & > div:nth-child(2) {
    flex: 1;
    margin: 0 10px;
    font-size: 14px;
    color: rgba(24, 187, 154, 1);
  }
  & > div:last-child {
    width: 50px;
    font-size: 14px;
    color: rgba(24, 187, 154, 1);
  }
}
.sectionOne {
  display: flex;
  margin-top: 15px;
  & div {
    height: 280px;
  }
  &-left {
    flex: 1;
    margin-right: 10px;
  }
  &-state {
    flex: 1;
    margin-right: 10px;
  }
  &-vulnLeveal {
    flex: 2;
    overflow: hidden;
    &-left {
      width: 45%;
      float: left;
    }
  }
}
.sectionTwo > div {
  height: 300px;
}
.sectionTwo {
  display: flex;
  overflow: hidden;
  &-left {
    flex: 2;
    margin-right: 10px;
  }
  &-state {
    flex: 1;
    margin-right: 10px;
  }
  &-vulnLeveal {
    flex: 1;
  }
}
.sectionThree {
  display: flex;
  overflow: hidden;
  & div {
    // height: 270px;
  }
  &-left {
    flex: 1;
    margin-right: 10px;
  }
  &-state {
    flex: 1;
  }
}
.sectionFour {
  overflow: hidden;
  & div {
    // height: 238px;
  }
}
.sectionFive {
  overflow: hidden;
  & div {
    height: 238px;
  }
}
.vulntext {
  width: 55%;
  height: 100%;
  float: left;
  & > div {
    width: 29%;
    height: 50%;
    float: left;
    padding: 24px 10px 10px 0;
    p:nth-of-type(2) {
      text-align: center;
    }
    p {
      font-size: 13px;
    }
    span {
      color: #000;
      float: left;
      padding: 0px 4px;
      margin-right: 5px;
      font-size: 14px;
      &:first-child {
        background: red;
      }
    }
  }
}
.hole-record-types {
  & > div {
    float: left;
    width: 25%;
    background: url(../../../public/img/png/servicePic.png) center top no-repeat;
  }
  .hole-pic {
    overflow: hidden;
    position: relative;
    margin-bottom: 10px;
    & > h5,
    h3 {
      font-weight: normal;
      margin: 0;
      text-align: center;
    }
    & > h3 {
      position: absolute;
      top: 23px;
      left: 50%;
      transform: translateX(-50%);
    }
    & > h5 {
      margin-top: 53px;
      color: #d8d8d8;
    }
  }
}
.vulnChange {
  display: flex;
  height: 100%;
  & > div {
    flex: 1;
    line-height: 23px;
  }
  &-tasks {
    width: 100%;
    height: 100%;
    overflow: hidden;
    & > div {
      width: 33%;
      height: 44%;
      text-align: center;
      float: left;
      overflow: hidden;
      padding-bottom: 38px;
      padding-left: 12px;
      p:nth-of-type(1) {
        text-align: center;
        margin-top: 29px;
        font-size: 13px;
      }
      p:nth-of-type(2) {
        text-align: center;
        color: #d8d8d8;

        font-size: 13px;
      }
      p {
        font-size: 13px;
      }
    }
  }
}
.riskTotal {
  background: url("../../../public/img/png/riskToatl.png") center center
    no-repeat;
  width: 47px;
  height: 52px;
  float: left;
  margin-top: 20px;
}
.vulnTotal {
  background: url("../../../public/img/png/vulnTotal.png") center center
    no-repeat;
  width: 47px;
  height: 52px;
  float: left;
  margin-top: 20px;
}
.host {
  background: url("../../../public/img/png/host.png") center center no-repeat;
  width: 47px;
  height: 52px;
  float: left;
  margin-top: 20px;
}
.hostvuln {
  background: url("../../../public/img/png/hostvuln.png") center center
    no-repeat;
  width: 47px;
  height: 52px;
  float: left;
  margin-top: 20px;
}
.webvuln {
  background: url("../../../public/img/png/web.png") center center no-repeat;
  width: 47px;
  height: 52px;
  float: left;
  margin-top: 20px;
}
.yw {
  background: url("../../../public/img/png/yw.png") center center no-repeat;
  width: 47px;
  height: 52px;
  float: left;
  margin-top: 20px;
}
</style>


