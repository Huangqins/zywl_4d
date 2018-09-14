<template>
    <div>
        <el-table :data="tableData" style="width: 100%;"  v-loading="tableLoading">
            <el-table-column prop="assets_name" label="" align="center" :show-overflow-tooltip="true"></el-table-column>
                                                        
            </el-table>
    </div>
</template>
<script>
export default {
    data(){
        return{
            tableData:[]
        }
    }
}
</script>
<style lang="scss" scoped>

</style>


