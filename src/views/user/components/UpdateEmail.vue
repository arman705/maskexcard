<template>
  <el-dialog
    title="修改绑定邮箱"
    class="g-dialog-component"
    :visible.sync="dialogPass"
    :before-close="handleClose"
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
      <el-form-item label="新邮箱 :" prop="email">
        <el-input autocomplete="off" v-model.trim="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item class="email-code" label="邮箱验证码 :" prop="code">
        <el-input
          v-model.trim="ruleForm.code"
          :confirm="sendEmail"
          autocomplete="off"
        ></el-input>
        <SendCode :confirm="sendEmail" ref="emailCode" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          v-loading="loading"
          :disabled="loading"
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
  name: "UpdateEmail",
  data() {
    return {
      dialogPass: false,
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
      },
      ruleForm: { code: "", email: "" },
    };
  },
  computed: {
    ...mapState("user", ["user"]),
  },
  methods: {
    handleClose(done) {
      this.$refs.ruleForm.resetFields();
      this.$refs.emailCode.clearIntervalFn();
      done();
    },
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
    show() {
      this.dialogPass = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return;
        this.loading = true;
        const [error] = await apiUser.modifyEmail({
          newEmail: this.ruleForm.email,
          code: this.ruleForm.code,
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
