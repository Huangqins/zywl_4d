<template>
	<div class="login">
		<div class="loginForm">
			<el-form :model="loginForm" ref="loginForm" label-position="left">
		<el-form-item prop="userName">
          <!-- <span class="svg-container svg-container_login">
            <svg-icon icon-class="user" />
          </span> -->
          <el-input  v-model="loginForm.userName" placeholder="username" ></el-input>
        </el-form-item>
		<el-form-item prop="password">
		  <el-input  v-model="loginForm.password" placeholder="password" type="password" @keyup.enter.native="handleLogin"></el-input>
		</el-form-item>
		<el-form-item><el-button type="primary" @click.native.prevent="handleLogin" style="width:100%">登录</el-button></el-form-item>
		</el-form>
		</div>
	</div>
</template>
<script>
import saltedMd5  from 'md5-js'
import { mapActions } from 'vuex'
	export default {
		data() {
			return {
				loginForm: {
					userName: "",
					password: ""
				}
			}
		},
		methods: {
			...mapActions(['Login']),
			async _login() {
				let salt = 'zywl', // 密码加盐
					params = {...this.loginForm},
					res;
					params.password = saltedMd5(params.password, salt);
					res = await this.Login(params);
					switch (res.data.result) {
						case 0: 
							this.$message.success('登录成功')
							this.$router.push('/dashboard')
							break;
						case 1:
							this.$message.error(`用户名不存在`);
							break;
						case 2:
							this.$message.error(`密码错误`);
							break;
						 case 3:
							this.$message.error(`验证码错误`);
							break;
						case 4:
							this.$message.error(`验证码失效`);
							break;
						case -1:
							this.$message.error(`登录失败`);
							break;
						case -2:
							this.$message.error(`用户尚无权限,请 联系管理员分配`);
							break;
						default:
							this.$message.error(`用户尚未被授权或者授权文件过期`);
							break;
						}			
			},
			handleLogin() {
				this._login();
			},
		}

	}
</script>

<style scoped lang="scss">
.login {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	.loginForm {
		width: 360px;
	}
}
</style>