<template>
<div class="homePage">
    <div class="outsideInfo">
        <div>外部资讯:</div>
        <div>妇女满身的女生经典福克斯的生经典福克斯的女生们但是凡事妇女</div>
        <div>更多...</div>
    </div>
    <div>
        <panel :showTitle="true" title="资产信息">
            <div style="height:200px;">
           ，是，都没法买大V你大V你的，规定给女方快递费的
            </div>
        </panel>
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
</style>


