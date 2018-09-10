<template>
    <div class="holeCount">
        <div class="top">
            <panel title="风险TOP10">
                <el-table :data="holeTopList" style="width: 100%">
                    <el-table-column prop="date" label="漏洞排行"></el-table-column>
                    <el-table-column prop="name" label="漏洞名称"></el-table-column>
                    <el-table-column prop="address" label="漏洞数量"></el-table-column>
                </el-table>
            </panel>
            <panel title="业务系统风险TOP10">
                <el-table :data="businessList"  style="width: 100%">
                    <el-table-column prop="" label="业务功能名称"></el-table-column>
                    <el-table-column prop="" label="业务系统"></el-table-column>
                    <el-table-column prop="" label="所属部门"></el-table-column>
                    <el-table-column prop="" label="风险数量"></el-table-column>
                </el-table>
            </panel>
        </div>
        <div class="trendChart">
            <panel title="风险变化趋势"></panel>
        </div>
        <div class="spread">
            <panel title="风险类型分布"></panel>
            <panel title="高中低风险状况"></panel>
            <panel title="进展分析总体整改情况"></panel>
        </div>
        <div class="spreadChart">
             <panel title="资产类型风险分布"></panel>
             <panel title="区域漏洞分布"></panel>
        </div>
        <div class="countTable">
            <panel title="漏洞修复统计表">
                <el-table :data="countData" style="width: 100%">
                     <el-table-column prop="" label="统计类型"></el-table-column>
                      <el-table-column prop="" label="修复总数"></el-table-column>
                       <el-table-column prop="" label="小于10天的修复数量"></el-table-column>
                        <el-table-column prop="" label="10 - 30 天的修复数量"></el-table-column>
                        <el-table-column prop="" label="大于30天的修复数量"></el-table-column>
                        <el-table-column prop="" label="未修复总数"></el-table-column>
                </el-table>
            </panel>
        </div>
    </div>
</template>
<script>
import panel from '@/components/panel'

export default {
    components: {
        panel
    },
    data() {
        return {
            holeTopList: [],
            businessList: [],
            countData: []
        }
    }
}
</script>
<style lang="scss" scoped>
.top, .spreadChart {
    display: flex;
    & > div{
        flex: 1
    }
    & > div:nth-child(1) {
        margin-right: 20px;
    }
}
.trendChart {
    margin: 15px 0;
}
.spread {
    display: flex;
    & > div:not(:last-child) {
        margin-right: 20px; 
    }
    & > div:nth-child(1) {
        flex: 2
    }
    & > div:nth-child(2), & > div:nth-child(3){
        flex: 1
    }
}
.spreadChart {
    margin: 15px 0;
}
</style>
