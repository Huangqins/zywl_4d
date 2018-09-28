<template>
  <div>
    <panel title='新建[漏洞整改]审批工单'>
      <div class="workAdd">
        <el-form ref="form" :model="form" label-width="110px" :rules="rules">
          <el-form-item label="工单名称">
            <div class="content">{{order_info.order_name}}</div>
          </el-form-item>
          <el-form-item label="工单类型">
            <div class="content">{{orderTypes[order_info.order_type -1]}}</div>
          </el-form-item>
          <el-form-item label="工单内容">
            <div class="content">333</div>
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

          <el-form-item label="创建人">
            <div class="content">{{order_info.create_user}}</div>
          </el-form-item>

          <el-form-item label="审核人">
            <div class="content">{{order_info.audit_user}}</div>
          </el-form-item>

          <el-form-item label="工单紧急程度">
            <div class="content">
              <span v-if="order_info.urgent_type === 1">{{urgentTypes[order_info.urgent_type - 1]}}</span>
              <span v-else style="color:red">{{urgentTypes[order_info.urgent_type - 1]}}</span>
            </div>
          </el-form-item>
          <el-form-item label="审批意见" prop="order_remark">
            <el-input type="textarea" autosize placeholder="请输入内容" v-model="order_remark" style="width:100%;"></el-input>
          </el-form-item>
          <el-form-item style="margin:0 auto;width:50%">
            <el-button @click="updateOrderStatus(form, 4)" v-if="$auth('05-01-03')">驳回</el-button>
            <el-button type="primary" @click="updateOrderStatus(form, 3)" v-if="$auth('05-01-03')">通过</el-button>
          </el-form-item>
        </el-form>
      </div>
    </panel>
  </div>
</template>
<script>
import Panel from "@/components/panel";
import { fomatterTime } from "@/utils";
import route from "@/mixins/route";

const orderTypes = ["整改", "任务"]
const urgentTypes = ["一般", "紧急"]

export default {
  mixins: [route],
  components: {
    Panel
  },

  data() {
    return {
      form: {
        order_id: "",
        order_remark: "",
        order_status: "",
        order_content: []
      },
      orderTypes,
      urgentTypes,
      order_content: "",
      order_info: {},
      order_remark: "",
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
    // this.taskname();
    let {
      order_id,
      order_name,
      order_type,
      audit_user,
      urgent_type,
      create_user,
      order_content,
      order_remark
    } = this.pageInfo;
    this.order_info = {
      order_id,
      order_name,
      order_type,
      audit_user,
      urgent_type,
      create_user,
      order_content,
      order_remark
    };
    this.order_remark = order_remark
    this.getVulnSearch(this.pageInfo.order_content)
  },
  methods: {
    orderChange(value) {
      this.getVulnSearch(value);
    },
    // 获取漏洞列表
    async getVulnSearch(order_content) {
      let res = await this.$api.vulnSearch({ order_content });
      if (res.data.result === 0) {
        this.tableData = res.data.rows;
      }
    },
    // 驳回/通过
    async updateOrderStatus(form, status) {
      console.log(status)
      let params = {
        order_id: this.pageInfo.order_id,
        order_status: status,
        order_content: this.order_content,
        order_remark: this.order_remark
      };
      let res = await this.$api.updateOrderStatus(params);
      if (res.data.result === 0 ) {
        this.$message.success('操作成功')
      }
    },
    selectVuln(row) {
      this.order_content = row.map(item => item.vuln_id).join(",");
    },
    async taskname() {
      let res = await this.$api.taskname();
      if (res.data.result === 0) {
        this.orders = res.data.targets.map(item => {
          return { label: item.target_name, value: item.target_id };
        });
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
.content {
  height: 40px;
  line-height: 40px;
}
</style>
