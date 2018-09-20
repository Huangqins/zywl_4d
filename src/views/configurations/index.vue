<template>
    <div>
       <div>
          <panel title="用户认证配置">
            <div>
                <el-form :model="userA" ref="userA" label-width="135px" class="form" >
                    <div style="overflow:hidden">
                        <el-form-item label="最小密码长度" prop="min_length" style="width:40%;float:left">
                            <el-input v-model="userA.min_length"></el-input>
                        </el-form-item>
                        <el-form-item label="最大密码长度" prop="max_length" style="width:40%;float:right">
                            <el-input v-model="userA.max_length"></el-input>
                        </el-form-item>
                    </div>
                                               
                <el-form-item label="密码复杂度" prop="complex" style="width:100%;">
                    <el-checkbox v-model="userA.complex">启用</el-checkbox>
                </el-form-item>
                 <div style="overflow:hidden">
                       <el-form-item label="小写字母" prop="lowercase" style="width:40%;float:left">
                            <el-input v-model="userA.lowercase"></el-input>
                        </el-form-item>
                        <el-form-item label="大写字母" prop="capital" style="width:40%;float:right">
                            <el-input v-model="userA.capital"></el-input>
                        </el-form-item>
                        <el-form-item label="数字" prop="number" style="width:40%;float:left">
                            <el-input v-model="userA.number"></el-input>
                        </el-form-item>
                        <el-form-item label="特殊字符" prop="special_char" style="width:40%;float:right">
                            <el-input v-model="userA.special_char"></el-input>
                        </el-form-item>                        
                 </div>
                 <el-form-item label="可用的特殊字符" prop="name" style="width:100%"> 
                            <el-input v-model="userA.name"></el-input>
                 </el-form-item>
                  <el-form-item label="密码周期" prop="cycle" style="width:100%;">
                            <el-checkbox v-model="userA.cycle">启用</el-checkbox>
                     </el-form-item>
                 <div style="overflow:hidden">                    
                        <el-form-item label="密码有效期(天)" prop="term" style="width:40%;float:right">
                            <el-input v-model="userA.term"></el-input>
                        </el-form-item>
                        <el-form-item label="预期提醒时间(天)" prop="remind" style="width:40%;float:left">
                            <el-input v-model="userA.remind"></el-input>
                        </el-form-item>                       
                 </div>
                   <el-form-item label="逾期处理方式" prop="name" >
                            <el-select v-model="userA.handle" filterable placeholder="请选择" style="width:100%;">
                                <el-option
                                v-for="item in handleS"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                    </el-form-item> 
                    <div style="overflow:hidden">                    
                        <el-form-item label="历史对比" prop="name" style="width:40%;float:left">
                             <el-checkbox v-model="userA.checked">启用</el-checkbox>
                        </el-form-item>
                         <el-form-item label="密码不得重复" prop="name" style="width:40%;float:right">
                            <el-input v-model="userA.name"></el-input>
                        </el-form-item>                       
                    </div>
                    <div style="overflow:hidden">                    
                      <el-form-item label="登录锁定" prop="name" style="width:40%;float:left">
                             <el-checkbox v-model="checked">启用</el-checkbox>
                        </el-form-item> 
                        <el-form-item label="允许密码错误(次)" prop="error_number" style="width:40%;float:right">
                            <el-input v-model="userA.error_number"></el-input>
                        </el-form-item>                       
                    </div>
                    <div style="overflow:hidden">                    
                        <el-form-item label="自动解锁" prop="unlock" style="width:40%;float:left">
                             <el-checkbox v-model="userA.unlock">启用</el-checkbox>
                        </el-form-item>
                       <el-form-item label="解锁时间限制(分钟)" prop="name" style="width:40%;float:right">
                            <el-input v-model="userA.name"></el-input>
                        </el-form-item>                    
                    </div>
                    

                <el-form-item style="width:50%;margin:0 auto;">
                    <el-button type="primary"  style="margin-right:20px;" @clik='userAsubmit()'>保存</el-button>
                    <el-button type="primary" >重置</el-button>
                </el-form-item>
                </el-form>
            </div>
          </panel>
       </div>
       <div>
           <panel title="邮件配置">
               <div>
                   <el-form :model="Mailconfig" ref="Mailconfig" label-width="100px" class="form">
                        <el-form-item label="邮箱用户名称" prop="mail_username">
                            <el-input v-model="Mailconfig.mail_username"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱密码" prop="mail_password">
                            <el-input v-model="Mailconfig.mail_password"></el-input>
                        </el-form-item>
                        <el-form-item label="邮件地址" prop="name">
                            <el-input v-model="Mailconfig.name"></el-input>
                        </el-form-item>
                        <el-form-item label="邮件服务器" prop="mail_host">
                            <el-input v-model="Mailconfig.mail_host"></el-input>
                        </el-form-item>                        
                        <el-form-item label="邮件服务器端口" prop="mail_port">
                            <el-input v-model="Mailconfig.mail_port"></el-input>
                        </el-form-item>
                        <el-form-item label="是否支持SSL" prop="is_ssl">
                           <el-radio v-model="Mailconfig.is_ssl" label="1">是</el-radio>
                           <el-radio v-model="Mailconfig.is_ssl" label="2">否</el-radio>
                        </el-form-item>
                       <el-form-item style="width:50%;margin:0 auto;">
                           <el-button type="primary"  style="margin-right:20px;">邮件测试</el-button>
                            <el-button type="primary"  style="margin-right:20px;">保存</el-button>
                            <el-button type="primary" >重置</el-button>
                       </el-form-item>
                    </el-form>
               </div>
          </panel>
       </div>
       <div>
           <panel title="系统参数配置">
            <div >
                <el-form :model="configuration"  ref="configuration" label-width="155px" class="form">
                    <el-form-item label="开启登陆验证" prop="isCode">
                           <el-radio v-model="configuration.isCode" label="1">是</el-radio>
                           <el-radio v-model="configuration.isCode" label="2">否</el-radio>
                    </el-form-item>
                    <el-form-item label="首次登陆是否修改密码" prop="isUpdate">
                           <el-radio v-model="configuration.isUpdate" label="1">是</el-radio>
                           <el-radio v-model="configuration.isUpdate" label="2">否</el-radio>
                    </el-form-item>
                     <el-form-item label="会话超时时间(分钟)" prop="sessionTimeOut" >
                            <el-input v-model="configuration.sessionTimeOut"></el-input>
                        </el-form-item>  
                   <el-form-item style="width:50%;margin:0 auto;">
                            <el-button type="primary"  style="margin-right:20px;">保存</el-button>
                            <el-button type="primary" >重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
          </panel>
       </div>
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
        user: "",
        region: "",
        value8: "",
        options: [],
        userA: {
          min_length: "",
          max_length: "",
          complex: "",
          lowercase: "",
          capital: "",
          number: "",
          cycle: "",
          term: "",
          remind: "",
          handle: "",
          error_number: ""
        },
        handleS:[],
        Mailconfig: {
          mail_username: "",
          mail_password: "",
          mail_host: "",
          mail_port: "",
          is_ssl: 1
        },
        configuration: {
          isCode: 1,
          isUpdate: 1,
          sessionTimeOut: ""
        }
      }   
  },
  created(){
       this.getUserConfig()
  },
  methods:{
      getUserConfig(){
          this.$api.getUserConfig().then(res =>{
            let data=res.data.userConfig;
            this.userA=data;
          })
      },
    userAsubmit(){
        
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  padding: 20px 60px;
}
</style>
