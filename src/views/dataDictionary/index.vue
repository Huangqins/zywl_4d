<template>
    <div>
      <div class='assetPort'>
           <section >
               <panel title="资产区域配置">
              <el-button type="text" style="float:right;margin-right:20px" @click="addAssetareas"><i class="el-icon-plus"></i>新增</el-button>
              <el-table :data="assetData" style="width: 100%;height:259px;overflow:auto;" >
                <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
                <el-table-column prop="area_name" label="区域名称" align="center"></el-table-column>
                <el-table-column prop="create_time" label="创建时间" align="center">
                    <template slot-scope="scope" v-if="scope.row.create_time==null">
                        <span> {{ scope.row.create_time }}</span>
                    </template>                    
                    <!-- <template slot-scope="scope" v-else>
                        <span> {{ fomatterTime(new Date(scope.row.create_time.time)) }}</span>
                    </template> -->
                </el-table-column> 
                <el-table-column prop="area_user" label="创建人" align="center"></el-table-column>              
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                         <el-button  type="text" size="small" @click="deleteArea(scope.row)">删除</el-button>
                         <el-button  type="text" size="small" @click="editArea(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
              </el-table>
               </panel>
           </section>
           <section>
               <panel title="资产类型配置">
                   <el-button type="text" style="float:right;margin-right:20px" @click="addAssettypes"><i class="el-icon-plus"></i>新增</el-button>
                   <el-table :data="assetTypeData" style="width: 100%" >
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="name" label="资产类型" align="center"></el-table-column>
                    <el-table-column prop="desc" label="描述" align="center"></el-table-column>
                    <el-table-column prop="create_time" label="创建时间" align="center"></el-table-column>               
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope"> 
                            <el-button  type="text" size="small" @click="deleteassettype(scope.row)" >删除</el-button>
                            <el-button  type="text" size="small" @click="editassettype(scope.row)">修改</el-button>
                        </template>
                    </el-table-column>
                   </el-table>
               </panel>
           </section>
      </div>
      <div class='vulnPort'>
          <section>
           <panel title="风险类型配置">
                <el-button type="text" style="float:right;margin-right:20px" @click="addvulntype"><i class="el-icon-plus" ></i>新增</el-button>
                   <el-table :data="vulnTypeData" style="width: 100%" >
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="vuln_type_name" label="风险名称" align="center"></el-table-column>
                    <el-table-column prop="vuln_type_keyword" label="类型编码" align="center"></el-table-column>
                    <el-table-column prop="vuln_type_creattime" label="创建时间" align="center"></el-table-column>               
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button  type="text" size="small" @click="deletevuln(scope.row)">删除</el-button>
                            <el-button  type="text" size="small" @click="editvuln(scope.row)">修改</el-button>
                        </template>
                    </el-table-column>
                   </el-table>
            </panel>
          </section>
           <section>
               <panel title="风险数据配置">
                       <div style="overflow:hidden;padding:20px">  
                        <el-form :model="vulnData" :rules="rules" ref="ruleForm" label-width="185px" class="form" >                   
                            <el-form-item label="极高风险处理提醒时间(天)" prop="vuln_vHigh" style="width:45%;float:left">
                                <el-input v-model="ruleForm.vuln_vHigh"></el-input>
                            </el-form-item>
                            <el-form-item label="高风险处理时间(天)" prop="vuln_high" style="width:45%;float:right">
                                <el-input v-model="ruleForm.vuln_high"></el-input>
                            </el-form-item> 
                            <el-form-item label="中风险处理提醒时间(天)" prop="vuln_middle" style="width:45%;float:left">
                                <el-input v-model="ruleForm.vuln_middle"></el-input>
                            </el-form-item>
                            <el-form-item label="低风险处理时间(天)" prop="vuln_low" style="width:45%;float:right">
                                <el-input v-model="ruleForm.vuln_low"></el-input>
                            </el-form-item> 
                            <el-form-item label="极低风险处理时间(天)" prop="vuln_vLow" style="width:45%;">
                                <el-input v-model="ruleForm.vuln_vLow"></el-input>
                            </el-form-item>
                            <!-- <el-form-item style="width:50%;margin:0 auto;">                                
                                <el-button type="primary" >重置</el-button>
                                <el-button type="primary"  style="margin-right:20px;" @click="keepvuln">保存</el-button>
                            </el-form-item> -->
                        </el-form>                      
                    </div>
               </panel>
           </section>
      </div>
      <div class="workManage">
          <section>
               <panel title="工单管理配置">
                  <div style="padding:20px">
                    <el-form :model="workManage" :rules="rules" ref="ruleForm" label-width="185px" class="form" >    
                       <el-form-item label="工单到期邮件提醒" prop=" " style="width:100%;">
                         <el-radio v-model="workManage.is_email" label="0">是</el-radio>
                         <el-radio v-model="workManage.is_email" label="1">否</el-radio>
                      </el-form-item>
                    </el-form>
                  </div>
               </panel>
          </section>
           <section>
               <panel title="工单数据配置">
                   <div style="overflow:hidden;padding:20px">  
                        <el-form :model="workData" :rules="rules" ref="ruleForm" label-width="185px" class="form" >                   
                            <el-form-item label="极高风险整改提醒时间(天)" prop="work_vHigh" style="width:45%;float:left">
                                <el-input v-model="ruleForm.work_vHigh"></el-input>
                            </el-form-item>
                            <el-form-item label="高风险整改时间(天)" prop="work_high" style="width:45%;float:right">
                                <el-input v-model="ruleForm.work_high"></el-input>
                            </el-form-item> 
                            <el-form-item label="中风险整改提醒时间(天)" prop="work_middle" style="width:45%;float:left">
                                <el-input v-model="ruleForm.work_middle"></el-input>
                            </el-form-item>
                            <el-form-item label="低风险整改时间(天)" prop="work_low" style="width:45%;float:right">
                                <el-input v-model="ruleForm.work_low"></el-input>
                            </el-form-item> 
                            <el-form-item label="极低风险整改时间(天)" prop="work_vLow" style="width:45%;">
                                <el-input v-model="ruleForm.work_vLow"></el-input>
                            </el-form-item>
                             <el-form-item style="width:50%;margin:0 auto;">                                
                                <el-button type="primary" >重置</el-button>
                                <el-button type="primary"  style="margin-right:20px;">保存</el-button>
                            </el-form-item>
                        </el-form>                      
                    </div>
               </panel>
           </section>
      </div>
      <el-dialog title="删除确认" :visible.sync="deleteAssetVisible" width="30%">
        <p style="font-size:18px;overflow:hidden;">
            <i class="el-icon-warning" style="color:#FFCC33;font-size:30px;display:inline-block;vertical-align:middle;margin-right:5px;"></i>该操作不可撤回,是否确认删除该条数据?</p>
        <span slot="footer" class="dialog-footer">
        <el-button @click="deleteAssetVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteItem">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="删除确认" :visible.sync="deleteassettypeVisible" width="30%">
        <p style="font-size:18px;overflow:hidden;">
            <i class="el-icon-warning" style="color:#FFCC33;font-size:30px;display:inline-block;vertical-align:middle;margin-right:5px;"></i>该操作不可撤回,是否确认删除该条数据?</p>
        <span slot="footer" class="dialog-footer">
        <el-button @click="deleteassettypeVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteassettypeItem">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="删除确认" :visible.sync="deletevulnVisible" width="30%">
        <p style="font-size:18px;overflow:hidden;">
            <i class="el-icon-warning" style="color:#FFCC33;font-size:30px;display:inline-block;vertical-align:middle;margin-right:5px;"></i>该操作不可撤回,是否确认删除该条数据?</p>
        <span slot="footer" class="dialog-footer">
        <el-button @click="deletevulnVisible = false">取 消</el-button>
        <el-button type="primary" @click="deletevulnItem">确 定</el-button>
      </span>
    </el-dialog>
     <el-dialog :title="titlestruts[state]" :visible.sync="assetareaVisible" width="28%" @click="resetForm('assetareaform')">
      <el-form :model="assetareaform" label-width="110px" ref="assetareaform" :rules="rules">
        <el-form-item label="资产区域名称" prop="area_name">
          <template >
            <el-input v-model="assetareaform.area_name" auto-complete="off"></el-input>
          </template>
        </el-form-item>       
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('assetareaform')" style="background:transparent">取 消</el-button>
        <el-button type="primary" @click="addAssetarea('assetareaform')" :loading="addPending">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="areatype[areatypestate]" :visible.sync="assettypeVisible" width="28%" @click="resetassetTypeForm('assettypeform')">
      <el-form :model="assettypeform" label-width="110px" ref="assettypeform" :rules="rules">
        <el-form-item label="资产类型名称" prop="name">
          <template >
            <el-input v-model="assettypeform.name" auto-complete="off"></el-input>
          </template>
        </el-form-item>    
        <el-form-item label="资产类型描述" prop="name">
          <template >
            <el-input type='textarea' v-model="assettypeform.desc" auto-complete="off"></el-input>
          </template>
        </el-form-item>     
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetassetTypeForm('assettypeform')" style="background:transparent">取 消</el-button>
        <el-button type="primary" @click="addAssettype('assettypeform')" :loading="addPending">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="vulntitlestruts[vulnstate]" :visible.sync="vulnVisible" width="28%" @click="resetassetTypeForm('assettypeform')">
      <el-form :model="vulnform" label-width="110px" ref="vulnform" :rules="rules">
        <el-form-item label="风险名称" prop="vuln_type_name">
          <template >
            <el-input v-model="vulnform.vuln_type_name" auto-complete="off"></el-input>
          </template>
        </el-form-item>    
        <el-form-item label="风险编号" prop="vuln_type_keyword">
          <template >
            <el-input v-model="vulnform.vuln_type_keyword" auto-complete="off"></el-input>
          </template>
        </el-form-item>     
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetassetTypeForm('vulnform')" style="background:transparent">取 消</el-button>
        <el-button type="primary" @click="addvuln('vulnform')" :loading="addPending">确 定</el-button>
      </div>
    </el-dialog>
    </div>

