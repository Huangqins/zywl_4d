<template>
  <div>
    <panel title='新建[漏洞整改]审批工单'>
      <div class="workAdd">
        <el-form ref="form" :model="form" label-width="110px" :rules="rules">
          <el-form-item label="工单名称" prop="order_name">
            <span>111</span>
          </el-form-item>
          <el-form-item label="工单类型" prop="order_type">
           <span>222</span>
          </el-form-item>
          <el-form-item label="工单内容" prop="order_content">
            <span>333</span>
          </el-form-item>
          <el-form-item label="漏洞列表">
            <el-table :data="tableData" style="width: 100%;" v-loading="tableLoading" @selection-change='selectVuln' max-height="198">
              <el-table-column type="selection" width="35"></el-table-column>
              <el-table-column prop="vuln_name" label="漏洞名称" align="center" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="vuln_URL" label="漏洞链接" align="center" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="vuln_IP" label="漏洞IP" align="center" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="vuln_level" label="漏洞等级" align="center"></el-table-column>
            </el-table>
          </el-form-item>
    
          <el-form-item label="创建人" prop="audit_user">
            <span>555</span>
          </el-form-item>

          <el-form-item label="审核人" prop="audit_user">
            <span>444</span>
          </el-form-item>

          <el-form-item label="工单紧急程度" prop="urgent_type">
            <span>333</span>
          </el-form-item>
         <el-form-item label="审批意见" prop="urgent_type">
            <span>333</span>
          </el-form-item>
          <el-form-item style="margin:0 auto;width:50%">
            <el-button @click="submitForm(form,'1')" v-if="$auth('05-01-07')">保存</el-button>
            <el-button type="primary" @click="submitForm(form, '2')" v-if="$auth('05-01-06')">保存并提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </panel>
  </div>
</template>
<script>
import Panel from "@/components/panel";
import { fomatterTime } from "@/utils";
export default {
  components: {
    Panel
  },
  data() {
    return {
      form: {
        order_name: "",
        audit_user: "",
        order_type: "",
        order_content: [],
        expire_time: "",
        urgent_type: "",
        flag: ""
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
      urgentType: [
        {
          value: 1,
          label: "一般"
        },
        {
          value: 2,
          label: "紧急"
        }
      ],
      rules: {
        order_name: [
          { required: true, message: "请输入工单名称", trigger: "blur" }
        ],
        audit_user: [
          { required: true, message: "请输入审核人名称", trigger: "blur" }
        ],
        order_type: [
          { required: true, message: "请选择工单类型", trigger: "change" }
        ],
        urgent_type: [
          { required: true, message: "请选择工单紧急程度", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.taskname();
  },
  methods: {
    orderChange(value) {
      this.getVulnSearch(value);
    },
    selectVuln(row) {
      this.form.order_content = row.map(item => {
        return item.vuln_id;
      }).join(',');
      // this.selectData = sel.map(item => item.vuln_id);
    },
    async taskname() {
      let res = await this.$api.taskname();
      if (res.data.result === 0) {
        this.orders = res.data.targets.map(item => {
          return { label: item.target_name, value: item.target_id };
        });
      }
    },
    // 获取漏洞列表
    async getVulnSearch(id) {
      let res = await this.$api.vulnSearch({ target_id: id });
      if (res.data.result === 0) {
        this.tableData = res.data.rows;
      }
    },
    async submitForm(form, type) {
      form.flag = type;
      form.expire_time = fomatterTime(form.expire_time);
      let res = await this.$api.addOrder(form);
      if (res.data.result === 0) {
        this.$message.success('创建工单成功');
      }
    }
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
