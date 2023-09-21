<template>
  <CommonDialog
    width="790px"
    :title="title"
    :visible="visible"
    :close-on-click-modal="false"
    @open="onOpen"
    @close="onClose"
    @closed="onClosed"
  >
    <el-form
      ref="formEl"
      v-loading="loading.detail"
      :model="formData"
      :rules="rules"
      size="small"
      label-position="left"
      label-width="140px"
    >
      <div class="form-title">基本信息</div>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="商户号" prop="mchNo">
            <el-input
              v-model="formData.mchNo"
              disabled
              placeholder="请输入商户号"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="支付方式" prop="payType">
            <el-select
              v-model="formData.payType"
              style="width: 100%"
              :disabled="type == 'detail'"
              placeholder="请选择支付方式"
            >
              <el-option
                v-for="item in payTypeOptions"
                :key="item.value"
                :label="item.description"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公司名称" prop="companyName">
            <el-input
              v-model="formData.companyName"
              :disabled="type === 'detail'"
              placeholder="请输入公司名称"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结算货币" prop="currency">
            <el-input
              v-model="formData.currency"
              disabled
              placeholder="请输入结算货币"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商户状态" prop="state">
            <el-select
              v-model="formData.state"
              style="width: 100%"
              :disabled="type === 'detail'"
              placeholder="请选择商户状态"
            >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="contactTel">
            <el-input
              v-model="formData.contactTel"
              type="phone"
              :disabled="type === 'detail'"
              placeholder="请输入联系电话"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="行业类型" prop="industryType">
            <el-select
              v-model="formData.industryType"
              style="width: 100%"
              :disabled="type == 'detail'"
              placeholder="请选择行业类型"
            >
              <el-option
                v-for="item in industryTypeOptions"
                :key="item.value"
                :label="item.description"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="国家" prop="country">
            <el-input
              v-model="formData.country"
              :disabled="type == 'detail'"
              placeholder="请输入国家"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <div class="form-title">信用卡发卡</div>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item
            class="custom-form-item"
            label="余额充值费率"
            prop="rechargeRate"
          >
            <el-input-number
              v-model="formData.rechargeRate"
              class="custom-input-number"
              placeholder="请输入余额充值费率"
              :controls="false"
              :disabled="type === 'detail'"
            />
            <span>%</span>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12">
          <el-form-item
            class="custom-form-item"
            label="其他充值费率"
            prop="otherRechargeRate"
          >
            <el-input-number
              v-model="formData.otherRechargeRate"
              class="custom-input-number"
              placeholder="请输入其他充值费率"
              :controls="false"
              :disabled="type === 'detail'"
            />
            <span>%</span>
          </el-form-item>
        </el-col> -->
        <el-col :span="12">
          <el-form-item label="开卡费用" prop="activateCardFee">
            <el-input-number
              class="custom-input-number"
              v-model="formData.activateCardFee"
              :controls="false"
              :disabled="type === 'detail'"
              placeholder="请输入开卡费用"
            />
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12">
          <el-form-item label="争议费用（每笔）" prop="disputeFee">
            <el-input-number
              class="custom-input-number"
              v-model="formData.disputeFee"
              :controls="false"
              :disabled="type === 'detail'"
              placeholder="请输入争议费用（每笔）"
            />
          </el-form-item>
        </el-col> -->
        <el-col :span="12">
          <el-form-item label="最小充值金额" prop="minRechargeAmount">
            <el-input-number
              class="custom-input-number"
              v-model="formData.minRechargeAmount"
              :controls="false"
              :disabled="type === 'detail'"
              placeholder="请输入最小充值金额"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button
        v-if="type === 'edit'"
        :disabled="loading.detail"
        :loading="loading.submit"
        @click="onSubmit"
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
import apiDict from "@/api/dict";

