<template>
  <div>
    <panel title='新建[漏洞整改]审批工单'>
      <div class="workAdd">
        <el-form ref="form" :model="form" label-width="110px" :rules="rules">
          <el-form-item label="工单名称" prop="order_name">
            <el-input v-model="form.order_name"></el-input>
          </el-form-item>

          <el-form-item label="工单类型" prop="order_type">
            <el-select v-model="form.order_type" placeholder="请选择活动区域" style="width:100%">
              <el-option v-for="item in workTypeS" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工单内容" prop="order_content">
            <el-select v-model="form.order_content" filterable placeholder="请输入任务名称" style="width:100%" @change="orderChange">
              <el-option v-for="item in orders" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="漏洞列表" prop="vuln">
            <!-- <el-select
                        v-model="form.value11"
                        multiple
                        collapse-tags
                        style="width:100%"
                        placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select> -->
            <el-table :data="tableData" style="width: 100%;" v-loading="tableLoading" @select='select'>
              <el-table-column type="selection" width="35"></el-table-column>
              <el-table-column prop="assets_name" label="漏洞名称" align="center" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="assets_name" label="漏洞链接" align="center" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="assets_name" label="漏洞IP" align="center" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="assets_name" label="漏洞等级" align="center" :show-overflow-tooltip="true"></el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="审核人" prop="audit_user">
            <el-input v-model="form.audit_user"></el-input>
          </el-form-item>
          <el-form-item label="工单紧急程度" prop="workType">
            <el-select v-model="form.workType" style="width:100%">
              <el-option v-for="item in workTypeS" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工单紧急程度" prop="workType"></el-form-item>
          <el-form-item style="margin:0 auto;width:50%">
            <el-button @click="keep('ruleForm')">保存</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确认并提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </panel>
  </div>
</template>
<script>
import Panel from "@/components/panel";
export default {
  components: {
    Panel
  },
  data() {
    return {
      form: {
        name: "",
        workType: "",
        detail: "",
        person: "",
        order_content: ''
      },
      tableLoading: false,
      tableData: [],
      selectData: [], 
      orders: [],
      workTypeS: [
        {
          value: 1,
          label: "整改"
        },
        {
          value: 2,
          label: "任务"
        }
      ],
      rules: {
        vuln: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        name: [
          { required: true, message: "请输入工单名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        workType: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        person: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        detail: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  created() {
    this.taskname();
  },
  methods: {
    orderChange(value) {

    },
    handleSelect() {},
    select(sel, row) {
      this.selectData = sel.map(item => item.vuln_id);
    },
    async taskname() {
      let res = await this.$api.taskname();
      if (res.data.result === 0) {
        this.orders = res.data.targets.map(item => {
          return {label: item.target_name, value: item.target_id}
        })
      }
    },
    // 获取漏洞列表
    async getVulnSearch(id) {
      let res = await this.$api.vulnSearch({target_id: id })
      // if (res.data.)
    },
    keep() {},
    submitForm() {}
  }
};
</script>
<style lang="scss" scoped>
.workAdd {
  padding: 20px;
  width: 50%;
  margin: 0 auto;
}
</style>
