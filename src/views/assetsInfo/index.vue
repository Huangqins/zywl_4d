<template>
    <div class="assets">
        <div>
        <panel>
            <!-- <div>
                筛选条件：
                <el-select v-model="taskname" filterable placeholder="任务名称">
                    <el-option
                    v-for="item in tasknameS"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="scanTarget" filterable placeholder="扫描目标" class="select">
                    <el-option
                    v-for="item in scanTargetS"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="executionmode" filterable placeholder="执行方式" >
                    <el-option
                    v-for="item in executionmodeS"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-input v-model="input" placeholder="请输入内容" style="width:200px;"></el-input>
                <el-button class="btn">查询</el-button>
            </div> -->
            
        </panel>
        </div>
        <div>
            <el-button @click='addAssets'>添加资产</el-button>
            <el-button>导入资产</el-button>
            <el-button>导出资产</el-button>
        </div>
        <div>

            <panel title="资产列表" style="text-align:center">
               <el-table :data="tableData" style="width: 100%;"  v-loading="tableLoading">
                    <el-table-column type="selection" width="35"></el-table-column>
                    <el-table-column prop="assets_name" label="资产名称" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="assets_url" label="资产链接" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="assets_ip" label="资产IP" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="assets_os_type" label="操作系统" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="assets_vm" label="虚拟机" align="center"></el-table-column>
                    <el-table-column prop="area_name" label="所属区域" align="center"></el-table-column>
                    <el-table-column prop="assets_type" label="设备类型" align="center">
                        <template slot-scope="scope">
                        <span>{{assetTypestruts[scope.row.assets_type]}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="service_num" label="开放服务" align="center" width="100">
                        <template slot-scope="scope">
                        <el-button type="primary" size="mini" style="border:none;" @click="dbclick(scope.row)" v-if="scope.row.service_num != 0">
                            {{scope.row.service_num}}
                        </el-button>
                        <span v-else>
                            {{scope.row.service_num}}
                        </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建时间" align="center" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                        <span> {{ fomatterTime(new Date(scope.row.assets_create_time.time)) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="assets_manger" label="负责人" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="操作" align="center" width="190">
                        <template slot-scope="scope">
                            <el-button type="text"  size="mini" @click="editAsset(scope.row)">修改</el-button>
                            <el-button type="text" size="mini" @click="detailAsset(scope.row)">详情</el-button>
                            <el-button type="text"   size="mini" @click="assetsDeleteSelect(scope.row)">删除</el-button>
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
        <!--分页-->
        <pages :total="pageTotal" @pageChange="pageChange"></pages>
    </div>
</template>

<script>
import Panel from "@/components/panel";
import  Pages from "@/components/Pages";
import { getUserName } from "@/utils/auth";
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
      fomatterTime: fomatterTime,
      formatTime: formatTime,
      tableData: [],
      assetTypestruts: assetTypestruts,
      titlestruts: titlestruts,
      tableLoading: false,
      dialogFormVisible: false,
      addPending: false,
      state: "1",
      status: "edit",
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
        pageTotal: 0
    };
  },
  created() {
    this.assetsInfo({ is_page: 0, page: "1", rows: "10" });
  },
  methods: {
      // 触发分页
      pageChange(pageObj) {
          let { page, rows } = pageObj,
               params  = { page, rows,  is_page: 0}
          this.assetsInfo(params);
      },
    // 资产列表
    async assetsInfo(params) {
      this.tableLoading = true;
      let res = await this.$api.assetsInfo(params);
      this.tableLoading = false;
      if (res.data.result === 0) {
        let data = res.data.rows;
        this.pageTotal = res.data.total;
        res.data.rows.forEach(item => {
          assetTypestruts[item.assets_type];
        });
        this.tableData = res.data.rows;
      }
    },
    //添加弹框
    addAssets() {
      this.dialogFormVisible = true;
      this.state = "1";
      this.status = "edit";
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
  margin: 0 20px;
}
</style>