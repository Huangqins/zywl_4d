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
                            </el-form-item> 
                        </div>                              
                        <el-form-item style="width:50%;margin-bottom:10px;">                                
                                <el-button type="primary" >重置</el-button>
                                <el-button type="primary"  style="margin-right:20px;" @click="searchvuln">查询</el-button>
                        </el-form-item>
                    </el-form>  
                    <div class="vuln">
                        <div>
                            <p style="margin:0px">漏洞列表</p>
                            <div>
                                <el-tree :data="vuln_type" show-checkbox :props="defaultProps" @node-click='vulndetail' node-key="id" ref="tree"></el-tree>
                            </div>
                        </div>
                        <div>
                            <p style="margin:0px"> 漏洞信息</p>
                            <div>
                             <p style="margin:5px 0px;"><span style="margin:3px 10px 0 20px;background:#313E53;">漏洞名称:</span> {{vuln_name}}</p>
                             <p style="margin:5px 0px;"><span style="margin:3px 10px 0 20px;background:#313E53;">漏洞等级:</span>
                           
                              <el-tooltip effect="dark" :content="levelSchema[vuln_level]" placement="top">
                                 <span :class="['vuln-level',`vuln-level-${vuln_level}`]"></span>
                              </el-tooltip>
                             </p>
                             <p style="margin:0;"><span style="margin-right:10px;margin-left:20px;background:#313E53;">详细描述:</span></p>
                             <div style="padding:10px 30px;font-size:14px">
                               {{vuln_des}}
                             </div>
                            </div>
                        </div>
                    </div>
                    <div style="width:15%;margin:0 auto;margin-top:10px;">
                      <el-button type="primary" style="margin-right:20px;" >取消</el-button>
                       <el-button type="primary"   @click="keep" style="margin-left:20px;">保存</el-button>
                    </div>
             </div>
         </panel>
       </div>

    </div>
</template>
<script>
import Panel from "@/components/panel";
import route from "mixins/route";
export default {
  mixins: [route],
  components: {
    Panel,
    route
  },
  data() {
    const levelSchema = {
      "4": "极高风险",
      "3": "高风险",
      "2": "中风险",
      "1": "极低风险",
      "0": "无风险"
    };
    return {
      levelSchema:levelSchema,
      defaultData: [],
      policyData: {},
      vuln_name: "",
      vuln_des: "",
      vuln_level: "",
      form: {
        group_name: "",
        group_desc: ""
      },
      ruleForm: {
        vuln_name: "",
        vuln_level: []
      },
      vuln_type: [],
      defaultPage: {
        page: "1",
        rows: "10"
      },
      ids: [],
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
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {
    this.policyData = this.pageInfo;
    this.form = this.pageInfo;
    this.getVulnList({});
    this.vulndetail()
  },
  mounted() {
    this.pageInfo.group_content = this.pageInfo.group_content
      .split(",")
      .map(item => {
        return Number(item);
      });
    this.$refs.tree.setCheckedKeys(this.pageInfo.group_content);
  },
  methods: {
    vulndetail(row) {
      this.vuln_name = row.name;
      this.vuln_des = row.vuln_des;
      this.vuln_level = row.vuln_level;
    },
    keep() {
      this.ids = this.$refs.tree
        .getCheckedKeys()
        .filter(item => item !== undefined);
      let data = Object.assign({}, this.form, {
        group_content: this.ids.join(",")
      });
      if (this.form.group_id) {
        this.$api.updateStrategyGroup(data).then(res => {
          if (res.data.result === 0) {
            this.$message.success(`修改成功`);
            this.$router.push("PolicySettings");
          } else if (res.data.result === 2) {
            this.$message.success(`默认配置,不能修改`);
            // this.$router.push("PolicySettings");
          }
        });
      } else {
        this.$api.addStrategyGroup(data).then(res => {
          if (res.data.result === 0) {
            this.$message.success(`保存成功`);
            this.$router.push("PolicySettings");
          }
        });
      }
    },
    searchvuln() {
      this.ruleForm.vuln_level = this.ruleForm.vuln_level.map(item => {
        return Number(item);
      });
      console.log(this.ruleForm.vuln_level)
      this.ruleForm.vulnleveL = this.ruleForm.vuln_level.join(",");
      this.getVulnList({
        vuln_name: this.ruleForm.vuln_name,
        vuln_level: this.ruleForm.vulnleveL
      });
    },
    //新增策略配置风险列表
    getVulnList(params) {
      this.$api.getVulnList(params).then(res => {
        let data = res.data.list;
        let typeData = [];
        let newData = [];
        typeData = data.map(item => {
          return item.vuln_type_name;
        });
        typeData = Array.from(new Set(typeData));
        typeData.forEach(item => {
          let temp = [];
          temp = data
            .filter(i => {
              return i.vuln_type_name === item;
            })
            .map(t => {
              return {
                id: t.strategy_id,
                label: t.vuln_name,
                name: t.vuln_name,
                vuln_des: t.vuln_des,
                vuln_level: t.vuln_level
              };
            });
          newData.push({ label: item, children: temp });
        });
        this.vuln_type = newData;
      });
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
.vuln > div {
  border: 1px solid #4f5b6e;
}
.vuln > div:nth-child(2) {
  margin-left: 20px;
}
.vuln > div > p {
  color: #d1ffff;
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
      font-size: 14px;
    }
  }
  div:nth-child(2) {
  }
  .vuln-level {
    display: inline-block;
     width: 50px;
     height: 7px; 
  }
}
</style>
