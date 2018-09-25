<template>
    <div>
       <div class='baseInfo'>
         <panel title="基本信息"> 
            <div class="baseInfo-from">
                 <el-form :model="form" label-width="90px" ref="form" >
                      <el-form-item label="策略名称" prop="group_name">
                           <el-input v-model="form.group_name" auto-complete="off" style="width:500px"></el-input>
                      </el-form-item>
                      <el-form-item label="策略描述" prop="group_desc">
                           <el-input type='textarea' v-model="form.group_desc" auto-complete="off" placeholder="" style="width:500px"></el-input>
                      </el-form-item>
                 </el-form>
            </div>
         </panel>
       </div>
       <div>
         <panel title="漏洞信息">
             <div style="padding:20px;">
                  <el-form :model="ruleForm"  ref="ruleForm" label-width="185px" class="form" >  
                       <div style="overflow:hidden">
                           <el-form-item label="漏洞名称" prop="vuln_name" style="width:45%;float:left">
                                <el-input v-model="ruleForm.vuln_name" placeholder="请输入您要查询的漏洞名称"></el-input>
                            </el-form-item>                           
                            <el-form-item label="风险级别:" prop="vuln_level" style="width:45%;float:right">
                                <el-checkbox-group v-model="ruleForm.vuln_level" >
                                    <el-checkbox label="4">极高</el-checkbox>
                                    <el-checkbox label="3">高</el-checkbox>
                                    <el-checkbox label="2">中</el-checkbox>
                                    <el-checkbox label="1">低</el-checkbox>
                                    <el-checkbox label="0">极低</el-checkbox>                                   
                                </el-checkbox-group>
                                <!-- <el-checkbox-group v-model="vuln_level" >
                                    <el-checkbox v-for="(vuln,index) in vulns" :label="vuln" :key="index+'1'">{{vuln}}</el-checkbox>
                                </el-checkbox-group> -->
                            </el-form-item> 
                        </div>                              
                        <el-form-item style="width:50%;margin:0 auto;">                                
                                <el-button type="primary" >重置</el-button>
                                <el-button type="primary"  style="margin-right:20px;" @click="searchvuln">查询</el-button>
                        </el-form-item>
                    </el-form>  
                    <div class="vuln">
                        <div>
                            <p>漏洞列表</p>
                            <div>
                                <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
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
import Panel from "@/components/panel";
export default {
  components: {
    Panel
  },
  data() {
    return {
      form: {
        group_name: "",
        group_desc: ""
      },
      ruleForm: {
        vuln_name: "",
        vuln_level: []
      },
      defaultPage: {
        page: "1",
        rows: "10"
      },
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 2,
              label: "二级 1-1"              
            }
          ]
        }
      ]
    };
  },
  created() {},
  methods: {
    searchvuln() {
      this.ruleForm.vuln_level = this.ruleForm.vuln_level.map(item => {
        return Number(item);
      });
      let data = Object.assign({}, this.defaultPage, this.ruleForm);
      this.getVulnList(data);
    },
    getVulnList(params) {
      this.$api.getVulnList(params).then(res => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.baseInfo {
  height: 222px;
  &-from {
    padding: 20px;
  }
}
.vuln {
  overflow: hidden;
  display: flex;
  div {
    flex: 1;
    p {
      height: 34px;
      background: #2d384a;
      line-height: 34px;
      padding: 0 20px;
    }
  }
  div:nth-child(2) {
    margin-left: 20px;
  }
}
</style>