export default {
  props: {
    visible: Boolean,
    mchNo: [String, Number],
    type: String,
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
      formData: {
        mchNo: "",
        payType: "",
        companyName: "",
        currency: "",
        state: "",
        contactTel: "",
        country: "",
        rechargeRate: "",
        otherRechargeRate: "",
        activateCardFee: "",
        disputeFee: "",
        minRechargeAmount: "",
      },
      rules: {
        mchNo: [{ required: true, message: "请输入商户号", trigger: "change" }],
        payType: [
          { required: true, message: "请选择支付方式", trigger: "change" },
        ],
        companyName: [
          { required: true, message: "请输入公司名称", trigger: "change" },
        ],
        currency: [
          { required: true, message: "请输入结算货币", trigger: "change" },
        ],
        state: [
          { required: true, message: "请选择商户状态", trigger: "change" },
        ],
        contactTel: [
          { required: true, message: "请输入联系电话", trigger: "change" },
        ],
        industryType: [
          { required: true, message: "请选择行业类型", trigger: "change" },
        ],
        country: [{ required: true, message: "请输入国家", trigger: "change" }],
        rechargeRate: [
          { required: true, message: "请输入余额充值费率", trigger: "change" },
        ],
        otherRechargeRate: [
          { required: true, message: "请输入其他充值费率", trigger: "change" },
        ],
        activateCardFee: [
          { required: true, message: "请输入开卡费用", trigger: "change" },
        ],
        disputeFee: [
          {
            required: true,
            message: "请输入争议费用（每笔）",
            trigger: "change",
          },
        ],
        minRechargeAmount: [
          { required: true, message: "请输入最小充值金额", trigger: "change" },
        ],
      },
      statusOptions: [
        { label: "待补充资料", value: 0 },
        { label: "待审核", value: 1 },
        { label: "已激活", value: 2 },
        { label: "已禁用", value: 3 },
      ],
      payTypeOptions: [],
      industryTypeOptions: [],
    };
  },
  computed: {
    title() {
      switch (this.type) {
        case "detail":
          return "查看信息";
        case "edit":
          return "编辑信息";
        default:
          return "查看信息";
      }
    },
  },
  created() {
    this.fetchPayTypeOptions();
    this.fetchIndustryTypeOptions();
  },
  methods: {
    async fetchPayTypeOptions() {
      const [, res] = await apiDict.dictSearch({ type: "payType" });
      if (res.code == 0) {
        this.payTypeOptions = res.data || [];
      }
    },
    async fetchIndustryTypeOptions() {
      const [, res] = await apiDict.dictSearch({ type: "industryType" });
      if (res.code == 0) {
        this.industryTypeOptions = res.data || [];
      }
    },
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
      const [error, res] = await apiMerchant.mchInfoDetail({
        mchNo: this.mchNo,
      });
      if (error) {
        this.$message.error(error.msg);
      } else {
        if (res.code == 0) {
          this.formData = { ...(res.data || {}) };
          this.formData.payType = String(res.data.payType);
          this.formData.rechargeRate = Number(
            (res.data.rechargeRate * 100).toFixed(2)
          );
          this.formData.otherRechargeRate = Number(
            (res.data.otherRechargeRate * 100).toFixed(2)
          );
        }
      }
      this.loading.detail = false;
    },
    onSubmit() {
      this.$refs.formEl.validate(async (valid) => {
        if (valid) {
          this.loading.submit = true;
          const [, res] = await apiMerchant.mchInfoUpdate({
            ...this.formData,
            rechargeRate: this.formData.rechargeRate / 100,
            otherRechargeRate: this.formData.otherRechargeRate / 100,
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

<style lang="scss" scoped>
.form-title {
  font-size: 14px;
  color: #15192a;
  padding: 4px;
  border-bottom: 1px solid #f1f1f1;
  margin-top: 10px;
  margin-bottom: 20px;
}
.custom-form-item {
  ::v-deep .el-form-item__content {
    position: relative;
    > span {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
.custom-input-number {
  width: 100%;
  ::v-deep .el-input__inner {
    text-align: left;
  }
}
</style>
