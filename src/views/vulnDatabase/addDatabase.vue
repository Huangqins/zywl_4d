<template>
    <div>
      <panel >
          <div>                 
            <el-form :model="form" label-width="115px" :rules="rules" ref="form" style="overflow:hidden;margin:0 auto;width:70%;padding-top:50px;">
              <el-form-item label="风险名称" prop="kb_vuln_name" style="float:left;width:50%;">                
                  <el-input  v-model="form.kb_vuln_name" v-if="this.kbdata.status === 'edit'"></el-input> 
                  <el-input  v-model="form.kb_vuln_name" v-else :disabled=true></el-input>                                 
              </el-form-item>
              <el-form-item label="风险级别" prop="kb_vuln_level" style="float:left;width:50%;">  
                   <el-select v-model="form.kb_vuln_level" placeholder="请选择风险等级" style="width:100%" v-if="this.kbdata.status === 'edit'">
                    <el-option label="极低风险" value="0"></el-option>
                    <el-option label="低风险" value="1"></el-option>
                    <el-option label="中风险" value="2"></el-option>
                    <el-option label="高风险" value="3"></el-option>
                    <el-option label="极高风险" value="4"></el-option>
                  </el-select>  
                   <el-select v-model="form.kb_vuln_level" placeholder="请选择风险等级" style="width:100%" v-else :disabled=true>
                    <el-option label="极低风险" value="0"></el-option>
                    <el-option label="低风险" value="1"></el-option>
                    <el-option label="中风险" value="2"></el-option>
                    <el-option label="高风险" value="3"></el-option>
                    <el-option label="极高风险" value="4"></el-option>
                  </el-select>              
              </el-form-item>
              <el-form-item label="风险类型" prop="kb_vuln_type" style="float:left;width:50%;">         
                    <el-select v-model="form.kb_vuln_type" placeholder="" style="width:100%" v-if="this.kbdata.status === 'edit'">
                      <el-option v-for="(item, index) in vulnType" :key="index + 'd'" :label="item.label" :value="item.value"></el-option>
                    </el-select>   
                    <el-select v-model="form.kb_vuln_type" placeholder="" style="width:100%" v-else :disabled=true>
                      <el-option v-for="(item, index) in vulnType" :key="index + 'd'" :label="item.label" :value="item.value"></el-option>
                    </el-select>               
              </el-form-item>
              <el-form-item label="风险分类" prop="kb_vuln_class" style="float:left;width:50%;">     
                    <el-select v-model="form.kb_vuln_class" placeholder="" style="width:100%" v-if="this.kbdata.status === 'edit'">
                      <el-option v-for="(item, index) in vulnClass" :key="index + 'd'" :label="item.label" :value="item.value"></el-option>
                    </el-select>  
                    <el-select v-model="form.kb_vuln_class" placeholder="" style="width:100%" v-else :disabled=true>
                      <el-option v-for="(item, index) in vulnClass" :key="index + 'd'" :label="item.label" :value="item.value"></el-option>
                    </el-select>                             
              </el-form-item>
              <el-form-item label="CVE/CNVD编码" prop="kb_vuln_cve" style="float:left;width:50%;">                 
                  <el-input auto-complete="off" v-model="form.kb_vuln_cve" v-if="this.kbdata.status === 'edit'"></el-input>   
                  <el-input auto-complete="off" v-model="form.kb_vuln_cve" v-else :disabled=true></el-input>                 
              </el-form-item>
              
              <el-form-item label="风险端口" prop="kb_vuln_port" style="float:left;width:50%;">               
                   <el-input auto-complete="off" v-model="form.kb_vuln_port" v-if="this.kbdata.status === 'edit'"></el-input>  
                   <el-input auto-complete="off" v-model="form.kb_vuln_port" v-else :disabled=true></el-input>              
              </el-form-item>

              <el-form-item label="利用工具" prop="kb_vuln_tool" style="float:left;width:50%;" >                 
                   <el-input type="textarea" auto-complete="off" v-model="form.kb_vuln_tool" v-if="this.kbdata.status === 'edit'"></el-input>  
                   <el-input type="textarea" auto-complete="off" v-model="form.kb_vuln_tool" v-else :disabled=true></el-input>               
              </el-form-item>
              <el-form-item label="攻击方法" prop="kb_vuln_atme" style="float:left;width:50%;">                 
                   <el-input type="textarea" auto-complete="off" v-model="form.kb_vuln_atme" v-if="this.kbdata.status === 'edit'"></el-input>  
                   <el-input type="textarea" auto-complete="off" v-model="form.kb_vuln_atme" v-else :disabled=true></el-input>            

              </el-form-item>
              <el-form-item label="验证手段" prop="kb_vuln_veme" style="float:left;width:50%;">                
                   <el-input type="textarea" auto-complete="off" v-model="form.kb_vuln_veme" v-if="this.kbdata.status === 'edit'"></el-input> 
                   <el-input type="textarea" auto-complete="off" v-model="form.kb_vuln_veme" v-else :disabled=true></el-input>                  

              </el-form-item>
              <el-form-item label="攻击Payod" prop="kb_vuln_payload" style="float:left;width:50%;">                 
                   <el-input type="textarea" auto-complete="off" v-model="form.kb_vuln_payload" v-if="this.kbdata.status === 'edit'"></el-input>     
                   <el-input type="textarea" auto-complete="off" v-model="form.kb_vuln_payload" v-else :disabled=true></el-input>             
                    
              </el-form-item>             

              <el-form-item label="风险描述" prop="kb_vuln_des" style="float:left;width:50%;">                
                   <el-input type="textarea" auto-complete="off" v-model="form.kb_vuln_des" v-if="this.kbdata.status === 'edit'"></el-input>
                   <el-input type="textarea" auto-complete="off" v-model="form.kb_vuln_des" v-else :disabled=true></el-input>                
              </el-form-item>
              <el-form-item label="修复方案" prop="kb_vuln_ref" style="float:left;width:50%;">                
                   <el-input type="textarea" auto-complete="off" v-model="form.kb_vuln_ref" v-if="this.kbdata.status === 'edit'"></el-input>   
                   <el-input type="textarea" auto-complete="off" v-model="form.kb_vuln_ref" v-else :disabled=true></el-input>                 
              </el-form-item>
               <el-form-item style="float:left;margin-left:42%" >
                 <template v-if="this.kbdata.status === 'edit'">
                   <el-button type="primary" @click="resetForm('form')" >取消</el-button>
                   <el-button @click="addkbaubmit('form')">保存</el-button>
                 </template>
                 <template v-else >
                   <el-button type="primary"  @click="backpage">返回上一页</el-button>                   
                 </template>
                
               </el-form-item>
            </el-form>
          </div>
      </panel>
    </div>
