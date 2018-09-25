<template>
    <div class="assets">
        <div class="assets-header">
        <panel>
            <div class="assets-header-search">
                <span>筛选条件:</span>
                <el-input v-model="group_name" filterable placeholder="策略名称" style="width:200px;margin-right:20px;"> </el-input>
               <el-date-picker v-model="start_time" type="datetime" placeholder="选择日期" style="margin-right:15px;"></el-date-picker>
               <el-date-picker v-model="end_time" type="datetime" placeholder="选择日期" style="margin-right:30px;"></el-date-picker>
                <el-button class="btn" @click="searchAsset">查询</el-button>
            </div>            
        </panel>
        </div>        
        <div class="assets-content">           
            <panel>
                 <div class="assets-content-btn">
                    <el-button type="primary" @click='addAssets'>新增</el-button>
                    <el-button type="primary" @click="areaImportVisible=true">合并</el-button>
                </div>
               <el-table :data="tableData" style="width: 100%;"  v-loading="tableLoading">
                    <el-table-column type="selection" width="35"></el-table-column>
                    <el-table-column prop="group_name" label="策略名称" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="group_id" label="策略ID" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="vuln_urgent" label="极高" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="vuln_high" label="高" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="vuln_medium" label="中" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="vuln_low" label="低" align="center"></el-table-column>
                    <el-table-column prop="vuln_tips" label="极低" align="center"></el-table-column>                   
                    <el-table-column label="更新时间" align="center" :show-overflow-tooltip="true" prop="update_time">
                        <template slot-scope="scope">
                                  <span v-if="scope.row.update_time != null">
                                    {{ fomatterTime(new Date(scope.row.update_time.time)) }}
                                  </span>
                                  <span v-else>
                                    {{scope.row.update_time}}
                                  </span>
                                </template>
                    </el-table-column>                                      
                    <el-table-column label="操作" align="center" width="190">
                        <template slot-scope="scope">
                            <el-button type="text"  size="mini" @click="editAsset(scope.row)">复制</el-button>
                            <el-button type="text" size="mini" @click="detailAsset(scope.row)">导出</el-button>
                        </template>
                    </el-table-column>
                    </el-table>
            </panel>
        </div>    
        <!--分页-->
        <pages :total="pageTotal" @pageChange="pageChange"></pages>
    </div>
</template>

<script>
import Panel from "@/components/panel";
import Pages from "@/components/Pages";
import { getUserName, getToken } from "@/utils/auth";
import { fomatterTime, deepClone, formatTime, staticAssetPath } from "@/utils";
const titlestruts = {
  "1": "资产添加",
  "2": "资产修改",
  "3": "资产详情"
};
export default {
  components: {
    Panel,
    Pages
  },
  data() {
    return {
      pageObj: {},
      defaultPage: {
        rows: 10,
        page: 1
      },
      fomatterTime: fomatterTime,
      formatTime: formatTime,
      areaImportVisible: false,
      tableData: [],      
      titlestruts: titlestruts,
      deleteAssetVisible: false,
      tableLoading: false,
      dialogFormVisible: false,
      addPending: false,
      state: "1",
      status: "edit",
      group_name:'',
      start_time:'',
      end_time:'',
      assetdate: [],
      optionAssetsType: [],
      options: [],
      page: "",
      rows: "",
      pageTotal: 0,
      headers: {
        token: getToken(),
        userName: getUserName(),
        menuCode: vm._route.meta.menuCode
      },
      params: {
        page: "1",
        rows: "10"
      }
    };
  },
  created() {
    this.strategyList(this.params);    
  },
  methods: {
    
    searchAsset() {
      let data = Object.assign({}, this.params, {
        group_name:this.group_name,
        start_time: !this.start_time ? "" : fomatterTime(this.start_time),
        end_time: !this.end_time ? "" : fomatterTime(this.end_time)
      });
      this.strategyList(data);
    }, 
    // 导入回调
    fileUpload(res) {
      this.file = res;
    },
    upload() {
      let formData = new FormData();
      formData.append("excelFile", this.file.raw);
      this.$api.assetImport(formData).then(res => {
        this.areaImportVisible = false;
        if (res.result === 0) {
          this.$message.success("文件导入成功");
        } else {
          this.$message.error("文件导入失败，请查看文件项填写是否完整或正确");
        }
      });
    },
    // 触发分页
    pageChange(pageObj) {
      this.pageObj = pageObj;
      let { page, rows } = pageObj,
        params = { page, rows, is_page: 0 };
      this.params = params;
      this.assetsInfo(params);
    },
    // 策略配置列表
    async strategyList(params) {
      this.tableLoading = true;
      let res = await this.$api.strategyList(params);
      this.tableLoading = false;
      if (res.data.result === 0) {
        let data = res.data.list;
        this.pageTotal = res.data.total;
        this.tableData = res.data.list;
      }
    },
    // 选中删除项并且打开提示框
    assetsDeleteSelect(row) {
      this.assetItem = Object.assign({}, row);
      this.deleteAssetVisible = true;
    },
    // 确定删除
    deleteItem() {
      this.assetsDelete(this.assetItem);
    },
    // 资产删除
    assetsDelete(row) {
      this.$api.deleteAssets({ assets_ids: [row.assets_id] }).then(res => {
        this.deleteAssetVisible = false;
        if (res.data.result === 0) {
          this.$message.success(`删除成功`);
          this.assetsInfo(this.params);
        } else {
          this.$message.error(`删除失败`);
        }
      });
    },
    //添加弹框
    addAssets() {
    //   this.dialogFormVisible = true;
      this.state = "1";
      this.status = "edit";
      this.$router.push('./addPolicySetting')
    },
    // 编辑表格
    editAsset(row) {
      row.assets_type = row.assets_type ? Number(row.assets_type) : "";
      row.assets_zone = row.assets_zone ? Number(row.assets_zone) : "";
      this.dialogFormVisible = true;
      this.form = Object.assign({}, row);
      this.status = "edit";
      this.state = "2";
    },
    // 清空表单
    resetForm() {
      this.dialogFormVisible = false;
      this.$refs.form.resetFields();
      setTimeout(() => {
        this.form = Object.assign({}, this.formCopy);
      }, 200);
    },
    // 详情
    detailAsset(row) {
      this.$router.push({
        name: "AssetDetail",
        params: {
          assets_id: row.assets_id,
          row: row
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.assets {
  /*margin: 0 20px;*/
}
.assets-header {
  &-search {
    padding: 20px 10px;
    span {
      color: #d1ffff;
      margin-right: 10px;
    }
  }
  margin-bottom: 25px;
}
.assets-content-btn {
  margin: 15px 0px 10px 7px;
}
.select {
  margin-right: 15px;
}
.selectDate {
  margin-right: 30px;
}
</style>