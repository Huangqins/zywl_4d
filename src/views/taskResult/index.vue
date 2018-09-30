<template>
  <div class="taskExec">
    <!-- 任务目标层 -->
    <div class="task-target">
      <div class="first">
        <div class="task-num">
          <div class="no-pic">
            <panel title="任务信息" style="margin-top:-22px;">
              <ul class="taskInfo clearfix" style="height:58px;">
                <li>任务名称:<span class="taskInfoColor">{{taskInfo.target_name}}</span></li>
                <li>结束时间:<span class="taskInfoColor">{{taskInfo.target_endtime}}</span></li>
                <li>总历时: <span class="taskInfoColor">{{taskInfo.target_alltime}}</span></li>
              </ul>
            </panel>
            <panel title="风险数量" style="margin-top:-12px;">
              <div class="vuln-num">
                <div class="left">
                  <ul>
                    <li>
                      <dl>
                        <dt>{{vulnMap[4].vuln_total}}</dt>
                        <dd class="vuln-bg-4">极高风险数</dd>
                      </dl>
                    </li>
                    <li>
                      <dl>
                        <dt>{{vulnMap[3].vuln_total}}</dt>
                        <dd class="vuln-bg-3">高危风险数</dd>
                      </dl>
                    </li>
                  </ul>
                </div>
                <div class="middle">
                  <Charts :chartData="options" height="254px" />
                </div>
                <div class="right">
                  <ul>
                    <li>
                      <dl>
                        <dt>{{vulnMap[2].vuln_total}}</dt>
                        <dd class="vuln-bg-2">中危风险数</dd>
                      </dl>
                    </li>
                    <li>
                      <dl>
                        <dt>{{vulnMap[1].vuln_total}}</dt>
                        <dd class="vuln-bg-1">低危风险数</dd>
                      </dl>
                    </li>
                    <li>
                      <dl>
                        <dt>{{vulnMap[0].vuln_total}}</dt>
                        <dd class="vuln-bg-0">极低风险数</dd>
                      </dl>
                    </li>
                  </ul>
                </div>
              </div>
            </panel>
          </div>

          <div class="pic">
            <div class="pic-num">漏洞类型百分比分布</div>
            <Charts :chartData="typeOptions" height="309px" id="type" />
          </div>
        </div>
        <!--  -->
        <div class="tables">
          <panel title="任务目标情况" style="height:281px;" :num="targetGoalLength">
            <div style="height:230px;background:#263143">
              <el-table :data="targetGoal">
                <el-table-column label="目标" align="center"></el-table-column>
                <el-table-column label="是否可访问" align="center"></el-table-column>
              </el-table>
            </div>
          </panel>
          <panel title="新发现资产/域名" style="height:281px;" :num="newAssetLength">
            <div style="height:230px;background:#263143">
              <el-table :data="newAsset">
                <el-table-column label="域名" align="center"></el-table-column>
                <el-table-column label="IP" align="center"></el-table-column>
              </el-table>
            </div>
          </panel>
        </div>

      </div>
      <div class="task-state">
        <panel title="新发现业务功能" style="margin-top:-22px;" :num="tableDataLength">
          <div style="height:632px;background:#263143">
            <el-table :data="tableData" style="width: 100%;" max-height="620">
              <el-table-column prop="logic_name" label="业务功能名" align="left" width="200" show-overflow-tooltip></el-table-column>
              <el-table-column prop="logic_url" label="功能地址" align="left" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
        </panel>
      </div>
    </div>
    <!-- 风险总览 -->
    <div class="vuln-panorama">
      <el-tabs v-model="activeName">
        <el-tab-pane :label="item.label" :name="item.name" v-for="(item, index) in vulnTabs" :key="index+ 'tabs'">
          <template v-if="item.name === 'all'">
            <div class="table-group">
              <div class="margin-right">
                <panel title="漏洞风险">
                  <div class="vuln-table">
                    <el-table>
                      <el-table-column prop="date" label="漏洞地址" align="center"></el-table-column>
                      <el-table-column prop="date" label="漏洞类型" align="center"></el-table-column>
                      <el-table-column prop="date" label="发现时间" align="center"></el-table-column>
                    </el-table>
                  </div>
                </panel>
              </div>
              <div>
                <panel title="配置风险">
                  <div class="vuln-table">
                    <el-table>
                      <el-table-column prop="date" label="风险地址" align="center"></el-table-column>
                      <el-table-column prop="date" label="漏洞类型" align="center"></el-table-column>
                      <el-table-column prop="date" label="发现时间" align="center"></el-table-column>
                    </el-table>
                  </div>
                </panel>
              </div>
              <div class="margin-right">
                <panel title="内容风险">
                  <div class="vuln-table">
                    <el-table>
                      <el-table-column prop="date" label="漏洞地址" align="center"></el-table-column>
                      <el-table-column prop="date" label="漏洞类型" align="center"></el-table-column>
                      <el-table-column prop="date" label="发现时间" align="center"></el-table-column>
                    </el-table>
                  </div>
                </panel>
              </div>
              <div>
                <panel title="数据风险">
                  <div class="vuln-table">
                    <el-table>
                      <el-table-column prop="date" label="漏洞地址" align="center"></el-table-column>
                      <el-table-column prop="date" label="漏洞类型" align="center"></el-table-column>
                      <el-table-column prop="date" label="发现时间" align="center"></el-table-column>
                    </el-table>
                  </div>
                </panel>
              </div>
              <div class="margin-right">
                <panel title="业务风险">
                  <div class="vuln-table">
                    <el-table>
                      <el-table-column prop="date" label="漏洞地址" align="center"></el-table-column>
                      <el-table-column prop="date" label="漏洞类型" align="center"></el-table-column>
                      <el-table-column prop="date" label="发现时间" align="center"></el-table-column>
                    </el-table>
                  </div>
                </panel>
              </div>
              <div>
                <panel title="应用风险">
                  <div class="vuln-table">
                    <el-table>
                      <el-table-column prop="date" label="漏洞地址" align="center"></el-table-column>
                      <el-table-column prop="date" label="漏洞类型" align="center"></el-table-column>
                      <el-table-column prop="date" label="发现时间" align="center"></el-table-column>
                    </el-table>
                  </div>
                </panel>
              </div>
            </div>
          </template>
          <template v-else>
            其他的
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import panel from "@/components/panel";
import { formatTime, fomatterTime } from "@/utils";
import route from "mixins/route";
import echarts from "echarts";
import Charts from "@/components/Charts";

