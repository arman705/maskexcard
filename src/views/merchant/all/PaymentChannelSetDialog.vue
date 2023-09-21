<template>
  <CommonDialog
    width="500px"
    title="支付通道配置"
    :visible="visible"
    :close-on-click-modal="false"
    @open="onOpen"
    @close="onClose"
    @closed="onClosed"
  >
    <el-form
      :model="formData"
      ref="formEl"
      size="small"
      label-position="left"
      label-width="120px"
    >
      <el-form-item label="产品名称">{{ data.productName }}</el-form-item>
      <el-form-item label="产品类型" prop="type">
        <el-radio-group v-model="formData.type">
          <el-radio :label="0">收款</el-radio>
          <el-radio :label="1">充值</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="代理商费率(%)" prop="proxyRate">
        <el-input-number
          class="custom-input-number"
          v-model="formData.proxyRate"
          :controls="false"
          placeholder="请输入代理商费率(%)"
        />
      </el-form-item>
      <el-form-item label="商户费率(%)" prop="merchantRate">
        <el-input-number
          class="custom-input-number"
          v-model="formData.merchantRate"
          :controls="false"
          placeholder="请输入商户费率(%)"
        />
      </el-form-item>
      <el-form-item label="接口模式" prop="apiMode">
        <el-radio-group v-model="formData.apiMode">
          <el-radio :label="0">单独</el-radio>
          <el-radio :label="1">轮询</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="支付通道" prop="channelId">
        <el-select
          v-model="formData.channelId"
          style="width: 100%"
          placeholder="请选择支付通道"
        >
          <el-option
            v-for="item in channelOptions"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button
        :loading="loading"
        @click="onSubmit"
        size="small"
        type="primary"
        >保存</el-button
      >
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
    data: {
      type: Object,
      default() {
        return {};
      },
    },
    mchNo: [String, Number],
  },
  components: {
    CommonDialog,
  },
  data() {
    return {
      formData: {
        type: 0,
        merchantRate: "",
        apiMode: 0,
        proxyRate: "",
        status: 1,
        channelId: "",
        productId: "",
      },
      rules: {},
      channelOptions: [],
      loading: false,
    };
  },
  methods: {
    async fetchChannelOptions() {
      const [, res] = await apiMerchant.mchInfoPayChannelOptionList({
        productId: this.data.productId,
      });
      if (res && res.code == 0) {
        this.channelOptions = res.data || [];
      }
    },
    fillData() {
      Object.keys(this.formData).forEach((key) => {
        this.formData[key] = this.data[key];
      });
      this.formData.proxyRate = (this.formData.proxyRate * 100).toFixed(0);
      this.formData.merchantRate = (this.formData.merchantRate * 100).toFixed(
        0
      );
    },
    onOpen() {
      this.fetchChannelOptions();
      this.fillData();
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
          const [, res] = await apiMerchant.mchInfoPayProductSave({
            ...this.formData,
            mchNo: this.mchNo,
            proxyRate: this.formData.proxyRate / 100,
            merchantRate: this.formData.merchantRate / 100,
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

<style lang="scss" scoped>
.custom-input-number {
  width: 100%;
  ::v-deep .el-input__inner {
    text-align: left;
  }
}
</style>
