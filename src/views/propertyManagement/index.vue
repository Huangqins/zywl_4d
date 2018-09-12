<template>
    <div>
        <panel>
            <div class="btn-bar">
                <el-button type="primary">新增角色权限</el-button>
            </div>
              <el-table  :data="tableData"  style="width: 100%">
                <el-table-column prop="date" label="角色" width="100" align="center">
                    <!-- <template slot-scope="scope">
                        
                    </template> -->
                </el-table-column>
                 <el-table-column prop="date" label="权限" align="center"></el-table-column>
                 <el-table-column prop="date" label="操作" width="100" align="center"></el-table-column>
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

            }
        }
    }
}
</script>
<style lang="scss" scoped>
.btn-bar {
    padding: 14px;
}
</style>

