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
                  <section  v-for="(item,index) in assetsType" :key="index+'1'">
                     <p>{{item.assets_os_type}}</p>
                     <p>{{item.name===''?'未知类型':item.name}}</p>
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
                  <Charts :chartData="areaOption" id="areaOption" height="100%"></Charts> 
              </div>
           </panel>
         </div>
        
     </div>
      <div class="assetscount-secTwo">
             <div>
                    <panel title="新发现域名信息">
                        <div class="doMainName">
                            <el-table :data="doMainName" style="width: 100%" height="333">
                                <el-table-column prop="assets_url" label="域名" ></el-table-column>
                                <el-table-column prop="assets_create_time" label="创建时间" >
                                  <template slot-scope="scope">
                                    <span v-if="scope.row.assets_create_time != null">
                                              {{ fomatterTime(new Date(scope.row.assets_create_time.time)) }}
                                    </span>
                                    <span v-else>
                                              {{scope.row.assets_create_time}}
                                    </span>
                                  </template>
                                </el-table-column>
                                <el-table-column prop="assets_creatuser" label="发现人" ></el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                    <el-button  type="text" size="small">修改</el-button>                                                                 
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </panel>
                     <pages :total="doMainNamepageTotal" @pageChange="doMainNamepageChange"></pages>
             </div>
             <div>
                   <panel title="新发现IP信息">
                        <el-table :data="ipInfo" style="width: 100%" height="333">
                                <el-table-column prop="assets_ip" label="域名" ></el-table-column>
                                 <el-table-column prop="assets_create_time" label="发现时间" >
                                   <template slot-scope="scope">
                                    <span v-if="scope.row.assets_create_time != null">
                                              {{ fomatterTime(new Date(scope.row.assets_create_time.time)) }}
                                    </span>
                                    <span v-else>
                                              {{scope.row.assets_create_time}}
                                    </span>
                                  </template>
                                 </el-table-column>
                                <el-table-column prop="assets_creatuser" label="发现人" ></el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                    <el-button  type="text" size="small">修改</el-button>                                                                 
                                    </template>
                                </el-table-column>
                        </el-table>
                   </panel>
                    <pages :total="ipInfopageTotal" @pageChange="ipInfopageChange"></pages>
             </div>
         </div>
         <div class="assetscount-secThree">
              <div>
                    <panel title="新发现应用信息">
                        <el-table :data="newapplicmessage" style="width: 100%;" height="330">
                                <el-table-column prop="application" label="应用名称" ></el-table-column>
                                 <el-table-column prop="assets_create_time" label="发现时间" >
                                     <template slot-scope="scope">
                                        <span v-if="scope.row.assets_create_time != null">
                                            {{ fomatterTime(new Date(scope.row.assets_create_time.time)) }}
                                        </span>
                                        <span v-else>
                                            {{scope.row.assets_create_time}}
                                        </span>
                                    </template>
                                 </el-table-column>
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
                                 <el-table-column prop="create_time" label="发现时间" >
                                   <template slot-scope="scope">
                                        <span v-if="scope.row.create_time != null">
                                            {{ fomatterTime(new Date(scope.row.create_time.time)) }}
                                        </span>
                                        <span v-else>
                                            {{scope.row.create_time}}
                                        </span>
                                    </template>
                                 </el-table-column>
                                <el-table-column prop="create_user" label="发现人" ></el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                    <el-button  type="text" size="small">修改</el-button>                                                                 
                                    </template>
                                </el-table-column>
                        </el-table>
                   </panel>
                   <pages :total="servicepageTotal" @pageChange="servicepageChange"></pages>
             </div>
         </div>
       
    </div>
</template>

