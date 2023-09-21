<template>
  <el-dialog
    :append-to-body="true"
    title="修改登录密码"
    :visible.sync="dialogVisible"
    width="30%"
  >
    <el-form
      v-loading="loading"
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="旧密码" prop="originalPwd">
        <el-input v-model="ruleForm.originalPwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="confirmPwd">
        <el-input v-model="ruleForm.confirmPwd"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="checkPass">
        <el-input v-model="ruleForm.checkPass"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="dialogVisible = false">关闭</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import apiUser from "@/api/user";
export default {
  name: "ChangePassword",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.confirmPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      dialogVisible: false,
      ruleForm: {
        originalPwd: "",
        confirmPwd: "",
        checkPass: "",
      },
      rules: {
        originalPwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
        confirmPwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
          { validator: validatePass, trigger: "blur" },
        ],
        checkPass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
          { validator: validatePass2, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    show() {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate();
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return;
        this.loading = true;
        const [error] = await apiUser.modifyPwd({
          originalPwd: this.ruleForm.originalPwd,
          confirmPwd: this.ruleForm.confirmPwd,
        });
        this.loading = false;
        if (error) return;
        this.$message.success("修改成功");
        this.$store.commit("user/loginOut");
        this.$router.push({ name: "loginSignIn" });
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="less"></style>
