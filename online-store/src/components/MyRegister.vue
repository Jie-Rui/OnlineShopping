<template>
	<div id="register">
		<el-dialog
			title="用户注册"
			:visible.sync="isRegister"
			width="30%"
			:before-close="handleClose"
		>
			<el-form
				:model="RegisterUser"
				:rules="rules"
				status-icon
				ref="ruleForm"
				class="demo-ruleForm"
			>
				<el-form-item prop="name">
					<el-input
						prefix-icon="el-icon-user-solid"
						placeholder="请输入账号"
						v-model="RegisterUser.name"
					></el-input>
				</el-form-item>
				<el-form-item prop="pass">
					<el-input
						prefix-icon="el-icon-view"
						type="password"
						placeholder="请输入密码"
						v-model="RegisterUser.pass"
					></el-input>
				</el-form-item>
				<el-form-item prop="confirmPass">
					<el-input
						prefix-icon="el-icon-view"
						type="password"
						placeholder="请再次输入密码"
						v-model="RegisterUser.confirmPass"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button
						size="medium"
						type="primary"
						@click="Register"
						style="margin: 0 80px 0 100px"
						>注册</el-button
					>
					<el-button size="medium" @click="resetForm('ruleForm')"
						>重置</el-button
					>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: "MyRegister",
  props:['register'],
	data() {
    // 用户名的校验方法
    let validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入用户名"));
      }
      // 用户名以字母开头,长度在5-16之间,允许字母数字下划线
      const userNameRule = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
      if (userNameRule.test(value)) {
        //判断数据库中是否已经存在该用户名
        this.$http
          .post("/users/findUserName", {
            userName: this.RegisterUser.name
          })
          .then(res => {
            // “001”代表用户名不存在，可以注册
            if (res.data.code == "001") {
              this.$refs.ruleForm.validateField("checkPass");
              return callback();
            } else {
              return callback(new Error(res.data.msg));
            }
          })
          .catch(err => {
            return Promise.reject(err);
          });
      } else {
        return callback(new Error("字母开头,长度5-16之间,允许字母数字下划线"));
      }
    };
    // 密码的校验方法
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入密码"));
      }
      // 密码以字母开头,长度在6-18之间,允许字母数字和下划线
      const passwordRule = /^[a-zA-Z]\w{5,17}$/;
      if (passwordRule.test(value)) {
        this.$refs.ruleForm.validateField("checkPass");
        return callback();
      } else {
        return callback(
          new Error("字母开头,长度6-18之间,允许字母数字和下划线")
        );
      }
    };
    // 确认密码的校验方法
    let validateConfirmPass = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入确认密码"));
      }
      // 校验是否以密码一致
      if (this.RegisterUser.pass != "" && value === this.RegisterUser.pass) {
        this.$refs.ruleForm.validateField("checkPass");
        return callback();
      } else {
        return callback(new Error("两次输入的密码不一致"));
      }
    };
		return {
      sRegister: false, // 控制注册组件是否显示
      RegisterUser: {
        name: "",
        pass: "",
        confirmPass: ""
      },
      // 用户信息校验规则,validator(校验方法)
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        confirmPass: [{ validator: validateConfirmPass, trigger: "blur" }]
      }
    };
	},
  methods: {
    resetForm(formName) {
        this.$refs[formName].resetFields();
      },
		handleClose(done) {
			this.$confirm("确认关闭？")
				.then((_) => {
					done();
				})
				.catch((_) => {});
		},
  },
};
</script>

<style>

</style>
