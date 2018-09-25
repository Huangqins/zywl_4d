<template>
    <div class="interfaces">
        <div class="interfaces-btn">
          <el-button type="primary" @click='addApi'>API生成</el-button>
        </div>
         <el-table :data="tableData" style="width: 100%;"  v-loading="tableLoading">
                    <el-table-column type="selection" width="35"></el-table-column>
                    <el-table-column prop="api_key" label="public Key" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="creat_time" label="生成时间" align="center" :show-overflow-tooltip="true">
                       <template slot-scope="scope">
                         <span>{{fomatterTime(new Date(scope.row.creat_time.time))}}</span>
                       </template>
                    </el-table-column>
                    <el-table-column prop="end_time" label="到期时间" align="center" :show-overflow-tooltip="true">
                      </el-table-column>                   
                    <el-table-column label="操作" align="center" width="190">
                        <template slot-scope="scope">
                            <el-button type="text"   size="mini" @click="DeleteReport(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
         </el-table>
         <pages :total="pageTotal" @pageChange="pageChange"></pages>
          <!-- 确认删除 -->
    <el-dialog title="删除确认" :visible.sync="deleteVisible" width="30%">
      <p style="font-size:18px;overflow:hidden;">
        <i class="el-icon-warning" style="color:#FFCC33;font-size:30px;display:inline-block;vertical-align:middle;margin-right:5px;"></i>该操作不可撤回,是否确认删除该条数据?</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteItem">确 定</el-button>
      </span>
    </el-dialog>
    </div>
</template>

<script>
import Panel from "@/components/panel";
import Pages from "@/components/Pages";
import { fomatterTime, deepClone, formatTime, staticAssetPath } from "@/utils";
export default {
  components: {
    Panel,
    Pages
  },
  data() {
    return {
      fomatterTime:fomatterTime,
      deleteVisible:false,
      tableData: [],
      tableLoading: false,
      pageTotal:0,
      defaultPage: {
        rows: 10,
        page: 1
      },
      api_id:'',
      params:{}
    };
  },
  created(){
    let data=Object.assign({},this.defaultPage)
    this._apiList(data)
  },
  methods: {
    _apiList(params){
      this.$api.apiList(params).then(res =>{
       let data=res.data.rows;
       this.tableData=data
       this.pageTotal=res.data.total
      })
    },
    addApi(){
      this.$api.setSystemKey().then(res =>{
          if(res.data.result==0){
           this._apiList(this.defaultPage)
          }
      })
    },
    pageChange(){
      this.params = Object.assign({},this.params,params)
      this._apiList(this.params)
    },
    DeleteReport(row){
      this.api_id=row.api_id;
      this.deleteVisible=true;
    },
    deleteItem (){
       this.$api.deleteSystemKey({api_id:this.api_id}).then(res =>{
         if(res.data.result==0){
           this.deleteVisible=false;
           this._apiList(this.defaultPage)
           this.$message.success('删除成功')
         }
       })
    }
  }
};
</script>

<style lang="scss" scoped>
.interfaces{
    &-btn{
        margin: 15px 0 10px 10px;
    }
}
</style>


