<template>
    <div class="userLists">
        <div class="form">
            <el-form :inline="true" :model="form">
            <el-form-item label="搜索:">
                <el-input  placeholder="请输入用户名" v-model="form.user_name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button v-if="$auth('09-02-08')" @click="getList(form.user_name)">查询</el-button>
            </el-form-item>
            </el-form>
        </div>
        <!-- list -->
        <div>
        <panel style="margin-top:28px;">
            <div>
                <p class="btn-banner">
                    <el-button type="primary" v-if="$auth('09-02-01')" @click="addUser">添加用户</el-button>
                    <el-button type="primary" v-if="$auth('09-02-03')" @click="enabledBatchUser">批量启用</el-button>
                    <el-button type="primary" v-if="$auth('09-02-04')" @click="disabledBatchUser">批量禁用</el-button>
                    <el-button type="primary" v-if="$auth('09-02-05')" @click="batchDeleteUser">批量删除</el-button>
                </p>
             <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="35"></el-table-column>
                <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
                <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
                <el-table-column prop="company" label="公司/部门" align="center"></el-table-column>
                <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
                <el-table-column prop="enabled" label="状态" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.enabled === 0 ? '启用中': '禁用中' }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                         <el-button  type="text" size="small" @click="setPerMission(scope.row)">权限设置</el-button>
                         <el-button  type="text" size="small" @click="delet(scope.row)">删除</el-button>
                         <el-button  type="text" size="small" @click="edit(scope.row)">修改</el-button>
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
import panel from '@/components/panel'
import { getUserName } from '@/utils/auth'
import Pages from "@/components/Pages";

export default {
    components: {
        panel,
        Pages
    },
    data() {
        return {
            form: {
                user_name: ''
            },
            tableData: [],
            user_name: '',
            pageTotal: 0,
            user_id: [],
            user_name: [],
            defaultPage: {
                page: 1,
                rows: 10
            },
            params: {}
        }
    },
    created() {
        this.params = Object.assign({},this.defaultPage,{user_name:  ''})
        this.userList( this.params);
    },
    methods: {
       async userList(params) {
           let res = await this.$api.userList(params);
           if (res.data.result === 0) {
               this.tableData = res.data.rows;
               this.pageTotal = res.data.total;
           }
       },
       setPerMission(params) {
           this.$router.push({
               name: 'authority',
               params: {
                   user_id: [Number(params.userId)],
                   user_name: params.userName
               }
           })
       }, 
       getList(params) {
           this.userList(Object.assign({},this.params, {user_name: params}));
       },
       pageChange(params) {
           this.params = Object.assign({},this.params,params)
            this.userList(this.params)
       },
       addUser() {
           this.$router.push('/userManagement/addUser');
       },
       delet(row) {
           let user_id = [row.userId],
               user_name = [row.userName]
               this.$api.batchDeleteUser({user_id,user_name}).then(res => {
                   if (res.data.result === 0) {
                       this.userList(this.params)
                   }
               })
       },
       edit(row) {
           this.$router.push({
               name: 'addUser',
               params: {
                   user_id: Number(row.userId),
                   user_name: row.userName
               }
           })
       },
      async batchDeleteUser() {
          let params = {user_id: this.user_id, user_name: this.user_name}
          let res  = await this.$api.batchDeleteUser(params);
          if (res.data.result === 0) {
              this.userList(this.params)
          }
      },
      async enabledBatchUser() {
          let params = {user_id: this.user_id, user_name: this.user_name,enabled: 0}
          let res  = await this.$api.enabledBatchUser(params);
          if (res.data.result === 0) {
              this.userList(this.params)
          }
       },
      async disabledBatchUser() {
          let params = {user_id: this.user_id, user_name: this.user_name,enabled: 1}
          let res  = await this.$api.disabledBatchUser(params);
          if (res.data.result === 0) {
              this.userList(this.params)
          }
       },
       handleSelectionChange(row) {
           this.user_id = row.map(item => {
               return Number(item.userId)
           })
           this.user_name = row.map(item => {
               return item.userName
           })
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


