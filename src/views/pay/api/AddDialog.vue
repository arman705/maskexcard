<template>
  <CommonDialog
    width="750px"
    :title="data ? '编辑' : '新增'"
    :visible="visible"
    :close-on-click-modal="false"
    @open="onOpen"
    @close="onClose"
    @closed="onClosed"
  >
    <el-form
      ref="formEl"
      :model="formData"
      :rules="rules"
      size="small"
      label-position="left"
      label-width="110px"
    >
      <el-form-item label="接口类型" prop="payTypeCode">
        <el-select
          v-model="formData.payTypeCode"
          placeholder="请选择接口类型"
          style="width: 100%"
        >
          <el-option
            v-for="item in typeList"
            :key="item.payTypeCode"
            :label="item.payTypeName"
            :value="item.payTypeCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="接口代码" prop="apiCode">
        <el-input v-model="formData.apiCode" placeholder="请输入接口代码" />
      </el-form-item>
      <el-form-item label="接口名称" prop="apiName">
        <el-input v-model="formData.apiName" placeholder="请输入接口名称" />
      </el-form-item>
      <el-form-item label="支付类型" prop="apiTypeCode">
        <el-select
          v-model="formData.apiTypeCode"
          placeholder="请选择支付类型"
          style="width: 100%"
        >
          <el-option
            v-for="item in apiTypeList"
            :key="item.apiTypeCode"
            :label="item.apiTypeName"
            :value="item.apiTypeCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="应用场景" prop="scenario">
        <el-radio-group v-model="formData.scenario">
          <el-radio :label="0">移动app</el-radio>
          <el-radio :label="1">移动网页</el-radio>
          <el-radio :label="2">pc网页</el-radio>
          <el-radio :label="3">微信公众平台</el-radio>
          <el-radio :label="4">手机扫码</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="扩展参数" prop="ext">
        <el-input
          type="textarea"
          :rows="4"
          v-model="formData.ext"
          placeholder="请输入扩展参数"
        />
      </el-form-item>
      <el-form-item label="状态" required prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="0">开启</el-radio>
          <el-radio :label="1">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注信息" prop="remark">
        <el-input
          type="textarea"
          :rows="4"
          v-model="formData.remark"
          placeholder="请输入备注信息"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button
        @click="onSubmit"
        :loading="loading"
        size="small"
        type="primary"
      >
        保存
      </el-button>
      <el-button @click="onClose" size="small">关闭</el-button>
    </template>
  </CommonDialog>
</template>

<script>
import CommonDialog from "@/views/components/CommonDialog.vue";
import apiPay from "@/api/pay";

export default {
  props: {
    visible: Boolean,
    data: Object,
  },
  components: {
    CommonDialog,
  },
  data() {
    return {
      typeList: [],
      apiTypeList: [],
      formData: {
        payTypeCode: "",
        apiCode: "",
        apiName: "",
        apiTypeCode: "",
        scenario: 0,
        ext: "",
        status: 0,
        remark: "",
      },
      rules: {
        apiTypeCode: [
          {
            required: true,
            message: "请选择接口类型",
            trigger: "change",
          },
        ],
        apiCode: [
          {
            required: true,
            message: "请输入接口代码",
            trigger: "change",
          },
        ],
        apiName: [
          {
            required: true,
            message: "请输入接口名称",
            trigger: "change",
          },
        ],
        payTypeCode: [
          {
            required: true,
            message: "请选择支付类型",
            trigger: "change",
          },
        ],
        scenario: [
          {
            required: true,
            message: "请选择应用场景",
            trigger: "change",
          },
        ],
      },
      loading: false,
    };
  },
  created() {
    this.fetchTypeList();
    this.fetchApiTypeList();
  },
  methods: {
    onOpen() {
      if (this.data) this.formData = { ...this.data };
    },
    onClose() {
      this.$emit("update:visible", false);
    },
    onClosed() {
      this.$refs.formEl.resetFields();
    },
    async fetchTypeList() {
      const [, res] = await apiPay.payTypeList({
        pageSize: 9999,
        pageNumber: 1,
        status: 0,
      });
      if (res && res.code == 0) {
        this.typeList = res.data.records || [];
      }
    },
    async fetchApiTypeList() {
      const [, res] = await apiPay.payApiTypeList({
        pageSize: 9999,
        pageNumber: 1,
      });
      if (res && res.code == 0) {
        this.apiTypeList = res.data.records || [];
      }
    },
    onSubmit() {
      this.$refs.formEl.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          const requestApi = this.data ? apiPay.payApiUpdate : apiPay.payApiAdd;
          const [, res] = await requestApi({
            ...this.formData,
            payTypeName:
              this.typeList.find(
                (item) => item.payTypeCode === this.formData.payTypeCode
              )?.payTypeName || "",
            apiTypeName:
              this.apiTypeList.find(
                (item) => item.apiTypeCode === this.formData.apiTypeCode
              )?.apiTypeName || "",
          });
          if (res && res.code == 0) {
            this.$emit("submit-success");
            this.onClose();
          }
        }
        this.loading = false;
      });
    },
  },
};
</script>
