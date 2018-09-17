<template>
    <div class="task">
        <div class="queryCriteria">
            <div>任务筛选:</div>
            <div>
                <el-select v-model="taskname" filterable placeholder="任务名称">
                    <el-option
                    v-for="item in tasknameS"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="scanTarget" filterable placeholder="扫描目标" class="select">
                    <el-option
                    v-for="item in scanTargetS"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="executionmode" filterable placeholder="执行方式" >
                    <el-option
                    v-for="item in executionmodeS"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-button class="btn">查询</el-button>
            </div>
            <div>
                <el-button type="primary" @click="addDialog"><i class="el-icon-plus"></i>添加任务测试 </el-button>
            </div>
        </div>
            <div>
              <div class="task-tab">
                <ul>
                  <li v-for="(item, index) in taskTabList" :key="index" @click="switchSource(index)" :class="{ active: activeIndex === index }">{{ item.label }}</li>
                </ul>
              </div>
              <div>
                <panel>
                   <el-table :data="tableData" style="width: 100%;" >
                        <el-table-column  type="index" label="序号"> </el-table-column>      
                        <el-table-column prop="target_name" label="任务名称" align="center" :show-overflow-tooltip="true" style="color:#f6f6f6"></el-table-column>
                        <el-table-column prop="target_url" label="任务目标" align="center" :show-overflow-tooltip="true"></el-table-column>
                        
                         <el-table-column prop="target_cycle_time" label="任务已执行时间" align="center" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                              <div v-if="scope.row.target_endtime && scope.row.target_endtime.time" style="color:#f6f6f6">
                                {{ formatTime(scope.row.target_endtime.time - scope.row.target_starttime.time) }}
                              </div>
                              <div v-else-if="scope.row.target_struts === '2'">
                                任务待执行中...
                              </div>
                              <div v-else style="color:#f6f6f6">
                                {{ formatTime(Date.now()-scope.row.target_starttime.time) }}
                              </div>
                            </template>

                        </el-table-column>
                        <el-table-column prop="target_teststra" label="策略" align="center" width="100" style="color:#f6f6f6">
                          <template slot-scope="scope">
                            {{ strage[scope.row.target_teststra] }}
                          </template>
                        </el-table-column>
                        <el-table-column prop="target_starttime" label="开始时间" align="center" :show-overflow-tooltip="true" >
                          <template slot-scope="scope" >
                            <span style="color:#a7a7a7;!important">
                                {{ fomatterTime(new Date(scope.row.target_starttime.time))}}
                            </span>               
                          </template>
                        </el-table-column>
                        <el-table-column prop="target_endtime" label="结束时间" align="center" :show-overflow-tooltip="true">
                          <template slot-scope="scope">
                            <span v-if="scope.row.target_struts === '1' || scope.row.target_struts === '-2' || scope.row.target_struts === '-1'" style="color:#a7a7a7;!important">
                              {{ fomatterTime(new Date(scope.row.target_endtime.time))}}
                            </span>
                            <span v-else></span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="pdf_name" label="报告名称" align="center" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column label="操作" align="cente" width="230">
                          <template slot-scope="scope">
                            <template v-if="scope.row.target_struts == 2 ">                  
                                <el-tooltip class="item" effect="dark" content="立即执行任务" placement="top">
                              
                                <div class="search start" @click.native="taskBegin(scope.row)"></div>
                                </el-tooltip>
                            </template>
                            <template v-else-if="scope.row.target_struts == 0">
                            
                                <el-tooltip class="item" effect="dark" content="立即终止任务" placement="top">                   
                              
                                <div class="search stop" @click.native="taskOver(scope.row)"></div>
                              </el-tooltip>
                            </template>
                            <template v-if="scope.row.export_url">
                              
                              <el-tooltip class="item" effect="dark" content="下载报告" placement="top">
                              
                                
                                    <div class="search downLoad" @click.native="exportFile(scope.row.export_url,scope.row.pdf_name)"></div>
                              
                              </el-tooltip>
                            </template>
                            <template v-else>
                            
                              <el-tooltip class="item" effect="dark" content="生成报告" placement="top">
                              
                                <div class="search birth" @click.native="download(scope.row)"></div>
                              </el-tooltip>
                            </template>
                            
                                <el-tooltip class="item" effect="dark" content="查看任务进度" placement="top">
                                <div @click.native="taskDetail(scope.row)" class="search detailLook">  </div>
                                </el-tooltip>
                            <!-- 删除按钮暂定不用 -->
                          </template>
                        </el-table-column>
                      </el-table>
              
                </panel>
              
              </div>
        </div>
         <!-- 添加任务 -->
      <el-dialog title="添加测试任务" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="form" label-width="100px" ref="form" :rules="rules">
          <el-form-item label="任务名称" prop="target_name">
            <el-input v-model="form.target_name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="任务类型" prop="task_type_id">
            <el-select v-model="form.task_type_id" placeholder="请选择任务类型" style="width:100%">
              <el-option v-for="(item,index) in taskType" :key="index + 'a'" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务策略" prop="target_teststra">
            <el-select v-model="form.target_teststra" placeholder="请选择任务测试" style="width:100%">
              <el-option v-for="(item,index) in strageArr" :key="index + 'e'" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务周期" prop="target_cycle">
            <el-select v-model="form.target_cycle" placeholder="请选择任务周期" style="width:100%">
              <el-option v-for="(item, index) in cycleArr" :key="index + 'd'" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间" prop="target_starttime">
            <el-date-picker v-model="form.target_starttime" type="datetime" placeholder="选择开始时间" style="width:100%">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="测试类型" prop="type_name">
            <el-select v-model="form.type_name" placeholder="请选择测试类型" style="width:100%">
              <el-option v-for="(item,index) in typeArr" :key="index + 'a'" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>        
        
          <el-form-item label="资产链接" prop="_asset_ids">
          <div v-if="form.task_type_id == 0 ">
            <el-select  v-model="form._asset_ids" multiple  filterable   placeholder="" style="width:100%">
                <el-option v-for="(item, index) in urlArr" :key="index + 'b'" :label="item.label" :value="item.value" ></el-option>
            </el-select>
            </div>
            <div v-if="form.task_type_id == 1 ">
              <el-input type="textarea" v-model="form.target_url" auto-complete="off" placeholder="例：192.168.1.1或192.168.1.1-192.168.1.255或192.168.1.1/24或www.xxx.com.cn"></el-input>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" style="background:transparent">取 消</el-button>
          <el-button type="primary" @click="addTask(form)" :loading="addPending" style="color:#d8d8d8">确 定</el-button>
        </div>
      </el-dialog>
        <!--分页-->
        <pages :total="pageTotal" @pageChange="pageChange" ref="page"></pages>
    </div>
  
