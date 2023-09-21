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
      <el-form-item label="卡Bin" prop="cardBin">
        <el-input v-model="formData.cardBin" placeholder="请输入卡Bin" />
      </el-form-item>
      <el-form-item label="银行名称" prop="bankName">
        <el-input v-model="formData.bankName" placeholder="请输入银行名称" />
      </el-form-item>
      <el-form-item label="银行编码" prop="bankCode">
        <el-input v-model="formData.bankCode" placeholder="请输入银行编码" />
      </el-form-item>
      <el-form-item label="卡名" prop="cardName">
        <el-input v-model="formData.cardName" placeholder="请输入卡名" />
      </el-form-item>
      <el-form-item label="银行卡类型" prop="cardType">
        <el-input v-model="formData.cardType" placeholder="请输入银行卡类型" />
      </el-form-item>
      <el-form-item label="卡号长度" prop="cardLength">
        <el-input-number
          v-model="formData.cardLength"
          :min="0"
          class="custom-input-number"
          placeholder="请输入卡号长度"
          :controls="false"
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
      formData: {
        cardBin: "",
        bankName: "",
        bankCode: "",
        cardName: "",
        cardType: "",
        cardLength: "",
      },
      rules: {
        cardBin: [
          { required: true, message: "请输入卡Bin", trigger: "change" },
        ],
        bankName: [
          { required: true, message: "请输入银行名称", trigger: "change" },
        ],
        bankCode: [
          { required: true, message: "请输入银行编码", trigger: "change" },
        ],
        cardName: [
          { required: true, message: "请输入卡名", trigger: "change" },
        ],
        cardType: [
          { required: true, message: "请输入银行卡类型", trigger: "change" },
        ],
        cardLength: [
          { required: true, message: "请输入卡号长度", trigger: "change" },
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
            ? apiPay.cardBinUpdate
            : apiPay.cardBinAdd;
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

<style lang="scss" scoped>
.custom-input-number {
  width: 100%;
  ::v-deep .el-input__inner {
    text-align: left;
  }
}
</style>
