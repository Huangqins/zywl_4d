<template>
    <div class="assetDetail">
        <div class="assetDetail-assetInfo">
          <panel title="资产信息" >
               <div class="assetDetail-assetInfo-content">
                  <div>
                    <ul class="serviceAsset" style="margin-top:10px;">
                      <li>
                        <span>资产名称:</span>
                        <span>{{assets_name}}</span>
                      </li>
                      <li>
                        <span>资产URL:</span>
                        <span>{{assets_url}}</span>
                      </li>
                      <li>
                        <span>资产IP:</span>
                        <span>{{assets_ip}}</span>
                      </li>
                      <li>
                        <span>所属区域:</span>
                        <span>{{area_name}}</span>
                      </li>
                      <li>
                        <span>资产类型:</span>
                        <span>{{assets_type}}</span>
                      </li>
                      <li>
                        <span>资产重要度:</span>
                        <span>{{assets_important}}</span>          
                      </li>
                      <li>
                        <span>负责人:</span>
                        <span>{{assets_manger}}</span>
                      </li>
                    </ul>
                  </div>
                  <div style="border-left:2px solid #063D66">
            <div class="vulntext" >
              <div>                
                <p><span style="background: #06b8b8;">业</span>业务功能数</p>
                <p>0</p>
              </div>
              <div>                
                <p><span>极</span>极高风险数</p>
                <p>{{vuln_tips}}</p>
              </div>
              <div>
                
                <p><span style="background: #DD7C35;">高</span>高风险数</p>
                <p>{{vuln_high}}</p>
              </div>
              <div>
                
                <p><span style="background: #E2B928;">中</span>中风险数</p>
                <p>{{vuln_medium}}</p>

              </div>
              <div>
                
                <p><span style="background: #51B323;">低</span>低风险数</p>
                <p>{{vuln_low}}</p>
              </div>
              <div>
               
                <p> <span style="background: #46A5C0;">末</span>极低风险数</p>
                <p>{{vuln_urgent}}</p>
              </div>
             </div>
                  </div>
               </div>
          </panel>
        </div> 
        <div class="assetDetail-Tab" style="height:100%">
           <panel> 
            <div class="task-tab" style="height:100%">
               <el-tabs v-model="activeName" @tab-click="handleClick" style="height:100%">
                    <el-tab-pane label="端口服务" name="first" style="height:100%">
                         <panel title="" style="height:100%">
                           <div>
                              <el-table :data="serviceData" style="width: 100%;" >
                                <el-table-column prop="service_name" label="服务名称" align="center"></el-table-column>
                                <el-table-column prop="port" label="端口" align="center"></el-table-column>
                                <el-table-column prop="protocol" label="协议" align="center"></el-table-column>
                                <el-table-column prop="state" label="状态" align="center"></el-table-column>
                                <el-table-column prop="info" label="服务信息" align="center"></el-table-column>
                              </el-table>
                           </div>
                             
                          </panel>
                    </el-tab-pane>
                    <el-tab-pane label="风险信息" name="second" style="height:100%;color:#d8d8d8;">
                        <panel  style="height:100%">
                       <div>
                         <el-table :data="vulnData"  style="width: 100%" > 
                            <el-table-column prop="vuln_name" label="风险名称"  align="center" :show-overflow-tooltip="true"></el-table-column>                          
                            <el-table-column prop="vuln_type" label="风险类型"  align="center" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="vuln_IP" label="风险IP"  align="center"></el-table-column>                            
                            <el-table-column prop="vuln_level" label="风险等级"  align="center">
                              <template slot-scope="scope">
                              <el-tooltip class="item" effect="dark" :content="vulnLevel[scope.row.vuln_level]" placement="top">
                                <img :src="vulnLevelS[scope.row.vuln_level]" style="width:26px;height:6px;">
                              </el-tooltip>
                              </template>                  
                             </el-table-column>
                            <el-table-column prop="kb_vuln_cnvd" label="CNVD"  align="center"></el-table-column>
                            <el-table-column prop="kb_vuln_cve" label="CVE"  align="center"></el-table-column>                                    
                            <el-table-column prop="vuln_url" label="风险链接"  align="center" :show-overflow-tooltip="true"></el-table-column>          
                            <el-table-column prop="vuln_ftime" label="发现时间"  align="center" :show-overflow-tooltip="true">
                              <template slot-scope="scope">
                                  {{ fomatterTime(new Date(scope.row.vuln_ftime.time)) }}
                              </template>
                            </el-table-column>
                             <el-table-column prop="vuln_modifytime" label="利用时间"  align="center" :show-overflow-tooltip="true">
                              <template slot-scope="scope">
                                  {{ fomatterTime(new Date(scope.row.vuln_modifytime.time)) }}
                              </template>
                            </el-table-column>
                            <el-table-column prop="vuln_oper" label="操作人"  align="center"></el-table-column>  
                           
                          </el-table>
                       </div>
                         </panel>
                    </el-tab-pane>
                    <el-tab-pane label="业务功能" name="three" style="height:100%;color:#d8d8d8;">
                        <panel  style="height:100%">
                       <div>
                         <el-table :data="bussfunction"  style="width: 100%" > 
                            <el-table-column prop="vuln_name" label="业务功能名称"  align="center" :show-overflow-tooltip="true"></el-table-column>                          
                            <el-table-column prop="vuln_type" label="业务链接"  align="center" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column prop="vuln_IP" label="可用性"  align="center"></el-table-column>              
                            
                          </el-table>
                       </div>
                         </panel>
                    </el-tab-pane>
                </el-tabs>
            </div>
           </panel>
        </div>
    </div>
