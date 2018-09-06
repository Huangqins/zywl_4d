<template>
   <div class="page">
       <el-pagination
               @size-change="handleSizeChange"
               @current-change="handleCurrentChange"
               :current-page="currentPage"
               :page-sizes="[10, 20, 50, 100]"
               :page-size="pageSize"
               :layout="layout"
               :total="400">
       </el-pagination>
   </div>
</template>

<script>
    export default {
        props: {
            layout: {
                type: String,
                default: "total, sizes, prev, pager, next, jumper"
            }
        },
        data() {
            return {
                pageSize: 10,
                currentPage: 4
                }
            },
        methods: {
            handleSizeChange(val) {
                this.pageSize = val;
                this.$emit('pageChange', Object.assign({},{rows: val, currentPage: this.currentPage}))
                console.log(val + '当前页尺寸', this.currentPage + '当前页码');
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.$emit('pageChange', Object.assign({},{rows: this.pageSize, currentPage: val}))
                console.log(this.pageSize + '当前页尺寸' ,val + '当前页码');
            }
        }
    }
</script>

<style scoped lang="scss">
.page {
    text-align: right;
    margin-top: 10px;
}
</style>