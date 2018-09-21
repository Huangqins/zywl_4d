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
              <div class="vuln-num">
                <div class="left">
                  1
                  <!-- <ul class="clearfix" style="height:98px;">
                  <li>
                    <dl>
                      <dt>100</dt>
                      <dd class="vuln-bg-4">极高风险数</dd>
                    </dl>
                  </li>
                </ul> -->
                </div>
                <div class="middle">
2
                </div>
                <div class="right">
3
                </div>
              </div>

            </panel>
          </div>

          <div class="pic">
            <div class="pic-num">漏洞类型百分比分布</div>

          </div>
        </div>
        <!--  -->
        <!-- <div class="tables">
          <panel title="任务目标情况">

          </panel>
          <panel title="新发现资产/域名">
          </panel>
        </div> -->

      </div>
      <div class="task-state">
        <panel title="新发现业务功能" style="margin-top:-22px;">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="域名"></el-table-column>
            <!-- <el-table-column  label="IP"></el-table-column>
                        <el-table-column  label="可访问性"></el-table-column> -->
          </el-table>
        </panel>
      </div>
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

.tables {
  display: flex;
  & > div {
    flex: 1;
  }
  & > div:first-child {
    margin-right: 20px;
  }
}
.vuln-num {
  display: flex;
  height: 254px;
  & > div {
    flex: 1;
    height: 100%;
  }
}
</style>


