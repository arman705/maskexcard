<template>
  <CommonDialog
    width="650px"
    title="余额变更"
    :visible="visible"
    :close-on-click-modal="false"
    @open="onOpen"
    @close="onClose"
    @closed="onClosed"
  >
    <div v-loading="loading.detail">
      <div class="total-panel">
        <div class="total-panel-item">
          账户余额：{{ detailData.accountBalance || 0 }} USD
        </div>
        <!-- <div class="total-panel-item">代付余额：400元</div> -->
        <!-- <div class="total-panel-item">
          冻结余额：{{ detailData.frozenAmount || 0 }} USD
        </div> -->
        <!-- <div class="total-panel-item">保证余额：400元</div> -->
      </div>
      <el-form
        :model="formData"
        :rules="rules"
        ref="formEl"
        size="small"
        label-position="left"
        label-width="100px"
      >
        <el-form-item label="商户ID">{{ mchNo }}</el-form-item>
        <!-- <el-form-item label="账户类型" prop="type">
          <el-radio-group v-model="formData.type">
            <el-radio :label="1">账户余额</el-radio>
            <el-radio :label="2">代付余额</el-radio>
            <el-radio :label="2">冻结余额</el-radio>
            <el-radio :label="4">保证金额</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item label="变更金额(元)" prop="accountChange">
          <el-input-number
            v-model="formData.accountChange"
            :min="0"
            class="custom-input-number"
            placeholder="请输入变更金额"
            :controls="false"
          />
        </el-form-item>
        <el-form-item label="超级密码" prop="adminPassword">
          <el-input
            v-model="formData.adminPassword"
            placeholder="请输入超级密码"
            maxlength="30"
            type="password"
          />
        </el-form-item>
      </el-form>
    </div>

    <template #footer>
      <el-button
        :loading="loading.submit"
        :disabled="loading.detail"
        @click="onSubmit(true)"
        type="primary"
        size="small"
      >
        增加金额
      </el-button>
      <el-button
        :loading="loading.submit"
        :disabled="loading.detail"
        @click="onSubmit(false)"
        type="danger"
        size="small"
      >
        减少金额
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
        accountChange: 0,
        // type: 1,
        adminPassword: "",
      },
      rules: {
        accountChange: [
          {
            validator: (rule, value, callback) => {
              if (Number(value) <= 0) {
                callback(new Error("请输入大于0的金额"));
              } else {
                callback();
              }
            },
            trigger: "change",
          },
        ],
        adminPassword: [
          {
            required: true,
            message: "请输入超级密码",
            trigger: "change",
          },
        ],
      },
    };
  },
  // watch: {
  //   mchNo() {
  //     this.fetchDetailData();
  //   },
  // },
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
      const [error, res] = await apiMerchant.mchInfoAmountInfo({
        mchNo: this.mchNo,
      });
      if (error) {
        this.$message.error(error.msg);
      } else {
        if (res.code == 0) {
          this.detailData = res.data;
        }
      }
      this.loading.detail = false;
    },
    // isIncrease 是否为增加
    onSubmit(isIncrease = true) {
      this.$refs.formEl.validate(async (valid) => {
        if (valid) {
          this.loading.submit = true;
          const [, res] = await apiMerchant.mchInfoAmountUpdate({
            ...this.formData,
            mchNo: this.mchNo,
            accountChange: isIncrease
              ? this.formData.accountChange
              : `-${this.formData.accountChange}`,
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
.total-panel {
  background-color: #f4f5f7;
  display: flex;
  // justify-content: space-between;
  padding: 8px 20px;
  border-radius: 2px;
  margin-bottom: 25px;
}
.total-panel-item {
  color: #606060;
  font-size: 14px;
  margin-right: 20px;
}
.custom-input-number {
  width: 100%;
  ::v-deep .el-input__inner {
    text-align: left;
  }
}
</style>
