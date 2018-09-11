<template>
    <div class="reportManage">
        <div class="form">
            <el-form :inline="true" :model="form">
            <el-form-item label="报告搜索">
                <el-input  placeholder="报告名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-date-picker
                        v-model="form.time"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">查询</el-button>
            </el-form-item>
            </el-form>
        </div>
        <!-- list -->
        <panel style="margin-top:28px;">
            <p class="btn-banner"><el-button type="primary">创建报告</el-button></p>
             <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="报告名称" align="center"></el-table-column>
                <el-table-column prop="date" label="创建人" align="center"></el-table-column>
                <el-table-column prop="date" label="所属部门" align="center"></el-table-column>
                <el-table-column prop="date" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="date" label="最近下载时间" align="center"></el-table-column>
                <el-table-column prop="date" label="操作" align="center"></el-table-column>
            </el-table>
        </panel>
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
            form: {
                time: ''
            },
            tableData: []
        }
    }
}
</script>

<style lang="scss" scoped>
.form {
    padding: 22px 10px 0 10px;
    background-color: #263143;
    box-shadow:4px 0px 4px rgba(29,36,46,1);
}
.btn-banner {
    padding: 14px;
    margin: 0;
}
</style>