</template>
<script>
import Panel from "@/components/panel";
import { fomatterTime, deepClone } from "@/utils";
import route from 'mixins/route';
const vulnLevel = {
  "4": "极高风险",
  "3": "高风险",
  "2": "中风险",
  "1": "低风险",
  "0": "极低风险"
};
//资产类型
const assetTypestruts = {
  "1": "服务器",
  "2": "打印机",
  "3": "传真",
  "4": "交换机",
  "5": "路由器",
  "6": "防火墙",
  "7": "集线器",
  "8": "无线路由器",
  "9": "位置设备",
  "10": "主机"
};
const assetImportantruts = {
  "0": "一般",
  "1": "重要",
  "2": "特别重要"
};
const path = process.env.NODE_ENV === "development" ? "" : "/ZY/";
const vulnLevelS = {
  "4": `../../${path}static/png/4.png`,
  "3": `../../${path}static/png/3.png`,
  "2": `../../${path}static/png/2.png`,
  "1": `../../${path}static/png/1.png`,
  "0": `../../${path}static/png/0.png`
};
export default {
  mixins:[route],
  components: {
    Panel
  },
  data() {
    return {
      fomatterTime: fomatterTime,
      vulnLevelS: vulnLevelS,
      vulnLevel: vulnLevel,
      serviceData: [],
      vulnData: [],
      bussfunction:[],
      activeName: "first",
      // 服务数里面的资产详情
      assets_name: "",
      assets_url: "",
      assets_ip: "",
      area_name: "",
      assets_type: "",
      assets_important: "",
      assets_manger: "",
      deleteVisible: false,
      vuln_high: "",
      vuln_tips: "",
      vuln_medium: "",
      vuln_low: "",
      vuln_urgent: "",
      vuln_level_num: {
        "0": "暂无...",
        "1": "暂无...",
        "2": "暂无...",
        "3": "暂无...",
        "4": "暂无...",
        "5": "暂无..."
      }
    };
  },
  created() {
    (this.assets_name = this.pageInfo.row.assets_name),
      (this.assets_url =this.pageInfo.row.assets_url),
      (this.assets_ip = this.pageInfo.row.assets_ip),
      (this.area_name = this.pageInfo.row.area_name),
      (this.assets_type = assetTypestruts[this.pageInfo.row.assets_type]),
      (this.assets_important =
        assetImportantruts[this.pageInfo.row.assets_important]);
    this.assets_manger = this.pageInfo.row.assets_manger;
    this.serviceList();
    this.vulnList();
    this.getLogicByAsset();
    this.vulnTotal();
  },
  methods: {
    //端口服务
    serviceList() {
      let assets_id = this.pageInfo.assets_id;
      this.$api.getServiceList({ assets_id: assets_id ,is_new:-1}).then(res => {
        let data = res.data.lists;
        this.serviceData = data;
      });
    },
    vulnList() {
      let assets_id = this.pageInfo.assets_id;
      this.$api.vulnSearch({ assets_id: assets_id }).then(res => {
        let data = res.data.rows;
        this.vulnData = data;
      });
    },
    getLogicByAsset(){
      let assets_id = this.pageInfo.assets_id;
      this.$api.getLogicByAsset({ assets_id: assets_id }).then(res => {
        let data = res.data.logics;
        this.vulnData = data;
      });
    },
    vulnTotal(){
        let assets_id = this.pageInfo.assets_id;
      this.$api.vulnTotal({ assets_id: assets_id }).then(res => {
        let data = res.data.vulns;
         data.forEach(item => {
           if(item.vuln_level==0){
              this.vuln_urgent=item.vuln_total
           }else if(item.vuln_level==1){
              this.vuln_low=item.vuln_total
           }else if(item.vuln_level==2){
              this.vuln_medium=item.vuln_total
           }else if(item.vuln_level==3){
              this.vuln_high=item.vuln_total
           }else if(item.vuln_level==4){
               this.vuln_tips=item.vuln_total
           }
         });;
      });
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  }
};
</script>
<style lang="scss" scoped>
.assetDetail {
  //   display: flex;
  //   flex-direction: column;
  //   &-Tab {
  //     flex: 1;
  //   }
  &-assetInfo {
    margin-bottom: 13px;
    &-content {
      width: 100%;
      padding: 15px;
      overflow: hidden;
      & > div {
        width: 50%;
        float: left;
      }
    }
  }
}
.serviceAsset li {
  padding: 6px;
  color: #d8d8d8;
  overflow: hidden;
}
.serviceAsset li span:first-child {
  width: 12%;
  display: inline-block;
  float: left;
  color: #18bb9a;
  font-size: 14px;
}
.serviceAsset li span:nth-child(2) {
  width: 88%;
  float: left;
  display: inline-block;
}
.serviceAsset li p {
  margin-top: 3px;
}
.vulntext {
  height: 100%;
  overflow: hidden;
  & > div {
    width: 19%;
    height: 50%;
    background: url("../../../public/img/png/vuln.png") no-repeat;
    background-size: 100% 100%;
    float: left;
    padding: 10px;
    margin: 20px 40px;
    p:nth-of-type(2) {
      text-align: center;
      margin-top: 10px;
      color: #d8d8d8;
    }
    p {
      font-size: 14px;
      color: #b1b1b1;
      height: 14px;
      margin: 0;
      padding: 0;
    }
    span {
      color: #000;
      float: left;
      margin-right: 5px;
      font-size: 12px;
      width: 16px;
      height: 16px;
      display: inline-block;
      line-height: 16px;
      text-align: center;
      &:first-child {
        background: red;
      }
    }
  }
}
</style>
