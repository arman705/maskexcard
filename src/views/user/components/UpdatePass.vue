<template>
  <el-dialog
    title="修改密码"
    class="g-dialog-component"
    :visible.sync="dialogPass"
    width="30%"
  >
    <el-form
      status-icon
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
      :model="ruleForm"
      :rules="rules"
    >
      <el-form-item label="新密码 :" prop="pass">
        <el-input
          autocomplete="off"
          type="password"
          v-model.trim="ruleForm.pass"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码 :" type="password" prop="confirmPwd">
        <el-input
          autocomplete="off"
          v-model.trim="ruleForm.confirmPwd"
        ></el-input>
      </el-form-item>
      <el-form-item class="email-code" label="邮箱验证码 :" prop="code">
        <el-input autocomplete="off" v-model.trim="ruleForm.code"></el-input>
        <SendCode :confirm="sendEmail" ref="emailCode" />
      </el-form-item>
      <el-form-item>
        <el-button
          v-loading="loading"
          :disabled="loading"
          type="primary"
          @click="submitForm('ruleForm')"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import apiUser from "@/api/user";
import { mapState } from "vuex";
export default {
  name: "UserUpdatePass",
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
      dialogPass: false,
      loading: false,
      rules: {
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
      ruleForm: { code: "", pass: "", confirmPwd: "" },
    };
  },
  computed: {
    ...mapState("user", ["user"]),
  },
  methods: {
    sendEmail() {
      return new Promise((resolve) => {
        apiUser.sendEmail({ email: this.user.email });
        resolve(true);
      });
    },
    show() {
      this.dialogPass = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return;
        this.loading = true;
        const { code, confirmPwd } = this.ruleForm;
        const [error] = await apiUser.modifyPwdByEmail({
          code,
          confirmPwd,
          email: this.user.email,
        });
        this.loading = false;
        if (error) return;
        this.$store.commit("user/loginOut");
        this.$message.success("修改成功");
        this.dialogPass = false;
        this.$router.push({ name: "loginSignIn" });
      });
    },
  },
};
</script>
<style scoped lang="less"></style>
