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
      <el-form-item label="上级菜单" prop="pid">
        <el-cascader
          v-model="ruleForm.pid"
          :filter-method="filterCascader"
          :show-all-levels="false"
          :options="topMenu"
          :props="cascaderProps"
          :filterable="true"
        />
      </el-form-item>
      <el-form-item label="菜单类型" prop="entType">
        <el-radio-group v-model="ruleForm.entType">
          <el-radio label="ML">菜单</el-radio>
          <el-radio label="PB">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="`${typeTxt}名称`" prop="entName">
        <el-input v-model.trim="ruleForm.entName" />
      </el-form-item>
      <el-form-item v-if="formKey.includes('url')" prop="url" label="页面路由">
        <el-input v-model.trim="ruleForm.url" />
        <div style="color: #f56c6c; line-height: 18px">
          备注：有路由的须填写路由
        </div>
      </el-form-item>
      <el-form-item
        label="权限标识"
        prop="accreditName"
        v-if="formKey.includes('accreditName')"
      >
        <el-input v-model.trim="ruleForm.accreditName" />
        <div style="color: #f56c6c; line-height: 18px">
          备注：权限由页面路由拼接上权限字段(
          <i v-for="(item, idxs) in paramsKey" :key="idxs">{{ item }},</i>
          ) {{ this.doc.entName || "添加权限例子" }}：{{
            this.doc.url || "/manager/menus"
          }}
          => {{ permDescFn(this.doc.url) || "manager:menus:add" }}
        </div>
      </el-form-item>
      <el-form-item prop="entSort" label="排序">
        <el-input v-model.trim="ruleForm.entSort" />
        <div style="color: #f56c6c; line-height: 18px">
          备注：升序，越小越在前面
        </div>
      </el-form-item>
      <el-form-item
        v-if="formKey.includes('menuIcon')"
        prop="menuIcon"
        label="图标名称"
      >
        <el-input
          v-model.trim="ruleForm.menuIcon"
          placeholder="填写el-icon-xxx"
        />
        <a
          style="color: #409eff"
          href="https://element.eleme.io/#/zh-CN/component/icon"
          target="_blank"
          >到 element UI 图标 复制图标</a
        >
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-radio-group v-model="ruleForm.state">
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
import { mapGetters } from "vuex";
const initForm = () => {
  return {
    pid: "", // 上级菜单
    entType: "", // 菜单类型
    url: "", // 页面路由
    accreditName: "", // 权限标识
    entSort: 0, // 排序
    menuIcon: "", // 图标名称
    sysType: "MGR",
    entName: "", // 菜单名称
    entId: "", //编辑 菜单ID
    state: 1, // 状态
  };
};
export default {
  name: "ResourceAdd",
  props: {
    topMenu: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dialogVisible: false,
      doc: {},
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
        pid: [{ required: true, message: "必填", trigger: "blur" }],
        entType: [{ required: true, message: "必填", trigger: "blur" }],
        accreditName: [{ required: true, message: "必填", trigger: "blur" }],
        entSort: [{ required: true, message: "必填", trigger: "blur" }],
        entName: [{ required: true, message: "必填", trigger: "blur" }],
      },
      //childList entId entName
      cascaderProps: {
        children: "childList",
        label: "entName",
        value: "entId",
        checkStrictly: true,
        expandTrigger: "hover",
      },
    };
  },
  computed: {
    formKey() {
      const formKey = Object.keys(this.ruleForm);
      const menuKEY = ["url", "menuIcon"];
      const buttonKEY = ["accreditName"];
      const allkey = [...menuKEY, ...buttonKEY];
      return this.ruleForm.entType === "ML"
        ? [...formKey.filter((item) => !allkey.includes(item)), ...menuKEY]
        : [...formKey.filter((item) => !allkey.includes(item)), ...buttonKEY];
    },
    title() {
      return this.typeList.find((item) => item.key === this.curType).label;
    },
    typeTxt() {
      switch (this.ruleForm.entType) {
        case 0:
          return "目录";
        case "ML":
          return "菜单";
        case "PB":
          return "按钮";
        default:
          return "";
      }
    },
    ...mapGetters("user", ["paramsKey"]),
    planeMemu() {
      return this.treeToArray(this.topMenu);
    },
  },
  watch: {
    "ruleForm.pid": function (val) {
      const id = Array.isArray(val) ? val[val.length - 1] : val;
      this.doc = this.planeMemu.find((item) => item.entId === id) || {};
      console.log(this.doc);
    },
  },
  methods: {
    permDescFn(path) {
      if (!path) return;
      return `${path.replace(/\//gi, ":").replace(/^:/gi, "")}:add`;
    },
    treeToArray(tree) {
      return tree.reduce((res, item) => {
        const { childList, ...i } = item;
        return res.concat(
          i,
          childList && childList.length ? this.treeToArray(childList) : []
        );
      }, []);
    },
    filterCascader(node, text) {
      if (!text) return true;
      return node.text.indexOf(text) !== -1;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return;
        this.loading = true;
        const result = {};
        for (const key in this.ruleForm) {
          if (this.formKey.includes(key)) {
            result[key] = this.ruleForm[key];
          }
        }
        if (Array.isArray(result.pid)) {
          result.pid = result.pid[result.pid.length - 1];
        }
        const [error] = await apiUser[
          `${this.curType === 0 ? "sysEntsAdd" : "sysEntsUpdate"}`
        ](result);
        this.loading = false;
        if (error) return;

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
      if (type === 2) {
        for (let key in this.ruleForm) {
          this.ruleForm[key] = form[key];
        }
      }
      if (type === 0) {
        this.ruleForm.pid = form.pid;
        console.log(type, this.ruleForm.pid);
      }
      this.$nextTick(() => {
        this.$refs["ruleForm"].clearValidate();
      });
    },
  },
};
</script>