const vulnMap = [
  "极低风险数",
  "低风险数",
  "中风险数",
  "高风险数",
  "极高风险数"
];

const placeHolderStyle = {
  normal: {
    label: {
      show: false
    },
    labelLine: {
      show: false
    },
    color: "rgba(0,0,0,0)",
    borderWidth: 0
  },
  emphasis: {
    color: "rgba(0,0,0,0)",
    borderWidth: 0
  }
};

const dataStyle = {
  normal: {
    formatter: "{c}",
    position: "center",
    show: true,
    textStyle: {
      fontSize: "28",
      fontWeight: "normal",
      color: "#fff"
    }
  }
};

export default {
  mixins: [route],
  components: {
    panel,
    Charts
  },
  created() {
    let { target_id } = this.pageInfo;
    this.getVulnTotal(target_id);
    this.targetProgress(target_id);
    this.getLogic(target_id);
    this.targetNewAsset(target_id);
    this.getVulnSearch(target_id, "");
    // this.vulnNumTotal(target_id);
    this.getVulnType(target_id);
    this.getVulnTypeTotal(target_id);
    // this.targetGoalSure(target_id);

  },

  data() {
    return {
      activeName: "all",
      newAsset: [],
      newAssetLength:0,
      targetGoal: [],
      targetGoalLength: 0,
      tableData: [],
      tableDataLength: 0,
      options: {
        title: [
          {
            text: "资产健康度",
            left: "49%",
            top: "80%",
            textAlign: "center",
            textStyle: {
              fontWeight: "normal",
              fontSize: "14",
              color: "#fff",
              textAlign: "center"
            }
          }
        ],
        series: [
          {
            type: "pie",
            hoverAnimation: false, //鼠标经过的特效
            radius: ["85%", "70%"],
            center: ["50%", "50%"],
            startAngle: 225,
            labelLine: {
              normal: {
                show: false
              }
            },
            label: {
              normal: {
                position: "center"
              }
            },
            data: [
              {
                value: 75,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "#99da69"
                      },
                      {
                        offset: 1,
                        color: "#01babc"
                      }
                    ])
                  }
                },
                label: dataStyle
              },
              {
                value: 25,
                itemStyle: placeHolderStyle
              }
            ]
          },
          //外圈的边框
          {
            // name: '总人数',
            type: "pie",
            hoverAnimation: false, //鼠标经过的特效
            radius: ["96%", "72%"],
            center: ["50%", "50%"],
            startAngle: 225,
            labelLine: {
              normal: {
                show: false
              }
            },
            label: {
              normal: {
                position: "center"
              }
            },
            data: [
              {
                value: 75,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "#01babc"
                      },
                      {
                        offset: 1,
                        color: "#99da69"
                      }
                    ])
                  }
                }
              },
              {
                value: 25,
                itemStyle: placeHolderStyle
              }
            ]
          }
        ]
      },
      typeOptions: {
        color: [
          "#2edfa3",
          "#bce672",
          "#ff4777",
          "#70f3ff",
          "#4b5cc4",
          "#f47983",
          "#8d4bbb",
          "#6635EF",
          "#FFAFDA"
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            selectedMode: "single",
            radius: [0, "38%"],

            label: {
              normal: {
                show: false,
                position: "inner",
                formatter: "{d}",
                textStyle: {
                  color: "#fff",
                  fontWeight: "normal",
                  fontSize: 12
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 100,
                name: "独居"
              },
              {
                value: 100,
                name: "与配偶同住"
              },
              {
                value: 100,
                name: "与子女同住"
              },
              {
                value: 100,
                name: "仅与重度残疾子女共同居住"
              },
              {
                value: 100,
                name: "与配偶及子女同住"
              },
              {
                value: 100,
                name: "与其他亲属同住"
              },
              {
                value: 100,
                name: "与父母同住"
              },
              {
                value: 100,
                name: "与其他人同住"
              }
            ]
          },
          {
            name: "访问来源",
            type: "pie",
            radius: ["40%", "42%"],
            label: {
              normal: {
                formatter: "{b|{b}}\n{hr|}\n{d|{d}%}",
                rich: {
                  b: {
                    fontSize: 12,
                    color: "#fff",
                    align: "left",
                    padding: 4
                  },
                  hr: {
                    borderColor: "#12EABE",
                    width: "100%",
                    borderWidth: 2,
                    height: 0
                  },
                  d: {
                    fontSize: 12,
                    color: "#fff",
                    align: "left",
                    padding: 4
                  },
                  c: {
                    fontSize: 12,
                    color: "#fff",
                    align: "center",
                    padding: 4
                  }
                }
              }
            },
            labelLine: {
              normal: {
                show: true,
                length: 20,
                length2: 20,
                lineStyle: {
                  type: "dashed",
                  width: 2
                }
              }
            },
            data: [
              {
                value: 100,
                name: "独居"
              },
              {
                value: 100,
                name: "与配偶同住"
              },
              {
                value: 100,
                name: "与子女同住"
              },
              {
                value: 100,
                name: "仅与重度残疾子女共同居住"
              },
              {
                value: 100,
                name: "与配偶及子女同住"
              },
              {
                value: 100,
                name: "与其他亲属同住"
              },
              {
                value: 100,
                name: "与父母同住"
              },
              {
                value: 100,
                name: "与其他人同住"
              }
            ]
          }
        ]
      },
      formatTime: formatTime,
      vulnTotal: [
        {
          value: 0,
          name: "极低风险数"
        },
        {
          value: 0,
          name: "低风险数"
        },
        {
          value: 0,
          name: "中风险数"
        },
        {
          value: 0,
          name: "高风险数"
        },
        {
          value: 0,
          name: "极高风险数"
        }
      ],
      taskInfo: {
        target_task_num: null, //扫描次数
        check_scaning: "",
        target_scaning: "",
        goal_scaning: {},
        target_name: "",
        target_starttime: {},
        target_name: "",
        target_createtime: "",
        target_starttime: {},
        target_endtime: {},
        target_alltime:''
      },
      vulnMap: [
        {
          vuln_total: 0
        },
        {
          vuln_total: 0
        },
        {
          vuln_total: 0
        },
        {
          vuln_total: 0
        },
        {
          vuln_total: 0
        }
      ],
      vulnTabs: []
    };
  },
  methods: {
    // 统计
    async getVulnTypeTotal(id) {
      let res = await this.$api.vulnTypeTotal({ target_id: id });
      if (res.data.result === 0) {

      }
    },
    // 风险类型
    async getVulnType(id) {
      let res = await this.$api.vulnType(); // 获取类型
      let resNum = await this.$api.vulnNumTotal({ target_id: id }); // 获取数量
      let vulnTabs = [];
      vulnTabs = res.data.vulns.map(item => {
        return {
          label: `${item.vuln_name}(0)`,
          name: item.vuln_type
        };
      });
      let temp = resNum.data.vulns.map(item => {
        return { name: item.vuln_type_keyword, value: item.vuln_total };
      });
      let vulnTotal = temp.reduce((a, b) => {
        return a.value + b.value;
      });
      vulnTabs.forEach(item => {
        let tempt = null;
        tempt = temp.find(i => {
          return i.name === item.name;
        });
        if (tempt) {
          item.label = `${item.label.slice(0, -3)}(${tempt.value})`;
        }
      });
      vulnTabs.unshift({
        label: `风险总览(${vulnTotal})`,
        name: "all"
      });
      this.vulnTabs = vulnTabs;
    },
    // 漏洞数量统计
    async vulnNumTotal(id) {
      // let res = await this.$api.vulnNumTotal({ target_id: id });
      // if (res.data.result === 0) {
      //     let temp = res.data.vulns.map(item => {
      //       return {name: item.vuln_type_keyword}
      //     })
      // }
    },
    // 任务目标情况
    async targetGoalSure(id) {
      let res = await this.$api.targetGoalSure({ target_id: id });
      if (res.data.result === 0) {
      }
    },
    //任务目标情况
    async targetNewAsset(id) {
      let res = await this.$api.targetNewAsset({ target_id: id });
      if (res.data.result === 0) {
      }
    },
    //业务功能
    async getLogic(id) {
      let res = await this.$api.getLogic({ target_id: id });
      if (res.data.result === 0) {
        this.tableData = res.data.logics;
        this.tableDataLength = res.data.logics.length;
      }
    },
    async getVulnTotal(id) {
      let res = await this.$api.vulnTotal({ target_id: id });
      if (res.data.result === 0) {
        res.data.vulns.forEach(item => {
          this.$set(this.vulnMap, Number(item.vuln_level), {
            vuln_total: item.vuln_total
          });
        });
      }
    },
    async getVulnSearch(id, type) {
      let res = await this.$api.vulnSearch({ target_id: id, vuln_type: type });
      if (res.data.result === 0) {
      }
    },
    async targetProgress(id) {
      let res = await this.$api.targetProgress({ target_id: id });
         
      if (res.data.result === 0) {
        // this.targetGoal = 
        let {
          target_task_num,
          response_info,
          target_name,
          target_createtime,
          target_starttime,
          target_endtime
        } = res.data.target;
        this.taskInfo = {
          target_task_num,
          target_name,
          target_createtime: fomatterTime(new Date(target_createtime.time)),
          target_endtime: fomatterTime(new Date(target_endtime.time)),
          target_alltime: formatTime(target_endtime.time - target_createtime.time)
        };
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@keyframes ing {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
.vuln-panorama {
  // width: 80%;
  margin-top: 10px;
  .vuln-table {
    height: 350px;
    background: #263143;
  }
  .table-group {
    & > div {
      float: left;
      width: calc(50% - 10px);
    }
    .margin-right {
      margin-right: 20px;
    }
  }
}
.taskExec {
  .task-target {
    display: flex;
    .first {
      flex: 1;
      margin-right: 20px;
      .task-num {
        width: 100%;
        display: flex;
        height: 380px;
      }
      .no-pic {
        width: 68%;
        margin-right: 20px;
        height: 380px;
        .taskInfoColor {
          color: #A5FDD5;
        }
      }
      .pic {
        flex: 1;
        height: calc(100% -20px);
        margin-top: 30px;
        background-color: rgba(38, 49, 67, 1);
        .pic-num {
          color: #18bb9a;
          font-size: 14px;
          padding: 10px 10px 10px 15px;
        }
        box-shadow: 4px 0px 4px rgba(29, 36, 46, 1);
      }
      .taskInfo {
        li {
          line-height: 58px;
          // text-align: center;
          font-size: 14px;
          padding: 0 5px;
        }
      }
      .status {
        font-size: 14px;
        .title,
        .check-status {
          padding: 10px 0;
        }
      }
    }
    .task-state {
      width: 30%;
      height: 660px;
      box-shadow: 4px 0px 4px rgba(29, 36, 46, 1);
    }
  }
  .charts {
    display: flex;
    .logic {
      flex: 1;
      margin-right: 20px;
    }
    .timeline {
      width: 30%;
    }
  }
  .degree {
    height: 118px;
    display: flex;
    font-size: 14px;
    .title {
      margin-top: 9px;
    }
    ul {
      width: 100%;
    }
    .des {
      margin: 5px 0;
      .title {
        padding: 5px 0;
      }
      display: flex;
      .des-num {
        flex: 1;
      }
    }
    li:not(:last-child) {
      flex: 1;
      border-right: 1px solid rgba(50, 63, 84, 1);
    }
  }
  .checking {
    color: #eb6337;
    position: relative;
    &::before {
      position: absolute;
      top: 4px;
      left: calc(36% - 10px);
      content: " ";
      width: 12px;
      height: 12px;
      background: url(../../../public/img/png/icon-jiance.png) center center
        no-repeat no-repeat;
      background-size: 12px 12px;
      animation: ing 2s linear infinite;
    }
  }
  .checkfull {
    color: #18bb9a;
    position: relative;
    &::before {
      position: absolute;
      top: 4px;
      left: calc(36% - 10px);
      content: " ";
      width: 12px;
      height: 12px;
      background: url(../../../public/img/png/icon-wancheng.png) center center
        no-repeat no-repeat;
      background-size: 12px 12px;
    }
  }
  @for $i from 0 through 4 {
    .vuln-bg-#{$i} {
      background: url(../../../public/img/png/icon-#{$i}.png)
        left
        calc(50% - 50px)
        center
        no-repeat;
    }
  }
}

.tables {
  display: flex;
  & > div {
    flex: 1;
  }
  & > div:first-child {
    margin-right: 20px;
  }
}
.taskInfo {
  display: flex;
  li {
    flex: 1;
    text-align: left;
  }
}
.vuln-num {
  display: flex;
  height: 254px;
  & > div {
    flex: 1;
    height: 100%;
  }
  ul {
    display: flex;
    height: 100%;
    flex-direction: column;
    text-align: center;
    li {
      flex: 1;
      dl {
        text-align: center;
        margin: 0;
        margin-top: 26px;
        dt {
          margin: 5px 0;
        }
        dd {
          margin-left: 0;
          font-size: 14px;
        }
      }
    }
  }
}
</style>


