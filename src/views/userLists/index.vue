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
        <panel style="margin-top:28px;">
            <p class="btn-banner">
                    <el-button type="primary" v-if="$auth('09-02-01')">添加用户</el-button>
                    <el-button type="primary" v-if="$auth('09-02-03')">批量启用</el-button>
                    <el-button type="primary" v-if="$auth('09-02-04')">批量禁用</el-button>
                    <el-button type="primary" v-if="$auth('09-02-05')">批量删除</el-button>
                </p>
             <el-table :data="tableData" style="width: 100%">
                <el-table-column type="selection" width="35"></el-table-column>
                <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
                <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
                <el-table-column prop="company" label="公司/部门" align="center"></el-table-column>
                <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
                <el-table-column prop="fStatus" label="状态" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.fStatus === 0 ? '启用中': '禁用中' }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                         <el-button  type="text" size="small">权限设置</el-button>
                         <el-button  type="text" size="small">详情</el-button>
                         <el-button  type="text" size="small">删除</el-button>
                         <el-button  type="text" size="small">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </panel>
    </div>
</template>

<script>
import panel from '@/components/panel'
import { getUserName } from '@/utils/auth'
export default {
    components: {
        panel
    },
    data() {
        return {
            form: {
                user_name: ''
            },
            tableData: [],
            user_name: ''
        }
    },
    created() {
        this.userList();
    },
    methods: {
       async userList(params) {
           let res = await this.$api.userList({user_name: params});
           if (res.data.result === 0) {
               this.tableData = res.data.rows;
           }
       },
       getList(params) {
           this.userList(params);
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


