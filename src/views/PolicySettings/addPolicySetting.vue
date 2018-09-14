<template>
    <div>
       <div class='baseInfo'>
         <panel title="基本信息"> 
            <div class="baseInfo-from">
                 <el-form :model="form" label-width="90px" ref="form" :rules="rules">
                      <el-form-item label="策略名称" prop="assets_zone">
                           <el-input v-model="form.assets_ip" auto-complete="off" style="width:500px"></el-input>
                      </el-form-item>
                      <el-form-item label="策略描述" prop="assets_zone">
                           <el-input type='textarea' v-model="form.assets_ip" auto-complete="off" placeholder="" style="width:500px"></el-input>
                      </el-form-item>
                 </el-form>
            </div>
         </panel>
       </div>
       <div>
         <panel title="漏洞信息">
             <div style="padding:20px;">
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="185px" class="form" >  
                       <div style="overflow:hidden">
                           <el-form-item label="极高风险处理提醒时间(天)" prop="name" style="width:45%;float:left">
                                <el-input v-model="ruleForm.name"></el-input>
                            </el-form-item>                           
                            <el-form-item label="风险级别:" prop="name" style="width:45%;float:right">
                                <el-checkbox-group v-model="checkList">
                                    <el-checkbox label="高"></el-checkbox>
                                    <el-checkbox label="中"></el-checkbox>
                                    <el-checkbox label="低"></el-checkbox>
                                    <el-checkbox label="禁用"></el-checkbox>                                   
                                </el-checkbox-group>
                            </el-form-item> 
                        </div>                              
                        <el-form-item style="width:50%;margin:0 auto;">                                
                                <el-button type="primary" >重置</el-button>
                                <el-button type="primary"  style="margin-right:20px;">保存</el-button>
                        </el-form-item>
                    </el-form>  
                    <div class="vuln">
                        <div>
                            <p>漏洞列表</p>
                            <div>
                                
                            </div>
                        </div>
                        <div>
                            <p>漏洞信息</p>
                            <div>

                            </div>
                        </div>
                    </div>
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
            form:[],
            ruleForm:[]

        }
    }
}
</script>

<style lang="scss" scoped>
.baseInfo{
   height: 222px;
   &-from{
       padding: 20px;
   }
}
.vuln{
    overflow: hidden;
    display: flex;
    div{
        flex:1;
        p{
            height: 34px;
            background:#2D384A ;
            line-height: 34px;
            padding: 0 20px;
        }
    }
    div:nth-child(2){
          margin-left: 20px;
    }
}
</style>
