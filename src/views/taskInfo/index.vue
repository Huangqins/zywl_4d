<template>
    <div class="task">
        <div class="queryCriteria">
            <div>任务筛选:</div>
            <div>
            <!-- <el-select v-model="value8" filterable placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="value8" filterable placeholder="请选择" class="select">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="value8" filterable placeholder="请选择" >
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select> -->
            <el-button class="btn">查询</el-button>
        </div>
        <div>
  <el-button type="primary" @click="addDialog"><i class="el-icon-plus"></i>添加任务测试 </el-button>
        </div>
        </div>
         <!-- 添加任务 -->
      <el-dialog title="添加测试任务" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="form" label-width="80px" ref="form" :rules="rules">
          <el-form-item label="任务名称" prop="target_name">
            <el-input v-model="form.target_name" auto-complete="off"></el-input>
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
          <el-form-item label="测试类型" prop="type_id">
            <el-select v-model="form.type_id" placeholder="请选择测试类型" style="width:100%">
              <el-option v-for="(item,index) in typeArr" :key="index + 'a'" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间" prop="target_starttime">
            <el-date-picker v-model="form.target_starttime" type="datetime" placeholder="选择开始时间" style="width:100%">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="资产URL/IP" prop="target_url">
            <el-select v-model="form.target_url" filterable placeholder="资产url" style="width:100%">
              <!-- <el-option v-for="(item, index) in urlArr" :key="index + 'b'" :label="item.label" :value="item.value"></el-option> -->
            </el-select>
          </el-form-item>

          <!-- <el-form-item label="资产IP" prop="target_ip">
            <el-select v-model="form.target_ip" placeholder="资产IP" style="width:100%">
              <el-option v-for="(item, index) in ipArr" :key="index + 'f'" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" style="background:transparent">取 消</el-button>
          <el-button type="primary" @click="addTask(form)" :loading="addPending" style="color:#d8d8d8">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import { getUserName } from "@/utils/auth";
import { fomatterTime, deepClone, formatTime,staticAssetPath } from "@/utils";
export default {
  data() {
    return {
        dialogFormVisible: false,
        form: {
            target_name: "渗透测试+" + fomatterTime(new Date()),
            target_teststra: "medium",
            target_starttime: new Date(),
            target_cycle: "now",
            target_url: "",
            target_ip: "",
            type_id: 1,
            userName: getUserName()
       },
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
            type: "string",
            required: true,
            message: "策略类型不能为空",
            trigger: "change"
          }
        ],
        target_starttime: [
          {
            type: "string",
            required: true,
            message: "开始时间不能为空",
            trigger: "change"
          }
        ],
        target_cycle: [
          {
            type: "string",
            required: true,
            message: "测试周期不能为空",
            trigger: "blur"
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
      },
    };
  },
  methods: {
    addDialog() {
      this.dialogFormVisible = true;
      // form在对话框中渲染，需要在下一次事件循环再执行清空
      this.$nextTick(() => {
        this.$refs.form.resetFields();
        this.form.target_starttime = new Date();
        this.form.target_name = "渗透测试+" + fomatterTime(new Date());
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.task {
  margin: 20px 20px 0 20px;
}
.queryCriteria {
  padding: 0 30px;
  color: #fff;
  height: 40px;
  line-height: 40px;
  font-weight: 400;
  display: flex;
  & > div:first-child {
    width: 69px;
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
    width: 180px;
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
</style>