</template>
<script>
import Panel from "@/components/panel";
import route from 'mixins/route';
const titlestruts={
  '0':'漏洞录入',
  '1':'修改漏洞'
}

export default {
  mixins:[route],
  components: {
    Panel,
    route
  },
  data() {
    return {
      titlestruts:titlestruts,
      state:0,
      status: "edit",
      form: {
        kb_vuln_name: "",
        kb_vuln_cve: "",
        kb_vuln_level: "",
        kb_vuln_port: "",
        kb_vuln_tool: "",
        kb_vuln_atme: "",
        kb_vuln_veme: "",
        kb_vuln_payload: "",
        vuln_type_name: "",
        kb_vuln_class: "",
        kb_vuln_des: "",
        kb_vuln_ref: "",
        kb_vuln_id: ""
      },
      vulnType:[],
      vulnClass:[
        {
          value:'0',
          label:'主机漏洞'
        },
        {
          value:'1',
          label:'web漏洞'
        },
        {
          value:'2',
          label:'业务风险'
        }
      ],
      kbdata:{},
      rules:{
        kb_vuln_name:[
           { required: true, message: '请输入风险名称', trigger: 'blur' },
        ],
        kb_vuln_level:[
          { required: true, message: '请选择风险等级', trigger: 'change' }       
            
        ],
        kb_vuln_anly:[
           { required: true, message: '请输入修复方案', trigger: 'blur' },
        ],
        kb_vuln_des:[
          { required: true, message: '请输入风险描述', trigger: 'blur' },
        ]
      }
    };
  },
  created(){
    this.kbdata=this.pageInfo;
    if(this.kbdata.status === "detail"){
        this.form=this.kbdata.row;
    }else{
      this.form=this.kbdata;
    }    
    this.getKbVulnType()
  },
  methods: {
    backpage(){
      this.$router.push('vulnDatabase')
    },
    // 清空表单
    resetForm(formName) {
      // this.form = Object.assign({}, this.formCopy);
    },
    getKbVulnType(){
     this.$api.vulnType({}).then(res =>{       
       if (res.data.result === 0) {
        this.vulnType = res.data.vulns.map(item => {
          return {
            value: item.vuln_type,
            label: item.vuln_name
          };
        });
      }
     })
    },
    //漏洞库添加
    addkbaubmit(form) {
      this.$refs[form].validate((valid) => {
        if(valid===false){
        //  this.$message('请填写带星号的项')
        }else{
            if (this.form.kb_vuln_id) {
        this.$api.updateKb(this.form).then(res => {
          if (res.data.result === 0) {
            this.$message.success(`修改成功`);
            this.$router.push('vulnDatabase')
          } else {
            this.$message.error(`修改失败`);
          }
        });
      } else {       
        this.$api.addKb(this.form).then(res => {
          if (res.data.result === 0) {
            this.$message.success(`添加成功`);
            this.$router.push('vulnDatabase')
          } else {
            this.$message.error(`添加失败`);
          }
        });
      }
        }
      })
      
    },
  }
};
</script>
<style scoped lang="scss">

</style>
