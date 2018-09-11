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
                    <el-table-column prop="assets_name" label="账号" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="assets_url" label="登录状态" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="assets_ip" label="创建时间" align="center" :show-overflow-tooltip="true"></el-table-column>                    
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
        <div class="secTwo">
          <panel title="操作日志">
              <div class="handleLog">
                     <div class="loginSearch">
                       <el-button class="btn" @click="searchhandleLog">查询</el-button>
                      <el-input v-model="handleLog" filterable placeholder="请输入账号" class="select" ></el-input>                     
                  </div>
                   <el-table :data="loginData" style="width: 100%;"  v-loading="tableLoading">
                    <el-table-column type="selection" width="35"></el-table-column>
                    <el-table-column prop="assets_name" label="账号" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="assets_url" label="登录状态" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="assets_ip" label="创建时间" align="center" :show-overflow-tooltip="true"></el-table-column>                    
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
            loginData:[],
            tableLoading:false,
            loginLog:'',
            handleLog:''
        }
    },
    methods:{
        loginSearch(){

        },
        searchhandleLog(){

        },

    }
}
</script>

<style lang="scss" scoped>
.select{
    width: 200px;
    margin-right: 30px;
    float: right;
}
.btn{    
    float: right;
}
.loginSearch{
 margin: 10px 10px 10px 0;
 overflow: hidden;
}
</style>
