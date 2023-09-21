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
      <el-form-item v-if="ruleForm.id" label="ID" prop="msgId">
        <el-input disabled v-model.trim="ruleForm.id"></el-input>
      </el-form-item>
      <el-form-item label="标签名" prop="name">
        <el-input v-model.trim="ruleForm.name" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-input v-model.trim="ruleForm.type" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="数据值" prop="value">
        <el-input v-model.trim="ruleForm.value" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input
          v-model.trim="ruleForm.sort"
          :disabled="disabled"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input
          type="textarea"
          v-model.trim="ruleForm.description"
          :disabled="disabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input
          type="textarea"
          :disabled="disabled"
          v-model.trim="ruleForm.remarks"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="!disabled">
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
    description: "",
    id: "",
    name: "",
    remarks: "",
    sort: 0,
    type: "",
    value: "",
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
        name: [{ required: true, message: "必填", trigger: "blur" }],
        type: [{ required: true, message: "必填", trigger: "blur" }],
        value: [{ required: true, message: "必填", trigger: "blur" }],
      },
    };
  },
  computed: {
    title() {
      return this.typeList.find((item) => item.key === this.curType).label;
    },
    disabled() {
      return this.curType === 1;
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
          `${this.curType === 0 ? "dictAdd" : "dictUpdate"}`
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

      if (form.name) {
        for (let key in this.ruleForm) {
          this.ruleForm[key] = form[key];
        }
      }
      this.dialogVisible = true;
    },
  },
};
</script>
