<template>
    <div>
          <panel title='新建[漏洞整改]审批工单'>
           <div class="workAdd">
               <el-form ref="form" :model="form" label-width="110px" :rules="rules">
                       <el-form-item label="工单名称" prop="name">
                        <el-input v-model="form.name" ></el-input >                       
                    </el-form-item>
                    
                     <el-form-item label="工单类型" prop="workType">
                       <el-select v-model="form.workType" placeholder="请选择活动区域" style="width:100%">
                           <el-option  v-for="item in workTypeS"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                       </el-select>
                    </el-form-item>
                     <el-form-item label="工单内容" prop="detail" >
                        <el-input v-model="form.detail" placeholder="请选择任务名称"></el-input>
                    </el-form-item>
                    <el-form-item label="漏洞列表" prop="vuln">
                     <!-- <el-select
                        v-model="form.value11"
                        multiple
                        collapse-tags
                        style="width:100%"
                        placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select> -->
                        <el-table :data="tableData" style="width: 100%;"  v-loading="tableLoading" @select='select'>
                            <el-table-column type="selection" width="35"></el-table-column>
                            <el-table-column prop="assets_name" label="漏洞名称" align="center" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="assets_name" label="漏洞链接" align="center" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="assets_name" label="漏洞IP" align="center" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="assets_name" label="漏洞等级" align="center" :show-overflow-tooltip="true"></el-table-column>
                        </el-table> 
                    </el-form-item>
                     <el-form-item label="创建人" prop="person">
                        <el-input v-model="form.person"></el-input>
                    </el-form-item>
                    <el-form-item label="审核人" prop="person">
                        <el-input v-model="form.person"></el-input>
                    </el-form-item>
                     <el-form-item label="工单紧急程度" prop="workType">
                       <el-select v-model="form.workType" style="width:100%">
                           <el-option  v-for="item in workTypeS"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                       </el-select>
                    </el-form-item>
                    <el-form-item style="margin:0 auto;width:50%">
                        <el-button  @click="keep('ruleForm')" >保存</el-button>
                        <el-button  type="primary" @click="submitForm('ruleForm')">确认并提交</el-button>
                     </el-form-item>
                </el-form>
           </div>
          </panel>
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
      form: {
        name: "",
        workType: "",
        detail: "",
        person: "",
        value11:''
      },
      tableLoading:false,
      tableData:[],
      selectData:[],
      options: [
          {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      workTypeS: [],
      rules: {
        vuln:[
            { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        name: [
          { required: true, message: "请输入工单名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        workType: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        person: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        detail: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  methods: {
      select(sel,row){
        this.selectData=sel.map(item => (item.vuln_id))
        }, 
    keep() {},
    submitForm() {}
  }
};
</script>
<style lang="scss" scoped>
.workAdd {
  padding: 20px;
  width: 50%;
  margin: 0 auto;
}
</style>
