<template>
  <div class="taskExec">
    <!-- 任务目标层 -->
    <div class="task-target">
      <div class="first">
        <div class="task-num">
          <div class="no-pic">
            <panel title="任务信息" style="margin-top:-22px;">
              <ul class="taskInfo clearfix" style="height:58px;">
                <li>任务名称:{{taskInfo.target_name}}</li>
                <li>开始时间:{{taskInfo.target_createtime}}</li>
                <li>已历时: {{formatTime(Date.now()- taskInfo.target_starttime.time)}}</li>
              </ul>
            </panel>
            <panel title="风险数量" style="margin-top:-12px;">
              <ul class="clearfix" style="height:98px;">
                <li v-for="(item, index) in vulnTotal" :key="index + 'f'">
                  <dl>
                    <dt>{{item.value}}</dt>
                    <dd :class="[`vuln-bg-${index}`]">{{item.name}}</dd>
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
                    <div class="num">{{ !taskInfo.goal_scaning ? 0 : taskInfo.goal_scaning.total }}</div>
                  </div>
                  <div class="des-num">
                    <div class="title">完成数量</div>
                    <div class="num">{{ !taskInfo.goal_scaning ? 0 : taskInfo.goal_scaning.now }}</div>
                  </div>
                </div>
                <div :class="['res', {'checkfull': taskInfo.goal_scaning.status === '1' ? true : false}, {'checking': taskInfo.goal_scaning.status === '0' ? true : false}]">
                  <span v-if="taskInfo.goal_scaning.status === '1'">
                    检测完成
                  </span>
                  <span v-else-if="taskInfo.goal_scaning.status === '0'">
                    检测中...
                  </span>
                  <span v-else>
                    等待检测
                  </span>
                </div>
              </li>
              <li>
                <div class="title">业务功能识别</div>
                <div class="des">
                  <div class="des-num">
                    <div class="title">系统数量</div>
                    <div class="num">{{!taskInfo.logic_scaning ? 0 : taskInfo.logic_scaning.total }}</div>
                  </div>
                  <div class="des-num">
                    <div class="title">完成数量</div>
                    <div class="num">{{!taskInfo.logic_scaning ? 0 : taskInfo.logic_scaning.now }}</div>
                  </div>
                </div>
                <div :class="['res']">
                  <!-- <span v-if="taskInfo.logic_scaning.status === '1'">
                    检测完成
                  </span>
                  <span v-else-if="taskInfo.logic_scaning.status === '0'">
                    检测中...
                  </span>
                  <span v-else>
                    等待检测
                  </span> -->
                  <!-- <span>{{taskInfo.logic_scaning.now}}</span> -->
                </div>
              </li>
              <li>
                <div class="title">安全测试</div>
                <div class="des">
                  <div class="des-num">
                    <div class="title">业务功能数</div>
                    <div class="num">{{ !taskInfo.safe_scaning ? 0 : taskInfo.safe_scaning.total }}</div>
                  </div>
                  <div class="des-num">
                    <div class="title">完成测试数量</div>
                    <div class="num">{{ !taskInfo.safe_scaning ? 0 : taskInfo.safe_scaning.now }}</div>
                  </div>
                </div>
                <div :class="['res']">
                  <!-- <span v-if="taskInfo.safe_scaning.status === '1'">
                    检测完成
                  </span>
                  <span v-else-if="taskInfo.safe_scaning.status === '0'">
                    检测中...
                  </span>
                  <span v-else>
                    等待检测
                  </span> -->
                </div>
              </li>
              <li>
                <div class="title">风险利用取证</div>
                <div class="des">
                  <div class="des-num">
                    <div class="title">风险数量</div>
                    <div class="num">0</div>
                  </div>
                  <div class="des-num">
                    <div class="title">利用成功</div>
                    <div class="num">0</div>
                  </div>
                  <div class="des-num">
                    <div class="title">利用失败</div>
                    <div class="num">0</div>
                  </div>
                  <div class="des-num">
                    <div class="title">取证数量</div>
                    <div class="num">0</div>
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
          <div style="height:616px;position:relative;">
            <div class="line"></div>
            <el-scrollbar>
              <ul class="time-line">
                <li v-for="(item, index) in holeListData" :key="index + 'g'">
                  <div class="time">{{item.vuln_ftime}}</div>
                  <div class="ball"></div>
                  <div class="name">
                    <div>{{item.vuln_name}}</div>
                    <div>{{item.vuln_URL}}</div>
                  </div>
                </li>
              </ul>
            </el-scrollbar>
          </div>
        </panel>
      </div>
    </div>
    <!-- 风险列表 -->
    <div class="holelist">
      <panel title="风险列表">
        <el-table :data="holeListData" style="width: 100%">
          <el-table-column prop="vuln_num" label="风险编号" align="center"> </el-table-column>
          <el-table-column prop="vuln_name" label="风险名称" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="vuln_level" label="风险等级" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="vuln_class" label="风险类型" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="vuln_url" label="风险地址" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="vuln_useInfo" label="利用情况" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="image_path" label="取证情况" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="vuln_ftime" label="发现时间" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="vuln_modifytime" label="利用时间" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" align="center"> </el-table-column>
        </el-table>
      </panel>
    </div>
  </div>
