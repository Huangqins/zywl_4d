<template>
    <div>
          <panel title='创建一项报告'>
           <div class="workAdd">
               <el-form ref="form" :model="form" label-width="110px" :rules="rules" style="height: -webkit-fill-available;">
                       <el-form-item label="报告名称" prop="reports_name">
                        <el-input v-model="form.reports_name" ></el-input >                       
                    </el-form-item>                    
                     <el-form-item label="任务ID" prop="target_id">
                       <el-select v-model="form.target_id" placeholder="请选择任务" style="width:100%">
                           <el-option  v-for="(item,index) in tasknameS"
                            :key="index+'1'"
                            :label="item.label"
                            :value="item.value"></el-option>
                       </el-select>
                    </el-form-item>
                     <el-form-item label="模板" prop="detail" >  
                        <div class="reportModel">
                          <ul><li v-for="(item,index) in reportModelPic" :key="index+'1'">
                            <p style="padding:0 5px;background:#4B5B75;height:20px;margin:0;text-align:right;">
                               <el-checkbox-group v-model="form.model">
                                    <el-checkbox :label="item">1</el-checkbox>                                                                    
                                </el-checkbox-group>
                            </p>
                               <img :src="item" @load="imgLoad" style="width:100%;height:100%"/>
                            </li>
                            </ul>
                        </div>                      
                    </el-form-item>                   
                     <el-form-item label="文件格式" prop="person">
                        <el-select v-model="form.textType" placeholder="请选择文件格式" style="width:100%">
                           <el-option  v-for="item in textTypeS"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                       </el-select>
                    </el-form-item>
                    <el-form-item label="所属部门">
                         <el-input v-model="form.dept_name" ></el-input >   
                    </el-form-item>                     
                    <el-form-item style="margin:0 auto;width:50%">
                        <el-button  type="primary" @click="resit(form)">重置</el-button>
                        <el-button type="primary" @click="keep(form)" >保存报告</el-button>                       
                     </el-form-item>
                </el-form>
           </div>
          </panel>
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
    return {
      form: {
        reports_name: "",
        target_id:'',
        textType: "",
        dept_name: "",
        model:[]
      },
      textTypeS:[
        {
          value: 'pdf',
          label: 'PDF'
        }, {
          value: 'word',
          label: 'WORD'
        }
      ],
      tasknameS:[],
      reportModelPic:[],
      tableLoading:false,
      tableData:[],
      rules: {
        reports_name: [
          { required: true, message: "请输入报告名称", trigger: "blur" }
        ],
        target_id: [
          { required: true, message: "请选择任务", trigger: "change" }
        ],
        textType: [
          {
            required: true,
            message: "请至少选择一个文件格式",
            trigger: "change"
          }
        ]
      }
    };
  },
  created(){
    this.taskname();
    this.reportmodel();
    this.formCopy = deepClone(this.form);
  },
  methods: {
    resit(){
      this.$refs.form.resetFields();
      setTimeout(() => {
        this.form = Object.assign({}, this.formCopy);
      }, 200);
    //  console.log(data)
    },
    taskname(){
      this.$api.taskname().then(res=>{
        let data=res.data.targets;
        this.tasknameS = data.map(item =>{
          return{
            label:item.target_name,
            value:item.target_id
          }
        })
      })
    },
    //模板
    reportmodel(){
      this.$api.reportModel().then(res =>{
        let data=res.data.reports
        this.reportModelPic = data.map(item => {
          return  location.origin + '/ZR/model/' +  item
        });
        // this.$api.getImg('model_1.png').then(res => {
        //   console.log(res)
        // })

      })
    },
    imgLoad() {

    },
    keep() {  
      this.form.model=this.form.model.map(item =>{
        return item.slice(-5,-4)
        
      }).join(',')   
      let data={
         reports_name:this.form.reports_name,
         target_id:[this.form.target_id],
         dept_name:this.form.dept_name,
         model:this.form.model
      }
     if(this.form.textType == "pdf"){       
       this.$api.exportPDFFile(data).then(res =>{
        if(res.data.result == '0'){
           this.$message.success(`保存成功`)
        }
       })
     }else if(this.form.textType == "word"){
       this.$api.exportWord(data).then(res =>{
        if(res.data.result == '0'){
            this.$message.success(`保存成功`)
        }
       })
       
     }
    },
    submitForm() {
      let data={
         reports_name:this.form.reports_name,
         target_id:[this.form.target_id],
         dept_name:this.form.dept_name
      }
     if(this.form.textType == "pdf"){       
       this.$api.exportPDFFile(data).then(res =>{
        
       })
     }else if(this.form.textType == "word"){
       this.$api.exportWord(data).then(res =>{
        
       })
       
     }
    }
  }
};
</script>
<style lang="scss" scoped>
.workAdd {
  padding: 20px;
  width: 50%;
  margin: 0 auto;
}
.reportModel{
  width: 100%;
  display: flex;
  height: 150px;  
  ul{
    width:100%;
    li{
     flex: 1;
     width:22%;
     margin-right:10px;
     height: 100%;
    }
  }
   
}
</style>
