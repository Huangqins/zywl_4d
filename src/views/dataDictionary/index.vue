<template>
    <div>
      <div class='assetPort'>
           <section >
               <panel title="资产区域配置">
              <el-button type="text" style="float:right;margin-right:20px"><i class="el-icon-plus"></i>新增</el-button>
              <el-table :data="assetData" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="35"></el-table-column>
                <el-table-column prop="userName" label="区域名称" align="center"></el-table-column>
                <el-table-column prop="email" label="创建时间" align="center"></el-table-column>               
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">                        
                         <el-button  type="text" size="small">查看详情</el-button>
                         <el-button  type="text" size="small">删除</el-button>
                         <el-button  type="text" size="small" @click="delet(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
              </el-table>
               </panel>
           </section>
           <section>
               <panel title="资产类型配置">
                   <el-button type="text" style="float:right;margin-right:20px"><i class="el-icon-plus"></i>新增</el-button>
                   <el-table :data="assetData" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="35"></el-table-column>
                    <el-table-column prop="userName" label="资产类型" align="center"></el-table-column>
                    <el-table-column prop="email" label="创建时间" align="center"></el-table-column>               
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">                        
                            <el-button  type="text" size="small">查看详情</el-button>
                            <el-button  type="text" size="small">删除</el-button>
                            <el-button  type="text" size="small" @click="delet(scope.row)">修改</el-button>
                        </template>
                    </el-table-column>
                   </el-table>
               </panel>
           </section>
      </div>
      <div class='vulnPort'>
          <section>
           <panel title="风险类型配置">
                <el-button type="text" style="float:right;margin-right:20px"><i class="el-icon-plus"></i>新增</el-button>
                   <el-table :data="assetData" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="35"></el-table-column>
                    <el-table-column prop="userName" label="区域名称" align="center"></el-table-column>
                    <el-table-column prop="email" label="创建时间" align="center"></el-table-column>               
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">                        
                            <el-button  type="text" size="small">查看详情</el-button>
                            <el-button  type="text" size="small">删除</el-button>
                            <el-button  type="text" size="small" @click="delet(scope.row)">修改</el-button>
                        </template>
                    </el-table-column>
                   </el-table>
            </panel>
          </section>
           <section>
               <panel title="风险数据配置">
                       <div style="overflow:hidden;padding:20px">  
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="185px" class="form" >                   
                            <el-form-item label="极高风险处理提醒时间(天)" prop="name" style="width:45%;float:left">
                                <el-input v-model="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="高风险处理时间(天)" prop="name" style="width:45%;float:right">
                                <el-input v-model="ruleForm.name"></el-input>
                            </el-form-item> 
                            <el-form-item label="中风险处理提醒时间(天)" prop="name" style="width:45%;float:left">
                                <el-input v-model="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="低风险处理时间(天)" prop="name" style="width:45%;float:right">
                                <el-input v-model="ruleForm.name"></el-input>
                            </el-form-item> 
                            <el-form-item label="极低风险处理时间(天)" prop="name" style="width:45%;">
                                <el-input v-model="ruleForm.name"></el-input>
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
      <div class="workManage">
          <section>
               <panel title="工单管理配置">
                  <div style="padding:20px">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="185px" class="form" >    
                       <el-form-item label="工单到期邮件提醒" prop="delivery" style="width:100%;">
                         <el-radio v-model="radio" label="1">是</el-radio>
                           <el-radio v-model="radio" label="2">否</el-radio>
                      </el-form-item>
                    </el-form>
                  </div>
               </panel>
          </section>
           <section>
               <panel title="工单数据配置">
                   <div style="overflow:hidden;padding:20px">  
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="185px" class="form" >                   
                            <el-form-item label="极高风险整改提醒时间(天)" prop="name" style="width:45%;float:left">
                                <el-input v-model="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="高风险整改时间(天)" prop="name" style="width:45%;float:right">
                                <el-input v-model="ruleForm.name"></el-input>
                            </el-form-item> 
                            <el-form-item label="中风险整改提醒时间(天)" prop="name" style="width:45%;float:left">
                                <el-input v-model="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="低风险整改时间(天)" prop="name" style="width:45%;float:right">
                                <el-input v-model="ruleForm.name"></el-input>
                            </el-form-item> 
                            <el-form-item label="极低风险整改时间(天)" prop="name" style="width:45%;">
                                <el-input v-model="ruleForm.name"></el-input>
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
            assetData:[],
            ruleForm:[]
        }
    }
}
</script>

<style lang="scss" scoped>
.assetPort{
    display: flex;
    overflow: hidden;
    width: 100%;
    section{
        flex: 1;
        float: left;
        height: 350px;
    }
    section:nth-child(2){
        margin-left: 20px;
    }
}
.vulnPort{
    display: flex;
    overflow: hidden;
    width: 100%;
    section{
        flex: 1;
        float: left;
        height: 350px;
    }
    section:nth-child(2){
        margin-left: 20px;
    }
}
.workManage{
    display: flex;
    overflow: hidden;
    width: 100%;
    section{
        flex: 1;
        float: left;
        height: 350px;
    }
    section:nth-child(2){
        margin-left: 20px;
    }
}
</style>
