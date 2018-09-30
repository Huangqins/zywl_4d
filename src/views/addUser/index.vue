<template>
    <div class="addUser">
        <panel :title="$route.params.user_name?'修改用户':'添加用户'">
            <div class="form">
                <el-form ref="form" :model="form" label-width="100px" :rules="rules">
                    <el-form-item label="用户名">
                        <el-input placeholder="填写用户名" v-model="form.userName" v-if="!$route.params.user_name"></el-input>
                        <span v-else>{{$route.params.user_name}}</span>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input placeholder="请填写邮箱地址" v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名">
                        <el-input placeholder="请填写姓名" v-model="form.trueName"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号码" prop="IDCard">
                        <el-input placeholder="请填写身份证号码" v-model="form.IDCard"></el-input>
                    </el-form-item>
                    <el-form-item label="公司/部门">
                        <el-input placeholder="请填写公司/部门" v-model="form.company"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="phone">
                        <el-input placeholder="请填写手机号码" v-model="form.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="角色">
                        <el-select v-model="form.roleId" placeholder="请选择角色">
                            <el-option v-for="item in options" :key="item.role_name" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="上级领导">
                        <el-select v-model="form.managerUser" placeholder="请选择上级领导">
                            <el-option v-for="item in managerUserList" :key="item.value" :label="item.label" :value="item.value">
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
import panel from "@/components/panel";

export default {
  components: {
    panel
  },
  
  data() {
    const isPoneAvailable=(rule,value,callback)=>{ 
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;  
        if (!myreg.test(value)) { 
          return callback(new Error("请输入正确的手机号"));; 
        } else { return callback() } 
    };
    const isIDAvailable=(rule,value,callback)=>{ 
        var myreg=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;  
        if (!myreg.test(value)) { 
          return callback(new Error("请输入正确的身份证号"));; 
        } else { return callback() } 
    };
   return {
      form: {
        userName: "",
        email: "",
        trueName: "",
        IDCard: "",
        company: "",
        phone: "",
        roleId: "",
        managerUser: ""
      },
      managerUserList: [],
      options: [],
      rules:{
        IDCard: [
            { validator:isIDAvailable,required: true, message: '请正确填写身份证号', trigger: 'blur' }
        ],
        phone: [
            {validator:isPoneAvailable, required: true, message: '请正确填写手机号', trigger: 'blur' }
        ],
      }
    };
  },
  created() {
    this.getRolePermission();
    let params = {
      page: 1,
      rows: 10,
      user_name: this.$route.params.user_name,
      user_id: this.$route.params.user_id
    };
    console.log(this.$route.params);
    this.userList(params);
    this.auditNameList();
  },
  methods: {
    //获取上级
    async auditNameList() {
      let res = await this.$api.auditNameList();
      if (res.data.result === 0) {
        this.managerUserList = res.data.rows.map(item => {
          return { label: item.userName, value: item.userName };
        });
      }
    },
    async userList(params) {
      let res = await this.$api.userList(params);
      if (res.data.result === 0) {
        let data = res.data.rows[0];
        let { trueName, phone, email, company, IDCard } = data;
        //    this.form = { trueName,phone, email,company, IDCard };
        //    this.form.roleId = data.role;
      }
    },
    onSubmit() {
      if (this.$route.params.user_name) {
        this.updateUser(this.form);
      } else {
        this.addUser(this.form);
      }
    },
    async getRolePermission() {
      let res = await this.$api.getRolePermission();
      if (res.data.result === 0) {
        this.options = res.data.role.map(item => {
          return { value: Number(item.role_id), label: item.role_name };
        });
      }
    },
    async addUser(params) {
      let res = await this.$api.addUser(params);
      if (res.data.result === 0) {
        this.$message.success(`用户添加成功`)
        this.$router.push("/userManagement/userLists")
      }
    },
    async updateUser(params) {
      let res = await this.$api.updateUser(params);
      if (res.data.result === 0) {
        this.$message.success(`用户修改成功`)
        this.$router.push("/userManagement/userLists")
      }
    }
  }
};
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


