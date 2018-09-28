<template>
    <div style="height:100%;">
        <el-table :data="tableData" style="width: 100%;"  v-loading="tableLoading" height="528px">
            <el-table-column prop="kb_vuln_name" label="资讯名称" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="kb_vuln_ref" label="路径" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="kb_vuln_ftime" label="发现时间" align="center" :show-overflow-tooltip="true"></el-table-column>                                                         
        </el-table>
        <pages :total="pageTotal" @pageChange="pageChange"></pages>
    </div>
</template>
<script>
import Pages from "@/components/Pages";
export default {
    components:{
        Pages
    },
    data(){
        return{
            tableData:[],
            tableLoading:false,
            pageTotal:0,
            params: {
                page: "1",
                rows: "10",
                is_page: 0,
            }
        }
    },
    created(){
        let data=Object.assign({},this.params)
        this.getInformation(data)
    },
    methods:{
        async getInformation(params){
            let res=await this.$api.getInformation(params);
            if(res.data.result == 0){
                 this.tableData=res.data.kb;
                 this.pageTotal=res.data.total
            }
        },        
        // 触发分页
        pageChange(pageObj) {
        this.pageObj = pageObj;
        let { page, rows } = pageObj,
            params = { page, rows, is_page: 0 };
        this.params = params;
        this.getInformation(params);
        },
    }
}
</script>
<style lang="scss" scoped>

</style>


