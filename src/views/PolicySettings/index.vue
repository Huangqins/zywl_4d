<template>
    <div class="assets">
        <div class="assets-header">
        <panel>
            <div class="assets-header-search">
                <span>筛选条件:</span>
                <el-input v-model="group_name" filterable placeholder="策略名称" style="width:200px;margin-right:20px;"> </el-input>
               <el-date-picker v-model="start_time" type="datetime" placeholder="选择日期" style="margin-right:15px;"></el-date-picker>
               <el-date-picker v-model="end_time" type="datetime" placeholder="选择日期" style="margin-right:30px;"></el-date-picker>
                <el-button class="btn" @click="searchAsset">查询</el-button>
            </div>            
        </panel>
        </div>        
        <div class="assets-content">           
            <panel>
                 <div class="assets-content-btn">
                    <el-button type="primary" @click='addAssets'>新增</el-button>
                    <el-button type="primary" @click="merge">合并</el-button>
                </div>
               <el-table :data="tableData" style="width: 100%;"  v-loading="tableLoading"  @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="35"></el-table-column>
                    <el-table-column prop="group_name" label="策略名称" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="group_id" label="策略ID" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="vuln_urgent" label="极高" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="vuln_high" label="高" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="vuln_medium" label="中" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="vuln_low" label="低" align="center"></el-table-column>
                    <el-table-column prop="vuln_tips" label="极低" align="center"></el-table-column>                   
                    <el-table-column label="更新时间" align="center" :show-overflow-tooltip="true" prop="update_time">
                        <template slot-scope="scope">
                                  <span v-if="scope.row.update_time != null">
                                    {{ fomatterTime(new Date(scope.row.update_time.time)) }}
                                  </span>
                                  <span v-else>
                                    {{scope.row.update_time}}
                                  </span>
                                </template>
                    </el-table-column>                                      
                    <el-table-column label="操作" align="center" width="190">
                        <template slot-scope="scope">
                            <el-button type="text"  size="mini" @click="editstrategy(scope.row)">修改</el-button>
                            <el-button type="text" size="mini" @click="deletestrategy(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                    </el-table>
            </panel>
        </div>    
        <!--分页-->
        <pages :total="pageTotal" @pageChange="pageChange"></pages>
        <el-dialog title="删除确认" :visible.sync="deleteVisible" width="30%">
          <p style="font-size:18px;overflow:hidden;">
            <i class="el-icon-warning" style="color:#FFCC33;font-size:30px;display:inline-block;vertical-align:middle;margin-right:5px;"></i>该操作不可撤回,是否确认删除该条数据?</p>
          <span slot="footer" class="dialog-footer">
            <el-button @click="deleteVisible = false">取 消</el-button>
            <el-button type="primary" @click="deleteItem">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="合并策略" :visible.sync="mergeVisible" width="30%">
            <el-form :model="mergeform" label-width="115px"  ref="mergeform" style="overflow:hidden;margin:0 auto;width:70%;padding-top:50px;">
              <el-form-item label="策略名称" prop="group_name">                
                   <el-input  v-model="mergeform.group_name"></el-input>                  
              </el-form-item> 
              <el-form-item label="策略描述" prop="group_desc">                
                   <el-input type="textarea" auto-complete="off" v-model="mergeform.group_desc" ></el-input>                
              </el-form-item>             
               <el-form-item >
                <el-button type="primary">取消</el-button>
                <el-button @click="addmerge(mergeform)">保存</el-button>
              </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import Panel from "@/components/panel";
