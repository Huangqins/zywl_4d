<template>
    <div>
        <panel>
            <div class="btn-bar">
                <el-button type="primary" @click="addActor" v-if="$auth('09-01-01')">新增角色权限</el-button>
            </div>
              <el-table  :data="tableData"  style="width: 100%">
                <el-table-column prop="role_name" label="角色" width="100" align="center">
                    <template slot-scope="scope">
                        <span style="color:#A5FDD5">{{scope.row.role_name}}</span>
                    </template>
                </el-table-column>
                 <el-table-column prop="menu_name" label="权限" align="center"></el-table-column>
                 <el-table-column label="操作" width="100" align="center">
                     <template slot-scope="scope">
                         <el-button type="text" @click="edit(scope.row)">修改</el-button>
                     </template>
                 </el-table-column>
             </el-table>
        </panel>
    </div>
</template>
<script>
import panel from '@/components/panel'
export default {
    components: {
        panel
    },
    created() {
        this.getRolePermission()
    },
    data() {
        return {
            tableData: []
        }
    },
    methods: {
        async getRolePermission() {
            let res = await this.$api.getRolePermission();
            if (res.data.result === 0) {
                this.tableData = res.data.role;
            }
        },
        edit(row) {
            this.$router.push({
                name: 'authority',
                params: {
                    role_name: row.role_name,
                    role_id: row.role_id,
                    role_level: row.role_level
                }
            })
        },
        addActor() {
            this.$router.push('/userManagement/authority')
        }
    }
}
</script>
<style lang="scss" scoped>
.btn-bar {
    padding: 14px;
}
</style>

