<template>
    <div class="vulndetail">
        <panel title="风险详情" class="secOne">
             <div class="sceheader">
                 <div>风险名称:<span>{{vuln_name}}</span></div>
                 <div>风险等级:<span class="level" :style="{background: vulncolor[this.vuln_level]}" v-text="levelSchema[this.vuln_level]"></span></div>
                 <div>风险分类:<span>{{vuln_class}}</span></div>
             </div>
             <div class="secmain">
                 <div class="main"><div class="main_text">风险描述:</div><div style="width:90%">{{vuln_des}}</div></div>
                 <div class="main"><div class="main_text">风险详情:</div><div style="width:90%">{{vuln_detail}}</div></div>
                 <div class="main"><div class="main_text">风险分析:</div><div style="width:90%">{{vuln_anly}}</div></div>
                 <div class="main"><div class="main_text">加固建议:</div><div style="width:90%">{{vuln_ref}}</div></div>
             </div>
        </panel>
    </div>
</template>
<script>
import Panel from "@/components/panel";
const levelSchema = {
  "4": "极高风险",
  "3": "高风险",
  "2": "中风险",
  "1": "极低风险",
  "0": "无风险"
};
const vulncolor = {
  "4": "red",
  "3": "rgb(221, 124, 53)",
  "2": "rgb(226, 185, 40)",
  "1": "rgb(81, 179, 35)",
  "0": "rgb(70, 165, 192)"
};
export default {
    components:{
        Panel
    },
    data(){
        return{
            vulncolor:vulncolor,
            levelSchema:levelSchema,
            vuln_name: "",
            vuln_level: "",
            vuln_class:'',
            vuln_des: "",//风险描述
            vuln_anly: "",//风险分析
            vuln_ref: "",//加固建议
            vuln_detail:''//风险详情
        }
        
    },
    created(){
        let param=this.$route.params
        console.log(this.$route.params)
        this.vuln_name=param.vuln_name;
        this.vuln_level=param.vuln_level;
        this.vuln_class=param.vuln_class;
        this.vuln_des=param.vuln_des;
        this.vuln_anly=param.vuln_anly;
        this.vuln_ref=param.vuln_ref;
        this.vuln_detail=param.vuln_detail;
    },
    methods:{    }
}
</script>
<style lang="scss" scoped>
.vulndetail{
    width: 100%;
}
.secOne{
    height: 100%;
}
.sceheader {
    padding: 20px 60px;
    border-bottom: 1px solid #6B778A;
     display:flex;
     &> div{
         flex:1;
     }
     &> div >span{
          margin-left: 5px;
     }
 }
 .secmain{ 
     padding:20px 40px 0px 40px;
 }
 .secmain > div{
    font-size: 14px;
    margin: 20px;
    overflow: hidden;
 }
 .main div{
     float: left;
 }
 .main div:nth-child(2){
     width: 90%;
     line-height: 20px;
 }
 .main_text{
     margin-right: 15px;
 }
 .level{
    padding: 4px;
    font-size: 14px;
    color: black;
 }
</style>
