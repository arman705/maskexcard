<template>
  <el-dialog title="查看" :visible.sync="dialogVisible" width="50%">
    <el-form
      status-icon
      ref="ruleForm"
      label-width="230px"
      class="demo-ruleForm"
    >
      <!--   创建者ID  createdUid  createdAt  updatedAt-->
      <el-form-item label="消息ID">
        <el-input disabled :value="ruleForm.msgId"></el-input>
      </el-form-item>
      <el-form-item label="消息标题">
        <el-input disabled :value="ruleForm.msgTitle"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-input disabled :value="ruleForm.state ? '显示' : '隐藏'"></el-input>
      </el-form-item>
      <el-form-item label="创建者ID">
        <el-input disabled :value="ruleForm.createdUid"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input disabled :value="ruleForm.createdAt"></el-input>
      </el-form-item>
      <el-form-item label="修改时间">
        <el-input disabled :value="ruleForm.updatedAt"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input
          type="textarea"
          disabled
          v-model.trim="ruleForm.content"
        ></el-input>
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
  methods: {
    show(row = {}) {
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
