<template>
    <div>
        <div class="secOne">
          <panel title='登录日志'>
              <div>
                  <div class="loginSearch">
                       <el-button class="btn" @click="loginSearch">查询</el-button>
                       <el-input v-model="loginLog" filterable placeholder="请输入账号" class="select" ></el-input>                     
                  </div>
                   <el-table :data="loginData" style="width: 100%;"  v-loading="tableLoading">
                    <el-table-column type="selection" width="35"></el-table-column>
                    <el-table-column prop="login_log_name" label="账号" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="login_log_status" label="登录状态" align="center">
                         <template slot-scope="scope" >
                            <span>{{scope.row.login_log_status=='0'?'成功':'失败'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="login_log_time" label="登录时间" align="center" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <span>{{fomatterTime(new Date(scope.row.login_log_time.time))}}</span>
                        </template>
                        </el-table-column>                    
                   
                    </el-table>
              </div>
          </panel>
          <pages :total="pageTotal" @pageChange="pageChange"></pages>
        </div>
        <div class="secTwo">
          <panel title="操作日志">
              <div class="handleLog">
                     <div class="loginSearch">
                       <el-button class="btn" @click="searchhandleLog">查询</el-button>
                      <el-input v-model="handleLog" filterable placeholder="请输入账号" class="select" ></el-input>                     
                  </div>
                   <el-table :data="handleLogData" style="width: 100%;"  v-loading="tableLoading">
                    <el-table-column type="selection" width="35"></el-table-column>
                    <el-table-column prop="username" label="用户名" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="source_ip" label="IP" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="operation_time" label="操作时间" align="center" :show-overflow-tooltip="true">
                          <template slot-scope="scope">
                            <span>{{fomatterTime(new Date(scope.row.operation_time.time))}}</span>
                        </template></el-table-column> 
                     <el-table-column prop="operation_source" label="操作内容" align="center" :show-overflow-tooltip="true"></el-table-column>                    
                   
                    </el-table>
              </div>
          </panel>
          <pages :total="pageTotals" @pageChange="pageChangeS"></pages>
        </div>
        
    </div>
</template>

<script>
import Panel from "@/components/panel";
import Pages from "@/components/Pages";
import { getUserName, getToken } from "@/utils/auth";
import { fomatterTime, deepClone, formatTime, staticAssetPath } from "@/utils";

export default {
  components: {
    Panel,
    Pages
  },
  data() {
    return {
      fomatterTime:fomatterTime,
      loginData: [],
      handleLogData: [],
      tableLoading: false,
      loginLog: "",
      handleLog: "",
      pageObj: {},
      pageTotal:0,
      pageTotals:0,
      defaultPage: {
        rows: 10,
        page: 1
      },
       params: { },
       param:{}
    };
  },
  created() {
    
    this.loginLogSearch(this.defaultPage);
    this.optLogSearch(this.defaultPage)
  },
  methods: {
    async loginLogSearch(params) {
      let res = await this.$api.loginLogSearch(params);
      if (res.data.result == 0) {
        this.loginData = res.data.rows;
        this.pageTotal=res.data.total
      }
    },
    async optLogSearch(params) {
      let res = await this.$api.optLogSearch(params);
      if (res.data.result == 0) {
        this.handleLogData = res.data.rows;
        this.pageTotals= res.data.total
        
      }
    },  
    //登陆日志查询  
    loginSearch() {
         let data=Object.assign({},this.defaultPage,{username:this.loginLog})
        this.loginLogSearch(data)
    },
     //操作日志查询  
    searchhandleLog() {
        let data=Object.assign({},this.defaultPage,{username:this.handleLog})
        this.optLogSearch(data)
    },
    // 登陆日志触发分页
    pageChange(params) {

          this.params = Object.assign({},this.params,params)
          console.log(this.params)
          this.loginLogSearch(this.params)
    },
    // 操作日志触发分页
    pageChangeS(param) {
          this.param = Object.assign({},this.param,param)
          console.log(this.param)
          this.optLogSearch(this.param)
    }
  }
};
</script>

<style lang="scss" scoped>
.select {
  width: 200px;
  margin-right: 30px;
  float: right;
}
.btn {
  float: right;
}
.loginSearch {
  margin: 10px 10px 10px 0;
  overflow: hidden;
}
</style>
