<template>
    <div class="taskExec">
        <!-- 任务目标层 -->
        <div class="task-target">
            <div class="first">
                <div class="task-num">
                    <div class="no-pic">
                        <panel title="任务信息" style="margin-top:-22px;">
                            <ul class="taskInfo clearfix" style="height:58px;">
                                <li>任务名称:渗透测试-9077-76体育公园</li>
                                <li>开始时间:2018-09-02 12:34:12</li>
                                <li>已历时:3天13小时34分50秒</li>
                            </ul>
                        </panel>
                        <panel title="风险数量" style="margin-top:-12px;">
                            <ul class="clearfix" style="height:98px;">
                                <li v-for="(item, index) in vulnTotal" :key="index + 'f'">
                                    <dl>
                                        <dt>{{item.value}}</dt>
                                        <dd>{{item.name}}</dd>
                                    </dl>
                                </li>
                            </ul>
                        </panel>
                    </div>

                    <div class="pic">
                        <div class="pic-num">共进行扫描{{taskInfo.target_task_num}}次</div>
                        <div class="circle ing"></div>
                    </div>
                </div>
                <!--  -->
                <panel title="执行状态阶段">
                    <div class="degree">
                        <ul class="clearfix">
                            <li>
                                <div class="title">目标确立</div>
                                <div class="des">
                                    <div class="des-num">
                                        <div class="title">目标数量</div>
                                        <div class="num">{{taskInfo.goal_scaning.total ?taskInfo.goal_scaning.total: 0 }}</div>
                                    </div>
                                    <div class="des-num">
                                        <div class="title">完成数量</div>
                                        <div class="num">{{taskInfo.goal_scaning.now ? taskInfo.goal_scaning.now : 0}}</div>
                                    </div>
                                </div>
                                <div class="res">
                                    检测完成
                                </div>
                            </li>
                            <li>
                                <div class="title">业务功能识别</div>
                                <div class="des">
                                    <div class="des-num">
                                        <div class="title">系统数量</div>
                                        <div class="num">100</div>
                                    </div>
                                    <div class="des-num">
                                        <div class="title">完成数量</div>
                                        <div class="num">100</div>
                                    </div>
                                </div>
                                <div class="res">
                                    检测完成
                                </div>
                            </li>
                            <li>
                                <div class="title">安全测试</div>
                                <div class="des">
                                    <div class="des-num">
                                        <div class="title">业务功能数</div>
                                        <div class="num">100</div>
                                    </div>
                                    <div class="des-num">
                                        <div class="title">完成测试数量</div>
                                        <div class="num">100</div>
                                    </div>
                                </div>
                                <div class="res">
                                    检测完成
                                </div>
                            </li>
                            <li>
                                <div class="title">风险利用取证</div>
                                <div class="des">
                                    <div class="des-num">
                                        <div class="title">风险数量</div>
                                        <div class="num">100</div>
                                    </div>
                                    <div class="des-num">
                                        <div class="title">利用成功</div>
                                        <div class="num">100</div>
                                    </div>
                                    <div class="des-num">
                                        <div class="title">利用失败</div>
                                        <div class="num">100</div>
                                    </div>
                                    <div class="des-num">
                                        <div class="title">取证数量</div>
                                        <div class="num">100</div>
                                    </div>
                                </div>
                                <div class="res">
                                    检测完成
                                </div>
                            </li>
                        </ul>
                    </div>
                </panel>
            </div>
            <div class="task-state">
                <panel title="任务目标情况" style="margin-top:-22px;">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="date" label="域名"></el-table-column>
                        <!-- <el-table-column  label="IP"></el-table-column>
                        <el-table-column  label="可访问性"></el-table-column> -->
                    </el-table>
                </panel>
            </div>
        </div>
        <!-- 逻辑图 -->
        <div class="charts">
            <div class="logic">
                <panel title="业务功能图">
                    <div style="height:616px;"></div>
                </panel>
            </div>
            <div class="timeline">
                <panel title="风险时间轴">
                    <div style="height:616px;"></div>
                </panel>
            </div>
        </div>
        <!-- 风险列表 -->
        <div class="holelist">
            <panel title="风险列表">
                <el-table :data="holeListData" style="width: 100%">
                    <el-table-column prop="date" label="风险编号" align="center"> </el-table-column>
                    <el-table-column prop="date" label="风险名称" align="center"> </el-table-column>
                    <el-table-column prop="date" label="风险等级" align="center"> </el-table-column>
                    <el-table-column prop="date" label="风险类型" align="center"> </el-table-column>
                    <el-table-column prop="date" label="风险地址" align="center"> </el-table-column>
                    <el-table-column prop="date" label="利用情况" align="center"> </el-table-column>
                    <el-table-column prop="date" label="取证情况" align="center"> </el-table-column>
                    <el-table-column prop="date" label="发现时间" align="center"> </el-table-column>
                    <el-table-column prop="date" label="利用时间" align="center"> </el-table-column>
                    <el-table-column prop="date" label="操作" align="center"> </el-table-column>
                </el-table>
            </panel>
        </div>
    </div>
