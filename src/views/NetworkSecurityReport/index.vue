<template>
    <div>
       <div>
           <panel>
               <div class="header">
                    <span >部门机构:</span>
                    <el-input v-model="input" placeholder="请输入内容" style="width:200px;margin:0 10px"></el-input>
                    <el-date-picker v-model="start_time" type="datetime" placeholder="选择日期" ></el-date-picker>
                    <span style="margin:0 10px;">至</span>
                    <el-date-picker v-model="end_time" type="datetime" placeholder="选择日期" style="margin-right:30px;"></el-date-picker>
                     <el-button >查询</el-button>
               </div>
           </panel>
       </div>
       <div class="middleport">
           <section>
             <panel>
                 <div >
修复率
                 </div>
             </panel>
           </section>
           <section>
               <panel>
                   <div>
                       <charts :chartData="option" id="canvas" ></charts>
                   </div>
                    
               </panel>
                
           </section>
       </div>
       <div>
           <panel title="部门修复统计表">
               <div>
                   <el-table :data="vulnData" style="width: 100%;height:274px;overflow:auto;" >
                    <el-table-column type="index" label="序号" width="50"></el-table-column>
                    <el-table-column prop="vuln_type_name" label="系统名称" align="center"></el-table-column>
                    <el-table-column prop="vuln_type_keyword" label="所属科室" align="center"></el-table-column>
                    <el-table-column prop="vuln_type_creattime" label="漏洞总数" align="center"></el-table-column>   
                    <el-table-column prop="vuln_type_creattime" label="已修复" align="center"></el-table-column>  
                    <el-table-column prop="vuln_type_creattime" label="修复中" align="center"></el-table-column>  
                    <el-table-column prop="vuln_type_creattime" label="整改中" align="center"></el-table-column>        
                   </el-table>
                    <div style="padding-bottom:5px;">
                         <pages :total="vulnpageTotal" @pageChange="vulnpageChange"></pages>
                    </div>  
               </div>
           </panel>
       </div>
    </div>
</template>
<script>
import panel from "@/components/panel";
import Pages from "@/components/Pages";
import Charts from "@/components/Charts";
export default {
  components: {
    panel,
    Charts,
    Pages
  },
  data() {
    return {
        vulnData:[],
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: [
            "直接访问",
            "邮件营销",
            "联盟广告",
            "视频广告",
            "搜索引擎",
            "百度",
            "谷歌",
            "必应",
            "其他"
          ],
          textStyle: {
            color: "#d8d8d8"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
           
        },
        xAxis: [
          {
            type: "category",
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            axisLabel: {
              textStyle: {
                color: "#CCCCCC"
              }
            },
          },
          
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#CCCCCC"
              }
            },
          }
        ],
        series: [
          {
            name: "百度",
            type: "bar",
            stack: "搜索引擎",
            data: [620, 732, 701, 734, 1090, 1130, 1120]
          },
          {
            name: "谷歌",
            type: "bar",
            stack: "搜索引擎",
            data: [120, 132, 101, 134, 290, 230, 220]
          },
          {
            name: "必应",
            type: "bar",
            stack: "搜索引擎",
            data: [60, 72, 71, 74, 190, 130, 110]
          },
          {
            name: "其他",
            type: "bar",
            stack: "搜索引擎",
            data: [62, 82, 91, 84, 109, 110, 120]
          }
        ]
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.header {
  padding: 10px 20px;
}
.middleport {
  width: 100%;
  overflow: hidden;
  margin:15px 0;
  section {
    height: 336px;
  }
  section:nth-child(1) {
    float: left;
    width: 32%;
    margin-right: 15px;
  }
  section:nth-child(2) {
    width: 67%;
    float: left;
  }
}
</style>

