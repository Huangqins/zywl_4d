<template>
    <div class="assetscount">
     <div class="assetscount-secOne">
         <div>
             <p style="margin:0 0 7px 0;color:#D1FFFF;font-size:16px;">资产数量统计</p>
             <div class="assetNumCount">
                 
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
                            <el-table :data="doMainName" style="width: 100%">
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
                        <el-table :data="doMainName" style="width: 100%">
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
                        <el-table :data="doMainName" style="width: 100%">
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
                    </panel>
             </div>
             <div>
                   <panel title="新发现服务信息">
                       <el-table :data="doMainName" style="width: 100%">
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
                   </panel>
             </div>
         </div>
       
    </div>
</template>

<script>
import Panel from "@/components/panel";
import Charts from "@/components/Charts";
export default {
  components: {
    Panel,
    Charts
  },
  data() {
    return {
    doMainName:[],  
    ipInfo:[], 
      option: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisLabel: {
              textStyle: {
                color: "#CCCCCC"
              }
            },
        },
        yAxis: {
          type: "value",
         axisLabel: {
              textStyle: {
                color: "#CCCCCC"
              }
            },
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true
          }
        ]
      }
    };
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
  &-secTwo{
    display: flex;
    width: 100%;
    margin-bottom: 10px;
    & > div{
        flex: 1;

    }
     & > div:first-child{
        margin-right: 10px;
        
    }
}
&-secThree{
    display: flex;
    width: 100%;
    & > div{
        flex: 1;
    }
    & > div:first-child{
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
.assetAdd{
    height:423px ;
    // margin-right: 10px;
    width: 1216px;
}
.areaAssetNum{
    height:558px ;
}
.assetAddtrend{
    margin-right: 10px;
}
</style>