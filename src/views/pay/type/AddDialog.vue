<template>
  <CommonDialog
    width="500px"
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
      <el-form-item label="支付类型代码" prop="payTypeCode">
        <el-input
          v-model="formData.payTypeCode"
          placeholder="请输入支付类型代码"
        />
      </el-form-item>
      <el-form-item label="支付类型名称" prop="payTypeName">
        <el-input
          v-model="formData.payTypeName"
          placeholder="请输入支付类型名称"
        />
      </el-form-item>
      <el-form-item label="类别" required prop="type">
        <el-radio-group v-model="formData.type">
          <el-radio :label="0">支付</el-radio>
          <el-radio :label="1">代付</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态" required prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="0">开启</el-radio>
          <el-radio :label="1">关闭</el-radio>
        </el-radio-group>
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
      formData: {
        payTypeCode: "",
        payTypeName: "",
        type: 0,
        status: 0,
      },
      rules: {
        payTypeCode: [
          { required: true, message: "请输入接口类型代码", trigger: "change" },
        ],
        payTypeName: [
          { required: true, message: "请输入接口类型名称", trigger: "change" },
        ],
      },
      loading: false,
    };
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
    onSubmit() {
      this.$refs.formEl.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          const requestApi = this.data
            ? apiPay.payTypeUpdate
            : apiPay.payTypeAdd;
          const [, res] = await requestApi(this.formData);
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