</template>
<script>
import panel from "@/components/panel";
import { formatTime, fomatterTime } from "@/utils";
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
      this.vulnSearch(target_id);
    }, 5000);
    this.getVulnTotal(target_id);
    this.vulnSearch(target_id);
    this.targetProgress(target_id);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  data() {
    return {
      tableData: [],
      holeListData: [],
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
        target_starttime: {}
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
          response_info,
          target_name,
          target_createtime,
          logic_scaning,
          safe_scaning,
          use_scaning,
          target_starttime
        } = res.data.target;
        this.taskInfo = {
          target_task_num,
          check_scaning,
          target_scaning,
          goal_scaning: !goal_scaning
            ? { now: 0, total: 0, status: "" }
            : JSON.parse(goal_scaning),
          logic_scaning: !logic_scaning
            ? { now: 0, total: 0, status: "" }
            : JSON.parse(logic_scaning),
          safe_scaning: !safe_scaning
            ? { now: 0, total: 0, status: "" }
            : JSON.parse(safe_scaning),
          use_scaning: !use_scaning
            ? { now: 0, total: 0, status: "" }
            : JSON.parse(use_scaning),
          target_name,
          target_createtime: fomatterTime(new Date(target_createtime.time)),
          target_starttime
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
        res.data.vulns.forEach(item => {
          this.$set(this.vulnTotal, Number(item.vuln_level), {
            value: item.vuln_total,
            name: vulnMap[item.vuln_level]
          });
        });
      }
    },
    // 风险列表
    async vulnSearch(id) {
      let res = await this.$api.vulnSearch({ target_id: id });
      if (res.data.result === 0) {
        this.holeListData = res.data.rows;
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
.time-line {
  li {
    align-items: center;
    text-align: center;
    display: flex;
    margin-bottom: 10px;
    .time {
      width: 35%;
      margin: 0 5px;
      color: #dba480;
      font-size: 14px;
    }
    .ball {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #7d75de;
    }
    .name {
      font-size: 14px;
      // overflow: hidden;
      flex: 1;
      height: 59px;
      line-height: 59px;
      margin: 0 20px;
      background-color: #7d75de;
      position: relative;
      border-radius: 4px;
      &::before {
        content: "";
        position: absolute;
        left: -10px;
        top: 25px;
        border: 5px solid #7d75de;
        border-top: 5px solid transparent;
        border-left: 5px solid transparent;
        border-bottom: 5px solid transparent;
      }
    }
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
        width: 68%;
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
          padding: 10px 10px 10px 15px;
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
      .line {
        position: absolute;
        margin-top:32px;
        height: 567px;
        left: calc( 38% + 0px);
        width: 2px;
        background:rgba(18,27,41,1);
      }
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
        12px
        center
        no-repeat;
    }
  }
}
</style>


