<template>
    <div class="assets">
        <div class="assets-header">
        <panel>
            <div class="assets-header-search">
                <span>筛选条件:</span>
                <el-input v-model="vuln_name" filterable placeholder="请输入漏洞名称" style="width:200px;margin-right:20px;"> </el-input>
               <el-date-picker v-model="start_time" type="datetime" placeholder="选择日期" style="margin-right:15px;"></el-date-picker>
               <el-date-picker v-model="end_time" type="datetime" placeholder="选择日期" style="margin-right:30px;"></el-date-picker>
                <el-button class="btn" @click="searchAsset">查询</el-button>
            </div>            
        </panel>
        </div>        
        <div class="assets-content">           
            <panel>
                 <div class="assets-content-btn">
                    <el-button type="primary" @click='addAssets'>添加漏洞</el-button>
                    <el-button type="primary" @click="areaImportVisible=true">导入</el-button>
                    <el-button type="primary" @click="exportVuln">导出</el-button>
                </div>
               <el-table :data="tableData" style="width: 100%;"  v-loading="tableLoading">
                    <el-table-column type="selection" width="35"></el-table-column>
                    <el-table-column prop="kb_vuln_name" label="风险名称" align="center" :show-overflow-tooltip="true"></el-table-column>                    
                    <el-table-column prop="kb_vuln_cve" label="CVE/CNVD" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="kb_vuln_level" label="风险级别" align="center" :show-overflow-tooltip="true">
                      <template slot-scope="scope">
                        <span> {{ vulntruts[scope.row.kb_vuln_level]}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="kb_vuln_port" label="利用端口" align="center"></el-table-column>
                    <el-table-column prop="type_name" label="风险类型" align="center"></el-table-column> 
                    <el-table-column prop="kb_vuln_ftime" label="发现时间" align="center">
                       <template slot-scope="scope">
                        <span> {{ fomatterTime(new Date(scope.row.kb_vuln_ftime.time)) }}</span>
                        </template>
                    </el-table-column>
                                                                          
                    <el-table-column label="操作" align="center" width="190">
                        <template slot-scope="scope">
                            <el-button type="text"  size="mini" @click="editAsset(scope.row)">编辑</el-button>
                            <el-button type="text" size="mini" @click="detailAsset(scope.row)">详情</el-button>
                            <el-button type="text" size="mini" @click="DeleteSelect(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                    </el-table>
            </panel>
        </div>
        <!-- 添加框 -->
    
     <el-dialog title="漏洞库导入" :visible.sync="areaImportVisible" width="30%">
       <p  style="line-height:20px;margin-bottom:10px;font-size:14px;color:#D1FFFF;cursor: pointer;" @click="importTem">下载资产模板</p>
       <p  style="line-height:20px;margin-bottom:10px;color:#ABB5BC;cursor: pointer;">为提高导入文件的成功率,请下载并使用系统提供的模板</p>
            <el-upload drag action="*" :headers="headers" :show-file-list="false" :with-credentials="true" name="excelFile" :on-change="fileUpload" :http-request="upload">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或
                <em>点击上传</em>
                </div>
            </el-upload>
            
      </el-dialog>
      <!-- 确认删除 -->
    <el-dialog title="删除确认" :visible.sync="deleteAssetVisible" width="30%">
      <p style="font-size:18px;overflow:hidden;">
        <i class="el-icon-warning" style="color:#FFCC33;font-size:30px;display:inline-block;vertical-align:middle;margin-right:5px;"></i>该操作不可撤回,是否确认删除该条数据?</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteAssetVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteItem">确 定</el-button>
      </span>
    </el-dialog>
        <!--分页-->
        <pages :total="pageTotal" @pageChange="pageChange"></pages>
    </div>
</template>

<script>
import Panel from "@/components/panel";
import Pages from "@/components/Pages";
import { getUserName, getToken } from "@/utils/auth";
import { fomatterTime, deepClone, formatTime, staticAssetPath } from "@/utils";

const assetTypestruts = {
  "1": "服务器",
  "2": "打印机",
  "3": "传真",
  "4": "交换机",
  "5": "路由器",
  "6": "防火墙",
  "7": "集线器",
  "8": "无线路由器",
  "9": "位置设备",
  "10": "主机"
};
const titlestruts = {
  "1": "资产添加",
  "2": "资产修改",
  "3": "资产详情"
};
const vulntruts = {
  "0": "极低风险",
  "1": "低风险",
  "2": "中风险",
  "3": "高风险",
  "4": "极高风险"
};
export default {
  components: {
    Panel,
    Pages
  },
  data() {
    var checkIp = (rule, value, callback) => {
      let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
      if (!value && !this.form.assets_url) {
        return callback(new Error("资产url和ip必须填写任意一项"));
      } else {
        // else if (!reg.test(value)) {
        //   return callback(new Error("资产IP格式不正确"));
        // }
        return callback();
      }
    };
    var checkUrl = (rule, value, callback) => {
      if (!value && !this.form.assets_ip) {
        return callback(new Error("资产url和ip必须填写任意一项"));
      } else if (/[\u4E00-\u9FA5]/i.test(value)) {
        return callback(new Error("资产url不能输入中文"));
      } else {
        return callback();
      }
    };
    return {
      file:{},
      fomatterTime:fomatterTime,
      vulntruts:vulntruts,
      pageObj: {},
      defaultPage: {
        rows: 10,
        page: 1
      },
       headers: {
        token: getToken(),
        userName: getUserName(),
        menuCode: vm._route.meta.menuCode
      },
      fomatterTime: fomatterTime,
      formatTime: formatTime,
      areaImportVisible: false,
      tableData: [],
      assetTypestruts: assetTypestruts,
      titlestruts: titlestruts,
      deleteAssetVisible: false,
      tableLoading: false,
      dialogFormVisible: false,
      addPending: false,
      state: "1",
      status: "edit",
      start_time:'',
      end_time:'',
      vuln_name: "",
      options: [],      
      page: "",
      rows: "",
      pageTotal: 0,
      params: {}
    };
  },
  created() {
    let data=Object.assign({},this.defaultPage,{isOrder:1})
    this.kbInfo(data);
  },
  methods: {
    searchAsset() {
      let data = Object.assign({}, this.params, {
        vuln_name:this.vuln_name,
        start_time:fomatterTime(this.start_time),
        end_time:fomatterTime(this.end_time)
      });
       this.kbInfo(data);
    },
    // 导入回调
    fileUpload(res) {
      this.file = res;
    },
    upload() {
      let formData = new FormData();
      formData.append("excelFile", this.file.raw);
      this.$api.importExcel(formData).then(res => {
        this.areaImportVisible = false;
        if (res.data.result === 0) {
          this.$message.success("文件导入成功");
        } else {
          this.$message.error("文件导入失败，请查看文件项填写是否完整或正确");
        }
      });
    },
    async exportVuln() {
      let res = await this.$api.exportExcel({});
      if (res.data.result === 0) {
        let result = await this.$api.exportFile(res.data.path);
        createDownload(result, '导出', '.xls')
      }
    },    
    async importTem() {
      let assetUrl = "ZR/excel/kb_vuln.xls";
      let res = await this.$api.exportFile(assetUrl);
      if (res.data.size) {
        let url = window.URL.createObjectURL(new Blob([res.data]));
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", "知识库导入模板" + ".xls");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        this.$message.error(`模板文件下载失败`);
      }
    },
    // 触发分页
    pageChange() {
      this.params =Object.assign({},this.params,params) ;
      this.assetsInfo(params);
    },
    // 漏洞库列表
    async kbInfo(params) {
      let res = await this.$api.kbInfo(params);
      this.tableLoading = false;
      if (res.data.result === 0) {
        let data = res.data.rows;
        this.pageTotal = res.data.total;
        this.tableData = data
      }
    },
    // 选中删除项并且打开提示框
    DeleteSelect(row) {
      this.assetItem = Object.assign({}, row);
      this.deleteAssetVisible = true;
    },
    // 确定删除
    deleteItem() {
      this.vulnDelete(this.assetItem);
    },
    // 漏洞删除
    vulnDelete(row) {
      this.$api.deleteKb({ kb_vuln_id: row.kb_vuln_id, kb_vuln_name:row.kb_vuln_name}).then(res => {
        this.deleteAssetVisible = false;
        if (res.data.result === 0) {
          this.$message.success(`删除成功`);
          this.kbInfo(this.defaultPage);
        } else {
          this.$message.error(`删除失败`);
        }
      });
    },
    //添加弹框
    addAssets() {
      this.state = "1";
      this.status = "edit";
      this.$router.push('./addDatabase')
    },
    // 编辑表格
    editAsset(row) {
        this.status = "edit";
        this.state = '2';
        this.form = Object.assign({}, row);
        this.$router.push({
            name:'addDatabase',
            params:Object.assign({},row,{status: 'edit'})
        })
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
    },
    // 添加资产
    addAsset(params) {
      if (this.$refs.form) {
        this.$refs.form.validate(valid => {
          if (this.status === "check") {
            this.dialogFormVisible = false;
          } else {
            if (valid) {
              if (this.form.assets_id) {
                this.$api.assetsUpdate(this.form).then(res => {
                  this.addPending = true;
                  if (res.data.result === 0) {
                    this.$message.success(`修改成功`);
                    this.addPending = false;
                    this.dialogFormVisible = false;
                    this.assetsInfo(this.params);
                  } else {
                    this.$message.success(`修改失败`);
                    setTimeout(() => {
                      this.dialogFormVisible = false;
                    }, 500);
                    this.addPending = false;
                  }
                });
              } else {
                this.$api.assetsAdd(this.form).then(res => {
                  this.addPending = true;
                  if (res.data.result === 0) {
                    this.$message.success(`添加成功`);
                    this.addPending = false;
                    this.dialogFormVisible = false;
                    this.assetsInfo(this.params);
                  } else {
                    this.$message.success(`添加失败`);
                    setTimeout(() => {
                      this.dialogFormVisible = false;
                    }, 500);
                    this.addPending = false;
                  }
                });
              }
            } else {
              return false;
            }
          }
        });
      } else {
        if (params.assets_id) {
          this.$api.assetsUpdate(params).then(res => {
            this.addPending = true;
            if (res.data.result === 0) {
              this.$message.success(`修改成功`);
              this.addPending = false;
              this.dialogFormVisible = false;
              this.assetsInfo(this.params);
            } else {
              this.$message.success(`修改失败`);
              setTimeout(() => {
                this.dialogFormVisible = false;
              }, 500);
              this.addPending = false;
            }
          });
        }
      }
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