</template>
<script>
import { getUserName } from "@/utils/auth";
import Panel from '@/components/panel'
import { fomatterTime, deepClone, formatTime, staticAssetPath } from "@/utils";
import Pages from "@/components/Pages";
const strage = {
  medium: "常规策略",
  high: "深度策略"
};
export default {
  components: {
    Panel,
    Pages
  },
  data() {
    return {
      pageObj: {},
      defaultPage: {
        rows: 10,
        page: 1
      },
      pageTotal: 0,
      dialogFormVisible: false,
      fomatterTime: fomatterTime,
      strage: strage,
      formatTime: formatTime,
      activeIndex: 0,
      tasknameS: [],
      tableData: [],
      taskname: "",
      scanTargetS: [],
      scanTarget: "",
      executionmodeS: [],
      executionmode: "",
      taskType: [
        {
          label: "常规任务",
          value: 0
        },
        {
          label: "紧急任务",
          value: 1
        }
      ],
      form: {
        target_name: "渗透测试+" + fomatterTime(new Date()),
        target_teststra: "",
        target_starttime: new Date(),
        target_cycle: "",
        target_url: "",
        asset_ids: "",
        _asset_ids: "",
        target_ip: "",
        type_id: 1,
        type_name: "",
        task_type_id: 0,
        userName: getUserName()
      },
      strageArr: [],
      cycleArr: [],
      typeArr: [],
      urlArr: [],
      taskTabList:[
        {
          label: "所有任务",
          value: 0
        },
        {
          label: "正在执行的任务",
          value: 0
        },
        {
          label: "已完成任务",
          value: 0
        }
      ],
      addPending: false,
      rules: {
        target_name: [
          {
            type: "string",
            required: true,
            message: "任务名称不能为空",
            trigger: "blur"
          }
        ],
        target_teststra: [
          {
            required: true,
            message: "策略类型不能为空",
            trigger: 'change'
          }
        ],
        target_starttime: [
          {
            type: "object",
            required: true,
            message: "开始时间不能为空",
            trigger: "change"
          }
        ],
        target_cycle: [
          {
            required: true,
            message: "测试周期不能为空",
            trigger: 'change'
          }
        ],
        type_id: [
          {
            type: Number,
            required: true,
            message: "测试类型不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getRule({ flag: 2 });
    this.getRule({ flag: 1 });
    this.getTargetType();
    this.getAssetURL();

  },
  mounted() {
    this.switchSource(0);
  },
  methods: {
    pageChange(pageObj) {
      this.pageObj = pageObj;
      let { page, rows } = pageObj,
        params = {};
      if (this.activeIndex === 0) {
        params = Object.assign({}, { page, rows });
        this.targetInfo(params);
      } else if (this.activeIndex === 1) {
        params = Object.assign({}, { page, rows, target_struts: 0 });
        this.targetInfo(params);
      } else {
        params = Object.assign({}, { page, rows, target_struts: 1 });
        this.targetInfo(params);
      }
    },
    switchSource(index) {
      this.activeIndex = index;
      this.$refs.page.reset();
      if (index === 0) {
        let params = Object.assign({}, this.defaultPage);
        this.targetInfo(params);
      } else if (index === 1) {
        let params = Object.assign({}, this.defaultPage, { target_struts: 0 });
        this.targetInfo(params);
      } else {
        let params = Object.assign({}, this.defaultPage, { target_struts: 1 });
        this.targetInfo(params);
      }
    },
    //   任务列表
    async targetInfo(params) {
          console.log(params)

      this.loading = true;
      let res = await this.$api.targetInfo(params);
      if (res.data.result === 0) {
        this.tableData = res.data.targets;
        this.pageTotal = res.data.total;
      }
    },
    addDialog() {
      this.dialogFormVisible = true;
      // form在对话框中渲染，需要在下一次事件循环再执行清空
      this.$nextTick(() => {
        this.$refs.form.resetFields();
        this.form.target_starttime = new Date();
        this.form.target_name = "渗透测试+" + fomatterTime(new Date());
      });
    },
    // 获取策略规则
    async getRule(params) {
      let res = await this.$api.getRule(params);
      if (res.data.result === 0) {
        if (params.flag === 1) {
          //策略
          this.strageArr = res.data.rules.map(item => {
            return {
              label: item.rule_name,
              value: item.rule_id
            };
          });
          this.form.target_teststra = this.strageArr[0].value
        } else {
          //周期
          this.cycleArr = res.data.rules.map(item => {
            return {
              label: item.rule_name,
              value: item.rule_id
            };
          });
          this.form.target_cycle = this.cycleArr[0].value;
        }
      }
    },
    // 任务类型
    //测试类型
    async getTargetType() {
      let res = await this.$api.getTargetType();
      if (res.data.result === 0) {
        let list = res.data.targetType;
        list.forEach(item => {
          this.typeArr.push({
            value: item.type_id,
            label: item.type_name
          });
          this.form.type_name = this.typeArr[0].value
        });
      }
    },
    async getAssetURL() {
      let res = await this.$api.getAssetURL();
      if (res.data.result === 0) {
        let list = res.data.lists;
        list.forEach(item => {
          this.urlArr.push({
            value: item.assets_id,
            label: item.assets_url
          });
        });
      }
    },    
    // 添加任务
    addTask(params) {
       this.$refs.form.validate(valid => {
         if (valid) {
              params.asset_ids = params._asset_ids.join(",");
      if (
        params.target_starttime - Date.now() > 0 &&
        params.target_cycle === "now"
      ) {
        this.$message.error(`执行开始时间大于当前时间,不能选择立即执行`);
      } else {
        let obj = Object.assign({}, params, {
          target_starttime: fomatterTime(params.target_starttime)
        });
        this.addPending = true;
        this.$api.addTarget(obj).then(res => {
          this.addPending = false;
          if (res.data.result === 0) {
            this.dialogFormVisible = false;
            this.$message.success("任务添加成功");
            this.$router.push('/taskManage/taskExec')
            this.targetInfo(this.params);
          } else if (res.result === 1) {
            this.$message.error("任务添加失败");
          } else if (res.result === 2) {
            this.$message.error("填写资产不存在");
          }
        });
      }
         }
       })
    }
  }
};
</script>
<style lang="scss" scoped>
.task {
  /*margin: 20px 20px 0 20px;*/
}
.queryCriteria {
  /*padding: 0 30px;*/
  color: #fff;
  height: 40px;
  line-height: 40px;
  font-weight: 400;
  display: flex;
  & > div:first-child {
    // width: 69px;
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
    /*width: 180px;*/
    font-size: 16px;
    color: rgba(24, 187, 154, 1);
  }
}
.select {
  margin: 0 10px;
}
.btn {
  margin-left: 10px;
}
.task-tab {
  display: inline-block;
    margin: 15px 0;
  // border: 1px solid #24536f;
  /*height: 46px;*/
  ul {
    overflow: hidden;
    color: #B0B7BB;
    .active {
      color: #18BB9A;
      background: #2D384A;
      border-top: 2px solid #18BB9A;
    }
    li {
      float: left;
      border-top: 2px solid #2D384A;
      cursor: pointer;
      list-style: none;
      width:126px;
      height:46px;
      background:rgba(38,49,67,1);
      line-height: 46px;
      text-align: center  ;
      margin-right: 3px;   
    }
    
  }
}
.search {
  margin-right: 15px;
  display: inline-block;
  cursor: pointer;
}
.detailLook {
  width: 18px;
  height: 18px;
  background: url("../../../public/img/png/search.png") center center no-repeat;
  background-size: 100% 100%;
  &:hover {
    background: url("../../../public/img/png/searchActive.png") center center
      no-repeat;
    background-size: 100% 100%;
  }
}
.birth {
  width: 18px;
  height: 18px;
  background: url("../../../public/img/png/birthm.png") center center no-repeat;
  background-size: 100% 100%;
  &:hover {
    background: url("../../../public/img/png/birth.png") center center no-repeat;
    background-size: 100% 100%;
  }
}
.downLoad {
  width: 18px;
  height: 18px;
  background: url("../../../public/img/png/downw.png") center center no-repeat;
  background-size: 100% 100%;
  &:hover {
    background: url("../../../public/img/png/down.png") center center no-repeat;
    background-size: 100% 100%;
  }
}
.stop {
  width: 18px;
  height: 18px;
  background: url("../../../public/img/png/stop.png") center center no-repeat;
  background-size: 100% 100%;
  &:hover {
    background: url("../../../public/img/png/stopSure.png") center center
      no-repeat;
    background-size: 100% 100%;
  }
}
.start {
  width: 18px;
  height: 18px;
  background: url("../../../public/img/png/strat.png") center center no-repeat;
  background-size: 100% 100%;
  &:hover {
    background: url("../../../public/img/png/startSure.png") center center
      no-repeat;
    background-size: 100% 100%;
  }
}
</style>
