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
                <div style="overflow:hidden;" v-if="userA.complex == true">
                        <el-form-item label="小写字母" prop="lowercase" style="width:40%;float:left" >
                            <el-checkbox  v-model="userA.lowercase"></el-checkbox >
                        </el-form-item>
                        <el-form-item label="大写字母" prop="capital" style="width:40%;float:right">
                            <el-checkbox  v-model="userA.capital"></el-checkbox >
                        </el-form-item>
                        <el-form-item label="数字" prop="number" style="width:40%;float:left">
                            <el-checkbox  v-model="userA.number"></el-checkbox >
                        </el-form-item>
                        <el-form-item label="特殊字符" prop="special_char" style="width:40%;float:right">
                            <el-checkbox  v-model="userA.special_char"></el-checkbox >
                        </el-form-item>                        
                 </div>
                 <div style="overflow:hidden;display:none" v-else-if="userA.complex !== true">
                        <el-form-item label="小写字母" prop="lowercase" style="width:40%;float:left" >
                            <el-checkbox  v-model="userA.lowercase"></el-checkbox >
                        </el-form-item>
                        <el-form-item label="大写字母" prop="capital" style="width:40%;float:right">
                            <el-checkbox  v-model="userA.capital"></el-checkbox >
                        </el-form-item>
                        <el-form-item label="数字" prop="number" style="width:40%;float:left">
                            <el-checkbox  v-model="userA.number"></el-checkbox >
                        </el-form-item>
                        <el-form-item label="特殊字符" prop="special_char" style="width:40%;float:right">
                            <el-checkbox  v-model="userA.special_char"></el-checkbox >
                        </el-form-item>                        
                 </div>
              
                     <el-form-item label="可用的特殊字符" prop="specialchar" style="width:100%"> 
                      <el-input v-model="userA.specialchar" v-if="userA.special_char !== true " :disabled="true"></el-input>
                      <el-input v-model="userA.specialchar" v-else-if="userA.special_char == true " :disabled="false"></el-input>
                      </el-form-item>
                             
                    <el-form-item label="密码周期" prop="cycle" style="width:100%;">
                            <el-checkbox v-model="userA.cycle">启用</el-checkbox>
                    </el-form-item>
                    <div v-if="userA.cycle !== true" style="display:none">
                        <div style="overflow:hidden">                    
                            <el-form-item label="密码有效期(天)" prop="term" style="width:40%;float:right">
                                <el-input v-model="userA.term"></el-input>
                            </el-form-item>
                            <el-form-item label="预期提醒时间(天)" prop="remind" style="width:40%;float:left">
                                <el-input v-model="userA.remind"></el-input>
                            </el-form-item>                       
                        </div>
                        <el-form-item label="逾期处理方式" prop="handle" >
                                    <el-select v-model="userA.handle" filterable placeholder="请选择" style="width:100%;">
                                        <el-option
                                        v-for="item in handleS"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                        </el-form-item> 
                    </div>
                    <div v-else-if="userA.cycle == true">
                        <div style="overflow:hidden">                    
                            <el-form-item label="密码有效期(天)" prop="term" style="width:40%;float:right">
                                <el-input v-model="userA.term"></el-input>
                            </el-form-item>
                            <el-form-item label="预期提醒时间(天)" prop="remind" style="width:40%;float:left">
                                <el-input v-model="userA.remind"></el-input>
                            </el-form-item>                       
                        </div>
                        <el-form-item label="逾期处理方式" prop="handle" >
                                    <el-select v-model="userA.handle" filterable placeholder="请选择" style="width:100%;">
                                        <el-option
                                        v-for="item in handleS"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                        </el-form-item> 
                    </div>
                    <div style="overflow:hidden">                    
                        <el-form-item label="历史对比" prop="repetitions" style="width:40%;float:left">
                             <el-checkbox v-model="userA.repetitions">启用</el-checkbox>
                        </el-form-item>
                         <el-form-item label="密码不得重复" prop="passwrepetitions" style="width:40%;float:right">
                            <el-input v-model="userA.passwrepetitions" v-if="userA.repetitions !== true " :disabled="true"></el-input>
                            <el-input v-model="userA.passwrepetitions" v-if="userA.repetitions == true " :disabled="false"></el-input>
                        </el-form-item>                       
                    </div>
                    <div style="overflow:hidden">                    
                      <el-form-item label="登录锁定" prop="error_number" style="width:40%;float:left">
                             <el-checkbox v-model="userA.error_number">启用</el-checkbox>
                        </el-form-item> 
                        <el-form-item label="允许密码错误(次)" prop="errornumber" style="width:40%;float:right">
                            <el-input v-model="userA.errornumber" v-if="userA.error_number !== true " :disabled="true"></el-input>
                            <el-input v-model="userA.errornumber" v-if="userA.error_number == true " :disabled="false"></el-input>
                        </el-form-item>                       
                    </div>
                    <div style="overflow:hidden">                    
                        <el-form-item label="自动解锁" prop="unlock" style="width:40%;float:left">
                             <el-checkbox v-model="userA.unlock">启用</el-checkbox>
                        </el-form-item>
                       <el-form-item label="解锁时间限制(分钟)" prop="unlocktime" style="width:40%;float:right">
                            <el-input v-model="userA.unlocktime" v-if="userA.unlock !== true " :disabled="true"></el-input>
                            <el-input v-model="userA.unlocktime" v-if="userA.unlock == true " :disabled="false"></el-input>
                        </el-form-item>                    
                    </div>                  

                <el-form-item style="width:50%;margin:0 auto;">
                    <el-button type="primary"  style="margin-right:20px;" @click='userAsubmit(userA)'>保存</el-button>
                    <el-button type="primary" >重置</el-button>
                </el-form-item>
                </el-form>
            </div>
          </panel>
       </div>
       <div>
           <panel title="邮件配置">
               <div>
                   <el-form :model="Mailconfig" ref="Mailconfig" label-width="110px" class="form">
                        <el-form-item label="邮箱用户名称" prop="mail_username">
                            <el-input v-model="Mailconfig.mail_username"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱密码" prop="mail_password">
                            <el-input v-model="Mailconfig.mail_password"></el-input>
                        </el-form-item>
                        <el-form-item label="邮件地址" prop="mail_address">
                            <el-input v-model="Mailconfig.mail_address"></el-input>
                        </el-form-item>
                        <el-form-item label="邮件服务器" prop="mail_host">
                            <el-input v-model="Mailconfig.mail_host"></el-input>
                        </el-form-item>                        
                        <el-form-item label="邮件服务器端口" prop="mail_port">
                            <el-input v-model="Mailconfig.mail_port"></el-input>
                        </el-form-item>
                        <el-form-item label="是否支持SSL" prop="is_ssl">
                           <el-radio-group v-model="Mailconfig.is_ssl">
                                <el-radio  label="0" >是</el-radio>
                                <el-radio label="1" >否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                       <el-form-item style="width:50%;margin:0 auto;">
                           <el-button type="primary"  style="margin-right:20px;" @click="mailtest()">邮件测试</el-button>
                            <el-button type="primary"  style="margin-right:20px;" @click="mailsubmit()">保存</el-button>
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
                        <el-radio-group v-model="configuration.isCode">
                                <el-radio  label="0" >是</el-radio>
                                <el-radio label="1" >否</el-radio>
                        </el-radio-group>                           
                    </el-form-item>
                    <el-form-item label="首次登陆是否修改密码" prop="isUpdate">
                        <el-radio-group v-model="configuration.isUpdate">
                                <el-radio  label="0" >是</el-radio>
                                <el-radio label="1" >否</el-radio>
                        </el-radio-group>                           
                    </el-form-item>
                     <el-form-item label="会话超时时间(分钟)" prop="sessionTimeOut" >
                            <el-input v-model="configuration.sessionTimeOut"></el-input>
                        </el-form-item>  
                   <el-form-item style="width:50%;margin:0 auto;">
                            <el-button type="primary"  style="margin-right:20px;" @click="configsubmit()">保存</el-button>
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
        min_length:"",
        max_length: "",
        complex:1,
        lowercase: 1,
        capital: 1,
        number: 1,
        special_char:1,
        specialchar:'',
        cycle: 1,
        term: "",
        remind: "",
        repetitions:-1,
        passwrepetitions:'',
        handle: "",
        checked: true,
        error_number: "",
        errornumber:'',
        unlock:-1,
        unlocktime:''
      },
      handleS: [],
      Mailconfig: {
        mail_username: "",
        mail_password: "",
        mail_host: "",
        mail_port: "",
        is_ssl: 1,
        mail_address: ""
      },
      configuration: {
        isCode: "1",
        isUpdate: "1",
        sessionTimeOut: ""
      }
    };
  },
  created() {
    this.getUserConfig();
    this.getEmailConfig();
    this.getSystemParam();
  },
  methods: {
    getUserConfig() {
      this.$api.getUserConfig().then(res => {
        let data = res.data.userConfig;               
        this.userA.complex = data.complex == -1 ? false : true;
        this.userA.lowercase = data.lowercase == -1 ?  false : true;
        this.userA.capital = data.capital == -1 ? false : true;
        this.userA.number = data.number == -1 ?  false : true;
        this.special_char = data.special_char  == -1 ? false :true;
        this.cycle=data.cycle == 0 ? false : true;
        this.repetitions=data.repetitions == -1 ? false : true;
        this.error_number=data.error_number == -1 ? false:true;
        this.unlock=data.unlock == -1 ? false : true;
        this.userA = data; 
      });
    },
    //用户认证配置修改
    userAsubmit(params) {
        let data={
            min_length:this.userA.min_length,
            max_length:this.userA.max_length,
            complex:this.userA.complex == true ? 1 : -1,
            lowercase:this.userA.lowercase == true ? 1 : -1,
            capital:this.userA.capital== true ? 1 : -1,
            number:this.userA.number== true ? 1 : -1,
            special_char:this.userA.special_char == true ? this.userA.specialchar: -1,
            cycle:this.userA.cycle == true ? 1: 0,
            term:this.userA.term ,
            remind:this.userA.remind,
            handle:this.userA.handle,
            repetitions:this.userA.repetitions == true ? this.userA.passwrepetitions: -1,
            error_number:this.error_number== true ? this.userA.errornumber :-1,
            unlock:this.userA.unlock == true ? this.userA.unlocktime : -1
        }
        this.$api.updateUserConfig(data).then(res => {
            if(res.data.result==0){
               this.$message.success('保存成功')
            }
            
        });
    },
    getEmailConfig() {
      this.$api.getEmailConfig().then(res => {
        let data = res.data.mailConfig;
       
        this.Mailconfig = data;
      });
    },
    mailsubmit() {
      this.$api.updateEmailConfig(this.Mailconfig).then(res => {});
    },
    mailtest() {
      let data = Object.assign({}, this.Mailconfig, {
        to: this.Mailconfig.mail_address
      });
      this.$api.sendTestEmail(data).then(res => {});
    },

    //系统参数配置
    getSystemParam() {
      this.$api.getSystemParam().then(res => {
        let data = res.data.mailConfig;
        this.configuration = data;
      });
    },
    //系统参数配置修改
    configsubmit() {
      console.log(this.configuration);
      this.$api.updateSystemParam(this.configuration).then(res => {
        let data = res.data.mailConfig;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  padding: 20px 60px;
}
</style>
