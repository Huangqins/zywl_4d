<template>
    <div>
        <div class="secOne">
            <panel>
                <div class="reportSearch">
                    <span>报告筛选:</span>
                        <el-input v-model="reportName" filterable placeholder="报告名称" class="select" ></el-input>                       
                    <el-date-picker v-model="start_time" type="datetime" placeholder="选择日期" style="margin-right:15px;"></el-date-picker>                        
                    <el-date-picker v-model="end_time" type="datetime" placeholder="选择日期" style="margin-right:30px;"></el-date-picker>
                    <el-button class="btn" @click="searchReport">查询</el-button>
                </div>
            </panel>
        </div> 
        <div>
              <panel>
                  <div class="reportConent">
                    <div class="reportConent-btn">
                        <el-button type="primary" @click='addreport'>创建报告</el-button>
                    </div>
                     <el-table :data="tableData" style="width: 100%;"  v-loading="tableLoading">
                    <el-table-column type="selection" width="35"></el-table-column>
                    <el-table-column prop="assets_name" label="报告名称" align="center" :show-overflow-tooltip="true"></el-table-column>
                     <el-table-column prop="assets_name" label="报告类型" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="assets_url" label="创建人" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="assets_ip" label="所属部门" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="assets_os_type" label="创建时间" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="assets_vm" label="最近下载时间" align="center"></el-table-column>
                    <el-table-column label="操作" align="center" width="190">
                        <template slot-scope="scope">
                            <el-button type="text"  size="mini" @click="downLoadReport(scope.row)">下载</el-button>
                            <el-button type="text"   size="mini" @click="DeleteReport(scope.row)">删除</el-button>
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
            start_time:'',
            end_time:'',
            tableData:[],
            tableLoading:false
        }
    },
    methods:{
        searchReport(){},
        addreport(){
           this.$router.push('./addReport')
        },
        downLoadReport(){

        },
        DeleteReport(){

        }
    }
}
</script>

<style lang="scss" scoped>
.reportSearch {
    padding: 15px 10px;
   
    span{
        margin-right: 15px;
    }
}
.secOne{
    margin-bottom: 20px;
}
.select{
    width: 200px;
    margin-right: 15px;
}
.reportConent{
    &-btn{
        margin: 15px 0 10px 10px;
    }
}
</style>


