<template>
    <div class="workInfo">
        <panel>
            <div class="form">
                <el-form :inline="true" :model="form">
                <el-form-item label="审批人">
                    <el-input  placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button>查询</el-button>
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
                <el-table-column prop="date" label="工单名称"></el-table-column>
                 <el-table-column prop="date" label="工单类型"></el-table-column>
                  <el-table-column prop="date" label="工单紧急程度"></el-table-column>
                   <el-table-column prop="date" label="创建人"></el-table-column>
                    <el-table-column prop="date" label="审核人"></el-table-column>
                     <el-table-column prop="date" label="创建时间"></el-table-column>
                     <el-table-column prop="date" label="到期时间"></el-table-column>
                     <el-table-column prop="date" label="工单状态"></el-table-column>
                     <el-table-column prop="date" label="操作"></el-table-column>
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
            form: {},
            tableData: []
        }
    },
    methods:{
        createWork(){
            this.$router.push('./workAdd')
        }
    }
}
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


