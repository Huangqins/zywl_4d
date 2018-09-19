<template>
    <div class="assetscount">
     <div class="assetscount-secOne">
         <div>
             <p style="margin:0 0 7px 0;color:#D1FFFF;font-size:16px;">资产数量统计</p>
             <div class="assetNumCount">                 
                 <section>
                     <p>{{assetsNum}}</p>
                     <p>总资产</p>
                 </section>
                 <section>
                     <p>1212</p>
                     <p>总资产</p>
                 </section>
                 <section>
                     <p>1212</p>
                     <p>总资产</p>
                 </section>
                 <section>
                     <p>1212</p>
                     <p>总资产</p>
                 </section>
                 <section>
                     <p>1212</p>
                     <p>总资产</p>
                 </section>
                 <section>
                     <p>1212</p>
                     <p>总资产</p>
                 </section>
                 <section>
                     <p>1212</p>
                     <p>总资产</p>
                 </section>
             </div>
             <div class="assetAddtrend">
                 <panel title="资产增加趋势">
               <div class="assetAdd">
                     <Charts :chartData="option" id="canvas" height="100%"></Charts> 
               </div>
           </panel>
             </div>
           
         </div>
         <div>
           <panel title="区域资产数量统计">
              <div class="areaAssetNum">
                 
              </div>
           </panel>
         </div>
        
     </div>
      <div class="assetscount-secTwo">
             <div>
                    <panel title="新发现域名信息">
                        <div class="doMainName">
                            <el-table :data="doMainName" style="width: 100%" height="333">
                                <el-table-column prop="date" label="域名" ></el-table-column>
                                 <el-table-column prop="name" label="发现时间" ></el-table-column>
                                <el-table-column prop="date" label="发现方式" ></el-table-column>
                                <el-table-column prop="date" label="发现人" ></el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                    <el-button  type="text" size="small">修改</el-button>                                                                 
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </panel>
             </div>
             <div>
                   <panel title="新发现IP信息">
                        <el-table :data="ipInfo" style="width: 100%" height="333">
                                <el-table-column prop="date" label="IP地址" ></el-table-column>
                                 <el-table-column prop="name" label="发现时间" ></el-table-column>
                                <el-table-column prop="date" label="发现方式" ></el-table-column>
                                <el-table-column prop="date" label="发现人" ></el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                    <el-button  type="text" size="small">修改</el-button>                                                                 
                                    </template>
                                </el-table-column>
                        </el-table>
                   </panel>
             </div>
         </div>
         <div class="assetscount-secThree">
              <div>
                    <panel title="新发现应用信息">
                        <el-table :data="newapplicmessage" style="width: 100%;" height="330">
                                <el-table-column prop="application" label="应用名称" ></el-table-column>
                                 <el-table-column prop="assets_modify_time" label="发现时间" >
                                     <template slot-scope="scope">
                                        <span v-if="scope.row.assets_modify_time != null">
                                            {{ fomatterTime(new Date(scope.row.assets_modify_time.time)) }}
                                        </span>
                                        <span v-else>
                                            {{scope.row.assets_modify_time}}
                                        </span>
                                    </template>
                                 </el-table-column>
                                <el-table-column prop="date" label="发现方式" ></el-table-column>
                                <el-table-column prop="assets_creatuser" label="发现人" ></el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                    <el-button  type="text" size="small">修改</el-button>                                                                 
                                    </template>
                                </el-table-column>
                        </el-table>
                    </panel>
                <pages :total="pageTotal" @pageChange="pageChange"></pages>
             </div>
             <div>
                   <panel title="新发现服务信息">
                       <el-table :data="newserviceInfo" style="width: 100%" height="330">
                                <el-table-column prop="service_name" label="服务名称" ></el-table-column>
                                 <el-table-column prop="create_time" label="发现时间" ></el-table-column>
                                <el-table-column prop="date" label="发现方式" ></el-table-column>
                                <el-table-column prop="create_user" label="发现人" ></el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                    <el-button  type="text" size="small">修改</el-button>                                                                 
                                    </template>
                                </el-table-column>
                        </el-table>
                   </panel>
             </div>
         </div>
       
    </div>
