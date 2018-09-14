<template>
    <div class="taskExec">
        <!-- 任务目标层 -->
        <div class="task-target">
            <div class="task-num">
               <div class="no-pic">
                   <panel title="任务信息" style="margin-top:-22px;">
                   <ul class="taskInfo clearfix" style="height:58px;">
                       <li>任务名称:渗透测试-9077-76体育公园</li>
                       <li>开始时间:2018-09-02   12:34:12</li>
                       <li>已历时:3天13小时34分50秒</li>
                   </ul>
               </panel>
               <panel title="风险数量" style="margin-top:-12px;">
                   <ul class="clearfix" style="height:93px;">
                       <li>
                           <dl>
                               <dt>68,678</dt>
                               <dd>极高风险数</dd>
                           </dl>
                        </li>
                        <li>
                           <dl>
                               <dt>68,678</dt>
                               <dd>极高风险数</dd>
                           </dl>
                        </li>
                        <li>
                           <dl>
                               <dt>68,678</dt>
                               <dd>极高风险数</dd>
                           </dl>
                        </li>
                        <li>
                           <dl>
                               <dt>68,678</dt>
                               <dd>极高风险数</dd>
                           </dl>
                        </li>
                        <li>
                           <dl>
                               <dt>68,678</dt>
                               <dd>极高风险数</dd>
                           </dl>
                        </li>
                   </ul>
               </panel>
               </div>
               
               <div class="pic">

               </div>
               
            </div>
            <div class="task-state">
                 <panel title="任务目标情况" style="margin-top:-22px;">
                     <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="date" label="域名"></el-table-column>
                        <el-table-column prop="date" label="IP"></el-table-column>
                        <el-table-column prop="date" label="可访问性"></el-table-column>
                    </el-table>
                 </panel>
            </div>
        </div>
    </div>
</template>
<script>

import panel from '@/components/panel'

export default {
    components: {
        panel
    },
    data() {
        return {
            tableData: []
        }
    }
}
</script>
<style lang="scss" scoped>
.taskExec {
  .task-target {
      display: flex;
      height: 357px;
      .task-num {
          display: flex;
          flex: 1;
          margin-right: 20px;
          .no-pic {
              width: 60%;
              margin-right: 20px;
          }
          .pic {
              flex: 1;
              height:196px;
              margin-top: 30px;
              background:rgba(38,49,67,1);
              box-shadow:4px 0px 4px rgba(29,36,46,1);
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
                  dt {
                      margin: 5px 0;
                  }
                  dd {
                      margin-left: 0;
                  }
              }
          }
          .taskInfo {
              li {
                  line-height: 58px;
                  text-align: center;
              }
          }
          .status {
              font-size: 14px;
              .title, .check-status {
                  padding:10px 0;
              }
          }
      }
      .task-state {
          width:30%;
          height:357px;
          box-shadow:4px 0px 4px rgba(29,36,46,1);
      }
  }
}
</style>


