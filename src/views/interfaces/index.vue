<template>
    <div class="interfaces">
        <div class="interfaces-btn">
          <el-button type="primary" @click='addApi'>API生成</el-button>
        </div>
         <el-table :data="tableData" style="width: 100%;"  v-loading="tableLoading">
                    <el-table-column type="selection" width="35"></el-table-column>
                    <el-table-column prop="assets_name" label="public Key" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="assets_url" label="生成时间" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="assets_ip" label="到期时间" align="center" :show-overflow-tooltip="true"></el-table-column>                   
                    <el-table-column label="操作" align="center" width="190">
                        <template slot-scope="scope">
                            <el-button type="text"   size="mini" @click="DeleteReport(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
         </el-table>
    </div>
</template>

<script>
import Panel from "@/components/panel";
export default {
  components: {
    Panel
  },
  data() {
    return {
      tableData: [],
      tableLoading: false
    };
  },
  methods: {
    addApi() {}
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


