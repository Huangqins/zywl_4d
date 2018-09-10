<template>
    <div>
        <div class="vulnSearchOne">
            <panel >
                <div class="vulnSearch">  
                
                <span>筛选条件:</span>
                <el-input v-model="vulnName"  placeholder="风险名称" class="select" style="width:200px">  </el-input>                  
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
               <el-date-picker v-model="vuln_time" type="datetime" placeholder="选择日期" style="margin-right:15px;"></el-date-picker>
                
               <el-date-picker v-model="end_time" type="datetime" placeholder="选择日期" style="margin-right:30px;"></el-date-picker>
                <el-button class="btn" @click="searchVuln">查询</el-button>
                </div>
                
            </panel>
        </div>
        <div>
            <panel>
                   <div class="vulnConent">
                        <div class="vulnConent-btn">
                            <el-button type="primary" @click="handlevuln">处理</el-button>
                            <el-button type="primary" @click="batchprocess">批量处理</el-button>
                            <el-button type="primary" @click="exportVuln">导出</el-button>
                            <el-button type="primary" @click="Dispatchlist">整改下发工单</el-button>
                        </div>
                        <el-table :data="vulnData" style="width: 100%;"  v-loading="tableLoading" @select='select' @select-all='select'>
                            <el-table-column type="selection" width="35"></el-table-column>
                            <el-table-column prop="vuln_name" label="风险名称" align="center" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="assets_url" label="下属资产" align="center" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="assets_ip" label="IP" align="center" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="vuln_type" label="风险类型" align="center" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="vuln_level" label="风险级别" align="center">                                
                                <template slot-scope="scope">
                                <span>{{vulnlevelStrust[scope.row.vuln_level]}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="vuln_status" label="风险状态" align="center"></el-table-column>
                            <el-table-column prop="vuln_mtime" label="计划整改时间" align="center">
                                <template slot-scope="scope">
                                <span>{{fomatterTime[scope.row.vuln_mtime]}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="service_num" label="剩余天数" align="center" width="100">
                                <template slot-scope="scope">                               
                                <span >
                                    {{scope.row.service_num}}
                                </span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="service_num" label="当前环节" align="center" :show-overflow-tooltip="true">
                                
                            </el-table-column>
                            <el-table-column prop="assets_manger" label="风险验证状态" align="center" ></el-table-column>
                            <el-table-column label="操作" align="center" width="190">
                                <template slot-scope="scope">
                                    <el-button type="text" size="mini" @click="detailVuln(scope.row)">详情</el-button>
                                </template>
                            </el-table-column>
                       </el-table>
                   </div>
            </panel>
        </div>
        <pages :total="pageTotal" @pageChange="pageChange"></pages>
    </div>
</template>
<script>
import Panel from '@/components/panel';
import Pages from "@/components/Pages";
import { fomatterTime, deepClone, formatTime, staticAssetPath } from "@/utils";
export default {
    components:{
        Panel,
        Pages
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
            fomatterTime:fomatterTime,
            vulnlevelStrust:vulnlevelStrust,
            vulnName:'',
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
            vuln_time:'',
            end_time:'',
            vulnData:[],
            tableLoading:false,
            pageTotal: 0,
            params: {
                page: "1",
                rows: "10"
            },
            selectData:[]


        }
    },
    created(){
        this._vulnSearch(this.params);
        this._vulnType();
        this._getAssetURL()
    },
    methods:{
        select(sel,row){
        this.selectData=sel.map(item => (item.vuln_id))
        }, 
        //风险处理
        handlevuln(){
           this.$api.vulnManage({vuln_id:this.selectData});
           this._vulnSearch(this.params)
        },
    
        // 触发分页
        pageChange(pageObj) {
        this.pageObj = pageObj;
        let { page, rows } = pageObj,
            params = { page, rows, is_page: 0 };
        this.params = params;
        this.assetsInfo(params);
        },
        async _vulnSearch(params){
            let res =await this.$api.vulnSearch(params);
            if(res.data.result=='0'){
              this.vulnData=res.data.rows;
              this.pageTotal=this.vulnData.length
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
        searchVuln(){
            let data = Object.assign({}, this.params, {
                vuln_name:this.vulnName,
                vuln_level: this.vulnLevel,
                vuln_type:this.vulnType,
                assets_id: this.assets_id,
                vuln_time:fomatterTime(this.vuln_time),
                end_time:fomatterTime(this.end_time)
            });
            this._vulnSearch(data);
        },
        // 操作框
        detailVuln(params) {
        this.$router.push({
            name: "vulnDetail",
            params:params
        });
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
    &-btn{
        margin-bottom: 10px;
        margin-left: 10px;
    }
  
}
.vulnSearchOne{
    margin-bottom: 25px;
}
</style>

