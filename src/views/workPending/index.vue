<template>
    <div>
        <div class="secOne">
            <panel>
                <div class="workSearch">
                    <span>工单筛选:</span>
                    <el-input v-model="reportName" filterable placeholder="工单名称" class="select" ></el-input>
                    <el-select v-model="workType" filterable placeholder="工单类型" class="select">
                    <el-option
                    v-for="item in workTypeS"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="workStatu" filterable placeholder="工单状态" class="select">
                    <el-option
                    v-for="item in workStatuS"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>                       
                <el-button class="btn" @click="searchWork">查询</el-button>
                </div>
            </panel>

        </div>
        <div>
            <panel>
                  <div class="workConent">                   
                     <el-table :data="tableData" style="width: 100%;"  v-loading="tableLoading">
                    <el-table-column type="selection" width="35"></el-table-column>
                    <el-table-column prop="assets_name" label="工单名称" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="assets_url" label="工单类型" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="assets_ip" label="工单紧急程度" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="assets_os_type" label="创建人" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="assets_vm" label="创建时间" align="center"></el-table-column>
                    <el-table-column prop="assets_vm" label="到期时间" align="center"></el-table-column>
                    <el-table-column prop="assets_vm" label="工单状态" align="center"></el-table-column>
                    <el-table-column label="操作" align="center" width="190">
                        <template slot-scope="scope">
                            <el-button type="text"  size="mini" @click="workPass(scope.row)">通过</el-button>
                            <el-button type="text"   size="mini" @click="workBack(scope.row)">驳回</el-button>
                        </template>
                    </el-table-column>
                    </el-table>
                  </div>
              </panel>
        </div>
    </div>
</template>
<script>
import Panel from '@/components/panel'
export default {
    components:{
        Panel
    },
    data(){
        return{
            reportName:'',
            workTypeS:[],
            workType:'',
            workStatuS:[],
            workStatu:'',
            tableLoading:false,
            tableData:[]
        }
    },
    methods:{
        searchWork(){

        },
        workPass(){

        },
        workBack(){

        }
    }
}
</script>
<style lang="scss" scoped>
.secOne{
    margin-bottom: 20px;
}
.workSearch{
    padding: 20px 10px ;
    span{
        margin-right: 15px;
    }
}
.select{
    width: 200px;
    margin-right: 15px;
}
</style>
