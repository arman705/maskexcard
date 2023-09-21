<template>
  <CommonDialog
    width="500px"
    title="结算设置"
    :visible="visible"
    :close-on-click-modal="false"
    @open="onOpen"
    @close="onClose"
    @closed="onClosed"
  >
    <el-form
      :model="formData"
      ref="formEl"
      v-loading="loading.detail"
      size="small"
      label-position="left"
      label-width="100px"
    >
      <el-form-item label="公司名称">{{ companyName || "-" }}</el-form-item>
      <el-form-item label="结算配置" prop="settlementType">
        <el-radio-group v-model="formData.settlementType">
          <el-radio :label="1">继承系统</el-radio>
          <el-radio :label="0">停用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button
        @click="onSubmit"
        :disabled="loading.detail"
        :loading="loading.submit"
        type="primary"
        size="small"
      >
        保存
      </el-button>
      <el-button @click="onClose" size="small">关闭</el-button>
    </template>
  </CommonDialog>
</template>

<script>
import CommonDialog from "@/views/components/CommonDialog.vue";
import apiMerchant from "@/api/merchant";

export default {
  props: {
    visible: Boolean,
    companyName: String,
    mchNo: [String, Number],
  },
  components: {
    CommonDialog,
  },
  data() {
    return {
      loading: {
        detail: false,
        submit: false,
      },
      detailData: {},
      formData: {
        settlementType: 1,
      },
    };
  },
  methods: {
    onOpen() {
      this.fetchDetailData();
    },
    onClose() {
      this.$emit("update:visible", false);
    },
    onClosed() {
      this.$refs.formEl.resetFields();
    },
    async fetchDetailData() {
      this.loading.detail = true;
      const [, res] = await apiMerchant.mchInfoQuerySettlementType({
        mchNo: this.mchNo,
      });
      if (res.code == 0) {
        this.formData.settlementType = res.data;
      }
      this.loading.detail = false;
    },
    onSubmit() {
      this.$refs.formEl.validate(async (valid) => {
        if (valid) {
          this.loading.submit = true;
          const [, res] = await apiMerchant.mchInfoSettlementTypeUpdate({
            ...this.formData,
            mchNo: this.mchNo,
          });
          if (res && res.code == 0) {
            this.$emit("submit-success");
            this.onClose();
          }
        }
        this.loading.submit = false;
      });
    },
  },
};
</script>
