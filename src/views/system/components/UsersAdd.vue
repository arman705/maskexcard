<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="50%">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="230px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="loginUsername">
        <el-input v-model.trim="ruleForm.loginUsername"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="realname">
        <el-input v-model.trim="ruleForm.realname"></el-input>
      </el-form-item>
      <el-form-item label="密码(请填写6到12位密码)" prop="pwd">
        <el-input v-model.trim="ruleForm.pwd"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model.trim="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="telphone">
        <el-input v-model.trim="ruleForm.telphone"></el-input>
      </el-form-item>
      <el-form-item label="超级管理(超管拥有所有菜单权限)" prop="isAdmin">
        <el-radio-group v-model.trim="ruleForm.isAdmin">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-radio-group v-model.trim="ruleForm.state">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">停用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >保存</el-button
        >
        <el-button @click="resetForm('ruleForm')">关闭</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import apiUser from "@/api/user";
const initPwd = () => {
  return [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      min: 6,
      max: 12,
      message: "长度在 6 到 12 个字符",
      trigger: "blur",
    },
  ];
};
const initForm = () => {
  return {
    sysUserId: "",
    loginUsername: "",
    realname: "",
    pwd: "",
    email: "",
    telphone: "",
    isAdmin: 1,
    state: 1,
  };
};
export default {
  name: "UsersAdd",
  data() {
    return {
      dialogVisible: false,
      curType: 0,
      typeList: [
        {
          key: 0,
          label: "新增",
        },
        {
          key: 1,
          label: "查看",
        },
        {
          key: 2,
          label: "编辑",
        },
      ],
      ruleForm: initForm(),
      rules: {
        loginUsername: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        realname: [
          { required: true, message: "请输入用户昵称", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        pwd: initPwd(),
      },
    };
  },
  computed: {
    title() {
      return this.typeList.find((item) => item.key === this.curType).label;
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return;
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        const data = {};
        for (let key in this.ruleForm) {
          if (this.ruleForm[key] !== "") {
            data[key] = this.ruleForm[key];
          }
        }
        const [error] = await apiUser[
          `${this.curType === 0 ? "addSysUsers" : "sysUsersUpdate"}`
        ](data);
        if (error) {
          loading.close();
          return;
        }
        loading.close();
        this.resetForm();
        this.$emit("addSuccess");
      });
    },
    resetForm() {
      this.$refs["ruleForm"].resetFields();
      this.dialogVisible = false;
      this.rules.pwd = initPwd();
      this.ruleForm = initForm();
    },
    show(form = {}, type = 0) {
      if (form.loginUsername) {
        for (let key in form) {
          if (
            this.ruleForm[key] !== undefined &&
            !["", null].includes(form[key])
          ) {
            this.ruleForm[key] = form[key];
          }
        }
      }
      this.curType = type;
      this.dialogVisible = true;

      if (this.curType === 2) {
        this.rules.pwd.splice(0, 1);
      }
      if (this.curType === 0) {
        this.$nextTick(() => {
          this.$refs["ruleForm"].resetFields();
        });
      }
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
