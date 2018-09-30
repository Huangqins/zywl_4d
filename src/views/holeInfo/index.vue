<template>
    <div>
        <div class="vulnSearchOne">
            <panel >
                <div class="vulnSearch">  
                
                    <span>筛选条件:</span>
                     <el-select v-model="task_name_id" filterable placeholder="任务名称" class="select">
                    <el-option
                    v-for="item in taskNameS"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="vulnLevel" filterable placeholder="风险等级" class="select">
                    <el-option
                    v-for="item in vulnLevelS"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="vulnType" filterable placeholder="风险类型" class="select">
                    <el-option
                    v-for="item in vulnTypeS"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="assets_id" filterable placeholder="IP/区域" class="select">
                    <el-option
                    v-for="item in assets_idS"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
               <el-date-picker v-model="start_time" type="datetime" placeholder="选择日期" style="margin-right:15px;"></el-date-picker>
                
               <el-date-picker v-model="end_time" type="datetime" placeholder="选择日期" style="margin-right:30px;"></el-date-picker>
                <el-button class="btn" @click="searchVuln">查询</el-button>
                </div>
                
            </panel>
        </div>
        <div>
            <panel>
                <div class="assets-content-btn">
                    <el-button type="primary" @click="addvuln">添加风险</el-button>
                    <el-button type="primary" @click="vulnImportVisible=true">导入风险</el-button>
                    <el-button type="primary" @click="exportVuln">导出风险</el-button>
                </div>
                   <div class="vulnConent">                        
                        <el-table :data="vulnData" style="width: 100%;"  v-loading="tableLoading">
                            <el-table-column type="selection" width="35"></el-table-column>
                            
                             <el-table-column prop="vuln_URL" label="风险地址" align="center" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="assets_url" label="资产链接" align="center" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="vuln_IP" label="风险IP" align="center" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="vuln_name" label="风险名称" align="center" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="vuln_level" label="风险等级" align="center">
                                 <template slot-scope="scope">
                                     <vuln-degree :vuln_level="scope.row.vuln_level"></vuln-degree>
                                </template>
                            </el-table-column>
                            <el-table-column prop="vuln_class" label="风险类型" align="center" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="vuln_status" label="风险状态" align="center">
                                 <template slot-scope="scope">
                                   <span>{{scope.row.vuln_status==='0'?'未确认':'已确认'}}</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop="vuln_ftime" label="发现时间" align="center">
                                <template slot-scope="scope">
                                   <span>{{scope.row.vuln_ftime}}</span>
                                </template>
                            </el-table-column>
                            <!-- <el-table-column prop="" label="操作人" align="center" width="100"></el-table-column>                             -->
                            <el-table-column label="操作" align="center" width="190">
                                <template slot-scope="scope">
                                    <el-button type="text"  size="mini" @click="taskedit(scope.row)">修改</el-button>
                                    <el-button type="text" size="mini" @click="detailVuln(scope.row)">详情</el-button>
                                    <el-button type="text"   size="mini" @click="assetsDeleteSelect(scope.row)">确认</el-button>
                                </template>
                            </el-table-column>
                       </el-table>
                   </div>
            </panel>
        </div>
        <el-dialog title="漏洞库导入" :visible.sync="vulnImportVisible" width="21%">
            <p  style="line-height:20px;margin-bottom:10px;font-size:14px;color:#D1FFFF;cursor: pointer;" @click="importTem">下载资产模板</p>
            <p  style="line-height:20px;margin-bottom:10px;color:#ABB5BC;cursor: pointer;">为提高导入文件的成功率,请下载并使用系统提供的模板</p>
                    <el-upload drag action="*" :headers="headers" :show-file-list="false" :with-credentials="true" name="excelFile" :on-change="fileUpload" :http-request="upload">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或
                        <em>点击上传</em>
                        </div>
                    </el-upload>            
      </el-dialog>
         <pages :total="pageTotal" @pageChange="pageChange"></pages>
    </div>
