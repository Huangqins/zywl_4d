<template>
    <div class="addUser">
        <panel title="添加用户">
            <div class="form">
                <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="用户名">
                    <el-input  placeholder="填写用户名" v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input  placeholder="请填写邮箱地址" v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名">
                    <el-input  placeholder="请填写姓名" v-model="form.trueName"></el-input>
                </el-form-item>
                <el-form-item label="身份证号码">
                    <el-input  placeholder="请填写身份证号码" v-model="form.IDCard"></el-input>
                </el-form-item>
                <el-form-item label="公司/部门">
                    <el-input  placeholder="请填写公司/部门" v-model="form.company"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input  placeholder="请填写手机号码" v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                   <el-select v-model="form.roleId" placeholder="请选择角色">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="margin-top:50px;">
                    <el-button style="margin-left:129px;">取消</el-button>
                    <el-button type="primary" @click="onSubmit">确认</el-button>
                </el-form-item>
            </el-form>
            </div>
        </panel>
    </div>
</template>

<script>
import panel from "@/components/panel"

export default {
    components: {
        panel
    },
    data() {
        return {
            form: {
                userName: '',
                email: '',
                trueName: '',
                IDCard: '',
                company: '',
                phone:'',
                roleId: ''
            },
            options: []
        }
    },
    created() {
        this.getRolePermission();
    },
    methods: {
        onSubmit() {
            this.addUser(this.form)
        },
        async getRolePermission() {
            let res = await this.$api.getRolePermission();
            if (res.data.result === 0) {
                this.options = res.data.role.map(item => {
                    return {value: item.role_id, label:item.role_name}
                });
            }
        },
        async addUser(params) {
            let res = await this.$api.addUser(params);
            if (res.data.result === 0) {

            }
        }
    }
}
</script>
<style lang="scss" scoped>
.addUser {
    .form {
        padding: 100px 300px;
    }
    .el-select {
        width: 100%;
    }
}
</style>


