<template>
    <div>
        <panel :title="创建报告">
            <div class="form">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="报告名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="任务ID">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="模板">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="文件格式">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="所属部门">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">保存和运行报告</el-button>
                        <el-button type="primary">报告保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </panel>
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
            form: {
                name: ''
            }
        }
    }
}
</script>
<style lang="scss" scoped>

</style>


