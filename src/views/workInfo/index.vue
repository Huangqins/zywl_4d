<template>
    <div class="workInfo">
        <panel>
            <div class="form">
                <el-form :inline="true" :model="form">
                    <el-form-item label="工单搜索:">
                        <!-- <el-autocomplete class="inline-input" v-model="state1" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect"></el-autocomplete> -->
                        <el-input placeholder="工单名称" clearable v-model="form.order_name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="工单类型" clearable v-model="form.order_type"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="工单状态" clearable v-model="form.order_status"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="search(form)">查询</el-button>
                    </el-form-item>
                    <el-form-item style="float:right">
                        <el-button type="primary" @click="createWork">创建工单</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </panel>
        <div class="table">
            <panel>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="order_name" label="工单名称" align="center"></el-table-column>
                    <el-table-column prop="order_type" label="工单类型" align="center">
                        <template slot-scope="scope">
                            {{orderTypes[scope.row.order_type - 1]}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="urgent_type" label="工单紧急程度" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.urgent_type == 1">{{urgentTypes[scope.row.urgent_type - 1]}}</span>
                            <span v-else style="color:red">{{urgentTypes[scope.row.urgent_type - 1]}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="create_user" label="创建人" align="center"></el-table-column>
                    <el-table-column prop="audit_user" label="审核人" align="center"></el-table-column>
                    <el-table-column label="创建时间" align="center">
                        <template slot-scope="scope">
                            {{fomatterTime(new Date(scope.row.create_time.time))}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="expire_time" label="到期时间" align="center"></el-table-column>
                    <el-table-column prop="order_status" label="工单状态" align="center">
                        <template slot-scope="scope">
                            {{orderStatus[scope.row.order_status - 1]}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" size="mini" v-if="scope.row.order_status === 1">修改</el-button>
                            <el-button type="text" size="mini" v-if="$auth('05-01-03') && scope.row.order_status !== 3" @click="check(scope.row)">审核</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </panel>
        </div>
    </div>
</template>
<script>
import panel from "@/components/panel";
import { fomatterTime } from "@/utils";

const orderTypes = ["整改", "任务"];
const urgentTypes = ["一般", "紧急"];
const orderStatus = ["待提交", "待审核", "完成", "驳回"];

export default {
  components: {
    panel
  },
  data() {
    return {
      form: {},
      tableData: [],
      fomatterTime,
      orderTypes,
      urgentTypes,
      orderStatus
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    search(form) {
        this.getOrderList(form)
    },
    createWork() {
      this.$router.push("./workAdd");
    },
    //工单查询列表
    async getOrderList(params) {
      let res = await this.$api.getOrderList(params);
      if (res.data.result === 0) {
        this.tableData = res.data.lists;
      }
    },
    check(row) {
      this.$router.push({
        name: "workContent",
        params: row
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.form {
  margin-top: 22px;
  padding: 0 10px;
}
.table {
  margin-top: 30px;
}
</style>


