<template>
    <div>
       <div>
          <panel title="用户认证配置">
            <div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="135px" class="form" >
                    <div style="overflow:hidden">
                        <el-form-item label="最小密码长度" prop="name" style="width:40%;float:left">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="最大密码长度" prop="name" style="width:40%;float:right">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                    </div>
                                               
                <el-form-item label="密码复杂度" prop="delivery" style="width:100%;">
                    <el-checkbox v-model="checked">启用</el-checkbox>
                </el-form-item>
                 <div style="overflow:hidden">
                       <el-form-item label="小写字母" prop="name" style="width:40%;float:left">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="大写字母" prop="name" style="width:40%;float:right">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="数字" prop="name" style="width:40%;float:left">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="特殊字符" prop="name" style="width:40%;float:right">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>                        
                 </div>
                 <el-form-item label="可用的特殊字符" prop="name" style="width:100%"> 
                            <el-input v-model="ruleForm.name"></el-input>
                 </el-form-item>
                  <el-form-item label="密码周期" prop="name" style="width:100%;">
                            <el-checkbox v-model="checked">启用</el-checkbox>
                     </el-form-item>
                 <div style="overflow:hidden">                    
                        <el-form-item label="密码有效期(天)" prop="name" style="width:40%;float:right">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="预期提醒时间(天)" prop="name" style="width:40%;float:left">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>                       
                 </div>
                   <el-form-item label="逾期处理方式" prop="name" >
                            <el-select v-model="value8" filterable placeholder="请选择" style="width:100%;">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                    </el-form-item> 
                    <div style="overflow:hidden">                    
                        <el-form-item label="历史对比" prop="name" style="width:40%;float:left">
                             <el-checkbox v-model="checked">启用</el-checkbox>
                        </el-form-item>
                        <el-form-item label="密码不得重复" prop="name" style="width:40%;float:right">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>                       
                    </div>
                    <div style="overflow:hidden">                    
                        <el-form-item label="登录锁定" prop="name" style="width:40%;float:left">
                             <el-checkbox v-model="checked">启用</el-checkbox>
                        </el-form-item>
                        <el-form-item label="允许密码错误(次)" prop="name" style="width:40%;float:right">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>                       
                    </div>
                    <div style="overflow:hidden">                    
                        <el-form-item label="自动解锁" prop="name" style="width:40%;float:left">
                             <el-checkbox v-model="checked">启用</el-checkbox>
                        </el-form-item>
                        <el-form-item label="解锁时间限制(分钟)" prop="name" style="width:40%;float:right">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>                       
                    </div>
                    

                <el-form-item style="width:50%;margin:0 auto;">
                    <el-button type="primary"  style="margin-right:20px;">保存</el-button>
                    <el-button type="primary" >重置</el-button>
                </el-form-item>
                </el-form>
            </div>
          </panel>
       </div>
       <div>
           <panel title="邮件配置">
               <div>
                   <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="form">
                        <el-form-item label="邮箱用户名称" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱密码" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="邮件地址" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="邮件服务器" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>                        
                        <el-form-item label="邮件服务器端口" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="是否支持SSL" prop="name">
                           <el-radio v-model="radio" label="1">是</el-radio>
                           <el-radio v-model="radio" label="2">否</el-radio>
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
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="155px" class="form">
                    <el-form-item label="开启登陆验证" prop="name">
                           <el-radio v-model="radio" label="1">是</el-radio>
                           <el-radio v-model="radio" label="2">否</el-radio>
                    </el-form-item>
                    <el-form-item label="首次登陆是否修改密码" prop="name">
                           <el-radio v-model="radio" label="1">是</el-radio>
                           <el-radio v-model="radio" label="2">否</el-radio>
                    </el-form-item>
                     <el-form-item label="会话超时时间(分钟)" prop="name" >
                            <el-input v-model="ruleForm.name"></el-input>
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
import Panel from '@/components/panel'
export default {
    components:{
        Panel
    },
    data(){
        return{
           ruleForm:{
               user:'',
               region:'',
               value8:'',
               options:[]
           } 
        }
    }
}
</script>

<style lang="scss" scoped>
.form{
    padding: 20px 60px;
}
</style>