</template>
<script>
import panel from "@/components/panel";
import route from "mixins/route";

const vulnMap = [
  "极低风险数",
  "低风险数",
  "中风险数",
  "高风险数",
  "极高风险数"
];

export default {
  mixins: [route],
  components: {
    panel
  },
  created() {
    let { target_id } = this.pageInfo;
    this.timer = setInterval(() => {
      this.targetProgress(target_id);
      this.getVulnTotal(target_id);
    }, 5000);
    this.getVulnTotal(target_id);
    this.targetProgress(target_id);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  data() {
    return {
      tableData: [],
      holeListData: [],
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
        goal_scaning: {}
      }
    };
  },
  methods: {
    async targetProgress(id) {
      let res = await this.$api.targetProgress({ target_id: id });
      if (res.data.result === 0) {
        let {
          target_task_num,
          check_scaning,
          target_scaning,
          goal_scaning,
          response_info
        } = res.data.target;
        this.taskInfo = {
          target_task_num,
          check_scaning,
          target_scaning,
          goal_scaning: !goal_scaning ? {} : JSON.parse(goal_scaning)
        };
        this.tableData = [
          {
            date: response_info
          }
        ];
      }
    },
    async getVulnTotal(id) {
      let res = await this.$api.vulnTotal({ target_id: id });
      if (res.data.result === 0) {
        // this.taskInfo.vulnTotal
        res.data.vulns.forEach(item => {
            this.$set(this.vulnTotal,Number(item.vuln_level),{
                value: item.vuln_total,
                name: vulnMap[item.vuln_level]
            })
        })
        //  for (let i = 0; i < 5; i++) {
        //      console.log(i, res.data.vulns[i].vuln_level)
        //      if (i == res.data.vulns[i].vuln_level) {
        //          this.vulnTotal[i] = {
        //              value: res.data.vulns[i].vuln_total,
        //              name: res.data.vulns[i].vuln_level
        //          }
        //      } else {
        //          this.vulnTotal[i] = {
        //              value: 0,
        //              name: vulnMap[i]
        //          }
        //      }
        //  }
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

.taskExec {
  .task-target {
    display: flex;
    height: 395px;
    .first {
      flex: 1;
      margin-right: 20px;
      .task-num {
        width: 100%;
        display: flex;
        height: 226px;
      }
      .no-pic {
        width: 60%;
        margin-right: 20px;
        height: 226px;
      }
      .pic {
        flex: 1;
        height: 196px;
        margin-top: 30px;
        background-color: rgba(38, 49, 67, 1);
        .pic-num {
          color: #18bb9a;
          font-size: 14px;
        }
        .circle {
          width: 119px;
          height: 119px;
          margin: 18px auto;
          background: url(../../../public/img/png/circle.png) center center
              no-repeat,
            url(../../../public/img/png/circlebg.png) center center no-repeat;
          background-size: 119px 119px, 119px 119px;
        }
        .circle.ing {
          animation: ing 2s linear infinite;
        }
        box-shadow: 4px 0px 4px rgba(29, 36, 46, 1);
      }
      ul {
        display: flex;
        text-align: center;
      }
      li {
        float: left;
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
      .taskInfo {
        li {
          line-height: 58px;
          text-align: center;
          font-size: 14px;
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
      height: 395px;
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
      margin-top: 6px;
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
}
</style>