</template>

<script>
import Panel from "@/components/panel";
import { fomatterTime, deepClone, formatTime, staticAssetPath } from "@/utils";
export default {
  components: {
    Panel
  },
  data() {
    const titlestruts = {
      "1": "资产区域添加",
      "2": "资产区域修改" 
    };
    const areatype = {
      "1": "资产区域添加",
      "2": "资产区域修改"
    };
    const vulntitlestruts = {
      "1": "风险类型添加",
      "2": "风险区域修改"
    };
    return {
      deleteAssetVisible: false,
      fomatterTime: fomatterTime,
      vulntitlestruts:vulntitlestruts,
      assetareaVisible: false,
      assettypeVisible:false,
      addPending:false,
      deleteassettypeVisible:false,
      deletevulnVisible:false, 
      vulnVisible:false,
      assetareaform: {
        area_name:''
      },
      assettypeform:{
          name:'',
          desc:''
      },
      vulnform:{
          vuln_type_name:'',
          vuln_type_keyword:''
      },
      titlestruts:titlestruts,
      areatype:areatype,
      state:1,
      stateassetType:1,
      areatypestate:1,
      vulnstate:1,
      assetData: [],
      ruleForm: {},
      rules: {},
      assetTypeData: [],
      vulnTypeData: [],
      workManage: {
        is_email: ""
      },
      vulnData: {
        vuln_vHigh: "",
        vuln_high: "",
        vuln_middle: "",
        vuln_low: "",
        vuln_vLow: ""
      },
      workData: {
        work_vHigh: "",
        work_high: "",
        work_middle: "",
        work_low: "",
        work_vLow: ""
      },
      assetAreaItem: [],
      formCopy:{},
      formassettypeCopy:{},
      assettypeItem:{},
      vulnItem:{},
      formvulnCopy:{}
    };
  },
  created() {
    this._getArea();
    this._assetsType();
    this._vulnTypeSearch();
    this._getDataDict();
  },
  methods: {
      //
    keepvuln(){
      this.$api.addVulnType(this.vulnData).then(res =>{
          if(res.data.reslut==0){
              this.$message('保存成功')
          }
      })
    },
      // 清空表单
    resetForm() {
      this.assetareaVisible = false;
      this.$refs.assetareaform.resetFields();
      setTimeout(() => {
        this.assetareaform = Object.assign({}, this.formCopy);
      }, 200);
    },
     // 清空表单
    resetassetTypeForm() {
      this.assettypeVisible = false;
      this.$refs.assettypeform.resetFields();
      setTimeout(() => {
        this.assettypeform = Object.assign({}, this.formassettypeCopy);
      }, 200);
    },
    // 清空表单
    resetvulnForm() {
      this.vulnVisible = false;
      this.$refs.vulnform.resetFields();
      setTimeout(() => {
        this.vulnform = Object.assign({}, this.formvulnCopy);
      }, 200);
    },
    _getArea(params) {
      this.$api.getArea(params).then(res => {
        let data = res.data.areas;
        this.assetData = data;
      });
    },
    _assetsType() {
      this.$api.assetsType().then(res => {
        let data = res.data.assetsType;
        this.assetTypeData = data;
      });
    },

    _vulnTypeSearch() {
      this.$api.vulnTypeSearch().then(res => {
        let data = res.data.vulns;
        this.vulnTypeData = data;
      });
    },
    _getDataDict() {
      this.$api.getDataDict().then(res => {
        let data = res.data.dataDict;
      });
    },
    // 选中删除项并且打开提示框
    deleteArea(row) {
      this.assetAreaItem = Object.assign({}, row);
      this.deleteAssetVisible = true;
    },
    deleteItem() {
      this.$api.deleteArea(this.assetAreaItem).then(res => {
        if (res.data.result == "0") {
          this.$message.success("删除成功");
          this.deleteAssetVisible = false;
          this._getArea();
        }
      });
    },
    // 选中资产类型删除项并且打开提示框
    deletevuln(row) {
      this.vulnItem = Object.assign({}, row);
      this.deletevulnVisible = true;
    },
    //资产类型删除
    deleteassettypeItem(){
        this.$api.deleteAssetsType(this.assettypeItem).then(res => {
        if (res.data.result == "0") {
          this.$message.success("删除成功");
          this.deleteassettypeVisible = false;
          this._assetsType();
        }
      });
    },
    // 选中风险删除项并且打开提示框
    deleteassettype(row) {
      this.assettypeItem = Object.assign({}, row);
      this.deleteassettypeVisible = true;
    },
    //风险类型删除
    deletevulnItem(){
        this.$api.deleteVulnType(this.vulnItem).then(res => {
        if (res.data.result == "0") {
          this.$message.success("删除成功");
          this.deletevulnVisible = false;
          this._vulnTypeSearch();
        }
      });
    },
    
    //添加资产区域弹框
    addAssetareas() {
      this.assetareaVisible = true;
      this.state = "1";
    },
    // 编辑资产区域弹框
    editArea(row) {     
      this.assetareaVisible = true;
      this.assetareaform = Object.assign({}, row);
      this.state = "2";
    },
    //添加资产类型
    addAssettypes(){
      this.assettypeVisible = true;
      this.assettypestate = "1";
    },   
    editassettype(row){
      this.assettypeVisible = true;
      this.assettypeform = Object.assign({}, row);
      this.stateassetType = "2";
    },
    //风险添加弹框
    addvulntype(){
      this.vulnVisible = true;
      this.vulnstate = "1";
    },
    // 编辑风险弹框
    editvuln(row) {     
      this.vulnVisible = true;
      this.vulnform = Object.assign({}, row);
      this.vulnstate = "2";
    },
    //风险添加修改 
    addvuln(params) {
      if (this.$refs.vulnform) {
        this.$refs.vulnform.validate(valid => {
          if (this.status === "check") {
          } else {
            if (valid) {
              if (this.vulnform.id) {
                this.$api.updateVulnType(this.vulnform).then(res => {
                  this.addPending = true;
                  if (res.data.result === 0) {
                    this.$message.success(`修改成功`);
                    this.addPending = false;
                    this.vulnVisible = false;
                    this._getArea(this.params);
                  } else {
                    this.$message.success(`修改失败`);
                    setTimeout(() => {
                      this.vulnVisible = false;
                    }, 500);
                    this.addPending = false;
                  }
                });
              } else {
                this.$api.addVulnType(this.vulnform).then(res => {
                    console.log('12')
                  this.addPending = true;
                  if (res.data.result === 0) {
                    this.$message.success(`添加成功`);
                    this.addPending = false;
                    this.vulnVisible = false;
                    this._vulnTypeSearch(this.params);
                  } else {
                    this.$message.success(`添加失败`);
                    setTimeout(() => {
                      this.vulnVisible = false;
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
    },
    addAssettype(params) {
      if (this.$refs.assettypeform) {
        this.$refs.assettypeform.validate(valid => {
          if (this.status === "check") {
            this.assettypeVisible = false;
          } else {
            if (valid) {
              if (this.assettypeform.id) {
                this.$api.updateAssetsType(this.assettypeform).then(res => {
                  this.addPending = true;
                  if (res.data.result === 0) {
                    this.$message.success(`修改成功`);
                    this.addPending = false;
                    this.assettypeVisible = false;
                    this._getArea(this.params);
                  } else {
                    this.$message.success(`修改失败`);
                    setTimeout(() => {
                      this.assettypeVisible = false;
                    }, 500);
                    this.addPending = false;
                  }
                });
              } else {
                this.$api.addAssetsType(this.assettypeform).then(res => {
                  this.addPending = true;
                  if (res.data.result === 0) {
                    this.$message.success(`添加成功`);
                    this.addPending = false;
                    this.assettypeVisible = false;
                    this._getArea(this.params);
                  } else {
                    this.$message.success(`添加失败`);
                    setTimeout(() => {
                      this.assettypeVisible = false;
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
    },
    // 添加资产
    addAssetarea(params) {
      if (this.$refs.assetareaform) {
        this.$refs.assetareaform.validate(valid => {
          if (this.status === "check") {
            this.assetareaVisible = false;
          } else {
            if (valid) {
              if (this.assetareaform.area_id) {
                this.$api.updateArea(this.assetareaform).then(res => {
                  this.addPending = true;
                  if (res.data.result === 0) {
                    this.$message.success(`修改成功`);
                    this.addPending = false;
                    this.assetareaVisible = false;
                    this._getArea(this.params);
                  } else {
                    this.$message.success(`修改失败`);
                    setTimeout(() => {
                      this.assetareaVisible = false;
                    }, 500);
                    this.addPending = false;
                  }
                });
              } else {
                this.$api.addArea(this.assetareaform).then(res => {
                  this.addPending = true;
                  if (res.data.result === 0) {
                    this.$message.success(`添加成功`);
                    this.addPending = false;
                    this.assetareaVisible = false;
                    this._getArea(this.params);
                  } else {
                    this.$message.success(`添加失败`);
                    setTimeout(() => {
                      this.assetareaVisible = false;
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

<style lang="scss" scoped>
.assetPort {
  display: flex;
  overflow: hidden;
  width: 100%;
  section {
    flex: 1;
    float: left;
    height: 350px;
  }
  section:nth-child(2) {
    margin-left: 20px;
  }
}
.vulnPort {
  display: flex;
  overflow: hidden;
  width: 100%;
  section {
    flex: 1;
    float: left;
    height: 350px;
  }
  section:nth-child(2) {
    margin-left: 20px;
  }
}
.workManage {
  display: flex;
  overflow: hidden;
  width: 100%;
  section {
    flex: 1;
    float: left;
    height: 350px;
  }
  section:nth-child(2) {
    margin-left: 20px;
  }
}
</style>
