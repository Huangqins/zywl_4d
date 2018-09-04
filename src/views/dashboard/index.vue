<template>
<div class="homePage">
    <div class="outsideInfo">
        <div>外部资讯:</div>
        <div>妇女满身的女生经典福克斯的生经典福克斯的女生们但是凡事妇女</div>
        <div>更多...</div>
    </div>
    <div class="sectionOne">
        <div class='sectionOne-left'>
            <panel >
                <div class="deviceType">
                
                </div>
            </panel>    
        </div>
        <div class='sectionOne-state'>
            <panel>
                <div class="deviceType">
                
                </div>
            </panel>    
        </div>
        <div class='sectionOne-vulnLeveal'>
            <panel>                
                <div class="deviceType">
                
                </div>
            </panel>    
        </div>
    </div>
    <div class="sectionTwo">
        <div class='sectionTwo-left'>
            <panel title="风险变化趋势">
                <div class="">
                
                </div>
            </panel>    
        </div>
        <div class='sectionTwo-state'>
            <panel title="服务情况">
                <div class="">
                
                </div>
            </panel>    
        </div>
        <div class='sectionTwo-vulnLeveal'>
            <panel title="资产情况">                
                <div class="">
                
                </div>
            </panel>    
        </div>
    </div>
    <div class="sectionThree">
        <div class='sectionThree-left'>
            <panel title="资产列表">
                <div class="">
                
                </div>
            </panel>    
        </div>
        <div class='sectionThree-state'>
            <panel title="最新漏洞">
                <div class="">
                
                </div>
            </panel>    
        </div>       
    </div>
    <div class="sectionFour">
        <div class='sectionFour-left'>
            <panel title="正在执行的任务">
                <div class="">
                
                </div>
            </panel>    
        </div>
             
    </div>
    <div class="sectionFive">
        <div class='sectionFive-left'>
            <panel title="待办事项">
                <div class="">
                
                </div>
            </panel>    
        </div>
             
    </div>
    
</div>
    
</template>
<script>
import Panel from '@/components/panel';
export default {
    components:{
        Panel
    },
    data(){
        return{

        }
    }
};
</script>
<style lang="scss" scoped>
.homePage{
    margin:0 15px;
    height: auto;
    overflow-y: auto; 
}
.outsideInfo {
  padding: 0 30px;
  color: #fff;
  height: 40px;
  background: rgba(38, 49, 67, 1);
  line-height: 40px;
  font-weight: 400;
  box-shadow: 4px 0px 4px rgba(29, 36, 46, 1);
  display: flex;
  & > div:first-child {
    width: 69px;
    color: rgba(209, 255, 255, 1);    
    font-size: 16px;
  }
  & > div:nth-child(2) {
    flex: 1;
    margin: 0 10px;
    font-size: 14px;
    color:rgba(24,187,154,1);
  }
  & > div:last-child {
    width: 50px;
    font-size: 14px;
    color: rgba(24, 187, 154, 1);
  }
}
.sectionOne{
    display: flex;  
    margin-top: 15px; 
    & div{
        height: 280px;
    }
    &-left{
      flex: 1;
      margin-right:10px;
    }
    &-state{ 
      flex: 1; 
      margin-right:10px;
    }
    &-vulnLeveal{
      flex: 2;  
    }
}
.sectionTwo{
    display: flex;  
    overflow: hidden;
    & div{
        height: 300px;
    }
    &-left{
      flex: 2;
      margin-right:10px;
    }
    &-state{
      flex: 1; 
      margin-right:10px;
    }
    &-vulnLeveal{
      flex: 1;  
    }
}
.sectionThree{
    display: flex;  
    overflow: hidden; 
    & div{
        height: 238px;
    }
    &-left{
      flex: 2;
      margin-right:10px;
    }
    &-state{
      flex: 1; 
    }
}
.sectionFour{ 
    overflow: hidden; 
    & div{
        height: 238px;
    }
}
.sectionFive{  
      overflow: hidden;
    & div{
        height: 238px;
    }
}
</style>


