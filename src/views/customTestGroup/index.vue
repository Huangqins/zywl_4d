<template>
  <div class="customTestGroup">
    <asset-panel :panelData="panelData" @add="add" @deletItem="deletItem"></asset-panel>
    <!-- <asset-panel></asset-panel> -->

    <!--  弹框 -->
    <el-dialog title="添加任务测试" :visible.sync="dialogTableVisible" width="28%">
      <el-form :model="form" label-width="100px" ref="form" :rules="rules">
        <el-form-item label="任务名称" prop="target_name">
          <el-input v-model="form.target_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="任务策略" prop="target_teststra">
          <el-select v-model="form.target_teststra" placeholder="请选择任务测试" style="width:100%">
            <el-option v-for="(item,index) in strageArr" :key="index + 'e'" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务类型" prop="type_id">
          <el-select v-model="form.type_id" placeholder="请选择任务类型" style="width:100%">
            <el-option v-for="(item,index) in taskType" :key="index + 'a'" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务周期" prop="target_cycle">
          <el-select v-model="form.target_cycle" placeholder="请选择任务周期" style="width:100%">
            <el-option v-for="(item, index) in cycleArr" :key="index + 'd'" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="测试类型" prop="type_name">
          <el-select v-model="form.type_name" placeholder="请选择测试类型" style="width:100%">
            <el-option v-for="(item,index) in typeArr" :key="index + 'a'" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" prop="target_starttime">
          <el-date-picker v-model="form.target_starttime" type="datetime" placeholder="选择开始时间" style="width:100%">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTask(form)">添加任务</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import AssetPanel from "@/components/AssetPanel";
import { fomatterTime } from "@/utils";

export default {
  components: {
    AssetPanel
  },
  data() {
    return {
      panelData: [],
      strageArr: [],
      cycleArr: [],
      typeArr: [],
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
      dialogTableVisible: false,
      form: {
        target_name: "渗透测试+",
        target_teststra: "",
        target_starttime: new Date(),
        target_cycle: "",
        type_id: 0,
        group_code: null
      },
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
            trigger: "change"
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
            trigger: "change"
          }
        ],
        type_id: [
          {
            required: true,
            message: "测试类型不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.assetsGroupTotal();
    this.getRule({ flag: 2 });
    this.getRule({ flag: 1 });
    this.getTargetType();
  },
  methods: {
    addTask(params) {
      this.$refs.form.validate(valid => {
        if (valid) {
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
                this.$router.push({
                  name: "taskExec",
                  params: {
                    target_id: res.data.target_id
                  }
                });
              } else if (res.result === 1) {
                this.$message.error("任务添加失败");
              } else if (res.result === 2) {
                this.$message.error("填写资产不存在");
              }
            });
          }
        }
      });
    },
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
          this.form.type_name = this.typeArr[0].value;
        });
      }
    },
    async assetsGroupTotal() {
      let res = await this.$api.assetsGroupTotal();
      if (res.data.result === 0) {
        this.panelData = res.data.list;
      }
    },
    add(item) {
      this.form.group_code = item.group_code;
      this.dialogTableVisible = true;
      //   console.log(item, "item");
    },
    async deletItem({ group_code, group_name }) {
      let res = await this.$api.deleteAssetsGroup({ group_code, group_name });
      if (res.data.result === 0) {
        this.$message.success('删除成功')
           this.assetsGroupTotal();
      }
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
          this.form.target_teststra = this.strageArr[0].value;
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
    }
  }
};
</script>
<style lang="scss" scoped>
.customTestGroup {
  padding-top: 20px;
}
.btn {
}
</style>
