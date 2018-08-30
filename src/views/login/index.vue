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
		  <el-input  v-model="loginForm.password" placeholder="password" type="password"></el-input>
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
					console.log(res)
					if(res.data.result === 0) {
						this.$router.push('/about')
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