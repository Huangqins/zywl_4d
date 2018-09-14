<template>
    <div class="assets">
        <div class="assets-header">
        <panel>
            <div class="assets-header-search">
                <span>筛选条件:</span>
                <el-input v-model="assetsArea" filterable placeholder="" style="width:200px;margin-right:20px;"> </el-input>
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
                    <el-button type="primary" @click="areaImportVisible=true">导出</el-button>
                </div>
               <el-table :data="tableData" style="width: 100%;"  v-loading="tableLoading">
                    <el-table-column type="selection" width="35"></el-table-column>
                    <el-table-column prop="assets_name" label="风险名称" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="assets_url" label="风险编号" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="assets_ip" label="CVE/CNVD" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="assets_os_type" label="风险级别" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="assets_vm" label="利用端口" align="center"></el-table-column>
                    <el-table-column prop="area_name" label="风险类型" align="center"></el-table-column>     
                                                        
                    <el-table-column label="操作" align="center" width="190">
                        <template slot-scope="scope">
                            <el-button type="text"  size="mini" @click="editAsset(scope.row)">详情</el-button>
                            <el-button type="text" size="mini" @click="detailAsset(scope.row)">编辑</el-button>
                            <el-button type="text" size="mini" @click="detailAsset(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                    </el-table>
            </panel>
        </div>
        <!-- 添加框 -->
    <el-dialog :title="titlestruts[state]" :visible.sync="dialogFormVisible" width="28%" @close="resetForm('form')">
      <el-form :model="form" label-width="90px" ref="form" :rules="rules">
        <el-form-item label="资产名称" prop="assets_name">
          <template v-if="status === 'edit'">
            <el-input v-model="form.assets_name" auto-complete="off"></el-input>
          </template>
          <template v-else>
            <span>{{ form.assets_name }}</span>
          </template>
        </el-form-item>
        <el-form-item label="资产URL" prop="assets_url">
          <template v-if="status === 'edit'">
            <el-input v-model="form.assets_url" auto-complete="off" placeholder="例:www.zywl-tech.com"></el-input>
          </template>
          <template v-else>
            <span>{{ form.assets_url }}</span>
          </template>
        </el-form-item>
        <el-form-item label="资产IP" prop="assets_ip">
          <template v-if="status === 'edit'">
            <el-input v-model="form.assets_ip" auto-complete="off" placeholder="例:192.168.10.104"></el-input>
          </template>
          <template v-else>
            <span>{{ form.assets_ip }}</span>
          </template>
        </el-form-item>
        <el-form-item label="所属区域" prop="assets_zone">
          <template v-if="status === 'edit'">
            <el-select v-model="form.assets_zone" placeholder="请选择" style="width:100%;">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </template>
          <template v-else>
            <span>{{ form.assets_zone }}</span>
          </template>
        </el-form-item>
        <el-form-item label="资产类型" prop="assets_type">
          <template v-if="status === 'edit'">
            <el-select v-model="form.assets_type" placeholder="请选择" style="width:100%;">
              <el-option v-for="item in optionAssetsType" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </template>
          <template v-else>
            <span>{{ form.assets_type }}</span>
          </template>
        </el-form-item>
        <el-form-item label="资产重要度" prop="assets_important">
          <template v-if="status === 'edit'">
            <el-select v-model="form.assets_important" placeholder="请选择" style="width:100%;">
              <el-option v-for="item in assets_important_option" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </template>
          <template v-else>
            <span>{{ form.assets_important }}</span>
          </template>
        </el-form-item>
        <el-form-item label="负责人" prop="assets_manger">
          <template v-if="status === 'edit'">
            <el-input v-model="form.assets_manger" auto-complete="off"></el-input>
          </template>
          <template v-else>
            <span>{{ form.assets_manger }}</span>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form')" style="background:transparent">取 消</el-button>
        <el-button type="primary" @click="addAsset('form')" :loading="addPending">确 定</el-button>
      </div>
    </el-dialog>
     <el-dialog title="资产导入" :visible.sync="areaImportVisible" width="30%">
       <p  style="line-height:20px;margin-bottom:10px;font-size:14px;color:#D1FFFF;cursor: pointer;">下载资产模板</p>
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
      pageObj: {},
      defaultPage: {
        rows: 10,
        page: 1
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
      assetsAreaS: [],
      assetsArea: "",
      equipmentTypeS: [],
      equipmentType: "",
      OSsystemS: [],
      start_time:'',
      end_time:'',
      osystem: "",
      portS: [],
      port: "",
      assetdate: [],
      form: {
        assets_name: "",
        assets_url: "",
        assets_ip: "",
        assets_zone: "",
        assets_type: 1,
        assets_important: 1,
        assets_os: "",
        assets_manger: getUserName(),
        assets_creatuser: getUserName()
      },
      optionAssetsType: [],
      options: [],
      assets_important_option: [
        {
          value: 0,
          label: "一般重要"
        },
        {
          value: 1,
          label: "重要"
        },
        {
          value: 2,
          label: "特别重要"
        }
      ],
      rules: {
        assets_name: [
          {
            type: "string",
            required: true,
            message: "请填写资产名称",
            trigger: "blur"
          }
        ],
        assets_type: [
          {
            type: "number",
            required: true,
            message: "请填写资产类型",
            trigger: "change"
          }
        ],
        assets_manger: [
          {
            type: "string",
            required: true,
            message: "请填写资产负责人",
            trigger: "blur"
          }
        ],
        assets_url: [
          {
            validator: checkUrl,
            trigger: "blur"
          }
        ],
        assets_ip: [
          {
            validator: checkIp,
            trigger: "blur"
          }
        ]
      },
      page: "",
      rows: "",
      pageTotal: 0,
      headers: {
        token: getToken(),
        userName: getUserName(),
        menuCode: vm._route.meta.menuCode
      },
      params: {
        is_page: 0,
        page: "1",
        rows: "10"
      }
    };
  },
  created() {
    this.assetsInfo(this.params);
    this.getPort();
    this.getOSType();
    this.assetsType();
    this.getArea();
  },
  methods: {
    // searchAsset() {
    //   let data = Object.assign({}, this.params, {
    //     assets_name:this.assetsArea,
    //     id: this.equipmentType,
    //     os_type:this.osystem,
    //     port: this.port,
    //     start_time:fomatterTime(this.start_time),
    //     end_time:fomatterTime(this.end_time)
    //   });
    //   this.assetsInfo();
    // },
    //端口号
    async getPort() {
      let res = await this.$api.getPort();
      if (res.data.result == "0") {
        let data = res.data.assets;
        this.portS = data.map(item => {
          return {
            lable: item.port,
            value: item.port
          };
        });
      }
    },
    //操作系统
    async getOSType() {
      let res = await this.$api.getOSType();
      if (res.data.result == "0") {
        let data = res.data.assets;
        this.OSsystemS = data.map(item => {
          return {
            lable: item.assets_os_type,
            value: item.assets_os_type
          };
        });
      }
    },
    //设备类型
    async assetsType() {
      let res = await this.$api.assetsType();
      if (res.data.result == "0") {
        let data = res.data.assetsType;
        this.equipmentTypeS = data.map(item => {
          return {
            lable: item.id,
            value: item.name
          };
        });
      }
    },
    //设备类型
    async getArea() {
      let res = await this.$api.getArea();
      if (res.data.result == "0") {
        let data = res.data.areas;
        this.assetsAreaS = data.map(item => {
          return {
            lable: item.area_id,
            value: item.area_name
          };
        });
      }
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
    // 资产列表
    // async assetsInfo(params) {
    //   this.tableLoading = true;
    //   let res = await this.$api.assetsInfo(params);
    //   this.tableLoading = false;
    //   if (res.data.result === 0) {
    //     let data = res.data.rows;
    //     this.pageTotal = res.data.total;
    //     res.data.rows.forEach(item => {
    //       assetTypestruts[item.assets_type];
    //     });
    //     this.tableData = res.data.rows;
    //   }
    // },
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
      this.$router.push('./addDatabase')
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


