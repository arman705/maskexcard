<template>
  <el-dialog title="登录设置" :visible.sync="dialogVisible" width="50%">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="230px"
      class="demo-ruleForm"
      v-loading="loading"
    >
      <el-form-item label="*验证方式" prop="loginType">
        <el-radio-group v-model.trim="ruleForm.loginType">
          <el-radio :label="0">仅登录密码验证</el-radio>
          <el-radio v-if="ruleForm.isBand" :label="1"
            >登录密码+谷歌组合验证(需绑定谷歌验证)</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="谷歌验证码" v-if="ruleForm.isBand" prop="code">
        <el-input v-model.trim="ruleForm.code"></el-input>
      </el-form-item>

      <el-form-item v-if="ruleForm.isBand">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确定</el-button
        >
        <el-button @click="resetForm('ruleForm')">关闭</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import apiUser from "@/api/user";
const initForm = () => {
  return {
    isBand: 0,
    code: "",
    loginType: 0,
  };
};
export default {
  name: "OperationLogin",
  data() {
    return {
      dialogVisible: false,
      loading: false,
      ruleForm: initForm(),
      rules: {
        code: [
          { required: true, message: "谷歌验证码", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return;
        this.loading = true;
        const [error] = await apiUser.loginTypePpdate({
          code: this.ruleForm.code,
          loginType: this.ruleForm.loginType,
        });
        if (error) {
          this.loading = false;
          return;
        }
        this.loading = false;
        this.$message.success("操作成功");
        this.$store.commit("user/loginOut");
        this.$router.push({ name: "loginSignIn" });
      });
    },
    resetForm() {
      this.$refs["ruleForm"].resetFields();
      this.dialogVisible = false;
      this.ruleForm = initForm();
    },
    show(form = {}) {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs["ruleForm"].resetFields();
        this.ruleForm = { ...form };
      });
    },
  },
};
</script>
<style scoped lang="less">
@import "@/assets/style/mixins/ellipsis.less";
.msg-yips {
  max-width: 412px;
  height: 29px;
  padding: 0 16px;
  border-radius: 29px;
  border: 1px solid #00bda1;
  color: @primary;
  line-height: 1;
  .ellipsis();
  .el-icon-chat-line-round {
    font-size: 24px;
    margin-right: 8px;
  }
}
</style>
