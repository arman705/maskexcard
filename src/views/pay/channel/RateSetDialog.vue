<template>
  <CommonDialog
    width="500px"
    title="费率配置"
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
      <el-form-item label="通道名称">
        <el-input :value="data.channelName" disabled />
      </el-form-item>
      <el-form-item label="通道费率(%)" prop="rate">
        <el-input-number
          v-model="formData.rate"
          :min="0"
          class="custom-input-number"
          placeholder="请输入通道费率"
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
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    CommonDialog,
  },
  data() {
    return {
      formData: {
        rate: "",
      },
      rules: {
        rate: [
          { required: true, message: "请输入通道费率", trigger: "change" },
        ],
      },
      loading: false,
    };
  },
  methods: {
    onOpen() {
      this.formData.rate = this.data.rate;
      this.formData.id = this.data.id;
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
          const [, res] = await apiPay.payChannelSettingFee(this.formData);
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