</template>
<script>
import Panel from '@/components/panel';
import Pages from "@/components/Pages";
import vulnDegree from "@/components/vulnDegree";
import { fomatterTime, deepClone, formatTime, staticAssetPath } from "@/utils";
import { getUserName, getToken } from "@/utils/auth";
export default {
    components:{
        Panel,
        Pages,
        vulnDegree
    },
    data(){
        const vulnlevelStrust={
            '0':'极低风险',
            "1": "低风险",
            "2": "中风险",
            "3": "高风险",
            "4": "极高风险"
        }
        return{
            headers: {
                token: getToken(),
                userName: getUserName(),
                menuCode: vm._route.meta.menuCode
            },
            vulnImportVisible:false,
            fomatterTime:fomatterTime,
            vulnlevelStrust:vulnlevelStrust,
            taskNameS:[],
            task_name_id:'',
            vulnLevelS:[
                {
                    value:0,
                    label:'极低风险'
                },
                {
                    value:1,
                    label:'低风险'
                },
                {
                    value:2,
                    label:'中风险'
                },
                {
                    value:3,
                    label:'高风险'
                },
                {
                    value:4,
                    label:'极高风险'
                }
            ],
            vulnLevel:'',
            vulnTypeS:[],
            vulnType:'',
            assets_idS:[],
            assets_id:'',
            start_time:'',
            end_time:'',
            vulnData:[],
            tableLoading:false,
            pageTotal: 0,
            params: {
                page: "1",
                rows: "10"
            },
            file:''
            
        }
    },
    created(){
        this.taskname();
        this._vulnType();
        this._vulnSearch(this.params);
        this._getAssetURL()
    },
    methods:{
        // async exportVuln() {
        // let res = await this.$api.exportExcel({});
        // if (res.data.result === 0) {
        //     let result = await this.$api.exportFile(res.data.path);
        //     createDownload(result, '导出', '.xls')
        // }
        // }, 
        // 导入回调
            fileUpload(res) {
                console.log(res)
            this.file = res;
            },
            upload() {
            let formData = new FormData();
            formData.append("excelFile", this.file.raw);
            this.$api.importVuln(formData).then(res => {
                this.areaImportVisible = false;
                if (res.data.result === 0) {
                this.$message.success("文件导入成功");
                } else {
                this.$message.error("文件导入失败，请查看文件项填写是否完整或正确");
                }
            });
            }, 
        async importTem() {
            let assetUrl = "ZR/excel/vuln_import.xls";
            let res = await this.$api.exportFile(assetUrl);
            if (res.data.size) {
                let url = window.URL.createObjectURL(new Blob([res.data]));
                let link = document.createElement("a");
                link.style.display = "none";
                link.href = url;
                link.setAttribute("download", "风险导入模板" + ".xls");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                this.$message.error(`模板文件下载失败`);
            }
        },
        addvuln(){
            this.$router.push('./vulnAdd')
        },
        async taskname(){
            let res =await this.$api.taskname();
            if(res.data.result=='0'){
              this.taskNameS=res.data.targets.map(item => {
                  return {
                      value:item.target_id,
                      label:item.target_name
                  }
              });;
            }
        },
        async _vulnType(){
            let res =await this.$api.vulnType();
            if(res.data.result=='0'){
              this.vulnTypeS=res.data.vulns.map(item => {
                  return {
                      value:item.vuln_type,
                      label:item.vuln_name
                  }
              });
            }
        },        
         async _vulnSearch(params){
            let res =await this.$api.vulnSearch(params);
            if(res.data.result=='0'){
              this.vulnData=res.data.rows;
              this.pageTotal=res.data.total
            }
        },
        async _getAssetURL(){
            let res =await this.$api.getAssetURL();
            if(res.data.result=='0'){
              this.assets_idS=res.data.lists.map(item => {
                  return {
                      value:item.assets_id,
                      label:item.assets_url
                  }
              });
            }
        },
        // 操作框
        detailVuln(row) {
        this.$router.push({
            name: "vulnAdd",
            params:Object.assign({},row,{status: 'detail'})
        });
        },
        //修改
        taskedit(row) {
        this.status = "edit";
        this.state = '2';
        this.form = Object.assign({}, row);
        this.$router.push({
            name:'vulnAdd',
            params:Object.assign({},row,{status: 'edit'})
        })
        },  
        // 触发分页
        pageChange(pageObj) {
        this.pageObj = pageObj;
        let { page, rows } = pageObj,
            params = { page, rows, is_page: 0 };
        this.params = params;
        this._vulnSearch(params);
        },
        searchVuln(){   
            console.log(this.task_name_id)
            let data = Object.assign({}, this.params, {
                target_id:this.task_name_id,
                vuln_name:this.vulnName,
                vuln_level: this.vulnLevel,
                vuln_type:this.vulnType,
                assets_id:this.assets_id,
                start_time:this.start_time==''?'':fomatterTime(this.start_time),
                end_time:this.end_time==''?'':fomatterTime(this.end_time)
            });
            
            this._vulnSearch(data);
         },
        handle(){},
        batchprocess(){

        },
        exportVuln(){

        },
        Dispatchlist(){

        }
    }
}
</script>
<style lang="scss" scoped>
.vulnSearch{    
   padding: 20px 10px;
    span{
       margin-right: 10px;
    }
}
.select{
    margin-right: 15px;
}
.vulnConent{
    padding-top:15px;
  
}
.vulnSearchOne{
    margin-bottom: 25px;
}
</style>

