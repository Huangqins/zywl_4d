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
                    <el-table-column prop="reports_name" label="报告名称" align="center" :show-overflow-tooltip="true"></el-table-column>
                     <el-table-column prop="report_type" label="报告类型" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="oper_name" label="创建人" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="dept_name" label="所属部门" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="create_time" label="创建时间" align="center" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <span>{{fomatterTime(new Date(scope.row.creat_time.time))}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="download_time" label="最近下载时间" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.download_time != null">
                                    {{ fomatterTime(new Date(scope.row.download_time.time)) }}
                            </span>
                            <span v-else>
                                    {{scope.row.download_time}}
                             </span>
                        </template>
                    </el-table-column>
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
        <el-dialog title="删除确认" :visible.sync="deleteVisible" width="30%">
            <p style="font-size:18px;overflow:hidden;">
                <i class="el-icon-warning" style="color:#FFCC33;font-size:30px;display:inline-block;vertical-align:middle;margin-right:5px;"></i>该操作不可撤回,是否确认删除该条数据?</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteItem">确 定</el-button>
            </span>
        </el-dialog>
        <pages :total="pageTotal" @pageChange="pageChange"></pages>
    </div>
</template>

<script>
import Panel from '@/components/panel';
import Pages from "@/components/Pages";
import { fomatterTime, deepClone, formatTime, staticAssetPath, createDownload } from "@/utils";


export default {
    components:{
        Panel,
        Pages
    },
    data(){
        return{
            deleteVisible:false,
            fomatterTime:fomatterTime,
            reportName:'',
            start_time:'',
            end_time:'',
            tableData:[],
            tableLoading:false,
            pageTotal:0,
            defaultPage: {
                rows: 10,
                page: 1
            },
            params:{},
            reportid:'',
            target_id:[],
            reports_name:'',
            deleteargue:{}
        }
    },
    created(){
           this._reportList(this.defaultPage)
    },
    methods:{
        _reportList(params){
            this.$api.reportList(params).then(res =>{
              let data=res.data.reports;
              this.tableData=data
              this.pageTotal=res.data.total
            })
        },
        pageChange(pageObj){
            this.pageObj = pageObj; 
            let { page, rows } = pageObj,
                params = { page, rows, is_page: 0 };
            this.params = params;
           this._reportList(this.params)
        },
        searchReport(){
            let data = Object.assign({}, this.params, {
                reports_name:this.reportName,
                start_time:this.start_time==''?'':fomatterTime(this.start_time),
                end_time:this.end_time==''?'':fomatterTime(this.end_time)
            });
            this._reportList(data);
        },
        addreport(){
           this.$router.push('./addReport')
        },
      async  downLoadReport(row){         
        let data={
            reports_name:row.reports_name,
            reports_id:row.reports_id
        }
        let url = row.download_url,
             name = row.reports_name,
             type = row.report_type.toLocaleLowerCase()
       let res  = await  this.$api.exportFile(url);
       console.log(res)
        createDownload(res.data,name,type)
        //  .then(res =>{
        //     if(res.data.result===0){
        //         this.$message.success(`下载成功`)
        //         createDownload(res,name,type)
        //     }
        //  })
        },
        DeleteReport(row){
            this.reportid=row.reports_id;
            this.target_id=row.target_id;
            this.reports_name=row.reports_name;
            this.deleteVisible=true;  
        },
        deleteItem(){
           this.$api.deletePDF({report_id:this.reportid,target_id:[this.target_id],reports_name:this.reports_name}).then(res =>{
               if(res.data.result===0){
                  this.$message.success(`删除成功`)
                   this.deleteVisible=false
                   this._reportList(this.defaultPage)
               }
           })
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


