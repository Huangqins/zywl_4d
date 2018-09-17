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
                       <li>开始时间:2018-09-02   12:34:12</li>
                       <li>已历时:3天13小时34分50秒</li>
                   </ul>
               </panel>
               <panel title="风险数量" style="margin-top:-12px;">
                   <ul class="clearfix" style="height:98px;">
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
                                 
                             </div>
                         </li>
                         <li>
                             <div class="title">业务功能识别</div>
                             <div class="des"></div>
                         </li>
                         <li>
                             <div class="title">安全测试</div>
                             <div class="des"></div>
                         </li>
                         <li>
                             <div class="title">风险利用取证</div>
                             <div class="des"></div>
                         </li>
                     </ul>
                 </div>
             </panel>
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

import panel from '@/components/panel'

export default {
    components: {
        panel
    },
    data() {
        return {
            tableData: [],
            holeListData: []
        }
    }
}
</script>
<style lang="scss" scoped>
@keyframes ing {
    0% {transform: rotateZ(0deg)}
    100% {transform: rotateZ(360deg)}
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
              height:226px;
          }
          .pic {
              flex: 1;
              height:196px;
              margin-top: 30px;
              background-color:rgba(38,49,67,1);
              .circle {
                  width: 119px;
                  height: 119px;
                  margin: 18px auto;
                  background: url(../../../public/img/png/circle.png) center center no-repeat,
                  url(../../../public/img/png/circlebg.png) center center no-repeat;
                  background-size: 119px 119px, 119px 119px;
              }
              .circle.ing {
                  animation: ing 2s linear infinite;
              }
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
              .title, .check-status {
                  padding:10px 0;
              }
          }
      }
      .task-state {
          width:30%;
          height:395px;
          box-shadow:4px 0px 4px rgba(29,36,46,1);
      }
  }
  .degree {
      height: 118px;
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
}
</style>


