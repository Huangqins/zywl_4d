<template>
    <div>
      <panel :title="$route.params.status === 'edit'? '漏洞修改' : '漏洞添加'">
          <div>                 
            <el-form :model="form" label-width="115px" :rules="rules" ref="form" style="overflow:hidden;margin:0 auto;width:70%;padding-top:50px;">
              <el-form-item label="风险地址" prop="vuln_URL" style="float:left;width:50%;">                
                   <el-input  v-model="form.vuln_URL" v-if="this.pageInfo.status==='edit'"></el-input>     
                   <el-input  v-model="form.vuln_URL" v-else :disabled="true"></el-input>               
              </el-form-item>
              <el-form-item label="资产地址" prop="assets_id" style="float:left;width:50%;">                
                  <el-select v-model="form.assets_id" filterable placeholder="" style="width:100%" v-if="this.pageInfo.status==='edit'">
                    <el-option v-for="(item, index) in urlArr" :key="index + 'b'" :label="item.label" :value="item.value"></el-option>
                  </el-select>     
                  <el-select v-model="form.assets_id" filterable placeholder="" style="width:100%" v-else :disabled="true">
                    <el-option v-for="(item, index) in urlArr" :key="index + 'b'" :label="item.label" :value="item.value"></el-option>
                  </el-select>       
              </el-form-item>
              <el-form-item label="风险名称" prop="vuln_name" style="float:left;width:50%;">                
                   <el-input  v-model="form.vuln_name" v-if="this.pageInfo.status==='edit'"></el-input> 
                    <el-input  v-model="form.vuln_name" v-else :disabled="true"></el-input>                 
              </el-form-item>
              <el-form-item label="风险级别" prop="vuln_level" style="float:left;width:50%;">  
                   <el-select v-model="form.vuln_level" placeholder="请选择风险等级" style="width:100%;" v-if="this.pageInfo.status==='edit'" :style="{color: vulncolor[form.kb_vuln_level]}" >
                    <el-option label="极低风险" value="0" style="color: #46A5C0;"></el-option>
                    <el-option label="低风险" value="1" style="color: #51B323;"></el-option>
                    <el-option label="中风险" value="2" style="color: #E2B928;"></el-option>
                    <el-option label="高风险" value="3" style="color: #DD7C35;"></el-option>
                    <el-option label="极高风险" value="4" style="color: red;"></el-option>
                  </el-select>      
                  <el-select v-model="form.vuln_level" placeholder="请选择风险等级" v-else :disabled="true"  style="width:100%;" :style="{color: vulncolor[form.kb_vuln_level]}" >
                    <el-option label="极低风险" value="0" style="color: #46A5C0;"></el-option>
                    <el-option label="低风险" value="1" style="color: #51B323;"></el-option>
                    <el-option label="中风险" value="2" style="color: #E2B928;"></el-option>
                    <el-option label="高风险" value="3" style="color: #DD7C35;"></el-option>
                    <el-option label="极高风险" value="4" style="color: red;"></el-option>
                  </el-select>               
              </el-form-item>
              <el-form-item label="风险类型" prop="vuln_type" style="float:left;width:50%;">          
                    <el-select v-model="form.vuln_type" placeholder="" style="width:100%" v-if="this.pageInfo.status==='edit'">
                      <el-option v-for="(item, index) in vulnType" :key="index + 'd'" :label="item.label" :value="item.value"></el-option>
                    </el-select>  
                    <el-select v-model="form.vuln_type" placeholder="" style="width:100%" v-else :disabled="true">
                      <el-option v-for="(item, index) in vulnType" :key="index + 'd'" :label="item.label" :value="item.value"></el-option>
                    </el-select>              
              </el-form-item>
              <el-form-item label="风险分类" prop="vuln_class" style="float:left;width:50%;">       
                   <el-select v-model="form.vuln_class" placeholder="" style="width:100%" v-if="this.pageInfo.status==='edit'">
                      <el-option v-for="(item, index) in vulnClass" :key="index + 'd'" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-select v-model="form.vuln_class" placeholder="" style="width:100%" v-else :disabled="true">
                      <el-option v-for="(item, index) in vulnClass" :key="index + 'd'" :label="item.label" :value="item.value"></el-option>
                    </el-select>                              
              </el-form-item>
              <el-form-item label="CVE/CNVN编码" prop="vuln_cnvd" style="float:left;width:50%;">                 
                   <el-input auto-complete="off" v-model="form.vuln_cnvd" v-if="this.pageInfo.status==='edit'"></el-input>
                   <el-input auto-complete="off" v-model="form.vuln_cnvd" v-else :disabled="true"></el-input>                  
              </el-form-item>
              
              <el-form-item label="风险端口" prop="vuln_port" style="float:left;width:50%;">               
                   <el-input auto-complete="off" v-model="form.vuln_port" v-if="this.pageInfo.status==='edit'"></el-input> 
                   <el-input auto-complete="off" v-model="form.vuln_port" v-else :disabled="true"></el-input>               
              </el-form-item>

              <el-form-item label="利用工具" prop="vuln_tool" style="float:left;width:50%;" >                 
                   <el-input type="textarea" auto-complete="off" v-model="form.vuln_tool" v-if="this.pageInfo.status==='edit'"></el-input> 
                    <el-input type="textarea" auto-complete="off" v-model="form.vuln_tool" v-else :disabled="true"></el-input>                
              </el-form-item>
              <el-form-item label="攻击方法" prop="vuln_atme" style="float:left;width:50%;">                 
                   <el-input type="textarea" auto-complete="off" v-model="form.vuln_atme" v-if="this.pageInfo.status==='edit'"></el-input>   
                   <el-input type="textarea" auto-complete="off" v-model="form.vuln_atme" v-else :disabled="true"></el-input>             

              </el-form-item>
              <el-form-item label="验证手段" prop="vuln_veme" style="float:left;width:50%;">                
                   <el-input type="textarea" auto-complete="off" v-model="form.vuln_veme" v-if="this.pageInfo.status==='edit'"></el-input>   
                   <el-input type="textarea" auto-complete="off" v-model="form.vuln_veme" v-else :disabled="true"></el-input>               

              </el-form-item>
              <el-form-item label="攻击Payod" prop="vuln_payload" style="float:left;width:50%;">                 
                   <el-input type="textarea" auto-complete="off" v-model="form.vuln_payload" v-if="this.pageInfo.status==='edit'"></el-input>                  
                   <el-input type="textarea" auto-complete="off" v-model="form.vuln_payload" v-else :disabled="true"></el-input>
              </el-form-item>             

              <el-form-item label="风险描述" prop="vuln_des" style="float:left;width:50%;">                
                   <el-input type="textarea" auto-complete="off" v-model="form.vuln_des" v-if="this.pageInfo.status==='edit'"></el-input>  
                   <el-input type="textarea" auto-complete="off" v-model="form.vuln_des" v-else :disabled="true"></el-input>              
              </el-form-item>
              <el-form-item label="修复方案" prop="vuln_anly" style="float:left;width:50%;">                
                   <el-input type="textarea" auto-complete="off" v-model="form.vuln_anly" v-if="this.pageInfo.status==='edit'"></el-input>      
                   <el-input type="textarea" auto-complete="off" v-model="form.vuln_anly" v-else :disabled="true"></el-input>            
              </el-form-item>
               <el-form-item style="float:left;margin-left:42%">
                <template v-if="this.pageInfo.status === 'edit'">
                  <el-button type="primary" @click="resetForm('form')" >取消</el-button>
                  <el-button @click="addkb('form')">保存</el-button>
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
    Panel
  },
  data() {
    const levelSchema = {
  "4": "极高风险",
  "3": "高风险",
  "2": "中风险",
  "1": "极低风险",
  "0": "无风险"
};
const vulncolor = {
  "4": "red",
  "3": "rgb(221, 124, 53)",
  "2": "rgb(226, 185, 40)",
  "1": "rgb(81, 179, 35)",
  "0": "rgb(70, 165, 192)"
};
    return {
      vulncolor:vulncolor,
      levelSchema:levelSchema,
      titlestruts:titlestruts,
      state:0,
      status: "edit",
      urlArr:[],
      form: {
        vuln_url:'',
        assets_id:'',
        vuln_name: "",
        vuln_cnvd: "",
        vuln_level: "",
        vuln_port: "",
        vuln_tool: "",
        vuln_atme: "",
        vuln_veme: "",
        vuln_payload: "",
        vuln_type_name: "",
        vuln_class: "",
        vuln_des: "",
        vuln_anly: "",
        vuln_id: ""
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
    console.log(this.pageInfo)
    this.form=this.pageInfo;
    this.getVulnType();
    this.getAssetURL()
  },
  methods: {
    backpage(){
      this.$router.push('holeInfo')    
    },
    // 清空表单
    resetForm(formName) {
      // this.form = Object.assign({}, this.formCopy);
    },
    async getAssetURL() {
      let res = await this.$api.getAssetURL();
      if (res.data.result === 0) {
        let list = res.data.lists;
        list.forEach(item => {
          this.urlArr.push({
            value: item.assets_id,
            label: !item.assets_url ? item.assets_ip : item.assets_url + (!item.assets_ip ? '' : '--' + item.assets_ip)
          });
        });
      }
    },
    getVulnType(){
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
    //知识库添加
    addkb(form) {
      this.$refs[form].validate((valid) => {
        if(valid===false){
        //  this.$message('请填写带星号的项')
        }else{
            if (this.form.vuln_id) {
        this.$api.updateVulnInfo(this.form).then(res => {
          if (res.data.result === 0) {
            this.$message.success(`修改成功`);
            this.$router.push('holeInfo')
          } else {
            this.$message.error(`修改失败`);
          }
        });
      } else {       
        this.$api.addInfoVuln(this.form).then(res => {
          if (res.data.result == 0) {
            this.$message.success(`添加成功`);
            this.$router.push('holeInfo')
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
<style lang="scss" scoped>

</style>
