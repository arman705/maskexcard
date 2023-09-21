<template>
  <LoginLayout>
    <template>
      <p class="color-dart sing-in-text">运营登录</p>
      <p class="wel">{{ $t("logopage.wel") }}</p>
      <VerificationCode ref="VerificationCode" @updateCode="updateCode" />
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="0"
        class="demo-ruleForm"
      >
        <el-form-item prop="loginUsername">
          <el-input v-model.trim="ruleForm.loginUsername" placeholder="用户名">
            <i slot="prefix" class="el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input
            type="password"
            :placeholder="$t('logopage.password')"
            v-model.trim="ruleForm.pwd"
            autocomplete="off"
            ><i slot="prefix" class="el-input__icon el-icon-unlock"></i
          ></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <p
            class="forget cursor-pointer"
            @click="$router.push({ name: 'LoginForget' })"
          >
            {{ $t("logopage.forgetPassWord") }}
          </p>
        </el-form-item> -->
        <el-form-item>
          <el-button
            v-loading="loading"
            :disabled="loading"
            style="width: 100%"
            type="primary"
            @click="submitForm('ruleForm')"
            >{{ $t("logopage.singin") }}</el-button
          >
          <!-- <ul class="center-center btm-desc">
            <li>{{ $t("logopage.noAcount") }}</li>
            <li
              class="now-register"
              @click="$router.push({ name: 'LoginRegister' })"
            >
              {{ $t("logopage.nowRegister") }}
            </li>
          </ul> -->
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
    return {
      loading: false,
      rules: {
        loginUsername: [
          { required: true, message: "用户名必填", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
      ruleForm: {
        loginUsername: "",
        pwd: "",
        code: "",
      },
    };
  },
  components: { LoginLayout },
  methods: {
    setUser(data) {
      this.$store.commit("user/setToken", {
        user: {},
        token: data.iToken,
      });
      this.$router.push({ path: "/" });
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return;
        this.loading = true;
        const [error, res] = await apiUser.userLogin(this.ruleForm);
        this.loading = false;
        if (error) {
          if (error.code === 9991) {
            this.$refs.VerificationCode.show();
          }
          return;
        }
        this.setUser(res.data);
      });
    },
    async updateCode(code) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const [error, res] = await await apiUser.userLogin({
        ...this.ruleForm,
        code,
      });
      if (error) {
        loading.close();
        this.$refs.VerificationCode.resCode();
        this.$message.error(error.msg);
        return;
      }
      this.$refs.VerificationCode.close();
      loading.close();
      this.setUser(res.data);
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
