<template>
    <div class="assetPanel">
        {{panelDataList}}
    </div>
</template>
<script>
    export  default {
        props: {
            panelData: {
                type: Array,
                default: () => {
                    return [
                        {
                            value: 234,
                            name: '自定义资产组'
                        }
                    ]
                }
            }
        },
        computed: {
            // 为了第一个不同占位
            panelDataList() {
                let arrTemp = [{}],
                    arr = [...arrTemp,...this.panelData]
                console.log(arr)
                return arr
            }
        },
    }
</script>

<style lang="scss" scoped>
.assetPanel {
    width: 265px;
    height: 242px;
    background:rgba(38,49,67,1);
    border-radius:12px;
    box-shadow:4px 0px 4px rgba(29,36,46,1);
}
</style>