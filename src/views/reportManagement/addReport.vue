<template>
    <div>
          <panel title='创建一项报告'>
           <div class="workAdd">
               <el-form ref="form" :model="form" label-width="110px" :rules="rules">
                       <el-form-item label="报告名称" prop="name">
                        <el-input v-model="form.name" ></el-input >                       
                    </el-form-item>
                    
                     <el-form-item label="任务ID" prop="workType">
                       <el-select v-model="form.workType" placeholder="请选择活动区域" style="width:100%">
                           <el-option  v-for="item in workTypeS"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                       </el-select>
                    </el-form-item>
                     <el-form-item label="模板" prop="detail" >
                        
                    </el-form-item>
                   
                     <el-form-item label="文件格式" prop="person">
                        <el-select v-model="form.workType" placeholder="请选择活动区域" style="width:100%">
                           <el-option  v-for="item in workTypeS"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                       </el-select>
                    </el-form-item>
                    <el-form-item label="所属部门">
                         <el-select v-model="form.workType" placeholder="请选择活动区域" style="width:100%">
                           <el-option  v-for="item in workTypeS"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                       </el-select>
                    </el-form-item>                     
                    <el-form-item style="margin:0 auto;width:50%">
                        <el-button type="primary" @click="keep('ruleForm')" >保存报告</el-button>
                        <el-button  type="primary" @click="submitForm('ruleForm')">保存并运行报告</el-button>
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
  created(){
    
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