import Pages from "@/components/Pages";
import { getUserName, getToken } from "@/utils/auth";
import { fomatterTime, deepClone, formatTime, staticAssetPath } from "@/utils";
const titlestruts = {
  "1": "资产添加",
  "2": "资产修改",
  "3": "资产详情"
};
export default {
  components: {
    Panel,
    Pages
  },
  data() {
    return {
      mergeform:{
        group_name:'',
        group_desc:''
      },
      deleteVisible:false,
      mergeVisible:false,
      pageObj: {},
      defaultPage: {
        rows: 10,
        page: 1
      },
      fomatterTime: fomatterTime,
      formatTime: formatTime,
      areaImportVisible: false,
      tableData: [],      
      titlestruts: titlestruts,
      deleteAssetVisible: false,
      tableLoading: false,
      dialogFormVisible: false,
      addPending: false,
      state: "1",
      status: "edit",
      group_name:'',
      start_time:'',
      end_time:'',
      assetdate: [],
      optionAssetsType: [],
      options: [],
      page: "",
      rows: "",
      pageTotal: 0,
      headers: {
        token: getToken(),
        userName: getUserName(),
        menuCode: vm._route.meta.menuCode
      },
      params: {
        page: "1",
        rows: "10"
      },
      deleteData:{},
      groundId:{}
    };
  },
  created() {
    this.strategyList(this.params);    
  },
  methods: {
    merge(){
      this.mergeVisible=true;
    },
    handleSelectionChange(row){
      
      this.groundId=row.map(item=>{
        return item.group_id
      }).join(',')
    },
    addmerge(){
      let data=Object.assign({},this.mergeform,{group_content:this.groundId})
      this.$api.mergeStrategy(data).then(res=>{
          if(res.data.result===0){
              this.$message.success(`合并成功`)
              this.mergeVisible=false
              this.strategyList(this.params)
          }
      })
    },
    deletestrategy(row){
      this.deleteData={
        group_name:row.group_name,
        group_id:row.group_id
      }
      this.deleteVisible=true;
    },
    deleteItem(){
      this.$api.deleteStrategyGroup(this.deleteData).then(res=>{
        if(res.data.result===0){
          this.$message.success(`删除成功`)
          this.strategyList(this.params)
          this.deleteVisible=false;
        }else if(res.data.result===4){
          this.deleteVisible=false;
           this.$message(`策略下有任务,不能删除`)
        }else if(res.data.result===2){
          this.deleteVisible=false;
           this.$message(`默认策略,不能删除`)
        }
      })
    },
    searchAsset() {
      let data = Object.assign({}, this.params, {
        group_name:this.group_name,
        start_time: !this.start_time ? "" : fomatterTime(this.start_time),
        end_time: !this.end_time ? "" : fomatterTime(this.end_time)
      });
      this.strategyList(data);
    }, 
    // 导入回调
    fileUpload(res) {
      this.file = res;
    },
    upload() {
      let formData = new FormData();
      formData.append("excelFile", this.file.raw);
      this.$api.assetImport(formData).then(res => {
        this.areaImportVisible = false;
        if (res.result === 0) {
          this.$message.success("文件导入成功");
        } else {
          this.$message.error("文件导入失败，请查看文件项填写是否完整或正确");
        }
      });
    },
    // 触发分页
    pageChange(pageObj) {
      this.pageObj = pageObj;
      let { page, rows } = pageObj,
        params = { page, rows, is_page: 0 };
      this.params = params;
      this.strategyList(params);
    },
    // 策略配置列表
    async strategyList(params) {
      this.tableLoading = true;
      let res = await this.$api.strategyList(params);
      this.tableLoading = false;
      if (res.data.result === 0) {
        let data = res.data.list;
        this.pageTotal = res.data.total;
        this.tableData = res.data.list;
      }
    },    
    //添加弹框
    addAssets() {
    //   this.dialogFormVisible = true;
      this.state = "1";
      this.status = "edit";
      this.$router.push('./addPolicySetting')
    },
    editstrategy(row){
      this.$router.push({
        name:'addPolicySetting',
        params:Object.assign({},row,{status: 'edit'})})
    },
    // 清空表单
    resetForm() {
      this.dialogFormVisible = false;
      this.$refs.form.resetFields();
      setTimeout(() => {
        this.form = Object.assign({}, this.formCopy);
      }, 200);
    },
    // 详情
    detailAsset(row) {
      this.$router.push({
        name: "AssetDetail",
        params: {
          assets_id: row.assets_id,
          row: row
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.assets {
  /*margin: 0 20px;*/
}
.assets-header {
  &-search {
    padding: 20px 10px;
    span {
      color: #d1ffff;
      margin-right: 10px;
    }
  }
  margin-bottom: 25px;
}
.assets-content-btn {
  margin: 15px 0px 10px 7px;
}
.select {
  margin-right: 15px;
}
.selectDate {
  margin-right: 30px;
}
</style>