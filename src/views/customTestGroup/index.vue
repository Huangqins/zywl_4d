<template>
    <div class="customTestGroup">
        <asset-panel></asset-panel>
    </div>
</template>
<script>
    import AssetPanel from "@/components/AssetPanel";

    export default {
        components: {
            AssetPanel
        }
    };
</script>
<style lang="scss" scoped>
    .customTestGroup {
       border-top: 1px solid #6B778A;
        padding-top: 20px;
    }
    .btn {

    }

</style>
