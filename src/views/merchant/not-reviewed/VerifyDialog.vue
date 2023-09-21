<template>
  <CommonDialog
    width="790px"
    title="审核商户"
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
      v-loading="loading.detail"
    >
      <div class="form-title">公司信息</div>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="公司名称">
            <el-input v-model="detailData.companyName" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公司所在地邮编">
            <el-input v-model="detailData.companyPostcode" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="国家">
            <el-input :value="detailData.country" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="州/省">
            <el-input :value="detailData.province" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="城市">
            <el-input :value="detailData.city" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公司电话">
            <el-input :value="detailData.companyPhone" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="公司地址">
            <el-input :value="detailData.companyAddress" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="支付方式">
            <el-select
              v-model="detailData.payType"
              style="width: 100%"
              disabled
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
          <el-form-item label="交易网址">
            <el-input :value="detailData.payWebsite" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="行业类型">
            <el-select
              v-model="detailData.industryType"
              style="width: 100%"
              disabled
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
          <el-form-item label="法人姓名">
            <el-input :value="detailData.legalPerson" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话">
            <el-input :value="detailData.contactTel" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="法人所在地邮编">
            <el-input :value="detailData.postcode" disabled />
          </el-form-item>
        </el-col>
      </el-row>

      <div class="form-title">资质信息</div>
      <div>
        <el-image
          v-for="item in images"
          style="width: 140px; height: 140px; margin-right: 10px"
          :key="item"
          :src="item"
          :zoom-rate="1.2"
          :preview-src-list="images"
          fit="cover"
        />
      </div>

      <div class="form-title">审核</div>
      <el-form-item label="状态">
        <el-radio-group v-model="formData.operateType" @change="onChange">
          <el-radio :label="1">通过</el-radio>
          <el-radio :label="0">拒绝</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="formData.operateType === 0"
        label="拒绝原因"
        prop="reason"
      >
        <el-input v-model="formData.reason" placeholder="请输入拒绝原因" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button
        @click="onSubmit"
        :loading="loading.submit"
        :disabled="loading.detail"
        size="small"
        type="primary"
      >
        审核
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
    id: [String, Number],
  },
  components: {
    CommonDialog,
  },
  data() {
    return {
      formData: {
        operateType: 1,
        reason: "",
      },
      detailData: {},
      rules: {
        reason: [
          { required: true, message: "请输入拒绝原因", trigger: "change" },
        ],
      },
      loading: {
        detail: false,
        submit: false,
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
    images() {
      try {
        return JSON.parse(this.detailData.enterpriseCertification);
      } catch (error) {
        return [];
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
    onChange() {
      this.reason = "";
    },
    async fetchDetailData() {
      this.loading.detail = true;
      const [error, res] = await apiMerchant.mchInfoAuditDetail({
        id: this.id,
      });
      if (error) {
        this.$message.error(error.msg);
      } else {
        if (res.code == 0) {
          this.detailData = res.data || {};
          this.detailData.payType = String(res.data.payType);
          this.detailData.rechargeRate = Number(
            (res.data.rechargeRate * 100).toFixed(2)
          );
          this.detailData.otherRechargeRate = Number(
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
          const [, res] = await apiMerchant.mchInfoAudit({
            ...this.formData,
            id: this.id,
            operateType: Boolean(this.formData.operateType),
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
