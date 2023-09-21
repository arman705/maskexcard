<template>
  <LoginLayout
    class="login-register-page"
    :class="{ 'login-sign-reset': status == 1 }"
  >
    <template>
      <p class="color-dart sing-in-text">注册</p>
      <p class="wel">立即创建您 MaskEX Card 账户！</p>
      <el-form
        :model="ruleFormOne"
        status-icon
        :rules="rulesOne"
        v-show="status == 0"
        ref="ruleFormOne"
        label-width="0"
        class="demo-ruleForm"
      >
        <el-form-item prop="email">
          <el-input
            v-model.trim="ruleFormOne.email"
            :placeholder="$t('logopage.email')"
          >
            <i slot="prefix" class="el-input__icon el-icon-message"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="loginUsername">
          <el-input v-model.trim="ruleFormOne.loginUsername" placeholder="昵称">
            <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="telphone">
          <el-input v-model.trim="ruleFormOne.telphone" placeholder="电话">
            <i slot="prefix" class="el-input__icon el-icon-phone"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            style="width: 100%"
            type="primary"
            @click="submitFormOne('ruleFormOne')"
            >下一步</el-button
          >
          <ul class="center-center btm-desc">
            <li>已经有账号？</li>
            <li
              class="now-register"
              @click="$router.push({ name: 'loginSignIn' })"
            >
              {{ $t("logopage.singin") }}
            </li>
          </ul>
        </el-form-item>
      </el-form>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        v-show="status == 1"
        ref="ruleForm"
        label-width="0"
        class="demo-ruleForm"
      >
        <el-form-item prop="industryType">
          <el-select
            style="width: 100%"
            v-model.trim="ruleForm.industryType"
            placeholder="行业类型"
          >
            <el-option
              v-for="item in service"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="companyWebsite">
          <el-input
            v-model.trim="ruleForm.companyWebsite"
            placeholder="公司网站"
          >
            <i slot="prefix" class="el-input__icon el-icon-eleme"></i>
          </el-input>
        </el-form-item>
        <el-form-item class="email-code" prop="code">
          <el-input v-model.trim="ruleForm.code" placeholder="邮箱验证码">
            <i slot="prefix" class="el-input__icon vector"></i>
          </el-input>
          <SendCode :confirm="sendEmail" />
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input
            v-model.trim="ruleForm.pwd"
            type="password"
            placeholder="密码"
          >
            <i slot="prefix" class="el-input__icon el-icon-unlock"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <div class="center-center">
            <el-button
              v-loading="loading"
              :disabled="loading"
              style="width: 40%"
              type="primary"
              @click="submitForm('ruleForm')"
              >注册</el-button
            >
            <el-button
              v-loading="loading"
              :disabled="loading"
              style="width: 40%"
              class="back-btn"
              @click="changeStatus(0)"
              >返回上一步</el-button
            >
          </div>

          <ul class="center-center btm-desc">
            <li>已经有账号？</li>
            <li
              class="now-register cursor-pointer"
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
import service from "@/plugins/service.json";
import apiUser from "@/api/user";
export default {
  name: "LoginForget",
  data() {
    const validatelphone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入电话"));
      } else {
        if (/[^+\-0-9]/gi.test(value)) {
          callback(new Error("必须是一个有效的电话号码"));
          return;
        }
        callback();
      }
    };
    return {
      loading: false,
      status: 0,
      service,
      rulesOne: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        loginUsername: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {
            min: 4,
            message: "昵称至少有4个字符",
            trigger: ["blur", "change"],
          },
          {
            max: 50,
            message: "昵称不能超过50个字符",
            trigger: ["blur", "change"],
          },
        ],
        telphone: [{ validator: validatelphone, trigger: ["blur", "change"] }],
      },
      ruleFormOne: {
        email: "",
        loginUsername: "",
        telphone: "",
      },
      rules: {
        industryType: [
          { required: true, message: "选择行业", trigger: "change" },
        ],
        companyWebsite: [
          { required: true, message: "请输入公司网站", trigger: "change" },
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 8,
            message: "密码字段必须至少有8个字符",
            trigger: ["blur", "change"],
          },
          {
            max: 20,
            message: "密码字段不能超过20个字符",
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
      },
      ruleForm: {
        industryType: "",
        companyWebsite: "",
        code: "",
        pwd: "",
      },
      count: "59",
      click: "获取短信验证码",
      isDisabled: false,
    };
  },
  components: { LoginLayout },
  methods: {
    sendEmail() {
      return new Promise((resolve) => {
        this.$refs.ruleFormOne.validateField("email", (err) => {
          if (err) {
            this.$message.error(err);
            resolve(false);
            return;
          }
          apiUser.sendEmail({ email: this.ruleFormOne.email });
          resolve(true);
        });
      });
    },
    changeStatus(status) {
      this.clearIntervalFn();
      this.status = status;
    },
    clearIntervalFn() {
      this.isDisabled = false;
      if (!this.timer) return;
      clearInterval(this.timer);
      this.timer = null;
    },
    submitFormOne(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return;
        this.changeStatus(1);
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return;
        this.loading = true;
        const [error] = await apiUser.userRegister({
          ...this.ruleForm,
          ...this.ruleFormOne,
        });
        this.loading = false;
        if (error) return;
        this.$message({
          message: "注册成功",
          type: "success",
        });
        this.$router.push({ name: "loginSignIn" });
      });
    },
    getIdentifyCodeBtn() {
      this.countTime();
    },
    countTime() {
      const TIME_COUNT = 60; //倒计时60秒
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.isDisabled = true;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.clearIntervalFn();
          }
        }, 1000);
      }
    },
  },
  beforeDestroy() {
    this.clearIntervalFn();
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
}
.now-register {
  color: #3b63c9;
  text-decoration: underline;
}
.email-code {
  position: relative;
}
.login-register-page {
  ::v-deep .back-btn {
    background: #606060;
    border-color: #606060;
    color: #fff !important;
  }
}
</style>
