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
      <!-- 创建者ID  创建者ID 创建者ID createdUid  createdAt  updatedAt-->
      <el-form-item v-if="ruleForm.msgId" label="消息ID" prop="msgId">
        <el-input disabled v-model.trim="ruleForm.msgId"></el-input>
      </el-form-item>
      <el-form-item label="消息标题" prop="msgTitle">
        <el-input v-model.trim="ruleForm.msgTitle"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-radio-group v-model="ruleForm.state">
          <el-radio :label="1">显示</el-radio>
          <el-radio :label="0">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input type="textarea" v-model.trim="ruleForm.content"></el-input>
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
const initForm = () => {
  return {
    msgTitle: "",
    msgId: "",
    state: 1,
    content: "",
  };
};
export default {
  name: "RolesAdd",
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
        msgTitle: [{ required: true, message: "必填", trigger: "blur" }],
        state: [{ required: true, message: "必填", trigger: "blur" }],
        content: [{ required: true, message: "必填", trigger: "blur" }],
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
          `${this.curType === 0 ? "sysMsgAdd" : "sysMsgUpdate"}`
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
      this.ruleForm = initForm();
    },
    show(form = {}, type = 0) {
      this.ruleForm = initForm();
      this.curType = type;
      this.dialogVisible = true;

      if (form.msgTitle) {
        for (let key in this.ruleForm) {
          this.ruleForm[key] = form[key];
        }
      }
      this.dialogVisible = true;
    },
  },
};
</script>
