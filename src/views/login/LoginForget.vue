<template>
  <LoginLayout class="login-sign-reset">
    <template>
      <p class="color-dart sing-in-text">重置密码</p>
      <p class="wel">为您的账户重置登录密码</p>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="0"
        class="demo-ruleForm"
      >
        <el-form-item prop="email">
          <el-input
            v-model.trim="ruleForm.email"
            :placeholder="$t('logopage.email')"
          >
            <i slot="prefix" class="el-input__icon el-icon-message"></i>
          </el-input>
        </el-form-item>

        <el-form-item prop="code" class="email-code">
          <el-input
            placeholder="验证码"
            v-model.trim="ruleForm.code"
            autocomplete="off"
            ><i slot="prefix" class="el-input__icon vector"></i
          ></el-input>
          <SendCode :confirm="sendEmail" />
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            type="password"
            :placeholder="$t('logopage.password')"
            v-model.trim="ruleForm.pass"
            autocomplete="off"
            ><i slot="prefix" class="el-input__icon el-icon-unlock"></i
          ></el-input>
        </el-form-item>
        <el-form-item prop="confirmPwd">
          <el-input
            type="password"
            placeholder="确认密码"
            v-model.trim="ruleForm.confirmPwd"
            autocomplete="off"
            ><i slot="prefix" class="el-input__icon el-icon-unlock"></i
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            style="width: 100%"
            v-loading="loading"
            :disabled="loading"
            type="primary"
            @click="submitForm('ruleForm')"
            >确定</el-button
          >
          <ul class="center-center btm-desc">
            <li>知道您的密码？</li>
            <li
              class="now-register"
              @click="$router.push({ name: 'loginSignIn' })"
            >
              {{ $t("logopage.singin") }}
            </li>
          </ul>
        </el-form-item>
      </el-form>
    </template>
  </LoginLayout>
</template>

<script>
import LoginLayout from "@/views/login/components/LoginLayout.vue";
import apiUser from "@/api/user";
export default {
  name: "LoginSignIn",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 8 || value.length > 20) {
        callback(new Error("密码长度为8-20位字符"));
      } else {
        if (this.ruleForm.confirmPwd !== "") {
          this.$refs.ruleForm.validateField("confirmPwd");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      rules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: ["blur", "change"],
          },
        ],
        pass: [{ validator: validatePass, trigger: ["blur", "change"] }],
        confirmPwd: [{ validator: validatePass2, trigger: ["blur", "change"] }],
      },
      ruleForm: { email: "", code: "", pass: "", confirmPwd: "" },
    };
  },
  components: { LoginLayout },
  methods: {
    sendEmail() {
      return new Promise((resolve) => {
        this.$refs.ruleForm.validateField("email", (err) => {
          if (err) {
            this.$message.error(err);
            resolve(false);
            return;
          }
          apiUser.sendEmail({ email: this.ruleForm.email });
          resolve(true);
        });
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return;
        this.loading = true;
        const { code, confirmPwd, email } = this.ruleForm;
        const [error] = await apiUser.modifyPwdByEmail({
          code,
          confirmPwd,
          email,
        });
        this.loading = false;
        if (error) return;
        this.$message.success("修改成功");
        this.$router.push({ name: "loginSignIn" });
      });
    },
  },
};
</script>
<style scoped lang="less">
.forget,
.btm-desc {
  line-height: 1;
  text-align: right;
  font-size: 12px;
  color: #bbc5d4;
}
.btm-desc {
  margin-top: 15px;
}
.now-register {
  margin-left: 6px;
  cursor: pointer;
}
.now-register {
  color: #3b63c9;
  text-decoration: underline;
}
</style>