</template>

<script>
import Panel from "@/components/panel";
import Charts from "@/components/Charts";
import { fomatterTime, deepClone, formatTime, staticAssetPath } from "@/utils";
import Pages from "@/components/Pages";
export default {
  components: {
    Panel,
    Charts,
    Pages
  },
  data() {
    return {
        newData:[],
      fomatterTime:fomatterTime,
      formatTime:formatTime,
      params: {},
      defaultPage: {
        page: 1,
        rows: 10
      },
      assetsNum: "",
      pageTotal: 0,
      doMainName: [],
      ipInfo: [],
      newapplicmessage: [],
      newserviceInfo: [],
      option: {
        xAxis: {
          type: "category",
          data: [],
          axisLabel: {
            textStyle: {
              color: "#CCCCCC"
            }
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              color: "#CCCCCC"
            }
          }
        },
        series: [
          {
            data: [],
            type: "line",
            smooth: true
          }
        ]
      }
    };
  },
  created() {
    this.getAssetsNum();
    this.getAssetsClass();
    this.getNewAssets();
    this.getServiceList();
    this.getAssetsTrend();
    this.getAssetsApplication();
  },
  methods: {
    pageChange(params) {
      this.params = Object.assign({}, this.params, params);
      this.getAssetsApplication(this.params);
    },
    getAssetsNum() {
      this.$api.getAssetsNum().then(res => {
        this.assetsNum = res.data.assetsNum;
      });
    },
    getAssetsClass() {
      this.$api.getAssetsClass({ flag: 2 }).then(res => {
        let data = res.data.lists;
      });
    },
    //域名信息
    getNewAssets() {
      this.$api.getNewAssets({ flag: 1 }).then(res => {
        this.doMainName = res.data.assets;
      });
      //IP信息
      this.$api.getNewAssets({ flag: 2 }).then(res => {
        this.ipInfo = res.data.assets;
      });
    },
    getServiceList() {
      this.$api.getServiceList({ is_new: 1 }).then(res => {
        this.newserviceInfo = res.data.lists;
      });
    },
    getAssetsTrend() {
      this.$api.getAssetsTrend().then(res => {
        let data = res.data.assets;
        data.forEach(item => {
            //  console.log(fomatterTime[item.assets_create_time.time])
        this.option.series[0].data.push({
            value: item.assets_os_type,
            name: item.name
         });
          this.option.xAxis.data.push(fomatterTime(new Date(item.assets_create_time.time)));
         });
      });
    },
    getAssetsApplication() {
    let data=Object.assign({},this.defaultPage,{ flag: 3})
      this.$api.getAssetsApplication(data).then(res => {
        this.newapplicmessage = res.data.rows;
        this.pageTotal=res.data.total;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.assetscount {
  margin: 0 20px;
  &-secOne {
    display: flex;
    height: 589px;
    margin-bottom: 20px;
    & > div:nth-child(1) {
      flex: 2;
    }
    & > div:nth-child(2) {
      flex: 1;
    }
  }
  &-secTwo {
    display: flex;
    width: 100%;
    margin-bottom: 10px;
    & > div {
      flex: 1;
    }
    & > div:first-child {
      margin-right: 10px;
    }
  }
  &-secThree {
    display: flex;
    width: 100%;
    & > div {
      flex: 1;
    }
    & > div:first-child {
      margin-right: 10px;
    }
  }
}

.assetNumCount {
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  section {
    width: 141px;
    height: 86px;
    margin-right: 38px;
    background: url("../../../public/img/png/assetCount.png") no-repeat;
  }
  section:nth-child(1) {
    width: 141px;
    height: 86px;
    background: #11a284;
    border-radius: 6px;
  }
  section:last-child {
    margin-right: 0;
  }
  section p {
    text-align: center;
  }
}
.assetAdd {
  height: 423px;
  // margin-right: 10px;
  width: 1216px;
}
.areaAssetNum {
  height: 537px;
}
.assetAddtrend {
  margin-right: 10px;
}
</style>