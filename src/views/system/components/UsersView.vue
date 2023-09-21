<template>
  <el-dialog
    title="查看-用户详情"
    :append-to-body="body"
    :visible.sync="dialogVisible"
    width="50%"
  >
    <el-form
      status-icon
      ref="ruleForm"
      label-width="230px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="loginUsername">
        <el-input disabled v-model.trim="ruleForm.loginUsername"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="realname">
        <el-input disabled v-model.trim="ruleForm.realname"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input disabled v-model.trim="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="telphone">
        <el-input disabled v-model.trim="ruleForm.telphone"></el-input>
      </el-form-item>
      <el-form-item label="超级管理(超管拥有所有菜单权限)" prop="isAdmin">
        <el-radio-group disabled v-model.trim="ruleForm.isAdmin">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-radio-group disabled v-model.trim="ruleForm.state">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">停用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button @click="dialogVisible = false">关闭</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: "UsersView",
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        sysUserId: "",
        loginUsername: "",
        realname: "",
        pwd: "",
        email: "",
        telphone: "",
        isAdmin: 1,
        state: 1,
      },
    };
  },
  props: {
    body: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    show(row = {}) {
      console.log(row);
      this.ruleForm = row;
      this.dialogVisible = true;
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
