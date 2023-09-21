<template>
  <el-dialog
    :title="type === 1 ? '解绑谷歌验证' : '绑定谷歌验证'"
    class="g-dialog-component"
    :visible.sync="dialogVisible"
    width="30%"
  >
    <ul class="er-code object-cover" v-if="!type">
      <li class="img-box center-center flex-column">
        <QrcodeVue :value="erCode.QRCode" :size="131" />
        <p class="text">请使用Google身份验证器扫码上方二维码</p>
      </li>
    </ul>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="谷歌验证码" prop="code">
        <el-input v-model="ruleForm.code" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">绑定</el-button>
        <el-button @click="resetForm">关闭</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import apiUser from "@/api/user";
export default {
  name: "AuthenticatorCode",
  components: { QrcodeVue },
  data() {
    return {
      type: 0, //0 绑定 1 解绑
      loading: false,
      dialogVisible: false,
      showCode: true,
      ruleForm: {
        code: "",
      },
      rules: {
        code: [
          { required: true, message: "请输入谷歌验证码", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    showNext: {
      type: Boolean,
      default: true,
    },
    erCode: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  watch: {
    erCode(val) {
      console.log(val);
    },
  },
  methods: {
    nextFn() {
      this.$emit("nextFn");
    },
    show(type = 0) {
      this.dialogVisible = true;
      this.type = type;
    },
    close() {
      this.dialogVisible = false;
    },
    async validateCode() {
      this.loading = true;
      const [error] = await apiUser[
        `${this.type === 0 ? "sysAuthBind" : "sysAuthCancelBind"}`
      ](this.ruleForm);
      if (error) {
        this.loading = false;
        return;
      }
      this.$message.success("操作成功");
      this.loading = false;
      this.resetForm();
      this.$emit("addSuccess");
    },
    submitForm() {
      this.$refs["ruleForm"].validate((valid) => {
        if (!valid) return;
        this.validateCode();
      });
    },
    resetForm() {
      this.$refs["ruleForm"].resetFields();
      this.close();
    },
  },
};
</script>
<style scoped lang="less">
.text {
  margin-top: 16px;
}
.info-box {
  i {
    margin: 0 6px 0 0;
  }
  font-size: 12px;
  color: #3f62dc;
}
.er-code {
  .img-box {
    margin: 26px 0 10px;
    img {
      height: 100%;
    }
  }
  .code-art {
    color: @primary;
  }
}
</style>
