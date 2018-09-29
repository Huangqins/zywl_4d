<template>
    <div class="workInfo">
        <panel>
            <div class="form">
                <el-form :inline="true" :model="form">
                    <el-form-item label="工单搜索:">
                        <el-select v-model="form.order_name" filterable placeholder="工单名称" clearable>
                            <el-option v-for="(item, index) in orderNames" :key="index + 'g'" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="form.order_type" filterable placeholder="工单类型" clearable>
                            <el-option v-for="item in orderTypeList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="form.order_status" filterable placeholder="工单状态" clearable>
                            <el-option v-for="item in orderStatusList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
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
                            <el-button type="text" size="mini" v-if="scope.row.order_status === 1" @click="update(scope.row)">修改</el-button>
                            <el-button type="text" size="mini" v-if="$auth('05-01-03') && scope.row.order_status !== 3 &&  scope.row.order_status !== 1" @click="check(scope.row)">审核</el-button>
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
      form: {
        order_name: "",
        order_type: "",
        order_status: ""
      },
      tableData: [],
      fomatterTime,
      orderTypes,
      urgentTypes,
      orderStatus,
      orderNames: [],
      orderTypeList: [
        {
          label: "整改",
          value: 1
        },
        {
          label: "任务",
          value: 2
        }
      ],
      orderStatusList: [
        {
          label: "待提交",
          value: 1
        },
        {
          label: "待审核",
          value: 2
        },
        {
          label: "完成",
          value: 3
        },
        {
          label: "驳回",
          value: 4
        }
      ]
    };
  },
  created() {
    this.remainOrderList();
  },
  methods: {
    search(form) {
      this.remainOrderList(form);
    },
    // 修改
    update(row) {
      this.$router.push({
        name: "workAdd",
        params: row
      });
    },
    createWork() {
      this.$router.push("./workAdd");
    },
    //工单查询列表
    async remainOrderList(params) {
      let res = await this.$api.remainOrderList(params);
      if (res.data.result === 0) {
        this.tableData = res.data.lists;
        // 工单名称列表，查询用
        this.orderNames = res.data.lists.map(item => {
          return { label: item.order_name, value: item.order_name };
        });
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


