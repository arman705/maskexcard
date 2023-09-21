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
      <el-form-item
        v-if="![0].includes(curType)"
        label="角色ID"
        prop="loginUsername"
      >
        <el-input disabled v-model.trim="ruleForm.roleId"></el-input>
      </el-form-item>
      <el-form-item label="角色名称" prop="realname">
        <el-input v-model.trim="ruleForm.roleName"></el-input>
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
    roleName: "",
    roleId: "",
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
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
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
          `${this.curType === 0 ? "sysRolesAdd" : "sysRolesUpdate"}`
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
      if (form.roleName) {
        this.ruleForm = form;
      }
      this.dialogVisible = true;
    },
  },
};
</script>
