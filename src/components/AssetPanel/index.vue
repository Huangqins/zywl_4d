<template>
    <div class="assetPanel-container">
        <ul class="clearfix assetList">
            <li class="assetPanel first">
                <div @click="setGroup">
                    <i class="el-icon-plus" style="font-size: 40px"></i>
                    <p>自定义测试组</p>
                </div>
            </li>
            <li v-for="(item, index) in panelData" :key="index" class="assetPanel">
                <panel-item :item="item" @add="add" @deletItem="deletItem"></panel-item>
            </li>
        </ul>
    </div>
</template>
<script>
    import panelItem from './panelItem'
    export  default {
        components: {
            panelItem
        },
        props: {
            panelData: {
                type: Array,
                default: () => {
                    return [
                        {
                            value: 234,
                            name: '自定义资产组'
                        },
                        {
                            value: 234,
                            name: '自定义资产组'
                        },
                        {
                            value: 234,
                            name: '自定义资产组'
                        },
                        {
                            value: 234,
                            name: '自定义资产组'
                        }
                    ]
                }
            }
        },
        data() {
            return {

            }
        },
        methods: {
            setGroup() {
                this.$router.push('/taskManage/assetsGroup')
            },
            add(item) {
                this.$emit('add',item)
            },
            deletItem(item) {
                console.log('组件上级')
                this.$emit('deletItem',item)
            }
        }
    }
</script>

<style lang="scss">
    .assetList {
        li {
                margin-right: 0;
                margin-right: 48px;
                margin-bottom: 48px;

        }
    }
.assetPanel {
    position: relative;
    width: 22%;
    height: 242px;
    background:rgba(38,49,67,1);
    border-radius:12px;
    box-shadow:4px 0 4px rgba(29,36,46,1);
    float: left;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #D1FFFF;
    margin-right: 48px;
    margin-bottom: 48px;
}
.assetPanel  {
background-image: url(../../../public/img/png/assetpic.png);
background-position: top 30px center;
background-repeat: no-repeat;
}
.assetPanel:nth-child(4) {
    margin-right: 0;
}


    .first {
        background-image: none;
        cursor: pointer;
    }
</style>

<style lang="scss">
    .panel-menu {
        position: absolute;
        display: inline-block;
        margin: 0;
        background: #fff;
        z-index: 100;
        list-style-type: none;
        padding: 5px 0;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
        li {
            margin: 0;
            text-align: center;
            padding: 7px 16px;
            letter-spacing: 1px;
            width: 100px;
            font-size: 14px;
            cursor: pointer;
            color: #424242;
            &:hover {
                background: #edeff3;
                color: #424242;
            }

        }
    }
</style>