<script>
import Panel from "@/components/panel";
import Charts from "@/components/Charts";
import { fomatterTime,fomatterYearTime, deepClone, formatTime, staticAssetPath } from "@/utils";
import Pages from "@/components/Pages";
export default {
  components: {
    Panel,
    Charts,
    Pages
  },
  data() {
    const icon=''
    return {
      doMainNamepageTotal:0,
      servicepageTotal:0,
      ipInfopageTotal:0,
      assetsType: [],
      newData: [],
      fomatterTime: fomatterTime,
      fomatterYearTime:fomatterYearTime,
      formatTime: formatTime,
      params: {},
      params: {
        page: 1,
        rows: 10
      },
      assetsNum: "",
      pageTotal: 0,
      doMainName: [],
      ipInfo: [],
      newapplicmessage: [],
      newserviceInfo: [],
      areaOption: {
        backgroundColor: "#263143",
        xAxis: {
          show: false,
          min: 0,
          max: 10
        },
        yAxis: {
          show: false,
          scale: true,
          min: 0,
          max: 20
        },
        series: [
          {
            type: "scatter",
            symbolSize: (d, i) =>
              i.dataIndex > 4
                ? Math.random() * 20
                : i.dataIndex === 0
                  ? 70
                  : 50,
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter(p) {
                  let { dataIndex, value, name } = p;
                  return dataIndex === 0
                    ? `{b0|${value[2]}}\n{c|${
                        name.length > 4 ? name.substr(0, 4) + "..." : name
                      }}`
                    : dataIndex < 5
                      ? `{b|${value[2]}}\n{c|${
                          name.length > 4 ? name.substr(0, 4) + "..." : name
                        }}`
                      : "";
                },
                color: "#01FDFF",
                rich: {
                  b0: {
                    color: "#02F6F6",
                    align: "center",
                    fontWeight: "bold",
                    fontSize: 32
                  },
                  b: {
                    color: "#02F6F6",
                    align: "center"
                  },
                  c: {
                    fontWeight: "bold",
                    color: "#00CEFF",
                    align: "center"
                  }
                }
              }
            },
            itemStyle: {
              normal: {
                color: "rgba(6,33,41,1)",
                borderColor: "#00ceff"
              }
            },
            data: [         
            ]
          }
        ]
      },
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
    this.getNewAssets({ flag: 1 });
    this.getServiceList({ is_new: 1 ,page:1,rows:10});
    this.getAssetsTrend();
    this.getAssetsApplication();
    this.getAssetsClass({ flag: 2 });
    this.getAssetsArea()
  },
  methods: {
    getAssetsArea(){
      this.$api.getAssetsArea().then(res =>{
        let data=res.data.lists;
        data.forEach(item =>{
          this.areaOption.series[0].data.push({
             value:[  
               [Math.round(Math.random()*10),Math.round(Math.random()*10)][Math.round(Math.random())],
               [Math.round(Math.random()*10+10),Math.round(Math.random()*10+10),Math.round(Math.random()*10+10),Math.round(Math.random()*10+10)][Math.round(Math.random() * 3)],
               item.assets_zone
             ],
             name:item.assets_name
          })
        })
      })
    },
    getAssetsClass(params) {
      this.$api.getAssetsClass(params).then(res => {
        let data = res.data.lists;
        this.assetsType = data;
      });
    },
    pageChange(params) {
      this.params = Object.assign({}, this.params, params);
      this.getAssetsApplication(this.params);
    },
    doMainNamepageChange(pageObj){
      this.pageObj = pageObj;
      let { page, rows } = pageObj,
        params = { page, rows, is_page: 0 };
      this.params = params;
      this.getNewAssets(params);
    },
    ipInfopageChange(pageObj){
       this.pageObj = pageObj;
      let { page, rows } = pageObj,
        params = { page, rows, is_page: 0 };
      this.params = params;
      this.getNewAssets(params);
    },
    servicepageChange(pageObj){
      this.pageObj = pageObj;
      let { page, rows } = pageObj,
        params = { page, rows, is_page: 0 };
      this.params = params;
      this.getServiceList(params);
    },
    getAssetsNum() {
      this.$api.getAssetsNum().then(res => {
        this.assetsNum = res.data.assetsNum;
      });
    },
    //域名信息
    getNewAssets(params) {
      this.$api.getNewAssets(params).then(res => {
        let datas=[]
        res.data.assets.forEach(item =>{
          if(item.assets_url !=''){   
            console.log(item)
            datas.push(item)
            this.doMainName=datas
            // this.doMainName = []  
            //  this.doMainName = res.data.assets; 
             this.doMainNamepageTotal=datas.length         
          }else if(item.assets_url ==''){
            //  console.log('13') 
            //  console.log(item)
            //  this.doMainName = res.data.assets;
          }
        })
        // 
      });
      //IP信息
      this.$api.getNewAssets({ flag: 2 }).then(res => {
        let data=res.data.assets
        let datas=[]
        data.forEach(item=>{
          if(item.assets_ip !=''){
                 datas.push(item) 
                 this.ipInfo=datas
                 this.ipInfopageTotal=datas.length
           }
        })        
        
      });
    },
    getServiceList(params) {
      this.$api.getServiceList(params).then(res => {
        this.newserviceInfo = res.data.lists;
      });
    },
    getAssetsTrend() {
      this.$api.getAssetsTrend().then(res => {
        let data = res.data.assets;
        data.forEach(item => {
          this.option.series[0].data.push({
            value: item.assets_os_type,
            name: item.name
          });
          this.option.xAxis.data.push(
            fomatterYearTime(new Date(item.assets_create_time.time))
          );
        });
      });
    },
    getAssetsApplication() {
      let data = Object.assign({}, this.params, { flag: 3,is_page:0 });
      this.$api.getAssetsApplication(data).then(res => {
        let data=res.data.rows;
        let datas=[]
        data.forEach(item =>{
          if(item.application !=''){
             datas.push(item)
             this.newapplicmessage =datas
             this.pageTotal = dataslength
          }
        })
        // = ;
       
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
    background: url("../../../public/img/png/assets.png") no-repeat;
  }
  section:nth-child(1) {
    width: 141px;
    height: 86px;
    background: url("../../../public/img/png/assetsTotal.png") no-repeat;
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