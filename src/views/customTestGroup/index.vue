<template>
    <div class="customTestGroup">
        <asset-panel :panelData="panelData"></asset-panel>
        <!-- <asset-panel></asset-panel> -->
    </div>
</template>
<script>
    import AssetPanel from "@/components/AssetPanel";

    export default {
        components: {
            AssetPanel
        },
        data() {
            return {
                panelData: []
            }
        },
        created() {
            this.assetsGroupTotal();
        },
        methods: {
            async assetsGroupTotal() {
                let res = await this.$api.assetsGroupTotal();
                if (res.data.result === 0) {
                    this.panelData = res.data.list;
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    .customTestGroup {
        padding-top: 20px;
    }
    .btn {

    }

</style>
