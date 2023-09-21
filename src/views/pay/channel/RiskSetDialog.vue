<template>
  <CommonDialog
    width="540px"
    title="风控配置"
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
      label-width="120px"
    >
      <el-form-item label="通道名称">
        <el-input :value="data.channelName" disabled />
      </el-form-item>
      <el-form-item label="当天交易金额(元)" prop="dailyAmount">
        <el-input-number
          v-model="formData.dailyAmount"
          :min="0"
          class="custom-input-number"
          placeholder="请输入当天交易金额"
          :controls="false"
        />
      </el-form-item>
      <el-form-item label="单笔最大金额(元)" prop="maxAmount">
        <el-input-number
          v-model="formData.maxAmount"
          :min="0"
          class="custom-input-number"
          placeholder="请输入单笔最大金额"
          :controls="false"
        />
      </el-form-item>
      <el-form-item label="单笔最小金额(元)" prop="minAmount">
        <el-input-number
          v-model="formData.minAmount"
          :min="0"
          class="custom-input-number"
          placeholder="请输入单笔最小金额"
          :controls="false"
        />
      </el-form-item>
      <el-form-item label="交易时间" prop="dateRange">
        <el-date-picker
          style="width: 100%"
          v-model="formData.dateRange"
          type="datetimerange"
          value-format="yyyy-MM-dd hh:mm:ss"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        />
      </el-form-item>
      <el-form-item label="风控状态" required prop="rickStatus">
        <el-radio-group v-model="formData.rickStatus">
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
        dailyAmount: 0,
        maxAmount: 0,
        minAmount: 0,
        dateRange: [],
        rickStatus: 0,
      },
      rules: {
        dateRange: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value || !value[0]) {
                callback(new Error("请选择交易时间"));
                return;
              }
              callback();
            },
            trigger: "change",
          },
        ],
      },
      loading: false,
    };
  },
  methods: {
    onOpen() {
      console.log("vvvvvvv", this.data);
      this.formData.dailyAmount = this.data.dailyAmount || 0;
      this.formData.maxAmount = this.data.maxAmount || 0;
      this.formData.minAmount = this.data.minAmount || 0;
      this.formData.dateRange = [
        this.data.tradingStartTime || "",
        this.data.tradingEndTime || "",
      ];
      this.formData.rickStatus = this.data.rickStatus || 0;
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
          const params = { ...this.formData };
          params.tradingStartTime = params.dateRange[0];
          params.tradingEndTime = params.dateRange[1];
          Reflect.deleteProperty(params, "dateRange");
          const [, res] = await apiPay.payChannelSettingRisk(params);
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
